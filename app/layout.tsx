import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Rishav — Video Editor & Storyteller',
  description: 'Cinematic video editing portfolio. Explore professional edits, reels, and creative storytelling.',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <style>{`
          html, body {
            background-color: #0B0D10 !important;
            color: #E6E8EB;
          }
        `}</style>
      </head>
      <body style={{ backgroundColor: '#0B0D10', color: '#E6E8EB' }}>
        {children}
      </body>
    </html>
  );
}
