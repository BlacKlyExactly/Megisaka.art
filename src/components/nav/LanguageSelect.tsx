'use client';

import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';

import { cn } from '@/utils/cn';
import { usePathname } from 'next/navigation';
import TransitionLink from '../page-transition/TransitionLink';

const LanguageSelect = () => {
  const pathname = usePathname();

  const getUrl = (lang: string) => {
    const pathParts = pathname.split('/');
    pathParts[1] = lang;

    return pathParts.join('/');
  };

  const tl = useRef(
    gsap.timeline({
      paused: true,
    }),
  );

  const langBalls = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!langBalls.current) return;

    tl.current.to(langBalls.current.children, {
      opacity: 1,
      stagger: 0.05,
      y: 0,
    });
  }, []);

  const toggle = () => {
    tl.current.paused()
      ? tl.current.play()
      : tl.current.reversed(!tl.current.reversed());
  };

  return (
    <div className="relative flex flex-col gap-3">
      <button
        onClick={toggle}
        aria-label="Language select button"
        className={cn(
          'nav-lang-selector relative z-[1000] flex w-fit items-center gap-3',
        )}
      >
        <svg
          className="pointer-events-none"
          width="27"
          height="27"
          viewBox="0 0 27 27"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_20_210)">
            <path
              d="M18.5625 13.5C18.5625 14.6707 18.4992 15.7992 18.3885 16.875H8.61152C8.49551 15.7992 8.4375 14.6707 8.4375 13.5C8.4375 12.3293 8.50078 11.2008 8.61152 10.125H18.3885C18.5045 11.2008 18.5625 12.3293 18.5625 13.5ZM20.0812 10.125H26.5729C26.8523 11.2061 27 12.3346 27 13.5C27 14.6654 26.8523 15.7939 26.5729 16.875H20.0812C20.192 15.7887 20.25 14.6602 20.25 13.5C20.25 12.3398 20.192 11.2113 20.0812 10.125ZM26.0191 8.4375H19.865C19.3377 5.06777 18.2936 2.24648 16.9488 0.442969C21.0779 1.53457 24.4371 4.52988 26.0139 8.4375H26.0191ZM18.1564 8.4375H8.84355C9.16523 6.51797 9.66094 4.81992 10.2674 3.44355C10.8211 2.19902 11.4381 1.29727 12.034 0.727734C12.6246 0.16875 13.115 0 13.5 0C13.885 0 14.3754 0.16875 14.966 0.727734C15.5619 1.29727 16.1789 2.19902 16.7326 3.44355C17.3443 4.81465 17.8348 6.5127 18.1564 8.4375ZM7.13496 8.4375H0.980859C2.56289 4.52988 5.9168 1.53457 10.0512 0.442969C8.70645 2.24648 7.6623 5.06777 7.13496 8.4375ZM0.427148 10.125H6.91875C6.80801 11.2113 6.75 12.3398 6.75 13.5C6.75 14.6602 6.80801 15.7887 6.91875 16.875H0.427148C0.147656 15.7939 0 14.6654 0 13.5C0 12.3346 0.147656 11.2061 0.427148 10.125ZM10.2674 23.5512C9.65566 22.1801 9.16523 20.482 8.84355 18.5625H18.1564C17.8348 20.482 17.3391 22.1801 16.7326 23.5512C16.1789 24.7957 15.5619 25.6975 14.966 26.267C14.3754 26.8313 13.885 27 13.5 27C13.115 27 12.6246 26.8313 12.034 26.2723C11.4381 25.7027 10.8211 24.801 10.2674 23.5564V23.5512ZM7.13496 18.5625C7.6623 21.9322 8.70645 24.7535 10.0512 26.557C5.9168 25.4654 2.56289 22.4701 0.980859 18.5625H7.13496ZM26.0191 18.5625C24.4371 22.4701 21.0832 25.4654 16.9541 26.557C18.2988 24.7535 19.3377 21.9322 19.8703 18.5625H26.0191Z"
              fill="white"
            />
          </g>
          <defs>
            <clipPath id="clip0_20_210">
              <rect width="27" height="27" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </button>
      <div
        className="absolute top-full mt-5 flex flex-col gap-4 z-[10000]"
        ref={langBalls}
      >
        {flags.map(({ Flag, code }) => (
          <TransitionLink
            key={code}
            onClick={toggle}
            href={getUrl(code)}
            className="translate-y-[5px] opacity-0"
            preserveLang={false}
          >
            <Flag />
          </TransitionLink>
        ))}
      </div>
    </div>
  );
};

const FlagPL = () => (
  <svg
    className="pointer-events-none"
    width="27"
    height="27"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_1310_5505)">
      <rect width="24" height="24" rx="12" fill="#F0072A" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M-4.80078 0H28.7992V12.8H-4.80078V0Z"
        fill="white"
      />
    </g>
    <defs>
      <clipPath id="clip0_1310_5505">
        <rect width="24" height="24" rx="12" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

const FlagEN = () => (
  <svg
    className="pointer-events-none"
    width="27"
    height="27"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_1310_5506)">
      <rect width="24" height="24" rx="12" fill="#002B89" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M-1.22643 0H-4.80078V4L25.2055 24L28.7992 24V20L-1.22643 0Z"
        fill="white"
      />
      <path
        d="M-3.60862 0L28.7992 21.6567V24H27.635L-4.80078 2.32089V0H-3.60862Z"
        fill="#F0072A"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M25.5992 0H28.7992V4C28.7992 4 8.0149 17.3249 -1.60078 24H-4.80078V20L25.5992 0Z"
        fill="white"
      />
      <path
        d="M28.7992 0H27.714L-4.80078 21.6753V24H-3.60862L28.7992 2.33842V0Z"
        fill="#F0072A"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.41854 0H16.6078V7.40291H28.7992V16.5922H16.6078V24H7.41854V16.5922H-4.80078V7.40291H7.41854V0Z"
        fill="white"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.34659 0H14.6518V9.23077H28.7992V14.7692H14.6518V24H9.34659V14.7692H-4.80078V9.23077H9.34659V0Z"
        fill="#F0072A"
      />
    </g>
    <defs>
      <clipPath id="clip0_1310_5506">
        <rect width="24" height="24" rx="12" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

const flags = [
  { Flag: FlagEN, code: 'en' },
  { Flag: FlagPL, code: 'pl' },
];

export default LanguageSelect;
