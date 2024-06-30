'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

import Headline from '../ui/typography/Headline';
import Text from '../ui/typography/Text';
import useScrollShow from '@/hooks/useScrollShow';

const PortfolioData = ({ title, value }: PortfolioDataProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const showed = useScrollShow(containerRef);

  useEffect(() => {
    if (!showed || !containerRef.current || window.innerWidth < 1024) return;

    const [
      {
        children: [headline],
      },
      {
        children: [value],
      },
    ] = containerRef.current.children;

    gsap.to([headline, value], {
      y: 0,
      duration: 0.4,
      delay: 0.6,
    });
  }, [showed]);

  return (
    <div
      className="w-full border-l-4 border-crimson pl-4 lg:pl-6 space-y-2"
      ref={containerRef}
    >
      <div className="clip-path-full">
        <Headline heading="h3" as="h2" className="lg:translate-y-full">
          {title}
        </Headline>
      </div>
      <div className="clip-path-full">
        <Text size="heading" className="lg:-translate-y-full">
          {value}
        </Text>
      </div>
    </div>
  );
};

type PortfolioDataProps = {
  title: string;
  value: string;
};

export default PortfolioData;
