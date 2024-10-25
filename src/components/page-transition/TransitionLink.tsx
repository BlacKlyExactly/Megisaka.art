'use client';

import { usePathname, useRouter } from 'next/navigation';
import { MouseEvent, PropsWithChildren } from 'react';
import gsap, { Circ } from 'gsap';

const TransitionLink = ({
  href,
  children,
  className,
  preserveLang,
  ariaLabel,
  onClick,
}: TransitionLinkProps & { onClick?: () => any; preserveLang?: boolean }) => {
  const { push } = useRouter();
  const pathname = usePathname();

  const lang = pathname.split('/')[1];

  preserveLang ??= true;

  const handleTransition = (e: MouseEvent) => {
    e.preventDefault();

    onClick && onClick();

    console.log(pathname, href);

    if (
      `/${lang}${href}` === pathname ||
      (href === '/' && `/${lang}${href}` === `${pathname}/`) ||
      pathname === href
    )
      return;

    const transition = document.querySelector('#transition');

    if (!transition) {
      push(href);
      return;
    }

    gsap
      .to(transition?.children, {
        y: 0,
        stagger: 0.05,
        delay: 0.1,
        ease: Circ.easeOut,
      })
      .then(() => push(preserveLang ? `/${lang}/${href}` : href));
  };

  return (
    <a
      href={href}
      onClick={handleTransition}
      className={className}
      aria-label={ariaLabel}
    >
      {children}
    </a>
  );
};

type TransitionLinkProps = PropsWithChildren<{
  href: string;
  className?: string;
  ariaLabel?: string;
}>;

export default TransitionLink;
