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

const container = document.getElementById('root');

if (container) {
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <Router>
        <Routes>
          {/* Protected Route */}
          <Route path="/profile" element={<ProtectedRoute><Layout><ProfilePage /></Layout></ProtectedRoute>} />


          {/* Available Public Route */}
          <Route path="/" element={<Layout>
            <HomePage />
          </Layout>} />

          {/* Non Routeable */}
          <Route path="*" element={<Layout><NotFound404 /></Layout>} />
        </Routes>
      </Router>
    </React.StrictMode>,
  );

} else {
  console.error('Failed to find the root element');
}
