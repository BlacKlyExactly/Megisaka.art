import '../globals.css';
import type { Metadata } from 'next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/react';
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
  title: 'Megisaka | VTuber Design & Digital Art',
  description:
    'Welcome to my world! Explore VTuber design, digital art, and custom commissions by Megisaka. Discover a creative journey like no other!',
  keywords: `Megisaka, VTuber design, digital art, artist website, custom VTubers, digital artist, VTuber creator, Megisaka Art, unique digital art, art gallerist, digital art, digital art digital art, digital art art, art and digital, digital artistry, art idea, concept art, character design, fan art, designs with character, concept artwork, fanart art, artwork home, art with type, art what is art, artist's work, type of artwork, art design, artwork design, vtuber model, digital painter, art art design, design art design, art to design, art a design, art pictures, graphic art, open artwork, images of artwork, forms of art, digital drawing, sketch art, artist painting, art images, art & design courses, artistic images, arty images, commission art, concept artist, design drawing, artist names, naming art, digital illustration, character art, character artwork, design art, art and design, design artwork, customize art, character concept art, animated artwork, digital art how to, art decorate, artwork animated, art & decor, painting images, artist drawing, decorator art, computerized art, artist type, newest art, types of drawing, artist animated, illustration design, character artist, design images, art types, artist character, artwork name, artist characteristics, designed images, vtuber design, cool artistic designs, images art, home decorate art, vtuber commissions, art digital, painting photo, all art, all for art, digital sketching, all artwork, artistic concept, art illustrators, digital art and design, artist artwork, artist art, design digital art, digital artwork design, art and digital design, art & design logo, me artwork, myself art, art and concept, constructed art, conceptual artwork, type artwork, digital art portfolio, concept artists, art description, portfolio digital art, vtuber fanart, decorate art, artwork description, artwork and the artist, art viewing, artist modeling, designer art, vtuber artist, eiffel tower art, name design art, eiffel tower artwork, all about art, digital art type, designers art, artwork about home, screen artwork, portfolio concept art, digital renders, concept designer portfolio, computer generated art, vtuber art, digital art images, character design art, adv art, design description, art & design, art edit, images for artists, images of an artist, design edits, digital art commissions, art by design, art and artist, designs for artwork, art for design, design by art, digitized art, modify art, concept paintings, art by myself, work paintings, the art of designing, artworks and artist, all type art, design artist, streaming art, art of designing, designing artist, concept illustrators, you are art, submitting art, advanced art, computer painting, art customer service, digital art work, character design artist, designers and artists, art of concept, concept of artwork, digital art basic, vtuber concept, art for artist, paintings view, artist conception, character concept artist, art vtuber, art design images, art and design images, design in art, artwork design images, design in artwork, digital art character, character digital art, artist description, art customize, description for artist, name sculptures, artwork rights, art to art, edit design, vtuber concept art, digital art name, tower art, editable art, arts design for portfolio, edit artwork, art from the art, art is art, art and art, art & art, tap in art, a designers art, artist to artist, digital artist portfolio, digital art screen, character commissions, art the artist, artistic artists, character of an artist, digital artist near me, digital art near me, artist vtuber, designing a vtuber, design is art, design commissions, art is design, concept art designs, concept art digital, getting better at digital art, the art edit, concept art and design, design something, artwork in home, art of myself, get artwork, something art, art of the art, art about art, others art, name sketches, art of art, other artist, work sketches, the art of art, design in design, get drawings, paintings description, send artwork, sending art, art recent, vtuber artist commissions, vtuber art commissions, limited prints art, design and artwork, design and art, digital artist description, art is all, tower concept art, art email, digital fanart, character concept sketches, art in art, artist email, animated digital art, art from artist, latest art, artist about me, artistic views, artist with art, artworks made, digital art artist, art and design portfolio, home art design, art design portfolio, the art design, design vtuber, design with art, fanart vtuber, art digital design, digital character art, artist of digital art, art design home, artist tos, character concept art portfolio, digital art streaming, digital sketches for beginners, art fanart, digital design images, art design for home, design sculptures, design art home, trying art, kunst arts, kunstler art, digital artist commissions, digital art designer, concept art commissions, digital art designers, digital design artist, redesign art, digital illustration artist, getting art commissions, art design near me, digital illustration portfolio, basic art design, artista art, art about myself, digital art portfolio for students, character design vtuber, artwork designers near me, art digital art, name for digital art, art in design, design art work, the digital artist, a digital art, digital art is, concept digital art, digital art assets, digital artist name, art for designers, character design digital art, digital painting prints, type as art, art away, eiffel tower artist, that's design, art overview, concept design artist, description for artwork, paintings made, concept illustrator, character concept artist portfolio, model commissions, away art, artist of artwork, artsy type, art blurb, artist me, concept sculpture, edit and design, by artist for artist, art on screen, digital art and design courses, digital sketching courses, click for art, digital painter artist, art design art, design on art, art design art design, a art design, digital art as design, latest art design, art with design, digital art by, art design by, design for art work, the digital art, the design art, artist by design, digital art in, about digital art, digital artist artwork, digital in art, a digital artist, art design digital, digital art what is it, digitalization of art, apa itu artwork design, description of digital art, digital artwork and artist, at art digital, for digital art, home digital art, art of digital, advanced digital art, digital art description, digital art edit, all about digital art, fanart digital, numeric art, digital artist work, computer arts projects, digital art hd images, images for digital art, digital art images hd, character digital, digital art home, digital concept artist, about art and design, artistique design, computer based art, biff art, digital illustration images, design art name, concept art for, concept art of, artist of eiffel tower, art design concept, art design work, home design art, art and design work, lf art, art i design, model art design, art from art, eiffel artist, design as an art, concept art by, aet design, art by concept, all is art, portfolio design art, categories of art and design, digital art rights, art send, apa itu concept art, artist name design, the art interior, art design a, me as an art, picher art, fanart artist, character concept designer, acquire art, the art designer, mockup arte, art with art, concept about art, design and art home, email artist, art e art, the concept art, art as a concept, the character design, arr design, artist and the art, digital illustration basics, trying to be an artist, character designer artist, the art of the art, aart design, be art design, concept artist description, character in design, art is me, screen for digital art, click designer, characteristics of an artwork, fanart in portfolio, oe art, art of an artist, me and art, art & me, artwork and description, the art art, the design of art, digiart design, description artist, something about art, aq art, concept art designer, art with artist, art click, all of art, artist description of artwork, the art the art, description for an artist, latest artworks, artist and artist, all the art, portfolio for concept artist, made for art, me as an artist, artista wallpaper, art is for art, all that art, artist on art, character in art, something to design, other paintings, something design, artist for artists, portfolio for character designers, artworks name, design and digital, art as art, opener art, designer artist name, name illustrations, gallery concept, arte poster, design the design, apa itu design graphic, ary design, art to art opening hours, latest sculpture, art to art locations, all illustrations`,
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
      <head>
        <link rel="icon" href="/images/favicon.svg" sizes="any" />
        <meta name="theme-color" content="#F30637" />
        <meta
          name="google-site-verification"
          content="2X5twZ6QCtD_qFLdghfbFGdK8oG3N_UP5UwE-VklTlw"
        />
      </head>
      <body className={cn('bg-dark text-light font-spartan relative overflow')}>
        <GoogleAnalytics gaId="GTM-59DSMJRD" />
        <Hotjar />
        <AnimatedCursor />
        <PageTransition />
        <SmoothScrollbar />
        <SpeedInsights />
        <Analytics />
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
