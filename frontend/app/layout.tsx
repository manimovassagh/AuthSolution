
import { AuthProvider } from './auth/AuthContext';
import './styles/globals.css';

export const metadata = {
  title: 'AuthSolution',
  description: 'Your trusted solution for authentication and security.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}