import { RefObject, useEffect, useState } from 'react';

const useScrollShow = (ref: RefObject<HTMLElement>) => {
  const [showed, setShowed] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setShowed(true);
      },
      {
        rootMargin: '0px 0px -200px 0px',
      },
    );

    observer.observe(ref.current);
  }, []);

  return showed;
};

export default useScrollShow;
