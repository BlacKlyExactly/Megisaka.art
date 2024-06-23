'use client';

import Image from 'next/image';
import gsap from 'gsap';

import Headline from '../ui/typography/Headline';
import { cn } from '@/utils/cn';
import { useRef } from 'react';

const DURATION = 0.3;

const Work = ({ image, title, type, className }: WorkProps) => {
  const infoRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const handleMouseEnter = () => {
    if (!infoRef.current || !imageRef.current) return;

    const panel = infoRef.current;
    const panelChildren = panel.children;
    const panelTitle = panelChildren[0].children[0];
    const panelType = panelChildren[1].children[0];

    gsap.to(panel, { opacity: 1, duration: DURATION });
    gsap.to(panelTitle, { y: 0, duration: DURATION });
    gsap.to(panelType, { y: 0, duration: DURATION });
    gsap.to(imageRef.current, { scale: 1.1, duration: DURATION });
  };

  const handleMouseLeave = () => {
    if (!infoRef.current) return;

    const panel = infoRef.current;
    const panelChildren = panel.children;
    const panelTitle = panelChildren[0].children[0];
    const panelType = panelChildren[1].children[0];

    gsap.to(panel, { opacity: 0, duration: DURATION });
    gsap.to(panelTitle, { y: '100%', duration: DURATION });
    gsap.to(panelType, { y: '-100%', duration: DURATION });
    gsap.to(imageRef.current, { scale: 1, duration: DURATION });
  };

  return (
    <article
      className={cn('aspect-square w-full relative overflow-hidden', className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="hidden w-full h-full bg-crimson bg-opacity-75 relative z-[1] p-6 flex-col justify-end gap-2 opacity-0 lg:flex"
        ref={infoRef}
      >
        <div className="clip-path-full pointer-events-none">
          <Headline
            heading="h3"
            className="!text-light pointer-events-none translate-y-full"
          >
            {title}
          </Headline>
        </div>
        <div className="clip-path-full pointer-events-none">
          <p className=" text-xl font-bold pointer-events-none -translate-y-full">
            {type}
          </p>
        </div>
      </div>
      <Image
        ref={imageRef}
        src={image}
        alt=""
        className="border-b-4 border-crimson lg:border-none w-full h-full absolute top-0 left-0"
        width={400}
        height={400}
      />
    </article>
  );
};

export type WorkProps = {
  image: string;
  title: string;
  type: string;
  className?: string;
};

export default Work;
