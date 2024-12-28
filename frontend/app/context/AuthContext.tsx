'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import keycloak from '../../services/keycloak';

interface AuthContextType {
  authenticated: boolean;
  username: string | null;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [username, setUsername] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      console.warn('Keycloak initialization timed out.');
    }, 10000);

    keycloak
      .init({
        onLoad: 'check-sso',
        silentCheckSsoRedirectUri: `${window.location.origin}/silent-check-sso.html`,
        pkceMethod: 'S256',
      })
      .then((auth) => {
        clearTimeout(timer);
        setAuthenticated(auth);
        if (auth) {
          setUsername(keycloak.tokenParsed?.preferred_username || null);
        }
      })
      .catch((error) => {
        clearTimeout(timer);
        console.error('Keycloak initialization failed:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const login = () => keycloak.login();
  const logout = () => keycloak.logout();

  if (loading) {
    return <p className="text-center mt-20">Loading...</p>;
  }

  return (
    <AuthContext.Provider value={{ authenticated, username, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};