import { useEffect, useRef, useState } from "react";

const tracks = [
  {
    title: "Arabella",
    artist: "Arctic Monkeys",
    src: "/songs/arabella.mp3",
    cover: "/covers/arabella.jpeg",
  },
  {
    title: "Happy Birthday Bitch",
    artist: "random yt video",
    src: "/songs/birthday.mp3",
    cover: "/covers/birthday.jpeg",
  },
  // add more tracks here
];

const SLIDE_DIRECTION = {
  NONE: 0,
  LEFT: -1,
  RIGHT: 1,
};

function formatTime(seconds) {
  if (!seconds || Number.isNaN(seconds)) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

export default function Music() {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [slideDirection, setSlideDirection] = useState(SLIDE_DIRECTION.NONE);
  const [isAnimating, setIsAnimating] = useState(false);

  const audioRef = useRef(null);
  const currentTrack = tracks[currentTrackIndex];

  // Play/pause when state or track changes
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Load the new track
    audio.load();

    if (isPlaying) {
      const playPromise = audio.play();
      if (playPromise && playPromise.catch) {
        playPromise.catch(() => {});
      }
    } else {
      audio.pause();
    }
  }, [isPlaying, currentTrackIndex]);

  // Attach audio event listeners
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime || 0);
    };

    const handleLoadedMetadata = () => {
      setDuration(audio.duration || 0);
    };

    const handleEnded = () => {
      handleNext();
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("ended", handleEnded);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTrackIndex]);

  const handlePlayPause = () => {
    setIsPlaying((prev) => !prev);
  };

  const handlePrev = () => {
    setSlideDirection(SLIDE_DIRECTION.RIGHT);
    setIsAnimating(true);
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
    setTimeout(() => {
      setCurrentTrackIndex((prev) =>
        prev === 0 ? tracks.length - 1 : prev - 1
      );
      setCurrentTime(0);
      setIsPlaying(true);
      setTimeout(() => {
        setIsAnimating(false);
        setSlideDirection(SLIDE_DIRECTION.NONE);
      }, 50);
    }, 300);
  };

  const handleNext = () => {
    setSlideDirection(SLIDE_DIRECTION.LEFT);
    setIsAnimating(true);
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
    setTimeout(() => {
      setCurrentTrackIndex((prev) =>
        prev === tracks.length - 1 ? 0 : prev + 1
      );
      setCurrentTime(0);
      setIsPlaying(true);
      setTimeout(() => {
        setIsAnimating(false);
        setSlideDirection(SLIDE_DIRECTION.NONE);
      }, 50);
    }, 300);
  };

  const handleSeek = (e) => {
    const value = Number(e.target.value);
    const audio = audioRef.current;
    if (!audio || Number.isNaN(value)) return;
    audio.currentTime = value;
    setCurrentTime(value);
  };

  return (
    <div className="fixed inset-0 w-screen h-screen bg-gradient-to-b from-slate-900 via-slate-950 to-black text-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md mx-auto rounded-3xl sm:rounded-[2rem] bg-white/5 border border-white/10 shadow-[0_24px_80px_rgba(0,0,0,0.6)] backdrop-blur-2xl p-6 sm:p-8">
        {/* Top header */}
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <div className="flex items-center gap-2 text-xs text-slate-300">
            <span className="h-2 w-2 rounded-full bg-red-500" />
            <span className="font-medium tracking-wide uppercase">
              Now Playing
            </span>
          </div>
          <div className="text-xs text-slate-400">
            {currentTrackIndex + 1} of {tracks.length}
          </div>
        </div>

        {/* Cover with sliding animation */}
        <div className="mb-6 sm:mb-8 overflow-hidden">
          <div
            className={`transition-all duration-300 ease-out ${
              isAnimating
                ? slideDirection === SLIDE_DIRECTION.LEFT
                  ? "-translate-x-full opacity-0"
                  : "translate-x-full opacity-0"
                : "translate-x-0 opacity-100"
            }`}
          >
            <div className="aspect-square w-full overflow-hidden rounded-3xl shadow-2xl border border-white/10">
              <img
                src={currentTrack.cover}
                alt={currentTrack.title}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Title / Artist with sliding animation */}
        <div className="mb-6 overflow-hidden">
          <div
            className={`transition-all duration-300 ease-out ${
              isAnimating
                ? slideDirection === SLIDE_DIRECTION.LEFT
                  ? "-translate-x-full opacity-0"
                  : "translate-x-full opacity-0"
                : "translate-x-0 opacity-100"
            }`}
          >
            <div className="text-center px-4">
              <h1 className="text-2xl sm:text-3xl font-semibold truncate">
                {currentTrack.title}
              </h1>
              <p className="mt-2 text-base sm:text-lg text-slate-300 truncate">
                {currentTrack.artist}
              </p>
            </div>
          </div>
        </div>

        {/* Progress bar section */}
        <div className="mb-6 sm:mb-8">
          <input
            type="range"
            min={0}
            max={duration || 0}
            value={currentTime}
            onChange={handleSeek}
            step="0.1"
            className="w-full h-1 accent-pink-500 cursor-pointer"
            style={{
              background: `linear-gradient(to right, rgb(236, 72, 153) 0%, rgb(236, 72, 153) ${
                (currentTime / duration) * 100 || 0
              }%, rgba(255,255,255,0.1) ${
                (currentTime / duration) * 100 || 0
              }%, rgba(255,255,255,0.1) 100%)`,
            }}
          />
          <div className="flex justify-between text-xs text-slate-400 mt-2 font-mono">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Controls */}
        <div className="mb-6">
          <div className="flex items-center justify-center gap-4 sm:gap-8">
            {/* Previous */}
            <button
              onClick={handlePrev}
              className="rounded-full p-3 sm:p-4 bg-white/5 hover:bg-white/10 transition-all active:scale-90"
              aria-label="Previous track"
            >
              <span className="text-xl sm:text-2xl">⏮</span>
            </button>

            {/* Play / Pause big button */}
            <button
              onClick={handlePlayPause}
              className="rounded-full h-16 w-16 sm:h-20 sm:w-20 flex items-center justify-center bg-white text-slate-900 shadow-xl shadow-pink-500/30 hover:shadow-pink-500/50 active:scale-95 transition-all"
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              <span className="text-3xl sm:text-4xl">
                {isPlaying ? "⏸" : "▶"}
              </span>
            </button>

            {/* Next */}
            <button
              onClick={handleNext}
              className="rounded-full p-3 sm:p-4 bg-white/5 hover:bg-white/10 transition-all active:scale-90"
              aria-label="Next track"
            >
              <span className="text-xl sm:text-2xl">⏭</span>
            </button>
          </div>
        </div>

        {/* Bottom info bar */}
        <div className="flex items-center justify-center gap-2 text-xs text-slate-400">
          <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
          <span className="uppercase tracking-wide">Playing from Library</span>
        </div>

        {/* Hidden audio element */}
        <audio ref={audioRef} src={currentTrack.src} preload="metadata" />
      </div>
    </div>
  );
}