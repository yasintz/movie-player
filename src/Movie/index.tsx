import parseSRT, { CaptionType } from 'srt-to-json';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Maximize, Type, AlignLeft, Move } from 'react-feather';
import useAnimationFrame from '../hooks/useAnimationFrame';
import useFullscreen from '../hooks/useFullscreen';
import useMovieCache from '../hooks/useMovieCache';
import ActionButtonGroup from '../components/ActionButton/Group';
import ActionButton from '../components/ActionButton';
import CaptionAdjustment from './CaptionAdjustment';
import useKeyboardShortcut from '../hooks/useKeyboard';
import './movie.css';

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

  const [showCaptionPositioner, setShowCaptionPositioner] = useState(false);
  const [captionPosition, setCaptionPosition] = useState({ y: 0.07 });

  useKeyboardShortcut(
    ['ArrowRight'],
    () => {
      if (videoRef.current) videoRef.current.currentTime += 5;
    },
    {
      overrideSystem: true,
      ignoreInputFields: false,
      repeatOnHold: true,
    }
  );
  useKeyboardShortcut(
    ['ArrowLeft'],
    () => {
      if (videoRef.current) videoRef.current.currentTime -= 5;
    },
    {
      overrideSystem: true,
      ignoreInputFields: false,
      repeatOnHold: true,
    }
  );

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
        <div
          className="caption-container"
          style={{
            bottom: `${captionPosition.y * 100}%`,
          }}
        >
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

      {showCaptionPositioner && (
        <label>
          <span style={{ width: 48, display: 'inline-block' }}>
            {captionPosition.y}
          </span>
          <input
            type="range"
            min={0}
            max={1000}
            value={(captionPosition.y * 1000).toString()}
            onChange={(e) =>
              setCaptionPosition({ y: parseInt(e.target.value, 10) / 1000 })
            }
          />
        </label>
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
          icon={<AlignLeft />}
          closed={!showAdjustment}
        />
        <ActionButton
          position={{ x: 0, y: 2 }}
          onClick={() => setShowCaptionPositioner((prev) => !prev)}
          icon={<Move />}
          closed={!showCaptionPositioner}
        />
      </ActionButtonGroup>
    </>
  );
}

export default Movie;
