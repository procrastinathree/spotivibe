import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './main.css';
import Layout from './Layout';
import ProtectedRoute from './components/HOC/ProtectedRoute';

// Page Import
import HomePage from './pages/Home';
import NotFound404 from './pages/NotFound';
import ProfilePage from './pages/Profile';
import AccountPage from './pages/Account';
import ArtistPage from './pages/Artist';

const container = document.getElementById('root');

if (container) {
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <Router>
        <Routes>
          {/* Available Public Route */}
          <Route path="/" element={<Layout>
            <HomePage />
          </Layout>} />

          {/* Protected Route */}
          <Route path="/profile" element={<ProtectedRoute><Layout><ProfilePage /></Layout></ProtectedRoute>} />
          <Route path="/profile/artists" element={<ProtectedRoute><Layout><ArtistPage /></Layout></ProtectedRoute>} />
          <Route path="/account" element={<ProtectedRoute><Layout><AccountPage /></Layout></ProtectedRoute>} />

          {/* Non Routeable */}
          <Route path="*" element={<Layout><NotFound404 /></Layout>} />
        </Routes>
      </Router>
    </React.StrictMode>,
  );

} else {
  console.error('Failed to find the root element');
}
