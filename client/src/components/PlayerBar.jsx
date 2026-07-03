import { useEffect, useRef, useState } from "react";
import { IconPlay, IconPause, IconPrev, IconNext, IconVolume, IconDisc } from "../icons";

function formatTime(sec) {
  if (!Number.isFinite(sec) || sec < 0) return "0:00";
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60)
    .toString()
    .padStart(2, "0");
  return `${m}:${s}`;
}

export default function PlayerBar({ currentSong, isPaused, onTogglePlay, onNext, onPrev, hasPrev }) {
  const audioRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.85);

  // Load a new track whenever currentSong changes
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentSong) return;
    audio.src = currentSong.url;
    audio.currentTime = 0;
    setProgress(0);
    audio.play().catch(() => {});
  }, [currentSong?.id]);

  // Play / pause in sync with server-mirrored state
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentSong) return;
    if (isPaused) audio.pause();
    else audio.play().catch(() => {});
  }, [isPaused, currentSong]);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

  const handleSeek = (e) => {
    const audio = audioRef.current;
    if (!audio || !duration) return;
    const value = Number(e.target.value);
    audio.currentTime = value;
    setProgress(value);
  };

  if (!currentSong) {
    return (
      <div className="player-bar">
        <div className="player-empty">
          <IconDisc width={16} height={16} />
          Nothing playing — pick a track from the Library
        </div>
        <div />
        <div />
        <audio ref={audioRef} />
      </div>
    );
  }

  return (
    <div className="player-bar">
      <audio
        ref={audioRef}
        onTimeUpdate={(e) => setProgress(e.currentTarget.currentTime)}
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
        onEnded={onNext}
      />

      <div className="player-now">
        <div className={`player-art ${isPaused ? "paused" : ""}`}>
          <div className="bars">
            <span />
            <span />
            <span />
            <span />
          </div>
        </div>
        <div className="player-info">
          <div className="player-title">{currentSong.title}</div>
          <div className="player-artist">{currentSong.artist}</div>
        </div>
      </div>

      <div className="player-center">
        <div className="transport">
          <button className="transport-btn" onClick={onPrev} disabled={!hasPrev} aria-label="Previous">
            <IconPrev />
          </button>
          <button className="transport-btn play" onClick={onTogglePlay} aria-label={isPaused ? "Play" : "Pause"}>
            {isPaused ? <IconPlay /> : <IconPause />}
          </button>
          <button className="transport-btn" onClick={onNext} aria-label="Next">
            <IconNext />
          </button>
        </div>
        <div className="seek-row">
          <span className="seek-time">{formatTime(progress)}</span>
          <div className="seek-track">
            <div
              className="seek-fill"
              style={{ width: duration ? `${(progress / duration) * 100}%` : "0%" }}
            />
            <input
              type="range"
              min="0"
              max={duration || 0}
              step="0.1"
              value={progress}
              onChange={handleSeek}
            />
          </div>
          <span className="seek-time">{formatTime(duration)}</span>
        </div>
      </div>

      <div className="player-right">
        <IconVolume />
        <div className="volume-row">
          <div className="seek-track">
            <div className="seek-fill" style={{ width: `${volume * 100}%` }} />
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={(e) => setVolume(Number(e.target.value))}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
