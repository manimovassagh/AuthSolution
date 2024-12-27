'use client';

import { useEffect, useState } from 'react';
import keycloak from '../services/keycloak';

export default function HomePage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    keycloak
      .init({ onLoad: 'login-required' }) // Automatically redirect for login
      .then((auth) => {
        setAuthenticated(auth); // Set authenticated state
        if (auth) {
          setUsername(keycloak.tokenParsed?.preferred_username || null);
        }
      })
      .catch((error) => {
        console.error('Keycloak initialization failed:', error);
      });
  }, []);

  const handleLogout = () => {
    keycloak.logout();
  };

  const handleLogin = () => {
    keycloak.login();
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-md p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">AuthSolution</h1>
          <div>
            {authenticated ? (
              <div className="flex items-center space-x-4">
                <span className="text-gray-700 font-medium">
                  {username ? `Hello, ${username}` : 'Authenticated'}
                </span>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-all"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={handleLogin}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-all"
              >
                Login
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center bg-gray-100 text-gray-800">
        <div className="text-center">
          {authenticated ? (
            <>
              <h2 className="text-2xl font-bold">Welcome to AuthSolution</h2>
              <p className="mt-4">You are logged in as: {username}</p>
            </>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </main>
    </div>
  );
}