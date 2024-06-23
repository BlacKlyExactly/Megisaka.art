'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import Image from 'next/image';
import gsap, { Expo, Circ } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollToPlugin);

import { cn } from '@/utils/cn';
import useDetectSwipeDirection, {
  Directions,
} from '@/hooks/useDetectSwipeDirection';
import Sprinkles from './ui/decorations/Sprinkles';

const slides = ['/image2.png', '/image3.png', '/image1.png'];

const HeroSlider = ({ className }: { className?: string }) => {
  const [slide, setSlide] = useState(0);

  const slidesRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const direction = useDetectSwipeDirection(slidesRef);

  useEffect(() => {
    if (!slidesRef.current) return;

    const sliderElements = slidesRef.current.children;

    gsap.to(slidesRef.current, {
      scrollTo: {
        x: sliderElements[slide],
        offsetX: window.innerWidth >= 1024 ? 0 : 17,
      },
      duration: 0.8,
      ease: Expo.easeOut,
    });
  }, [slide]);

  useEffect(() => {
    if (direction === Directions.None) return;
    direction === Directions.Left ? nextSlide() : prevSlide();
  }, [direction]);

  useEffect(() => {
    setInterval(() => {
      if (window.innerWidth <= 1024) return;
      nextSlide();
    }, 5000);

    window.addEventListener('resize', () => {
      setTimeout(() => {
        if (!slidesRef.current) return;
        const sliderElements = slidesRef.current.children;

        gsap.set(slidesRef.current, {
          scrollTo: {
            x: sliderElements[slide],
            offsetX: window.innerWidth >= 1024 ? 0 : 17,
          },
        });
      }, 1000);
    });
  }, []);

  useLayoutEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && containerRef.current) {
        const tl = gsap.timeline({ delay: 0.8 });

        tl.set(containerRef.current, { visibility: 'visible' }).from(
          containerRef.current.children,
          { y: 10, opacity: 0, stagger: 0.2, ease: Expo.easeOut },
        );
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const nextSlide = () =>
    setSlide((prev) => (prev + 1 > slides.length - 1 ? 0 : prev + 1));

  const prevSlide = () =>
    setSlide((prev) => (prev - 1 < 0 ? slides.length - 1 : prev - 1));

  return (
    <div
      className={cn('w-full lg:w-[612px] relative lg:invisible', className)}
      ref={containerRef}
    >
      <Sprinkles className="absolute -scale-50 -top-60 right-10 lg:-top-20 lg:-left-24 lg:right-auto z-[-1] lg:scale-100" />
      <div className="w-full ">
        <div
          ref={slidesRef}
          className="flex shrink-0 overflow-hidden gap-2 px-page-mobile slider lg:px-0 lg:overflow-hidden"
        >
          {slides.map((image) => (
            <Image
              src={image}
              alt=""
              key={image}
              width={612}
              height={556}
              priority
              className="border-b-4 border-crimson pointer-events-none w-full lg:border-0"
            />
          ))}
        </div>
      </div>
      <div className="flex gap-3 w-full justify-center mt-5 lg:justify-start lg:gap-6">
        {[...Array(slides.length)].map((_, idx) => (
          <button
            onClick={() => setSlide(idx)}
            key={idx}
            className={cn('h-[4px] w-7 bg-light', {
              'bg-crimson': slide === idx,
            })}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;
