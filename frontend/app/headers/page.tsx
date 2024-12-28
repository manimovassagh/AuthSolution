'use client';

import { useState, useEffect } from 'react';
import keycloak from '../../services/keycloak';  // Assuming you have keycloak initialized somewhere
import axiosInstance from '../services/axiosInstance';

export default function HeadersPage() {
  const [headers, setHeaders] = useState<Record<string, string> | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null); // State to hold the Bearer token

  // Extract token from Keycloak on mount
  useEffect(() => {
    if (keycloak.token) {
      setToken(keycloak.token);  // Set the token in the state
    }
  }, []);

  const fetchHeaders = async () => {
    setLoading(true);
    setError(null);

    try {
      // Make the request to fetch headers with Bearer token
      const response = await axiosInstance.get('/protected/admin', {
        headers: { Authorization: `Bearer ${token}` }, // Include Bearer token
      });

      // Extract headers from the response
      //@ts-expect-error expect
      setHeaders(response.headers);
    } catch (err) {
      console.error('Error fetching headers:', err);
      setError('Failed to fetch headers. Check console for more details.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4">Request Headers Viewer</h1>
      
      {/* Display the Bearer token */}
      {token && (
        <div className="w-full max-w-lg bg-white shadow-md rounded-lg p-4 mb-6">
          <h2 className="text-xl font-medium mb-3">Bearer Token:</h2>
          <pre className="text-sm bg-gray-100 p-2 rounded-md overflow-x-auto">{token}</pre>
        </div>
      )}

      <button
        onClick={fetchHeaders}
        className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all mb-6"
        disabled={loading}
      >
        {loading ? 'Loading...' : 'Fetch Headers'}
      </button>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {headers && (
        <div className="w-full max-w-lg bg-white shadow-md rounded-lg p-4 overflow-x-auto">
          <h2 className="text-xl font-medium mb-3">Response Headers:</h2>
          <pre className="text-sm bg-gray-100 p-2 rounded-md">
            {JSON.stringify(headers, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}