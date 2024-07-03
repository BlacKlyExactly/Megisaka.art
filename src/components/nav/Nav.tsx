'use client';

import { useLayoutEffect, useRef } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import gsap, { Circ } from 'gsap';

import Text from '../ui/typography/Text';
import TransitionLink from '../page-transition/TransitionLink';
import LanguageSelect from './LanguageSelect';
import HamburgerMenu from './HamburgerMenu';
import { getTranslatedText } from '@/utils/getTranslatedText';
import { Language as Lang } from '@/utils/langPageProps';
import { Nav as NavReq } from '@/lib/sanity/requests';
import { cn } from '@/utils/cn';

export const selects = [
  { id: 'home', href: '/' },
  { id: 'portfolio', href: '/portfolio' },
  { id: 'commissions', href: '/commissions' },
  { id: 'about', href: '/about' },
  { id: 'contact', href: '/contact' },
  { id: 'tos', href: '/tos' },
] as const satisfies { id: string; href: string }[];

const Nav = ({ nav, lang }: NavProps) => {
  const navRef = useRef<HTMLElement>(null);

  const pathname = usePathname();

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
      className="visible fixed top-0 bg-dark px-page-mobile pr-9 py-6 flex justify-between w-full lg:w-[calc(min(100%,1620px)-178px)] lg:left-1/2 lg:-translate-x-1/2 lg:top-12 lg:px-9 lg:py-6 lg:border-[#1C1C1C] lg:border lg:rounded-full lg:bg-[#0C0A0A] lg:bg-opacity-60 lg:backdrop-blur-[80.5px] z-50 lg:invisible"
      ref={navRef}
    >
      <TransitionLink href="/">
        {/* <Text size="navHome">Megisaka</Text> */}
        <Image
          alt="Megisaka"
          src="/images/logo.png"
          width={128}
          height={35}
          className="aspect-[1407/384] w-32 relative z-[1000]"
          priority
        />
      </TransitionLink>
      <ul className="flex gap-6 items-center justify-center lg:gap-12">
        {selects.map(({ id, href }) => (
          <li
            key={id}
            className="hidden lg:block hover:text-crimson transition-colors"
          >
            <TransitionLink href={href}>
              <Text
                size="nav"
                className={cn({
                  'text-crimson font-bold':
                    `/${lang}${href}` === pathname ||
                    (href === '/' && `/${lang}${href}` === `${pathname}/`),
                })}
              >
                {getTranslatedText(nav[id], lang)}
              </Text>
            </TransitionLink>
          </li>
        ))}
        <li>
          <LanguageSelect />
        </li>
        <li className="lg:hidden flex items-center">
          <HamburgerMenu nav={nav} lang={lang} />
        </li>
      </ul>
    </nav>
  );
};

type NavProps = {
  nav: NavReq;
  lang?: Lang;
};

export default Nav;
