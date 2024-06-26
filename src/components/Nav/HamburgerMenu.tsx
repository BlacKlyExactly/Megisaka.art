'use client';

import { useLayoutEffect, useRef } from 'react';
import gsap, { Circ } from 'gsap';

import TransitionLink from '../page-transition/TransitionLink';
import Bars from '../ui/icons/Bars';
import Text from '../ui/typography/Text';
import { Nav } from '@/sanity/requests';
import { getTranslatedText } from '@/utils/getTranslatedText';
import { Language } from '@/utils/langPageProps';
import { selects } from './Nav';

const HamburgerMenu = ({ nav, lang }: HamburgerMenuProps) => {
  const menu = useRef<HTMLDivElement>(null);
  const cover = useRef<HTMLDivElement>(null);

  const tl = useRef(gsap.timeline({ paused: true }));

  useLayoutEffect(() => {
    if (!menu.current) return;

    const [selects] = menu.current.children;

    tl.current
      .from(
        cover.current,
        { opacity: 0, pointerEvents: 'none', duration: 0.2 },
        0,
      )
      .from(menu.current, { x: '100%', duration: 0.2, ease: Circ.easeOut })
      .from(selects.children, {
        x: 5,
        opacity: 0,
        stagger: 0.05,
        ease: Circ.easeOut,
      });
  }, []);

  const toggle = () =>
    tl.current.paused()
      ? tl.current.play()
      : tl.current.reversed(!tl.current.reversed());

  return (
    <>
      <button className="relative z-[1000]" onClick={toggle}>
        <Bars />
      </button>
      <div
        className="fixed top-0 left-0 w-screen h-screen bg-dark z-[100] opacity-50"
        ref={cover}
      ></div>

      <div
        className="w-[55vw] h-screen fixed bottom-0 z-[101] bg-dark right-0 lg:hidden overflow-y-hidden touch-none"
        ref={menu}
      >
        <ul className="flex gap-6 flex-col items-end justify-center lg:gap-12 h-full pr-9">
          {selects.map(({ id, href }) => (
            <li key={id} className="hover:text-crimson transition-colors">
              <TransitionLink href={href} onClick={toggle}>
                <p className="text-base">{getTranslatedText(nav[id], lang)}</p>
              </TransitionLink>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

type HamburgerMenuProps = {
  nav: Nav;
  lang?: Language;
};

export default HamburgerMenu;
