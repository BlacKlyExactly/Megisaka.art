import { RefObject, useEffect, useState } from 'react';

export enum Directions {
  Left,
  Right,
  None,
}

const useDetectSwipeDirection = (ref: RefObject<HTMLElement>) => {
  const [touchStartX, setTouchStartX] = useState<number | null>();
  const [touchEndX, setTouchEndX] = useState<number | null>();
  const [touchStartY, setTouchStartY] = useState<number | null>();
  const [touchEndY, setTouchEndY] = useState<number | null>();
  const [direction, setDirection] = useState(Directions.None);

  useEffect(() => {
    setDirection(Directions.None);

    const distanceY =
      Math.max(Math.abs(touchStartY || 0), Math.abs(touchEndY || 0)) -
      Math.min(Math.abs(touchStartY || 0), Math.abs(touchEndY || 0));

    const distanceX =
      Math.max(Math.abs(touchStartX || 0), Math.abs(touchEndX || 0)) -
      Math.min(Math.abs(touchStartX || 0), Math.abs(touchEndX || 0));

    if (distanceY >= distanceX) return;

    if (touchEndX && touchStartX && touchEndX !== touchStartX)
      setDirection(
        touchEndX > touchStartX ? Directions.Right : Directions.Left,
      );
  }, [touchStartX, touchEndX, touchStartY, touchEndY]);

  useEffect(() => {
    const element = ref.current;

    const handleTouchStart = (e: TouchEvent) => {
      setTouchStartX(e.changedTouches[0].screenX);
      setTouchEndX(null);

      setTouchStartY(e.changedTouches[0].screenY);
      setTouchEndY(null);
    };

    const handleTouchEnd = (e: TouchEvent) => {
      setTouchEndX(e.changedTouches[0].screenX);
      setTouchEndY(e.changedTouches[0].screenY);
    };

    element?.addEventListener('touchstart', handleTouchStart, {
      passive: true,
    });

    element?.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      element?.removeEventListener('touchstart', handleTouchStart);
      element?.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  return direction;
};

export default useDetectSwipeDirection;
