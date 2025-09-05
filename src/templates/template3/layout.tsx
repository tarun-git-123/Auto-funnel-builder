import { ReactNode } from 'react';
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-sans bg-gray-100">{children}</body>
    </html>
  );
}