'use client';

import React, { useEffect, useState } from 'react';
import keycloak from '../services/keycloak';

export default function HomePage() {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    keycloak
      .init({ onLoad: 'login-required' }) // Automatically redirect for login
      .then((auth) => {
        setAuthenticated(auth); // Set authenticated state
      })
      .catch((error) => {
        console.error('Keycloak initialization failed:', error);
      });
  }, []);

  if (!authenticated) {
    return <p>Loading...</p>; // Show a loading state while authenticating
  }

  return (
    <div>
      <h1>Welcome to AuthSolution</h1>
      <p>Authenticated as: {keycloak.tokenParsed?.preferred_username}</p>
      <button onClick={() => keycloak.logout()}>Logout</button>
    </div>
  );
}