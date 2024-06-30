'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import gsap from 'gsap';

import useScrollShow from '@/hooks/useScrollShow';

const Gallery = ({ gallery }: GalleryProps) => {
  const galleryRef = useRef<HTMLDivElement>(null);
  const showed = useScrollShow(galleryRef);

  useEffect(() => {
    if (!showed || !galleryRef.current || window.innerWidth < 1024) return;

    const tl = gsap.timeline();

    tl.set(galleryRef.current, { visibility: 'visible' }).from(
      galleryRef.current.children,
      {
        opacity: 0,
        y: -30,
        stagger: 0.15,
        delay: 0.7,
      },
    );
  }, [showed]);

  return (
    <div
      className="space-y-4 lg:grid lg:grid-cols-3 lg:gap-3 lg:space-y-0 lg:invisible"
      ref={galleryRef}
    >
      {gallery.map(({ alt, src, width, height, lqip }) => (
        <Image
          key={alt}
          alt={alt}
          src={src}
          width={width}
          height={height}
          loading="lazy"
          className="w-full"
          placeholder="blur"
          blurDataURL={lqip}
        />
      ))}
    </div>
  );
};

type GalleryProps = {
  gallery: {
    alt: string;
    width: number;
    height: number;
    src: string;
    lqip: string;
  }[];
};

export default Gallery;
