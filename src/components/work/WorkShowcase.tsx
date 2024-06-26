'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap, { Expo } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

import Work, { WorkProps } from './Work';
import Headline from '../ui/typography/Headline';
import Button from '../ui/Button';
import { cn } from '@/utils/cn';
import useDetectSwipeDirection, {
  Directions,
} from '@/hooks/useDetectSwipeDirection';
import useScrollShow from '@/hooks/useScrollShow';

gsap.registerPlugin(ScrollToPlugin);

const WorkShowcase = ({ className, works }: WorkShowcaseProps) => {
  const [slide, setSlide] = useState(0);

  const slidesRef = useRef<HTMLDivElement>(null);

  const showed = useScrollShow(slidesRef);
  const direction = useDetectSwipeDirection(slidesRef);

  useEffect(() => {
    if (!slidesRef.current) return;

    const sliderElements = slidesRef.current.children;

    gsap.to(slidesRef.current, {
      scrollTo: {
        x: sliderElements[slide],
        offsetX: window.innerWidth >= 1024 ? 0 : 24,
      },
      duration: 0.8,
      ease: Expo.easeOut,
    });
  }, [slide]);

  useEffect(() => {
    if (direction === Directions.None) return;
    direction === Directions.Left ? nextSlide() : prevSlide();
  }, [direction]);

  useLayoutEffect(() => {
    if (!showed || !slidesRef.current || window.innerWidth < 1024) return;

    const tl = gsap.timeline({ delay: 0.2 });

    tl.set(slidesRef.current.children, { visibility: 'visible' }).from(
      slidesRef.current.children,
      { opacity: 0, y: -30, stagger: 0.15, delay: 0.2 },
    );
  }, [showed]);

  const nextSlide = () =>
    setSlide((prev) => (prev + 1 > works.length - 1 ? 0 : prev + 1));

  const prevSlide = () =>
    setSlide((prev) => (prev - 1 < 0 ? works.length - 1 : prev - 1));

  const currentWork = works[slide];

  return (
    <div className={cn('w-full lg:px-page', className)}>
      <div
        className="flex overflow-hidden gap-2 px-page-mobile slider lg:px-0 lg:grid lg:grid-cols-3"
        ref={slidesRef}
      >
        {works.map((work) => (
          <Work
            {...work}
            key={work.title}
            className="w-[calc(100vw-50px)] shrink-0 lg:w-full lg:invisible"
          />
        ))}
      </div>
      <div className="flex w-full justify-between px-page-mobile mt-6 items-center lg:hidden">
        <div className="space-y-1">
          <Headline heading="h3">{currentWork.title}</Headline>
          <p className="text-left">{currentWork.type}</p>
        </div>
        <Button className="px-4 py-4 h-fit">View</Button>
      </div>
    </div>
  );
};

type WorkShowcaseProps = {
  className?: string;
  works: Omit<WorkProps[], 'className'>;
};

export default WorkShowcase;
