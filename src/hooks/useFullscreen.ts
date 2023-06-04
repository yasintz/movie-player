import React, { useEffect, useState } from 'react';
function useFullscreen<T extends HTMLElement>(ref: React.RefObject<T>) {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const requestFullscreen = () => {
    ref.current?.requestFullscreen();
  };

  const exitFullscreen = () => {
    document.exitFullscreen();
  };

  useEffect(() => {
    const fullScreenChangeListener = () => {
      setIsFullscreen((prev) => !prev);
    };

    document.body.addEventListener(
      'fullscreenchange',
      fullScreenChangeListener
    );

    return () => {
      document.body.removeEventListener(
        'fullscreenchange',
        fullScreenChangeListener
      );
    };
  }, []);

  return { isFullscreen, requestFullscreen, exitFullscreen };
}

export default useFullscreen;
