'use client';

import { PropsWithChildren, useLayoutEffect, useRef } from 'react';
import gsap, { Circ } from 'gsap';

import Headline from '../typography/Headline';
import Text from '../typography/Text';
import useScrollShow from '@/hooks/useScrollShow';

const SectionContent = ({ children, title }: SectionContentProps) => {
  const sectionContentRef = useRef<HTMLDivElement>(null);
  const showed = useScrollShow(sectionContentRef);

  useLayoutEffect(() => {
    if (!sectionContentRef.current || !showed) return;

    const [
      {
        children: [tiltleEl],
      },
      {
        children: [textEl],
      },
    ] = sectionContentRef.current.children;

    gsap.to([tiltleEl, textEl], { y: 0, ease: Circ.easeOut, delay: 0.2 });
  }, [showed]);

  return (
    <div className="px-page-mobile lg:px-page" ref={sectionContentRef}>
      <div className="clip-path-full">
        <Headline heading="h2" className="lg:translate-y-full">
          {title}
        </Headline>
      </div>
      <div className="clip-path-full">
        <Text
          size="main"
          className="mt-4 lg:w-[45%] lg:mt-8 lg:-translate-y-full"
        >
          {children}
        </Text>
      </div>
    </div>
  );
};

type SectionContentProps = PropsWithChildren<{
  title: string;
}>;

export default SectionContent;
