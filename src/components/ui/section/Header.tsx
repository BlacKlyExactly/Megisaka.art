'use client';

import { useRef, useLayoutEffect, useEffect, useState } from 'react';
import SplitType from 'split-type';
import gsap, { Circ } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import Scrollbar from 'smooth-scrollbar';

import HeroSlider from '../../HeroSlider';
import Button from '../Button';
import Sprinkles from '../decorations/Sprinkles';
import Headline from '../typography/Headline';
import Text from '../typography/Text';
import { Home } from '@/lib/sanity/requests';
import { Language } from '@/utils/langPageProps';
import { getTranslatedText } from '@/utils/getTranslatedText';

gsap.registerPlugin(ScrollToPlugin);

const Header = ({ header, lang, sliderImages }: HeaderProps) => {
  const [scrollbar, setScrollbar] = useState<Scrollbar>();

  const headerContentRef = useRef<HTMLDivElement>(null);
  const sprinklesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.innerWidth < 1024) return;

    setScrollbar(
      Scrollbar.init(document.querySelector('#scrollbar')!, { damping: 0.05 }),
    );
  }, []);

  useLayoutEffect(() => {
    const handleResize = () => {
      if (!headerContentRef.current || !sprinklesRef.current) return;

      if (window.innerWidth >= 1024) {
        const { chars } = new SplitType('.split');

        const tl = gsap.timeline();

        tl.set(headerContentRef.current, { visibility: 'visible' })
          .set(sprinklesRef.current, { visibility: 'visible' })
          .set(chars, { visibility: 'visible' })
          .to(chars, { y: 0, stagger: 0.1, ease: Circ.easeOut })
          .from(sprinklesRef.current, { y: -5, opacity: 0 })
          .to(
            headerContentRef.current.children[0].children[0],
            {
              delay: 0.3,
              y: 0,
              stagger: 0.2,
              ease: Circ.easeOut,
            },
            0,
          )
          .to(
            headerContentRef.current.children[1].children[0],
            {
              delay: 0.3,

              y: 0,
              stagger: 0.2,
              ease: Circ.easeOut,
            },
            0,
          )
          .from(
            headerContentRef.current.children[2],
            { opacity: 0, delay: 0.3 },
            0,
          );
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const scrollToLatest = () =>
    scrollbar
      ? scrollbar.scrollIntoView(document.querySelector('#commissions')!, {
          offsetTop: 200,
        })
      : gsap.to(window, { scrollTo: { offsetY: 110, y: '#commissions' } });

  const { title, description, button } = header;

  return (
    <header className="mt-24 flex justify-center flex-col lg:flex-row lg:h-screen lg:items-center lg:px-page lg:gap-24 lg:justify-between lg:mt-16 relative">
      <p className="text-[128px] font-semibold opacity-[0.025] -top-6 absolute left-16 z-[-1] lg:hidden">
        ART IST
      </p>
      <p className="split hidden text-[403px] tracking-tighter font-semibold opacity-[0.025] -bottom-8 absolute left-0 z-[-1] lg:block w-full whitespace-nowrap clip-path invisible [&_.char]:translate-y-full">
        ARTIST
      </p>
      <div ref={sprinklesRef} className="absolute bottom-0 left-0 lg:invisible">
        <Sprinkles className="absolute -bottom-0 -left-32 hidden lg:block" />
      </div>
      <div
        className="px-page-mobile text-center lg:text-left lg:px-0 lg:w-[44%] lg:invisible"
        ref={headerContentRef}
      >
        <div className="clip-path-full">
          <Headline className="lg:translate-y-full text-center lg:text-left">
            {title}
          </Headline>
        </div>
        <div className="clip-path-full">
          <Text
            size="heading"
            className="mt-4 !font-light lg:w-[82%] lg:mt-8 lg:-translate-y-full text-center lg:text-left"
          >
            {getTranslatedText(description, lang)}
          </Text>
        </div>
        <Button className="mt-8 lg:mt-11" onClick={scrollToLatest}>
          {getTranslatedText(button, lang)}
        </Button>
      </div>
      <HeroSlider className="mt-11 lg:mt-0" slides={sliderImages} />
    </header>
  );
};

type HeaderProps = {
  header: Home['header'];
  lang?: Language;
  sliderImages: { alt: string; url: string; lqip: string }[];
};

export default Header;
