import {
  useState,
  useRef,
  useCallback,
  useEffect,
  type TouchEvent,
} from "react";

const MIN_SWIPE_DISTANCE = 50;

export function useCarousel(itemCount: number, intervalDuration = 5000) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const resetInterval = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = setInterval(() => {
      setActiveIndex(prevIndex => (prevIndex + 1) % itemCount);
    }, intervalDuration);
  }, [itemCount, intervalDuration]);

  useEffect(() => {
    resetInterval();

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [itemCount, resetInterval]);

  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    setTouchStart(e.targetTouches[0].clientX);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  const handleTouchEnd = (e: TouchEvent<HTMLDivElement>) => {
    const touchEnd = e.changedTouches[0].clientX;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > MIN_SWIPE_DISTANCE;
    const isRightSwipe = distance < -MIN_SWIPE_DISTANCE;

    if (isLeftSwipe) {
      setActiveIndex(prev => (prev + 1) % itemCount);
    } else if (isRightSwipe) {
      setActiveIndex(prev => (prev - 1 + itemCount) % itemCount);
    }

    resetInterval();
  };

  const handleDotClick = (index: number) => {
    setActiveIndex(index);
    resetInterval();
  };

  return {
    activeIndex,
    handleTouchStart,
    handleTouchEnd,
    handleDotClick,
  };
}
