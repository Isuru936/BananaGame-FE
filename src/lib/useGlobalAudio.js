import { useState, useRef, useEffect } from "react";

function useGlobalAudio() {
  const [volume, setVolume] = useState(0.5); 
  const audioRef = useRef(null); 
  const [isPlaying, setIsPlaying] = useState(false); 

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio("/audios/bee-gees-you-should-be-dancing.mp3");
      audioRef.current.loop = true;
      audioRef.current.volume = volume;
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
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
