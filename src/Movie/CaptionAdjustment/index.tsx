import { CaptionType } from 'srt-to-json';
import _ from 'lodash';
import AdjustmentItem from './Item';
import { AdjustmentType, MovieType } from '../../hooks/useMovieCache';
import './adjustment.scss';
import downloadFile from '../../utils/download-file';
import jsonToSrt from '../../utils/json-to-srt';

type CaptionAdjustmentProps = {
  captions: CaptionType[];
  movie: MovieType;
  onChange: (adjustments: AdjustmentType[]) => void;
  onCaptionClick: (caption: CaptionType) => void;
  onDelete: (caption: CaptionType) => void;
  activeCaption?: CaptionType;
};

const CaptionAdjustment = ({
  captions,
  movie,
  activeCaption,
  onChange,
  onCaptionClick,
  onDelete,
}: CaptionAdjustmentProps) => {
  return (
    <div className="adjustment-container">
      <button
        onClick={() =>
          downloadFile(
            jsonToSrt(captions),
            'captions.srt',
            'application/octet-stream'
          )
        }
      >
        download
      </button>
      <button onClick={() => onChange([])}>Reset</button>
      <div className="desc">
        If you HEAR voice earlier than caption, DECREASE the time.
      </div>
      <div className="desc">
        If you SEE caption earlier than voice, INCREASE the time
      </div>

      <hr />
      <div className="adjustment-item-wrapper">
        {captions.map((caption) => (
          <AdjustmentItem
            key={`${caption.text}${caption.id}`}
            caption={caption}
            adjustment={
              movie.adjustment?.find((i) => i.captionId === caption.id)?.second
            }
            onAdjustmentChange={(second) => {
              const all: AdjustmentType[] = [
                {
                  captionId: caption.id,
                  second,
                },
                ...movie.adjustment,
              ];
              onChange(_.uniqBy(all, 'captionId'));
            }}
            active={caption === activeCaption}
            onClick={() => onCaptionClick(caption)}
            onDelete={() => onDelete(caption)}
          />
        ))}
      </div>
    </div>
  );
};

export default CaptionAdjustment;
