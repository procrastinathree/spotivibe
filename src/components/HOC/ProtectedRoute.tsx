import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { Navigate, useLocation } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [cookies, setCookie] = useCookies(["spotifyAuthToken"])
  const location = useLocation();

  useEffect(() => {
    const hash = location.hash;
    const params = new URLSearchParams(hash.substring(1));
    const urlToken = params.get('access_token');

    if (urlToken) {
      console.log('Route: Token found');
      const ThirtyMinute = new Date(new Date().getTime() + 30 * 60 * 1000);
      setCookie("spotifyAuthToken", urlToken, { expires: ThirtyMinute })

      setToken(urlToken);
    } else {
      console.log('route: check storage');
      const storedToken = cookies.spotifyAuthToken
      console.log(storedToken)
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
