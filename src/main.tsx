import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './main.css';
import Layout from './Layout';

// Page Import
import HomePage from './pages/Home';
import NotFound404 from './pages/NotFound';
import ProfilePage from './pages/Profile';
import DashboardPage from './pages/Dashboard';

const container = document.getElementById('root');

if (container) {
  const root = createRoot(container);
  const isLogedIn: boolean = false;
  root.render(
    <React.StrictMode>
      <Router>
        <Routes>
          {/* Available Public Route */}
          <Route path="/" element={<Layout>
            {isLogedIn ?
              <DashboardPage />
              :
              <HomePage />
            }
          </Layout>} />
          <Route path="profile" element={<Layout><ProfilePage /></Layout>} />

          {/* Non Routeable */}
          <Route path="*" element={<Layout><NotFound404 /></Layout>} />
        </Routes>
      </Router>
    </React.StrictMode>,
  );

} else {
  console.error('Failed to find the root element');
}
