import React, { useMemo } from 'react';
import './action-button.css';

type PropsType = {
  onClick: () => void;
  icon: JSX.Element;
  position: { x: number; y: number };
  closed?: boolean;
};

const ActionButton = ({ onClick, icon, position, closed }: PropsType) => {
  const iconEl = React.cloneElement(icon, { size: 12, color: 'white' });

  const style = useMemo(() => {
    const right = [18, 56][position.x];
    const bottom = position.y * 36;

    return { right, bottom: bottom + 36 };
  }, [position.x, position.y]);

  return (
    <div className="video-action-button" onClick={onClick} style={style}>
      <div>
        {iconEl}
        {closed && <span className="closed" />}
      </div>
    </div>
  );
};

export default ActionButton;
