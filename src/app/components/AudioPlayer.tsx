import { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward } from 'lucide-react';
import { Track } from '../data/albums';

interface AudioPlayerProps {
  tracks: Track[];
  accentColor: string;
}

export function AudioPlayer({ tracks, accentColor }: AudioPlayerProps) {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const currentTrack = tracks[currentTrackIndex];

  // Mock duration from the duration string (convert "4:23" to seconds)
  useEffect(() => {
    if (currentTrack) {
      const [mins, secs] = currentTrack.duration.split(':').map(Number);
      setDuration(mins * 60 + secs);
    }
  }, [currentTrack]);

  // Simulate playback (since we don't have real audio files)
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentTime((prev) => {
        if (prev >= duration) {
          handleNext();
          return 0;
        }
        return prev + 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isPlaying, duration]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    setCurrentTime(0);
    setCurrentTrackIndex((prev) => (prev + 1) % tracks.length);
  };

  const handlePrevious = () => {
    setCurrentTime(0);
    setCurrentTrackIndex((prev) => (prev - 1 + tracks.length) % tracks.length);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div
      className="p-6 rounded-sm"
      style={{
        backgroundColor: '#0a0a0a',
        border: `2px solid ${accentColor}`,
      }}
    >
      {/* Current track info */}
      <div className="mb-6">
        <div
          className="text-lg font-bold mb-1"
          style={{
            fontFamily: 'Cakra, sans-serif',
            color: '#f5f1e8',
            fontWeight: 700,
          }}
        >
          {currentTrack.title}
        </div>
        <div
          className="text-sm opacity-60"
          style={{
            fontFamily: 'Cakra, sans-serif',
            color: '#f5f1e8',
            fontWeight: 400,
          }}
        >
          {currentTrack.artist}
        </div>
      </div>

      {/* Progress bar */}
      <div className="mb-4">
        <input
          type="range"
          min="0"
          max={duration}
          value={currentTime}
          onChange={handleSeek}
          className="w-full h-2 rounded-full appearance-none cursor-pointer"
          style={{
            background: `linear-gradient(to right, ${accentColor} 0%, ${accentColor} ${(currentTime / duration) * 100}%, #333 ${(currentTime / duration) * 100}%, #333 100%)`,
          }}
        />
        <div
          className="flex justify-between mt-2 text-xs font-mono"
          style={{
            color: '#f5f1e8',
            opacity: 0.6,
          }}
        >
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-4">
        <button
          onClick={handlePrevious}
          className="p-2 rounded-full hover:opacity-80 transition-opacity"
          style={{
            backgroundColor: accentColor,
          }}
        >
          <SkipBack size={20} color="#000000" />
        </button>

        <button
          onClick={handlePlayPause}
          className="p-4 rounded-full hover:opacity-80 transition-opacity"
          style={{
            backgroundColor: accentColor,
          }}
        >
          {isPlaying ? <Pause size={24} color="#000000" /> : <Play size={24} color="#000000" />}
        </button>

        <button
          onClick={handleNext}
          className="p-2 rounded-full hover:opacity-80 transition-opacity"
          style={{
            backgroundColor: accentColor,
          }}
        >
          <SkipForward size={20} color="#000000" />
        </button>
      </div>

      {/* Track count */}
      <div
        className="text-center mt-4 text-xs font-mono"
        style={{
          color: '#f5f1e8',
          opacity: 0.5,
        }}
      >
        Track {currentTrackIndex + 1} of {tracks.length}
      </div>
    </div>
  );
}