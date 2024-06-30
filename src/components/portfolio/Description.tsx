'use client';

import { PropsWithChildren, useEffect, useRef } from 'react';
import gsap, { Circ } from 'gsap';
import SplitType from 'split-type';

import Text from '../ui/typography/Text';
import useScrollShow from '@/hooks/useScrollShow';

const Description = ({ children }: PropsWithChildren<{}>) => {
  const textRef = useRef<HTMLElement>(null);
  const showed = useScrollShow(textRef);

  useEffect(() => {
    if (!textRef.current || !showed || window.innerWidth < 1024) return;
    const { words } = new SplitType(textRef.current);
    gsap.to(words, { y: 0, delay: 0.5, stagger: 0.04, duration: 0.3 });
  }, [showed]);

  return (
    <Text
      size="main"
      className="lg:w-1/2 mt-4 lg:mt-3 lg:[&_.word]:translate-y-full"
      ref={textRef}
    >
      {children}
    </Text>
  );
};

export default Description;
