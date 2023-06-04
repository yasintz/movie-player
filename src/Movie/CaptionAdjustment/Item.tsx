import { CaptionType } from 'srt-to-json';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

type AdjustmentItemProps = {
  caption: CaptionType;
  onClick: () => void;
};

const AdjustmentItem = ({ caption, onClick }: AdjustmentItemProps) => {
  const format = 'HH:mm:ss';

  return (
    <div onClick={onClick}>
      {dayjs.duration(caption.start * 1000).format(format)} -
      {dayjs.duration(caption.end * 1000).format(format)}: {caption.text}
    </div>
  );
};

export default AdjustmentItem;
