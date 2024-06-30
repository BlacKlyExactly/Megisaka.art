'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Scrollbar from 'smooth-scrollbar';

const SmoothScrollbar = () => {
  const [scrollbar, setScrollbar] =
    useState<ReturnType<typeof Scrollbar.init>>();

  const pathname = usePathname();

  useEffect(() => {
    setScrollbar(
      Scrollbar.init(document.querySelector('#scrollbar')!, { damping: 0.05 }),
    );
  }, []);

  useEffect(() => {
    scrollbar?.scrollTo(0, 0, 0);
  }, [pathname, scrollbar]);

  return null;
};

export default SmoothScrollbar;
