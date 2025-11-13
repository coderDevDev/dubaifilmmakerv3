import type { Metadata } from 'next';
import { Azeret_Mono } from 'next/font/google';
import localFont from 'next/font/local';
import './globals.css';
import Header from '@/components/Header';
import CustomCursor from '@/components/CustomCursor';
import Script from 'next/script';

const azeretMono = Azeret_Mono({
  subsets: ['latin'],
  variable: '--font-azeret-mono',
  weight: ['400', '700']
});

const monumentExtended = localFont({
  src: '../public/fonts/monument-extended-bold.woff2',
  variable: '--font-monument',
  weight: '700'
});

export const metadata: Metadata = {
  title: 'DubaiFilmMaker – Homepage',
  description:
    'Post-Production company based in the heart of Paris, dedicated to audiovisual production, advertisement, digital content, music video feature films & documentaries.',
  metadataBase: new URL('https://posterco.tv'),
  openGraph: {
    title: 'DubaiFilmMaker – Homepage',
    description:
      'Post-Production company based in the heart of Paris, dedicated to audiovisual production, advertisement, digital content, music video feature films & documentaries.',
    type: 'website',
    locale: 'en_US'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DubaiFilmMaker – Homepage'
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        {/* Original CSS for 100% pixel-perfect match */}
        <link rel="stylesheet" href="/css/build.min.css" />
      </head>
      <body
        className={`${azeretMono.variable} ${monumentExtended.variable} font-azeret antialiased`}>
        <main className="main">
          <div className="app-container">
            <div className="app-container-inner">
              <Header />
              {children}
            </div>
          </div>
        </main>
        <CustomCursor />
      </body>
    </html>
  );
}
