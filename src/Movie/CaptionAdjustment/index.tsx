import { CaptionType } from 'srt-to-json';
import AdjustmentItem from './Item';
import { MovieType } from '../../hooks/useMovieCache';

type CaptionAdjustmentProps = {
  captions: CaptionType[];
  movie: MovieType;
  onChange: (adjustment: number) => void;
  onCaptionClick: (caption: CaptionType) => void;
};

const CaptionAdjustment = ({
  captions,
  movie,
  onChange,
  onCaptionClick,
}: CaptionAdjustmentProps) => {
  return (
    <div>
      <input
        type="string"
        defaultValue={movie.adjustment?.toString() || ''}
        onChange={(e) => {
          const value = parseFloat(e.target.value);
          onChange(Number.isNaN(value) ? 0 : value);
        }}
      />

      <hr />
      <div>
        {captions.map((caption) => (
          <AdjustmentItem
            key={`${caption.text}${caption.id}`}
            caption={caption}
            onClick={() => onCaptionClick(caption)}
          />
        ))}
      </div>
    </div>
  );
};

export default CaptionAdjustment;
