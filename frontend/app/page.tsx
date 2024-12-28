'use client';

import { useEffect, useState } from 'react';
import keycloak from '../services/keycloak';

export default function HomePage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [username, setUsername] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false); // Stop loading if timeout
      console.warn('Keycloak initialization timed out.');
    }, 10000); // 10 seconds timeout

    keycloak
      .init({
        onLoad: 'check-sso', // Check silently if the user is logged in
        silentCheckSsoRedirectUri: `${window.location.origin}/silent-check-sso.html`,
        pkceMethod: 'S256',
      })
      .then((auth) => {
        clearTimeout(timer); // Clear timeout on success
        setAuthenticated(auth);
        if (auth) {
          setUsername(keycloak.tokenParsed?.preferred_username || null);
          console.log(keycloak.tokenParsed);
          
        }
      })
      .catch((error) => {
        clearTimeout(timer); // Clear timeout on error
        console.error('Keycloak initialization failed:', error);
        console.log("shows the error", error);
        
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleLogin = () => {
    keycloak.login();
  };

  const handleLogout = () => {
    keycloak.logout();
  };

  if (loading) {
    return <p className="text-center mt-20">Loading...</p>;
  }

  if (!authenticated) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-100 text-gray-800">
        <header className="bg-white shadow-md w-full p-4">
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-xl font-bold">AuthSolution</h1>
          </div>
        </header>
        <main className="flex-grow flex flex-col items-center justify-center text-center">
          <h2 className="text-3xl font-bold mb-4">Welcome to AuthSolution</h2>
          <p className="mb-6">Your trusted solution for authentication and security.</p>
          <button
            onClick={handleLogin}
            className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all"
          >
            Login to Get Started
          </button>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white shadow-md p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">AuthSolution</h1>
          <div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700 font-medium">
                {username ? `Hello, ${username}` : 'Authenticated'}
              </span>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-red-600 transition-all"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>
      <main className="flex-grow flex items-center justify-center bg-gray-100 text-gray-800">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Welcome to AuthSolution</h2>
          <p className="mt-4">You are logged in as: {username}</p>
        </div>
      </main>
    </div>
  );
}