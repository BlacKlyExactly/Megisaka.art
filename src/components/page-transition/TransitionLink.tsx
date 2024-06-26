'use client';

import { usePathname, useRouter } from 'next/navigation';
import { MouseEvent, PropsWithChildren } from 'react';
import gsap, { Circ } from 'gsap';

const TransitionLink = ({
  href,
  children,
  className,
  preserveLang,
  onClick,
}: TransitionLinkProps & { onClick?: () => any; preserveLang?: boolean }) => {
  const { push } = useRouter();
  const pathname = usePathname();

  preserveLang ??= true;

  const handleTransition = (e: MouseEvent) => {
    e.preventDefault();

    const lang = pathname.split('/')[1];

    onClick && onClick();

    if (href === pathname) return;

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
    <a href={href} onClick={handleTransition} className={className}>
      {children}
    </a>
  );
};

type TransitionLinkProps = PropsWithChildren<{
  href: string;
  className?: string;
}>;

export default TransitionLink;
