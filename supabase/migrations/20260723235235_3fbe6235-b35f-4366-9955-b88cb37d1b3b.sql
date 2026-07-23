
-- News posts table
CREATE TABLE public.news_posts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT,
  excerpt TEXT,
  content TEXT,
  image_url TEXT,
  post_type TEXT NOT NULL DEFAULT 'blog',
  published_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_by UUID,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT ON public.news_posts TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.news_posts TO authenticated;
GRANT ALL ON public.news_posts TO service_role;

ALTER TABLE public.news_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read news" ON public.news_posts FOR SELECT USING (true);
CREATE POLICY "Admins manage news" ON public.news_posts FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

CREATE TRIGGER update_news_posts_updated_at BEFORE UPDATE ON public.news_posts
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Seed Projects
INSERT INTO public.projects (name, description) VALUES
  ('Clean Water Initiative', 'Providing safe drinking water to rural communities through borehole drilling, filtration systems, and long-term operator training.'),
  ('Rural Education Programme', 'Building schools, training teachers, and supplying learning materials across five underserved districts.'),
  ('Community Healthcare Access', 'Renovating clinics, strengthening medical supply chains, and training front-line health workers.'),
  ('Sustainable Agriculture', 'Supporting smallholder farmers with composting techniques, drought-resilient seeds, and cooperative market access.'),
  ('Solar Energy for Villages', 'Deploying off-grid solar systems and training village technicians to maintain them.');

-- Seed Milestones (tied to first project)
INSERT INTO public.milestones (name, description, due_date, project_id)
SELECT 'Site surveys completed', 'Hydrogeological surveys finished across 12 villages.', '2026-03-31', id FROM public.projects WHERE name = 'Clean Water Initiative';
INSERT INTO public.milestones (name, description, due_date, project_id)
SELECT 'Boreholes drilled', 'Ten of twelve planned boreholes drilled and cased.', '2026-08-15', id FROM public.projects WHERE name = 'Clean Water Initiative';
INSERT INTO public.milestones (name, description, due_date, project_id)
SELECT 'Teacher cohort trained', 'Forty teachers completed the six-week training programme.', '2026-06-30', id FROM public.projects WHERE name = 'Rural Education Programme';

-- Seed Tasks
INSERT INTO public.tasks (name, description, status, project_id)
SELECT 'Procure pump equipment', 'Source and ship submersible pumps for boreholes 6-10.', 'open', id FROM public.projects WHERE name = 'Clean Water Initiative';
INSERT INTO public.tasks (name, description, status, project_id)
SELECT 'Draft operator manual', 'Localised operator manual in Swahili and French.', 'in_progress', id FROM public.projects WHERE name = 'Clean Water Initiative';
INSERT INTO public.tasks (name, description, status, project_id)
SELECT 'Publish annual curriculum', 'Finalise Y2026 curriculum with district officers.', 'open', id FROM public.projects WHERE name = 'Rural Education Programme';
INSERT INTO public.tasks (name, description, status, project_id)
SELECT 'Clinic renovation punch list', 'Complete final punch list for Bafut clinic.', 'done', id FROM public.projects WHERE name = 'Community Healthcare Access';

-- Seed Resources
INSERT INTO public.resources (name, description, url) VALUES
  ('WASH Field Handbook', 'Reference handbook for water, sanitation, and hygiene field teams.', 'https://example.org/wash-handbook.pdf'),
  ('Solar Water Heater Guide', 'DIY assembly guide for low-cost solar water heaters.', 'https://example.org/solar-heater.pdf'),
  ('Composting Playbook', 'Household and smallholder composting methods.', 'https://example.org/composting.pdf');

-- Seed Group Profiles
INSERT INTO public.group_profiles (name, description) VALUES
  ('Great Lakes WASH Coalition', 'Regional coordination partnership on water, sanitation and hygiene standards.'),
  ('District Education Working Group', 'Joint body coordinating curriculum and teacher training across five districts.');

-- Seed Profiles (public-facing team/staff, not auth accounts)
INSERT INTO public.profiles (name, email, role) VALUES
  ('Dr. Amina Nkeng', 'amina@hufida.example', 'Executive Director'),
  ('Samuel Ekema', 'samuel@hufida.example', 'Programmes Lead'),
  ('Grace Mbi', 'grace@hufida.example', 'Field Coordinator');

-- Seed News (blog + press releases)
INSERT INTO public.news_posts (title, category, excerpt, content, image_url, post_type, published_at) VALUES
  ('Empowering communities through clean water', 'Field Report',
   'How HUFIDA is providing safe drinking water and long-term operator training in rural regions.',
   'Detailed field notes on how the water programme was scoped with village councils, how boreholes were sited, and how local operators are being trained to run and maintain them for the next decade.',
   '/images/blog1.jpg', 'blog', '2025-10-10'),
  ('Educational programmes making a difference', 'Programme Update',
   'Five new schools, forty new teachers, and a curriculum built with local communities.',
   'A summary of the year''s work in the education programme: schools completed, cohort profiles, teacher-training results, and the materials produced with district education officers.',
   '/images/blog2.jpg', 'blog', '2025-09-20'),
  ('DIY solar water heater — a field guide', 'Technical Guide',
   'A step-by-step guide to building a low-cost solar water heater from locally available materials.',
   'Materials list, tool requirements, and full assembly instructions for a solar water heater that can be built and maintained by a village technician.',
   '/images/blog3.jpg', 'blog', '2025-11-05'),
  ('Composting, from the ground up', 'Technical Guide',
   'Simple, low-cost composting methods for households and small farms.',
   'The composting approaches our agricultural teams recommend for smallholder plots, including layout, materials, and troubleshooting.',
   '/images/blog4.jpg', 'blog', '2025-11-12'),
  ('HUFIDA launches new healthcare initiative', 'Press Release',
   'A four-district healthcare initiative focused on supply chains, worker training, and clinical infrastructure.',
   'HUFIDA is launching a healthcare initiative focused on medical supply chains, health-worker training, and the renovation of clinical infrastructure across four districts.',
   NULL, 'press', '2025-08-15'),
  ('HUFIDA joins the Great Lakes WASH Coalition', 'Press Release',
   'HUFIDA joins as a delivery partner covering three districts in the coalition''s eastern zone.',
   'A regional coordination partnership on water, sanitation, and hygiene standards. HUFIDA joins as a delivery partner covering three districts in the coalition''s eastern zone.',
   NULL, 'press', '2025-07-30');
