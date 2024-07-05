import '../globals.css';
import type { Metadata } from 'next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Toaster } from 'react-hot-toast';
import { GoogleAnalytics } from '@next/third-parties/google';

import Footer from '@/components/ui/section/Footer';
import Contact from '@/components/ui/section/Contact';
import Nav from '@/components/nav/Nav';
import AnimatedCursor from '@/components/AnimatedCursor';
import PageTransition from '@/components/page-transition/PageTransition';
import SmoothScrollbar from '@/components/SmoothScrollbar';
import Hotjar from '@/components/Hotjar';
import { cn } from '@/utils/cn';
import { LanguagePageProps } from '@/utils/langPageProps';
import { fetchContact, fetchNav } from '@/lib/sanity/requests';

export const metadata: Metadata = {
  title: 'Megisaka Art | VTuber Design & Digital Art',
  description:
    "Welcome to Megisaka Art! Discover the creative world of Megisaka, specializing in VTuber design and digital art. Explore unique artworks, commission custom pieces, and learn more about Megisaka's artistic journey.",
  keywords:
    'Megisaka, VTuber design, digital art, artist website, custom VTubers, digital artist, VTuber creator, Megisaka Art, unique digital art',
};

export default async function RootLayout({
  children,
  params: { lang },
}: {
  children: React.ReactNode;
} & LanguagePageProps) {
  const nav = await fetchNav();
  const contact = await fetchContact();

  return (
    <html lang="en">
      <GoogleAnalytics gaId="GTM-59DSMJRD" />
      <Hotjar />
      <link rel="icon" href="/images/favicon.svg" sizes="any" />
      <meta name="theme-color" content="#F30637" />
      <meta
        name="google-site-verification"
        content="2X5twZ6QCtD_qFLdghfbFGdK8oG3N_UP5UwE-VklTlw"
      />
      <body className={cn('bg-dark text-light font-spartan relative overflow')}>
        <AnimatedCursor />
        <PageTransition />
        <SmoothScrollbar />
        <SpeedInsights />
        <Toaster />
        <Nav nav={nav} lang={lang} />

        <div id="scrollbar" className="h-screen max-w-screen w-full">
          <div className="lg:max-w-[1620px] w-screen lg:mx-auto relative lg:pr-0">
            {children}
            <Contact contact={contact} lang={lang} />
          </div>
          <Footer lang={lang} />
        </div>
      </body>
    </html>
  );
}
