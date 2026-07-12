import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@neo/ui';

export const metadata: Metadata = {
  title: 'Neo Studio',
  description: 'AI-native Agency Platform',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className="min-h-screen">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
