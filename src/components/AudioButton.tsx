import React, { useState } from 'react';
import { Volume2, VolumeX, Loader2 } from 'lucide-react';
import { speakFrench, stopSpeech } from '../utils/speech';

interface AudioButtonProps {
  text: string;
  rate?: number;
  preferCanadian?: boolean;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  label?: string;
}

export const AudioButton: React.FC<AudioButtonProps> = ({
  text,
  rate = 0.85,
  preferCanadian = false,
  className = '',
  size = 'sm',
  label
}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (isPlaying) {
      stopSpeech();
      setIsPlaying(false);
      return;
    }

    setIsPlaying(true);
    speakFrench(text, {
      rate,
      preferCanadian,
      onStart: () => setIsPlaying(true),
      onEnd: () => setIsPlaying(false),
      onError: () => setIsPlaying(false)
    });
  };

  const sizeClasses = {
    sm: 'p-1.5 text-xs',
    md: 'p-2 text-sm',
    lg: 'px-3 py-2 text-base'
  }[size];

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={`Écouter la prononciation : ${text}`}
      title={`Écouter : "${text}"`}
      className={`inline-flex items-center gap-1.5 rounded-full font-medium transition-all duration-200 active:scale-95 ${
        isPlaying
          ? 'bg-amber-500 text-white shadow-md animate-pulse'
          : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100 hover:text-indigo-900 border border-indigo-200'
      } ${sizeClasses} ${className}`}
    >
      {isPlaying ? (
        <VolumeX className="w-4 h-4 animate-spin-slow" />
      ) : (
        <Volume2 className="w-4 h-4" />
      )}
      {label && <span>{label}</span>}
    </button>
  );
};
