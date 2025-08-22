import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import LandingPage from './pages/landing-page';
import DeveloperFeedDashboard from './pages/developer-feed-dashboard';
import UserAuthentication from './pages/user-authentication';
import UserProfile from './pages/user-profile';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<DeveloperFeedDashboard />} />
        <Route path="/landing-page" element={<LandingPage />} />
        <Route path="/developer-feed-dashboard" element={<DeveloperFeedDashboard />} />
        <Route path="/user-authentication" element={<UserAuthentication />} />
        <Route path="/user-profile" element={<UserProfile />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
