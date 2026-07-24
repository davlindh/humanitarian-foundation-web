import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './auth/AuthContext';
import AdminRoute from './auth/AdminRoute';
import { initGA } from './utils/analytics';

import NavigationBar from './components/NavigationBar';
import Footer from './components/Footer';
import Breadcrumb from './components/Breadcrumb';

import Home from './pages/Home';
import AboutUsPage from './pages/AboutUs';
import ProjectsPage from './pages/Projects';
import GetInvolvedPage from './pages/GetInvolved';
import NewsPage from './pages/News';
import ContactPage from './pages/Contact';
import PartnersPage from './pages/Partners';
import BlogPage from './pages/Blog';
import AuthPage from './pages/Auth';
import Awareness from './pages/Awareness';

import InteractiveQuiz from './components/InteractiveQuiz';
import AdvancedSearch from './components/AdvancedSearch';
import UserProfile from './components/UserProfile';
import UserDashboard from './components/UserDashboard';

// Admin
import AdminLayout from './pages/admin/AdminLayout';
import AdminHome from './pages/admin/AdminHome';
import AdminRoles from './pages/admin/AdminRoles';
import AdminActivity from './pages/admin/AdminActivity';
import ProjectsAdmin from './pages/admin/ProjectsAdmin';
import TasksAdmin from './pages/admin/TasksAdmin';
import MilestonesAdmin from './pages/admin/MilestonesAdmin';
import ResourcesAdmin from './pages/admin/ResourcesAdmin';
import ProfilesAdmin from './pages/admin/ProfilesAdmin';
import GroupProfilesAdmin from './pages/admin/GroupProfilesAdmin';
import NewsAdmin from './pages/admin/NewsAdmin';

const SiteChrome = ({ children }) => (
  <div className="min-h-dvh flex flex-col bg-surface">
    <NavigationBar />
    <Breadcrumb />
    <main className="flex-1">{children}</main>
    <Footer />
  </div>
);

function App() {
  useEffect(() => {
    initGA();
  }, []);

  return (
    <AuthProvider>
      <Router>
        <SiteChrome>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about-us" element={<AboutUsPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/get-involved" element={<GetInvolvedPage />} />
            <Route path="/news" element={<NewsPage />} />
            <Route path="/news/:slug" element={<NewsPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/partners" element={<PartnersPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/quiz" element={<InteractiveQuiz />} />
            <Route path="/awareness" element={<Awareness />} />
            <Route path="/advanced-search" element={<AdvancedSearch />} />
            <Route path="/user-profile" element={<UserProfile />} />
            <Route path="/user-dashboard" element={<UserDashboard />} />

            <Route path="/auth" element={<AuthPage />} />

            {/* Admin — admin role required */}
            <Route
              path="/admin"
              element={
                <AdminRoute>
                  <AdminLayout />
                </AdminRoute>
              }
            >
              <Route index element={<AdminHome />} />
              <Route path="projects" element={<ProjectsAdmin />} />
              <Route path="tasks" element={<TasksAdmin />} />
              <Route path="milestones" element={<MilestonesAdmin />} />
              <Route path="resources" element={<ResourcesAdmin />} />
              <Route path="profiles" element={<ProfilesAdmin />} />
              <Route path="group-profiles" element={<GroupProfilesAdmin />} />
              <Route path="news" element={<NewsAdmin />} />
              <Route path="roles" element={<AdminRoles />} />
              <Route path="activity" element={<AdminActivity />} />
            </Route>
          </Routes>
        </SiteChrome>
      </Router>
    </AuthProvider>
  );
}

export default App;
