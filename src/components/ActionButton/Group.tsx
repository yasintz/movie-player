import React, { useEffect, useState } from 'react';
import cx from 'classnames';

type ActionButtonGroupProps = {
  autoHide?: boolean;
  children?: React.ReactNode;
};

const ActionButtonGroup = ({ children, autoHide }: ActionButtonGroupProps) => {
  const [hide, setHide] = useState(true);

  useEffect(() => {
    let timeout: number;

    const mouseMoveListener = () => {
      setHide(false);

      if (!autoHide) {
        return;
      }
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        setHide(true);
      }, 2000);
    };

    mouseMoveListener();
    document.addEventListener('mousemove', mouseMoveListener);

    return () => {
      clearTimeout(timeout);
      document.removeEventListener('mousemove', mouseMoveListener);
    };
  }, [autoHide]);

  return (
    <div className={cx('video-action-button-group', hide && 'hide')}>
      {children}
    </div>
  );
};

export default ActionButtonGroup;
