'use client';

import { useLayoutEffect, useRef } from 'react';
import { Check, X } from 'lucide-react';
import gsap, { Circ } from 'gsap';

import CommisionsForm from '../../forms/CommisionsForm';
import Headline from '../typography/Headline';
import Section from './Section';
import useScrollShow from '@/hooks/useScrollShow';
import { CommisionsSection } from '@/lib/sanity/requests';
import { Language } from '@/utils/langPageProps';
import { getTranslatedText } from '@/utils/getTranslatedText';
import { cn } from '@/utils/cn';

const Commisions = ({
  open,
  commissionSection,
  lang,
  isSection,
  headline,
  className,
}: CommisionsProps) => {
  const commisionsRef = useRef<HTMLDivElement>(null);

  const showed = useScrollShow(commisionsRef);

  useLayoutEffect(() => {
    if (!showed || !commisionsRef.current || window.innerWidth < 1024) return;

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

  const { title, stateTexts, form } = commissionSection;

  const openText = getTranslatedText(stateTexts.open, lang);
  const closeText = getTranslatedText(stateTexts.close, lang);

  isSection ??= true;
  headline ??= 'h2';

  const Component = isSection ? Section : 'div';

  return (
    <Component
      id="commissions"
      className={cn(
        'px-page-mobile lg:px-page flex flex-col gap-2 lg:gap-4',
        { 'lg:pb-44': !open },
        className,
      )}
      ref={commisionsRef}
    >
      {/* <Image src="/images/banner.png" alt="" width={675} height={74} /> */}
      <div className="clip-path-full">
        <Headline heading={headline} className="lg:translate-y-full text-left">
          {getTranslatedText(title, lang)}
        </Headline>
      </div>
      <div className="clip-path-full">
        <div
          className={cn(
            'text-crimson font-bold font-spartan lg:-translate-y-full lg:text-lg',
            {
              'text-green-400': open,
            },
          )}
        >
          {open ? (
            <div className="flex gap-2 items-center">
              <p className="mt-[4px]">{openText}</p> <Check size={24} />
            </div>
          ) : (
            <div className="flex gap-2 items-center">
              <p className="mt-2">{closeText}</p>
              <X size={24} />
            </div>
          )}
        </div>
      </div>

      {open && <CommisionsForm lang={lang} form={form} />}
    </Component>
  );
};

type CommisionsProps = {
  open: boolean;
  commissionSection: CommisionsSection;
  lang?: Language;
  isSection?: boolean;
  headline?: 'h2' | 'h1';
  className?: string;
};

export default Commisions;
