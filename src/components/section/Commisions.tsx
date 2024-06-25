'use client';

import { useLayoutEffect, useRef } from 'react';
import { Check, X } from 'lucide-react';
import gsap, { Circ } from 'gsap';

import CommisionsForm from '../commisions/CommisionsForm';
import Headline from '../ui/typography/Headline';
import { cn } from '@/utils/cn';
import useScrollShow from '@/hooks/useScrollShow';

const Commisions = ({ open }: CommisionsProps) => {
  const commisionsRef = useRef<HTMLElement>(null);

  const showed = useScrollShow(commisionsRef);

  useLayoutEffect(() => {
    if (!showed || !commisionsRef.current) return;

    const [
      {
        children: [title],
      },
      {
        children: [status],
      },
    ] = commisionsRef.current.children;

    gsap.to([title, status], { y: 0, ease: Circ.easeOut });
  }, [showed]);

  return (
    <section
      id="commisionsStatus"
      className={cn(
        'px-page-mobile lg:px-page flex items-center flex-col gap-2 lg:gap-4 lg:pb-24 pb-24 lg:items-start',
        { 'lg:pb-44': !open },
      )}
      ref={commisionsRef}
    >
      {/* <Image src="/images/banner.png" alt="" width={675} height={74} /> */}
      <div className="clip-path-full">
        <Headline heading="h2" className="lg:translate-y-full">
          Commisions
        </Headline>
      </div>
      <div className="clip-path-full">
        <div
          className={cn(
            'text-crimson font-bold font-spartan lg:-translate-y-full',
            {
              'text-green-400': open,
            },
          )}
        >
          {open ? (
            <div className="flex gap-2 items-center">
              <p>OPEN</p> <Check size={32} />
            </div>
          ) : (
            <div className="flex gap-2 items-center">
              <p className="mt-2">CLOSED</p>
              <X size={32} />
            </div>
          )}
        </div>
      </div>

      {open && <CommisionsForm />}
    </section>
  );
};

type CommisionsProps = {
  open: boolean;
};

export default Commisions;
