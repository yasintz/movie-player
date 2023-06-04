import React, { useMemo } from 'react';
import './action-button.css';

type PropsType = {
  onClick: () => void;
  icon: JSX.Element;
  position: { x: number; y: number };
};

const ActionButton = ({ onClick, icon, position }: PropsType) => {
  const iconEl = React.cloneElement(icon, { size: 12, color: 'white' });

  const style = useMemo(() => {
    const right = [18, 56][position.x];
    const bottom = position.y * 36;

    return { right, bottom: bottom + 36 };
  }, [position.x, position.y]);

  return (
    <div className="video-action-button" onClick={onClick} style={style}>
      {iconEl}
    </div>
  );
};

export default ActionButton;
