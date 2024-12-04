import { useState, useRef, useEffect } from "react";

function useGlobalAudio() {
  const [volume, setVolume] = useState(0.5); // Default volume (0.0 to 1.0)
  const audioRef = useRef(null); // Ref for audio element
  const [isPlaying, setIsPlaying] = useState(false); // Track play/pause state

  useEffect(() => {
    // Initialize the audio element if not already created
    if (!audioRef.current) {
      audioRef.current = new Audio("/audios/bee-gees-you-should-be-dancing.mp3");
      audioRef.current.loop = true; // Enable looping
      audioRef.current.volume = volume; // Set initial volume
    }

    // Cleanup on unmount
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null; // Clean up the audio object
      }
    };
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch((err) =>
          console.error("Playback error:", err)
        );
      }
      setIsPlaying(!isPlaying);
    }
  };

  useEffect(() => {
    // Update the audio volume whenever `volume` changes
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  return { audioRef, isPlaying, togglePlay, volume, setVolume };
}

export default useGlobalAudio;
