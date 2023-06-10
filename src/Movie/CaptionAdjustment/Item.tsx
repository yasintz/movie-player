import { CaptionType } from 'srt-to-json';
import cx from 'classnames';
import dayjs from '../../utils/dayjs';

type AdjustmentItemProps = {
  caption: CaptionType;
  adjustment: number | undefined;
  onClick: () => void;
  onDelete: () => void;
  onAdjustmentChange: (val: number) => void;
  active: boolean;
};

const AdjustmentItem = ({
  caption,
  onClick,
  onDelete,
  onAdjustmentChange,
  active,
  adjustment,
}: AdjustmentItemProps) => {
  const format = 'HH:mm:ss';

  const onDeleteClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    e.preventDefault();

    onDelete();
  };
  return (
    <div
      onClick={onClick}
      className={cx('adjustment-item', active && 'active')}
    >
      <div>
        <input
          defaultValue={adjustment?.toString() || ''}
          value={Number(adjustment?.toString() || '0').toString()}
          onChange={(e) => {
            const value = parseFloat(e.target.value);
            onAdjustmentChange(Number.isNaN(value) ? 0 : value);
          }}
        />
        <span>
          {dayjs.duration(caption.start * 1000).format(format)}
          {' - '}
          {dayjs.duration(caption.end * 1000).format(format)}: {caption.text}
        </span>
      </div>
      <div>
        <button onClick={onDeleteClick}>Delete</button>
      </div>
    </div>
  );
};

export default AdjustmentItem;
