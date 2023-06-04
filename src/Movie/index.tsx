import parseSRT, { CaptionType } from 'srt-to-json';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Maximize, Eye, EyeOff } from 'react-feather';
import useAnimationFrame from '../hooks/useAnimationFrame';
import useFullscreen from '../hooks/useFullscreen';
import useMovieCache from '../hooks/useMovieCache';
import ActionButtonGroup from '../components/ActionButton/Group';
import ActionButton from '../components/ActionButton';
import './movie.css';

type PropsType = {
  src: string;
  name: string;
  caption?: string;
};

function Movie({ src, caption, name }: PropsType) {
  const [isPlaying, setIsPlaying] = useState(false);
  const { movies, updateTime: updateCache } = useMovieCache();
  const [currentCaption, setCurrentCaption] = useState<CaptionType>();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hideCaption, setHideCaption] = useState(false);
  const { isFullscreen, requestFullscreen, exitFullscreen } = useFullscreen({
    current: document.body,
  });

  const captions = useMemo(() => (caption ? parseSRT(caption) : []), [caption]);

  const backupTime = movies.find((m) => m.name === name)?.time;

  useAnimationFrame(() => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    updateCache(name, video.currentTime);
    const time = video.currentTime - 2.5;
    const captionObj = captions.find((i) => time >= i.start && time < i.end);

    setCurrentCaption(captionObj);
  });

  useEffect(() => {
    if (backupTime && videoRef.current) {
      videoRef.current.currentTime = backupTime;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name]);

  return (
    <>
      <video
        controlsList="nofullscreen"
        controls
        src={src}
        ref={videoRef}
        onDoubleClick={isFullscreen ? exitFullscreen : requestFullscreen}
        onClick={() =>
          isPlaying ? videoRef.current?.pause() : videoRef.current?.play()
        }
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />
      {currentCaption && !hideCaption && (
        <div className="caption-container">
          <div className="mp-caption">{currentCaption.text}</div>
        </div>
      )}

      <ActionButtonGroup autoHide={isPlaying}>
        <ActionButton
          position={{ x: 1, y: 0 }}
          onClick={isFullscreen ? exitFullscreen : requestFullscreen}
          icon={<Maximize />}
        />
        <ActionButton
          position={{ x: 0, y: 1 }}
          onClick={() => setHideCaption((prev) => !prev)}
          icon={hideCaption ? <Eye /> : <EyeOff />}
        />
      </ActionButtonGroup>
    </>
  );
}

export default Movie;
