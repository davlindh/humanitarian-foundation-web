
-- Log table
CREATE TABLE public.admin_activity_log (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID,
  user_email TEXT,
  table_name TEXT NOT NULL,
  record_id UUID,
  action TEXT NOT NULL,
  record_name TEXT,
  changes JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX admin_activity_log_created_at_idx ON public.admin_activity_log (created_at DESC);
CREATE INDEX admin_activity_log_table_name_idx ON public.admin_activity_log (table_name);

GRANT SELECT ON public.admin_activity_log TO authenticated;
GRANT ALL ON public.admin_activity_log TO service_role;

ALTER TABLE public.admin_activity_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins read activity" ON public.admin_activity_log FOR SELECT TO authenticated
  USING (private.has_role(auth.uid(), 'admin'::app_role));
-- No insert/update/delete policies: triggers run as SECURITY DEFINER (owner) and bypass RLS.

-- Trigger function
CREATE OR REPLACE FUNCTION public.log_admin_activity()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_uid uuid := auth.uid();
  v_email text := nullif(current_setting('request.jwt.claims', true), '')::jsonb->>'email';
  v_record_id uuid;
  v_name text;
  v_changes jsonb;
BEGIN
  IF TG_OP = 'DELETE' THEN
    v_record_id := (to_jsonb(OLD)->>'id')::uuid;
    v_name := COALESCE(to_jsonb(OLD)->>'name', to_jsonb(OLD)->>'title', to_jsonb(OLD)->>'role', v_record_id::text);
    v_changes := to_jsonb(OLD);
  ELSIF TG_OP = 'INSERT' THEN
    v_record_id := (to_jsonb(NEW)->>'id')::uuid;
    v_name := COALESCE(to_jsonb(NEW)->>'name', to_jsonb(NEW)->>'title', to_jsonb(NEW)->>'role', v_record_id::text);
    v_changes := to_jsonb(NEW);
  ELSE
    v_record_id := (to_jsonb(NEW)->>'id')::uuid;
    v_name := COALESCE(to_jsonb(NEW)->>'name', to_jsonb(NEW)->>'title', to_jsonb(NEW)->>'role', v_record_id::text);
    v_changes := jsonb_build_object('before', to_jsonb(OLD), 'after', to_jsonb(NEW));
  END IF;

  INSERT INTO public.admin_activity_log
    (user_id, user_email, table_name, record_id, action, record_name, changes)
  VALUES
    (v_uid, v_email, TG_TABLE_NAME, v_record_id, TG_OP, v_name, v_changes);

  RETURN COALESCE(NEW, OLD);
END;
$$;

REVOKE ALL ON FUNCTION public.log_admin_activity() FROM PUBLIC, anon, authenticated;

-- Attach triggers
DO $$
DECLARE
  t text;
  tables text[] := ARRAY[
    'projects','tasks','milestones','resources',
    'profiles','group_profiles','news_posts','user_roles'
  ];
BEGIN
  FOREACH t IN ARRAY tables LOOP
    EXECUTE format(
      'CREATE TRIGGER %I_activity_log AFTER INSERT OR UPDATE OR DELETE ON public.%I
         FOR EACH ROW EXECUTE FUNCTION public.log_admin_activity()',
      t, t
    );
  END LOOP;
END $$;
