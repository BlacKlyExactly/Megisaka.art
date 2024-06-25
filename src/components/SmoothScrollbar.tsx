'use client';

import { useEffect } from 'react';
import Scrollbar from 'smooth-scrollbar';

const SmoothScrollbar = () => {
  useEffect(() => {
    Scrollbar.init(document.querySelector('#scrollbar')!, { damping: 0.05 });
  }, []);

  return null;
};

export default SmoothScrollbar;
