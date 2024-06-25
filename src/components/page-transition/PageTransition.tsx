'use client';

import { useLayoutEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import gsap, { Circ } from 'gsap';

const STRIPE_COUNT = 5;

const PageTransition = () => {
  const transitionRef = useRef<HTMLDivElement>(null);

  const pathname = usePathname();

  useLayoutEffect(() => {
    if (!transitionRef.current) return;

    const tl = gsap.timeline();

    tl.to(transitionRef.current.children, {
      y: '-100%',
      stagger: 0.05,
      delay: 0.1,
      ease: Circ.easeOut,
    }).set(transitionRef.current.children, { y: '100%' });
  }, [pathname]);

  return (
    <div
      id="transition"
      className="fixed top-0 left-0 w-screen h-screen z-[10000] flex pointer-events-none"
      ref={transitionRef}
    >
      {[...new Array(STRIPE_COUNT)].map((_, idx) => (
        <div
          key={idx}
          className="h-screen bg-crimson"
          style={{
            width: `${100 / STRIPE_COUNT}%`,
          }}
        />
      ))}
    </div>
  );
};

export default PageTransition;
