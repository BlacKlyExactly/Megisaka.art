'use client';

import { useLayoutEffect, useRef } from 'react';
import gsap, { Circ } from 'gsap';
import SplitType from 'split-type';

import HeroSlider from '@/components/HeroSlider';
import Button from '@/components/ui/Button';
import Sprinkles from '@/components/ui/decorations/Sprinkles';
import Headline from '@/components/ui/typography/Headline';
import Text from '@/components/ui/typography/Text';
import Work from '@/components/work/Work';
import WorkShowcase from '@/components/work/WorkShowcase';

const Home = () => {
  const headerContentRef = useRef<HTMLDivElement>(null);
  const sprinklesRef = useRef<HTMLDivElement>(null);

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
              y: 0,
              stagger: 0.2,
              ease: Circ.easeOut,
            },
            0,
          )
          .to(
            headerContentRef.current.children[1].children[0],
            {
              y: 0,
              stagger: 0.2,
              ease: Circ.easeOut,
            },
            0,
          )
          .from(headerContentRef.current.children[2], { opacity: 0 }, 0);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <header className="mt-4 flex justify-center flex-col lg:flex-row lg:h-screen lg:items-center lg:px-page lg:gap-24 lg:justify-between lg:mt-16 overflow-hidden relative">
        <p className="text-[128px] font-semibold opacity-[0.025] -top-6 absolute left-16 z-[-1] lg:hidden">
          ART IST
        </p>
        <p className="split hidden text-[403px] tracking-tighter font-semibold opacity-[0.025] -bottom-8 absolute left-0 z-[-1] lg:block w-full whitespace-nowrap clip-path invisible">
          ARTIST
        </p>
        <div
          ref={sprinklesRef}
          className="absolute bottom-0 left-0 lg:invisible"
        >
          <Sprinkles className="absolute -bottom-0 -left-32 hidden lg:block" />
        </div>
        <div
          className="px-page-mobile text-center lg:text-left lg:px-0 lg:w-[44%] lg:invisible"
          ref={headerContentRef}
        >
          <div className="clip-path-full">
            <Headline className="lg:translate-y-full">Megisaka</Headline>
          </div>
          <div className="clip-path-full">
            <Text
              size="heading"
              className="mt-4 !font-light lg:w-[75%] lg:mt-8 lg:-translate-y-full"
            >
              Click/Tap to edit me. That Biff, what a character. Always trying
              to get away with something. Click/Tap to edit me. That Biff, what
              a character.
            </Text>
          </div>
          <Button className="mt-8 lg:mt-11">NEXT</Button>
        </div>
        <HeroSlider className="mt-11 lg:mt-0" />
      </header>
      <main className="mt-24 text-center lg:mt-16 lg:text-left">
        <div className="px-page-mobile lg:px-page">
          <Headline heading="h2">Latest work</Headline>
          <Text size="main" className="mt-4 lg:w-[45%] lg:mt-8">
            Click/Tap to edit me. That Biff, what a character. Always trying to
            get away with something. Click/Tap to edit me. That Biff, what a
            character. Always trying to get away with something.
          </Text>
        </div>
        <WorkShowcase
          className="mt-10"
          works={[
            { title: 'Megura', type: 'VTuber', image: '/image1.png' },
            { title: 'Megura1', type: 'VTuber', image: '/image2.png' },
            { title: 'Megura2', type: 'VTuber', image: '/image3.png' },
          ]}
        />
      </main>
    </>
  );
};

export default Home;
