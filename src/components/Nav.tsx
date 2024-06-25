'use client';

import { useLayoutEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import gsap, { Circ } from 'gsap';

import Bars from './ui/icons/Bars';
import Language from './ui/icons/Language';
import Text from './ui/typography/Text';
import TransitionLink from './page-transition/TransitionLink';
import { cn } from '@/utils/cn';

const selects = [
  { display: 'Home', href: '/' },
  { display: 'Portfolio', href: '/portfolio' },
  { display: 'Commisions', href: '#' },
  { display: 'About', href: '#' },
  { display: 'Contact', href: '#' },
  { display: 'TOS', href: '#' },
];

const Nav = () => {
  const pathname = usePathname();

  const navRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const handleResize = () => {
      if (!navRef.current) return;

      if (window.innerWidth >= 1024) {
        const tl = gsap.timeline({ delay: 0.6 });

        tl.set(navRef.current, { visibility: 'visible' })
          .set(navRef.current.children[0], { opacity: 0, y: -10 })
          .set(navRef.current.children[1].children, { opacity: 0, y: -10 })
          .from(navRef.current, {
            width: 0,
            opacity: 0,
            duration: 0.4,
            delay: 0.2,
            ease: Circ.easeInOut,
          })
          .to(navRef.current.children[0], {
            opacity: 1,
            delay: 0.1,
            y: 0,
            ease: Circ.easeOut,
          })
          .to(navRef.current.children[1].children, {
            opacity: 1,
            stagger: 0.05,
            y: 0,
            ease: Circ.easeOut,
          });
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <nav
      className="px-page-mobile py-6 flex justify-between w-full lg:w-[calc(min(100%,1620px)-178px)] lg:left-1/2 lg:-translate-x-1/2 lg:fixed lg:top-12 lg:px-9 lg:py-6 lg:border-[#1C1C1C] lg:border lg:rounded-full lg:bg-[#0C0A0A] lg:bg-opacity-60 lg:backdrop-blur-[80.5px] z-50 lg:invisible"
      ref={navRef}
    >
      <TransitionLink href="/">
        {/* <Text size="navHome">Megisaka</Text> */}
        <Image
          alt="Megisaka"
          src="/images/logo.png"
          width={128}
          height={35}
          className="aspect-[1407/384] w-32"
          priority
        />
      </TransitionLink>
      <ul className="flex gap-6 items-center justify-center lg:gap-12">
        {selects.map(({ display, href }) => (
          <li key={display} className="hidden lg:block">
            <TransitionLink href={href}>
              <Text
                size="nav"
                className={cn({
                  'text-crimson font-bold':
                    pathname.split('/').splice(1).join('/') === href,
                })}
              >
                {display}
              </Text>
            </TransitionLink>
          </li>
        ))}
        <li>
          <Language />
        </li>
        <li className="lg:hidden flex items-center">
          <button>
            <Bars />
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
