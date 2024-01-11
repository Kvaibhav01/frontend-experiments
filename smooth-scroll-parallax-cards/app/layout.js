import { GeistSans } from 'geist/font/sans';
import './globals.css';

export const metadata = {
  title: 'Smooth Scroll Parallax Cards',
  description:
    'A set of smooth scrollable cards made with Next.js, Framer Motion, Lenis.js and SASS',
};

export default function RootLayout({ children }) {
  return (
    <html lang='en' className={GeistSans.className}>
      <body>{children}</body>
    </html>
  );
}
