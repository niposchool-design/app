'use client';

import { Play, Pause, Volume2, VolumeX, Maximize, SkipBack, SkipForward } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface VideoPlayerProps {
    src: string;
    poster?: string;
    title?: string;
    subtitle?: string;
    autoPlay?: boolean;
}

export default function VideoPlayer({
    src,
    poster,
    title,
    subtitle,
    autoPlay = false
}: VideoPlayerProps) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(1);
    const [isMuted, setIsMuted] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [showControls, setShowControls] = useState(true);

    const videoRef = useRef<HTMLVideoElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const controlsTimeoutRef = useRef<NodeJS.Timeout>();

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const handleTimeUpdate = () => setCurrentTime(video.currentTime);
        const handleLoadedMetadata = () => setDuration(video.duration);
        const handleEnded = () => setIsPlaying(false);

        video.addEventListener('timeupdate', handleTimeUpdate);
        video.addEventListener('loadedmetadata', handleLoadedMetadata);
        video.addEventListener('ended', handleEnded);

        return () => {
            video.removeEventListener('timeupdate', handleTimeUpdate);
            video.removeEventListener('loadedmetadata', handleLoadedMetadata);
            video.removeEventListener('ended', handleEnded);
        };
    }, []);

    const togglePlay = () => {
        const video = videoRef.current;
        if (!video) return;

        if (isPlaying) {
            video.pause();
        } else {
            video.play();
        }
        setIsPlaying(!isPlaying);
    };

    const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
        const video = videoRef.current;
        if (!video) return;

        const time = parseFloat(e.target.value);
        video.currentTime = time;
        setCurrentTime(time);
    };

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const video = videoRef.current;
        if (!video) return;

        const vol = parseFloat(e.target.value);
        video.volume = vol;
        setVolume(vol);
        setIsMuted(vol === 0);
    };

    const toggleMute = () => {
        const video = videoRef.current;
        if (!video) return;

        video.muted = !isMuted;
        setIsMuted(!isMuted);
    };

    const toggleFullscreen = () => {
        const container = containerRef.current;
        if (!container) return;

        if (!document.fullscreenElement) {
            container.requestFullscreen();
            setIsFullscreen(true);
        } else {
            document.exitFullscreen();
            setIsFullscreen(false);
        }
    };

    const skip = (seconds: number) => {
        const video = videoRef.current;
        if (!video) return;

        video.currentTime = Math.max(0, Math.min(duration, currentTime + seconds));
    };

    const formatTime = (time: number): string => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    const handleMouseMove = () => {
        setShowControls(true);
        if (controlsTimeoutRef.current) {
            clearTimeout(controlsTimeoutRef.current);
        }
        controlsTimeoutRef.current = setTimeout(() => {
            if (isPlaying) {
                setShowControls(false);
            }
        }, 3000);
    };

    return (
        <div
            ref={containerRef}
            className="relative bg-black rounded-2xl overflow-hidden shadow-2xl group"
            onMouseMove={handleMouseMove}
            onMouseLeave={() => isPlaying && setShowControls(false)}
        >
            {/* Video Element */}
            <video
                ref={videoRef}
                src={src}
                poster={poster}
                className="w-full aspect-video"
                autoPlay={autoPlay}
                onClick={togglePlay}
            />

            {/* Overlay Title */}
            {(title || subtitle) && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: showControls ? 1 : 0, y: showControls ? 0 : -20 }}
                    className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/80 to-transparent p-6"
                >
                    {title && <h3 className="text-white font-bold text-xl mb-1">{title}</h3>}
                    {subtitle && <p className="text-white/80 text-sm">{subtitle}</p>}
                </motion.div>
            )}

            {/* Controls */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: showControls ? 1 : 0, y: showControls ? 0 : 20 }}
                className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-6"
            >
                {/* Progress Bar */}
                <div className="mb-4">
                    <input
                        type="range"
                        min="0"
                        max={duration || 0}
                        value={currentTime}
                        onChange={handleSeek}
                        className="w-full h-2 bg-white/20 rounded-full appearance-none cursor-pointer
                                 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 
                                 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-red-600 
                                 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer
                                 [&::-webkit-slider-thumb]:shadow-lg hover:[&::-webkit-slider-thumb]:bg-red-700"
                        style={{
                            background: `linear-gradient(to right, #dc2626 0%, #dc2626 ${(currentTime / duration) * 100}%, rgba(255,255,255,0.2) ${(currentTime / duration) * 100}%, rgba(255,255,255,0.2) 100%)`
                        }}
                    />
                    <div className="flex justify-between text-white text-sm mt-2">
                        <span>{formatTime(currentTime)}</span>
                        <span>{formatTime(duration)}</span>
                    </div>
                </div>

                {/* Control Buttons */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        {/* Play/Pause */}
                        <button
                            onClick={togglePlay}
                            className="p-3 bg-red-600 hover:bg-red-700 rounded-full transition-colors"
                        >
                            {isPlaying ? (
                                <Pause className="w-6 h-6 text-white" fill="white" />
                            ) : (
                                <Play className="w-6 h-6 text-white" fill="white" />
                            )}
                        </button>

                        {/* Skip Back */}
                        <button
                            onClick={() => skip(-10)}
                            className="p-2 hover:bg-white/10 rounded-full transition-colors"
                        >
                            <SkipBack className="w-5 h-5 text-white" />
                        </button>

                        {/* Skip Forward */}
                        <button
                            onClick={() => skip(10)}
                            className="p-2 hover:bg-white/10 rounded-full transition-colors"
                        >
                            <SkipForward className="w-5 h-5 text-white" />
                        </button>

                        {/* Volume */}
                        <div className="flex items-center gap-2 ml-4">
                            <button
                                onClick={toggleMute}
                                className="p-2 hover:bg-white/10 rounded-full transition-colors"
                            >
                                {isMuted || volume === 0 ? (
                                    <VolumeX className="w-5 h-5 text-white" />
                                ) : (
                                    <Volume2 className="w-5 h-5 text-white" />
                                )}
                            </button>
                            <input
                                type="range"
                                min="0"
                                max="1"
                                step="0.1"
                                value={isMuted ? 0 : volume}
                                onChange={handleVolumeChange}
                                className="w-20 h-1 bg-white/20 rounded-full appearance-none cursor-pointer
                                         [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 
                                         [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-white 
                                         [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer"
                            />
                        </div>
                    </div>

                    {/* Fullscreen */}
                    <button
                        onClick={toggleFullscreen}
                        className="p-2 hover:bg-white/10 rounded-full transition-colors"
                    >
                        <Maximize className="w-5 h-5 text-white" />
                    </button>
                </div>
            </motion.div>

            {/* Play Button Overlay (when paused) */}
            {!isPlaying && (
                <motion.button
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    onClick={togglePlay}
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                             p-6 bg-red-600/90 hover:bg-red-700 rounded-full transition-all shadow-2xl"
                >
                    <Play className="w-12 h-12 text-white" fill="white" />
                </motion.button>
            )}
        </div>
    );
}
