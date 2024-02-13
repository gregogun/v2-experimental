import { useEffect, useRef, useState } from "react";
import { WavesurferProps, useWavesurfer } from "@wavesurfer/react";
import { Box } from "@radix-ui/themes";
import { useAudioPlayer } from "@/hooks/useAudioPlayer";
import WaveSurfer from "wavesurfer.js";
import { css } from "@/styles/css";
import { Track } from "@/types";

interface TrackWaveformProps {
  src: string;
  track: Track;
}

export const TrackWaveform = (props: TrackWaveformProps) => {
  const [waveColor, setWaveColor] = useState<string | undefined>();
  const [progressColor, setProgressColor] = useState<string | undefined>();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { audioRef, playing, currentTrackId } = useAudioPlayer();

  const isCurrentTrack = currentTrackId === props.track.txid;

  const ws = useWavesurfer({
    container: containerRef,
    height: 60,
    barWidth: 3,
    waveColor: waveColor,
    progressColor: progressColor,
    url: props.src,
    backend: "WebAudio",
    media: audioRef.current as HTMLAudioElement | undefined,
    dragToSeek: true,
    cursorWidth: 0,
    interact: isCurrentTrack ? true : false,
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const style = getComputedStyle(document.documentElement);
      const wave = style.getPropertyValue("--gray-11").trim();

      if (containerRef.current) {
        const containerStyles = getComputedStyle(containerRef.current);
        const progress = containerStyles.getPropertyValue("--orange-9").trim();
        setProgressColor(progress);
      }

      setWaveColor(wave);
    }
  }, []);

  useEffect(() => {}, []);

  return <Box ref={containerRef} style={css({ height: 100, maxWidth: 800 })} />;
};
