'use client';

import { useEffect } from 'react';
import { hotjar } from 'react-hotjar';

const Hotjar = () => {
  useEffect(() => {
    hotjar.initialize({
      id: 5049210,
      sv: 6,
    });
  }, []);

  return null;
};

export default Hotjar;
