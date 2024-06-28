import '../globals.css';
import type { Metadata } from 'next';
import { Toaster } from 'react-hot-toast';

import Nav from '@/components/nav/Nav';
import Footer from '@/components/ui/section/Footer';
import AnimatedCursor from '@/components/AnimatedCursor';
import PageTransition from '@/components/page-transition/PageTransition';
import SmoothScrollbar from '@/components/SmoothScrollbar';
import ContactForm from '@/components/forms/ContactForm';
import SectionContent from '@/components/ui/section/SectionContent';
import { cn } from '@/utils/cn';
import { LanguagePageProps } from '@/utils/langPageProps';
import { fetchContact, fetchNav } from '@/lib/sanity/requests';
import { getTranslatedText } from '@/utils/getTranslatedText';

export const metadata: Metadata = {
  title: 'Megisaka Art | VTuber Design & Digital Art by Megisaka',
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
      <link rel="icon" href="/images/favicon.svg" sizes="any" />
      <meta name="theme-color" content="#F30637" />
      <body className={cn('bg-dark text-light font-spartan relative overflow')}>
        <AnimatedCursor />
        <PageTransition />
        <SmoothScrollbar />
        <Toaster />
        <Nav nav={nav} lang={lang} />

        <div id="scrollbar" className="h-screen max-w-screen w-full">
          <div className="lg:max-w-[1620px] w-screen lg:mx-auto relative lg:pr-0">
            {children}
            <section className="flex flex-col gap-6 lg:gap-0">
              <SectionContent title={getTranslatedText(contact.title, lang)}>
                {getTranslatedText(contact.description, lang)}
              </SectionContent>
              <div className="px-page-mobile lg:px-page">
                <ContactForm form={contact.form} lang={lang} />
              </div>
            </section>
          </div>
          <Footer lang={lang} />
        </div>
      </body>
    </html>
  );
}
