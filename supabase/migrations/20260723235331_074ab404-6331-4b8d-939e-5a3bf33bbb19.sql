
-- 1. Private schema not exposed by PostgREST
CREATE SCHEMA IF NOT EXISTS private;
GRANT USAGE ON SCHEMA private TO authenticated, service_role;

-- 2. Relocated has_role
CREATE OR REPLACE FUNCTION private.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

REVOKE ALL ON FUNCTION private.has_role(uuid, public.app_role) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION private.has_role(uuid, public.app_role) TO authenticated, service_role;

-- 3. Recreate every policy that referenced public.has_role
DROP POLICY IF EXISTS "Admins full access" ON public.group_profiles;
CREATE POLICY "Admins full access" ON public.group_profiles FOR ALL TO authenticated
  USING (private.has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (private.has_role(auth.uid(), 'admin'::app_role));

DROP POLICY IF EXISTS "Admins full access" ON public.milestones;
CREATE POLICY "Admins full access" ON public.milestones FOR ALL TO authenticated
  USING (private.has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (private.has_role(auth.uid(), 'admin'::app_role));

DROP POLICY IF EXISTS "Admins full access" ON public.profiles;
CREATE POLICY "Admins full access" ON public.profiles FOR ALL TO authenticated
  USING (private.has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (private.has_role(auth.uid(), 'admin'::app_role));

DROP POLICY IF EXISTS "Admins full access" ON public.projects;
CREATE POLICY "Admins full access" ON public.projects FOR ALL TO authenticated
  USING (private.has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (private.has_role(auth.uid(), 'admin'::app_role));

DROP POLICY IF EXISTS "Admins full access" ON public.resources;
CREATE POLICY "Admins full access" ON public.resources FOR ALL TO authenticated
  USING (private.has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (private.has_role(auth.uid(), 'admin'::app_role));

DROP POLICY IF EXISTS "Admins full access" ON public.tasks;
CREATE POLICY "Admins full access" ON public.tasks FOR ALL TO authenticated
  USING (private.has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (private.has_role(auth.uid(), 'admin'::app_role));

DROP POLICY IF EXISTS "Admins manage roles" ON public.user_roles;
CREATE POLICY "Admins manage roles" ON public.user_roles FOR ALL TO authenticated
  USING (private.has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (private.has_role(auth.uid(), 'admin'::app_role));

DROP POLICY IF EXISTS "Users read own roles" ON public.user_roles;
CREATE POLICY "Users read own roles" ON public.user_roles FOR SELECT TO authenticated
  USING ((user_id = auth.uid()) OR private.has_role(auth.uid(), 'admin'::app_role));

DROP POLICY IF EXISTS "Admins manage news" ON public.news_posts;
CREATE POLICY "Admins manage news" ON public.news_posts FOR ALL TO authenticated
  USING (private.has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (private.has_role(auth.uid(), 'admin'::app_role));

-- 4. Retire the exposed public.has_role
DROP FUNCTION IF EXISTS public.has_role(uuid, public.app_role);

-- 5. Lock down the bootstrap trigger function (still fires as trigger; no API callers needed)
REVOKE ALL ON FUNCTION public.bootstrap_first_admin() FROM PUBLIC, anon, authenticated;
