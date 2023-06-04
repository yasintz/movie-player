import parseSRT, { CaptionType } from 'srt-to-json';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Maximize, Settings, Type } from 'react-feather';
import useAnimationFrame from '../hooks/useAnimationFrame';
import useFullscreen from '../hooks/useFullscreen';
import useMovieCache from '../hooks/useMovieCache';
import ActionButtonGroup from '../components/ActionButton/Group';
import ActionButton from '../components/ActionButton';
import './movie.css';
import CaptionAdjustment from './CaptionAdjustment';

type PropsType = {
  src: string;
  name: string;
  caption?: string;
};

function Movie({ src, caption, name }: PropsType) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showAdjustment, setShowAdjustment] = useState(false);
  const { movies, updateTime: updateCache } = useMovieCache();
  const [currentCaption, setCurrentCaption] = useState<CaptionType>();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hideCaption, setHideCaption] = useState(false);
  const { isFullscreen, requestFullscreen, exitFullscreen } = useFullscreen({
    current: document.body,
  });

  const currentMovie = movies.find((m) => m.name === name);
  const captions = useMemo(
    () =>
      (caption ? parseSRT(caption) : []).map((cap) => ({
        ...cap,
        start: cap.start + (currentMovie?.adjustment || 0),
        end: cap.end + (currentMovie?.adjustment || 0),
      })),
    [caption, currentMovie?.adjustment]
  );

  const backupTime = currentMovie?.time;

  useAnimationFrame(() => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    updateCache(name, { time: video.currentTime });
    const time = video.currentTime;
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

      {showAdjustment && currentMovie && (
        <CaptionAdjustment
          captions={captions}
          movie={currentMovie}
          onCaptionClick={(caption) => {
            if (videoRef.current) {
              videoRef.current.currentTime = caption.start;
            }
          }}
          onChange={(adjustment) => updateCache(name, { adjustment })}
          activeCaption={currentCaption}
        />
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
          icon={<Type />}
          closed={hideCaption}
        />
        <ActionButton
          position={{ x: 1, y: 1 }}
          onClick={() => setShowAdjustment((prev) => !prev)}
          icon={<Settings />}
          closed={!showAdjustment}
        />
      </ActionButtonGroup>
    </>
  );
}

export default Movie;
