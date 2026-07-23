import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import ReactGA from 'react-ga';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Awareness from './pages/Awareness';
import HeroSection from './components/HeroSection';
import MissionStatement from './components/MissionStatement';
import NavigationBar from './components/NavigationBar';
import QuickLinks from './components/QuickLinks';
import FeaturedProjects from './components/FeaturedProjects';
import Projects from './components/Projects';
import AboutUs from './components/AboutUs';
import Testimonials from './components/Testimonials';
import News from './components/News';
import Footer from './components/Footer';
import GetInvolved from './components/GetInvolved';
import Contact from './components/Contact';
import ImpactStories from './components/ImpactStories';
import ProjectShowcase from './components/ProjectShowcase';
import Transparency from './components/Transparency';
import DonorRecognition from './components/DonorRecognition';
import AboutUsPage from './pages/AboutUs';
import InteractiveQuiz from './components/InteractiveQuiz';
import ProjectsPage from './pages/Projects';
import GetInvolvedPage from './pages/GetInvolved';
import NewsPage from './pages/News';
import ContactPage from './pages/Contact';
import PartnersPage from './pages/Partners';
import BlogPage from './pages/Blog';
import Breadcrumb from './components/Breadcrumb';
import AdvancedSearch from './components/AdvancedSearch';
import UserProfile from './components/UserProfile';
import UserDashboard from './components/UserDashboard';
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

const TRACKING_ID = "UA-XXXXXXXXX-X"; // Replace with your Google Analytics tracking ID

function App() {
  useEffect(() => {
    ReactGA.initialize(TRACKING_ID);
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);
  return (
    <div className="App container section-padding">
      <Helmet>
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&family=Roboto:wght@400;700&display=swap" rel="stylesheet" />
      </Helmet>
      <Router>
        <NavigationBar />
        <Breadcrumb />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <div className="parallax" style={{ backgroundImage: "url('/images/hero-banner.jpg')" }}>
                  <HeroSection />
                </div>
                <MissionStatement />
                <QuickLinks />
                <FeaturedProjects />
                <Projects />
                <AboutUs />
                <GetInvolved />
                <News />
                <Testimonials />
                <Contact />
                <ImpactStories />
                <ProjectShowcase />
                <Transparency />
                <DonorRecognition />
              </>
            }
          />
          <Route path="/about-us" element={<AboutUsPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/manage" element={<ProjectList />} />
          <Route path="/projects/new" element={<ProjectForm />} />
          <Route path="/tasks" element={<TaskList />} />
          <Route path="/tasks/new" element={<TaskForm />} />
          <Route path="/milestones" element={<MilestoneList />} />
          <Route path="/milestones/new" element={<MilestoneForm />} />
          <Route path="/resources" element={<ResourceList />} />
          <Route path="/resources/new" element={<ResourceForm />} />
          <Route path="/profiles" element={<ProfileList />} />
          <Route path="/profiles/new" element={<ProfileForm />} />
          <Route path="/group-profiles" element={<GroupProfileList />} />
          <Route path="/group-profiles/new" element={<GroupProfileForm />} />
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
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;