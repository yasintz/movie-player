import { CaptionType } from 'srt-to-json';
import AdjustmentItem from './Item';
import { MovieType } from '../../hooks/useMovieCache';
import './adjustment.css';

type CaptionAdjustmentProps = {
  captions: CaptionType[];
  movie: MovieType;
  onChange: (adjustment: number) => void;
  onCaptionClick: (caption: CaptionType) => void;
  activeCaption?: CaptionType;
};

const CaptionAdjustment = ({
  captions,
  movie,
  onChange,
  onCaptionClick,
  activeCaption,
}: CaptionAdjustmentProps) => {
  return (
    <div className='adjustment-container'>
      <input
        type="string"
        defaultValue={movie.adjustment?.toString() || ''}
        onChange={(e) => {
          const value = parseFloat(e.target.value);
          onChange(Number.isNaN(value) ? 0 : value);
        }}
      />
      <div className='desc'>
        If you HEAR voice earlier than caption, DECREASE the time.
      </div>
      <div className='desc'>If you SEE caption earlier than voice, INCREASE the time</div>

      <hr />
      <div className="adjustment-item-wrapper">
        {captions.map((caption) => (
          <AdjustmentItem
            key={`${caption.text}${caption.id}`}
            caption={caption}
            onClick={() => onCaptionClick(caption)}
            active={caption === activeCaption}
          />
        ))}
      </div>
    </div>
  );
};

export default CaptionAdjustment;
