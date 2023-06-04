import { useEffect, useRef } from 'react';

const useAnimationFrame = (callback: (deltaTime: number) => void) => {
  const requestRef = useRef<number>();
  const previousTimeRef = useRef<number>();

  const callbackRef = useRef(callback);
  callbackRef.current = callback;

  useEffect(() => {
    const animate = (time: number) => {
      if (previousTimeRef.current != undefined) {
        const deltaTime = time - previousTimeRef.current;
        callbackRef.current(deltaTime);
      }
      previousTimeRef.current = time;
      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (typeof requestRef.current === 'number') {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, []);
};

export default useAnimationFrame;
