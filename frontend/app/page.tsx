'use client';

import Link from 'next/link';
import { useAuth } from './context/AuthContext';

export default function HomePage() {
  const { authenticated, username, login, logout } = useAuth();

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
            onClick={login}
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
            <Link className="px-4 py-2 bg-teal-900 text-white rounded transition-all" href="/headers">
                See Token
              </Link>
              <span className="text-gray-700 font-medium">
                {username ? `Hello, ${username}` : 'Authenticated'}
              </span>
              <button
                onClick={logout}
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