import './styles/globals.css';
export const metadata = {
  title: 'AuthSolution',
  description: 'Simple Next.js app',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}