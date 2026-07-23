import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './auth/AuthContext';
import ProtectedRoute from './auth/ProtectedRoute';
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
import ProjectList from './components/ProjectList';
import ProjectForm from './components/ProjectForm';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import MilestoneList from './components/MilestoneList';
import MilestoneForm from './components/MilestoneForm';
import ResourceList from './components/ResourceList';
import ResourceForm from './components/ResourceForm';
import ProfileList from './components/ProfileList';
import ProfileForm from './components/ProfileForm';
import GroupProfileList from './components/GroupProfileList';
import GroupProfileForm from './components/GroupProfileForm';

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
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/partners" element={<PartnersPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/quiz" element={<InteractiveQuiz />} />
            <Route path="/awareness" element={<Awareness />} />
            <Route path="/advanced-search" element={<AdvancedSearch />} />
            <Route path="/user-profile" element={<UserProfile />} />
            <Route path="/user-dashboard" element={<UserDashboard />} />

            <Route path="/auth" element={<AuthPage />} />

            {/* Admin — auth-gated */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<AdminHome />} />
              <Route path="projects" element={<ProjectList />} />
              <Route path="projects/new" element={<ProjectForm />} />
              <Route path="tasks" element={<TaskList />} />
              <Route path="tasks/new" element={<TaskForm />} />
              <Route path="milestones" element={<MilestoneList />} />
              <Route path="milestones/new" element={<MilestoneForm />} />
              <Route path="resources" element={<ResourceList />} />
              <Route path="resources/new" element={<ResourceForm />} />
              <Route path="profiles" element={<ProfileList />} />
              <Route path="profiles/new" element={<ProfileForm />} />
              <Route path="group-profiles" element={<GroupProfileList />} />
              <Route path="group-profiles/new" element={<GroupProfileForm />} />
              <Route path="roles" element={<AdminRoles />} />
            </Route>
          </Routes>
        </SiteChrome>
      </Router>
    </AuthProvider>
  );
}

export default App;
