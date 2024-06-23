'use client';

import Link from 'next/link';
import { useLayoutEffect, useRef } from 'react';
import gsap, { Circ } from 'gsap';

import Bars from './ui/icons/Bars';
import Language from './ui/icons/Language';
import Text from './ui/typography/Text';
import { usePathname } from 'next/navigation';
import { cn } from '@/utils/cn';

const selects = [
  { display: 'Home', href: '/' },
  { display: 'Portfolio', href: '#' },
  { display: 'Commisions', href: '#' },
  { display: 'About', href: '#' },
  { display: 'Contact', href: '#' },
];

const Nav = () => {
  const pathname = usePathname();

  const navRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const handleResize = () => {
      if (!navRef.current) return;

      if (window.innerWidth >= 1024) {
        const tl = gsap.timeline();

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
      className="px-page-mobile py-9 flex justify-between w-full lg:w-[calc(min(100%,1620px)-178px)] lg:left-1/2 lg:-translate-x-1/2 lg:fixed lg:top-12 lg:px-9 lg:py-6 lg:border-[#1C1C1C] lg:border lg:rounded-full lg:bg-[#0C0A0A] lg:bg-opacity-60 lg:backdrop-blur-[80.5px] z-50 lg:invisible"
      ref={navRef}
    >
      <Link href="/">
        <Text size="navHome">Megisaka</Text>
      </Link>
      <ul className="flex gap-6 items-center justify-center lg:gap-12">
        {selects.map(({ display, href }) => (
          <li key={display} className="hidden lg:block">
            <Link href={href}>
              <Text
                size="nav"
                className={cn({
                  'text-crimson font-bold': pathname === href,
                })}
              >
                {display}
              </Text>
            </Link>
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
