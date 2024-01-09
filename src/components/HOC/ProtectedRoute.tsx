import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie'

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const hash = location.hash;
    const params = new URLSearchParams(hash.substring(1));
    const urlToken = params.get('access_token');

    if (urlToken) {
      console.log('Route: Token found');
      Cookies.set("spotifyAuthToken", urlToken, { expires: 1 / 24 })

      setToken(urlToken);
    } else {
      console.log('route: check storage');
      const storedToken = Cookies.get("spotifyAuthToken")
      setToken(storedToken || "");
    }
    setIsLoading(false);
  }, [location.hash]);

  if (isLoading) {
    console.log('Route: check token');
    return <div>Loading...</div>;
  }

  if (token === null) {
    console.log('Route: if token null, just throw haha');
    return <Navigate to="/" replace />;
  }

  console.log('Route: token found');
  return <>{children}</>;
};

export default ProtectedRoute;
