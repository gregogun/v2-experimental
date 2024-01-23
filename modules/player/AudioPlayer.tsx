import { appConfig } from "@/config";
import { useAudioPlayer } from "@/hooks/useAudioPlayer";
import { css } from "@/styles/css";
import { formatTime } from "@/utils";
import {
  Avatar,
  Box,
  Flex,
  Grid,
  IconButton,
  Link,
  Slider,
  Text,
} from "@radix-ui/themes";
import { useEffect, useRef, useState } from "react";
import { BsMusicNote } from "react-icons/bs";
import { IoIosVolumeLow } from "react-icons/io";
import {
  MdLoop,
  MdPause,
  MdPlayArrow,
  MdShuffle,
  MdSkipNext,
  MdSkipPrevious,
} from "react-icons/md";

const ARTWORK_SIZE = 40;
const OUTLINE_OFFSET = 0.5;
const TRACK_ITEM_RADIUS = `max(var(--radius-1), var(--radius-4) * 0.7)`;

const AvatarFallback = () => (
  <Grid
    style={css({
      width: `calc(${ARTWORK_SIZE}px * var(--scaling))`,
      height: `calc(${ARTWORK_SIZE}px * var(--scaling))`,
      placeItems: "center",
    })}
  >
    <BsMusicNote />
  </Grid>
);

export const AudioPlayer = () => {
  const [progressStep, setProgressStep] = useState<number>(0.01);
  const [scrubbedValue, setScrubbedValue] = useState<number | undefined>(
    undefined
  );
  const [scrubbing, setScrubbing] = useState<boolean>();
  const [duration, setDuration] = useState<number>();
  const [currentTime, setCurrentTime] = useState<number>(0);
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);

  const {
    audioRef,
    gainRef,
    audioCtxRef,
    setCurrentTrackId,
    tracklist,
    playing,
    togglePlaying,
    toggleLoop,
    toggleShuffle,
    handleTrackEnd,
    currentTrackIndex,
    handleNextTrack,
    handlePrevTrack,
    shuffle,
    loop,
  } = useAudioPlayer();

  const isMediaSessionAvailable =
    typeof window !== "undefined" && "mediaSession" in window.navigator;

  const currentTrack =
    tracklist.length > 0 ? tracklist[currentTrackIndex] : null;

  // Do we need this? Can it be moved to hook?
  useEffect(() => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new AudioContext();
    }

    // set gain node
    if (!gainRef.current) {
      gainRef.current = audioCtxRef.current.createGain();
    }

    // set media element source
    if (!sourceRef.current) {
      sourceRef.current = audioCtxRef.current.createMediaElementSource(
        audioRef.current as HTMLMediaElement
      );
      sourceRef.current
        .connect(gainRef.current)
        .connect(audioCtxRef.current.destination);
    }

    if (audioRef.current) {
      // allow audio to be played from gateways
      audioRef.current.crossOrigin = "anonymous";
    }
  }, []);

  /* EVENT HANDLERS */

  const handleValueChange = (e: number[]) => {
    if (!gainRef.current) return;

    gainRef.current.gain.value = e[0] / 100;
  };

  const handleProgressChange = (e: number[]) => {
    if (!audioRef.current) return;

    setScrubbing(true);
    setScrubbedValue(e[0]);
  };

  const handleProgressCommit = (e: number[]) => {
    if (!audioRef.current) return;

    setScrubbing(false);
    audioRef.current.currentTime = e[0];
    setCurrentTime(e[0]);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
      setProgressStep(5);
    }
  };

  // set duration
  useEffect(() => {
    if (!audioRef.current) return;

    const seconds = Math.floor(audioRef.current?.duration || 0);
    setDuration(seconds);
    const current = Math.floor(audioRef.current?.currentTime || 0);
    setCurrentTime(current);
  }, [audioRef?.current?.onloadeddata, audioRef?.current?.readyState]);

  // if ("mediaSession" in navigator) {
  //   navigator.mediaSession.setActionHandler("previoustrack", () => {
  //     handlePrevTrack?.();
  //   });

  //   navigator.mediaSession.setActionHandler("nexttrack", () => {
  //     handleNextTrack?.();
  //   });
  // }

  const handleTimeUpdate = () => {
    // check for current runs in useffect
    setCurrentTime(audioRef.current?.currentTime as number);
  };

  const handleLoadedData = () => {
    if (audioRef.current?.readyState && audioRef.current?.readyState >= 2) {
      audioRef.current?.play();
    }
  };

  const handlePlay = () => {
    togglePlaying?.("play");
  };

  const handlePause = () => {
    togglePlaying?.("pause");
  };

  return (
    <Box
      style={css({
        display: "grid",
        gridTemplateColumns: "1fr 2fr 1fr",
        width: "100%",
        height: "max-content",
        padding: "var(--space-2)",
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        backdropFilter: "blur(10px)",
        maxHeight: "max-content",
        borderTop: "1px solid var(--gray-5)",
      })}
    >
      <audio
        ref={audioRef}
        onEnded={handleTrackEnd}
        onTimeUpdate={handleTimeUpdate}
        onLoadedData={handleLoadedData}
        onPlay={handlePlay}
        onPause={handlePause}
      >
        <source src={currentTrack?.audioSrc} type="audio/wav" />
        <source src={currentTrack?.audioSrc} type="audio/mpeg" />
        <source src={currentTrack?.audioSrc} type="audio/aac" />
        <source src={currentTrack?.audioSrc} type="audio/ogg" />
      </audio>

      <Flex gap="3" align="center">
        <Avatar
          src={`${currentTrack?.thumbnailSrc}`}
          fallback={<AvatarFallback />}
          color="gray"
          style={css({
            width: `calc(${ARTWORK_SIZE}px * var(--scaling))`,
            height: `calc(${ARTWORK_SIZE}px * var(--scaling))`,
            outline: `${OUTLINE_OFFSET}px solid var(--white-a3)`,
            outlineOffset: -OUTLINE_OFFSET,
            borderRadius: TRACK_ITEM_RADIUS,
          })}
        />
        {currentTrack && (
          <Flex direction="column">
            <Link
              style={css({ color: "var(--gray-12)" })}
              size="1"
              weight="medium"
              color="gray"
            >
              {currentTrack.title}
            </Link>
            <Link
              size="1"
              color="gray"
              style={css({
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                overflow: "hidden",
                maxWidth: "16ch",
              })}
            >
              {currentTrack?.creator}
            </Link>
          </Flex>
        )}
      </Flex>

      <Flex direction="column">
        <Flex
          align="center"
          gap="3"
          style={css({
            margin: "var(--space-1) auto",
          })}
        >
          <IconButton
            onClick={() => toggleShuffle?.()}
            size="1"
            variant="ghost"
            disabled={tracklist.length < 2}
            style={css({
              color: `var(--${shuffle ? "accent" : "gray"}-11)`,

              "&:notDisabeld": {
                "&:hover": {
                  backgroundColor: `var(--${shuffle ? "accent" : "gray"}-4)`,
                },
              },

              "&:active": {
                backgroundColor: `var(--${shuffle ? "accent" : "gray"}-5)`,
              },

              "&:disabled": {
                color: "var(--gray-a8)",
              },
            })}
          >
            <MdShuffle />
          </IconButton>
          <IconButton
            onClick={() => {
              handlePrevTrack?.();
            }}
            color="gray"
            size="1"
            variant="ghost"
            disabled={tracklist.length < 2}
          >
            <MdSkipPrevious />
          </IconButton>
          <IconButton
            onClick={() => togglePlaying?.()}
            color="gray"
            size="2"
            highContrast
            disabled={!tracklist.length}
          >
            {playing ? <MdPause /> : <MdPlayArrow />}
          </IconButton>
          <IconButton
            onClick={() => {
              handleNextTrack?.();
            }}
            color="gray"
            size="1"
            variant="ghost"
            disabled={tracklist.length < 2}
          >
            <MdSkipNext />
          </IconButton>
          <IconButton
            onClick={() => toggleLoop?.()}
            size="1"
            variant="ghost"
            disabled={tracklist.length < 2}
            style={css({
              transform: "rotate(90deg)",
              color: `var(--${loop ? "accent" : "gray"}-11)`,

              "&:notDisabeld": {
                "&:hover": {
                  backgroundColor: `var(--${loop ? "accent" : "gray"}-4)`,
                },
              },

              "&:active": {
                backgroundColor: `var(--${loop ? "accent" : "gray"}-5)`,
              },

              "&:disabled": {
                color: "var(--gray-a8)",
              },
            })}
          >
            <MdLoop />
          </IconButton>
        </Flex>

        <Flex align="center" gap="2" style={css({ flex: 1 })}>
          <Text style={css({ fontSize: 11 })} color="gray">
            {scrubbing
              ? formatTime(scrubbedValue as number)
              : formatTime(currentTime)}
          </Text>

          <Box style={css({ flex: 1 })}>
            <Slider
              onKeyDown={handleKeyDown as any}
              defaultValue={[0]}
              size="1"
              value={scrubbing ? [scrubbedValue as number] : [currentTime]}
              max={duration}
              step={progressStep}
              aria-label="Track Progress"
              onValueChange={(e) => handleProgressChange(e)}
              onValueCommit={handleProgressCommit}
            />
          </Box>

          <Text style={css({ fontSize: 11 })} color="gray">
            {duration && !isNaN(duration) ? formatTime(duration) : `0:00`}
          </Text>
        </Flex>
      </Flex>
      <Flex align="center" justify="end" gap="3" style={css({ flex: 1 })}>
        <Flex
          style={css({
            flex: 1,
            maxWidth: 150,
            position: "relative",
            right: "var(--space-5)",
          })}
          align="center"
          gap="3"
        >
          <IoIosVolumeLow />
          <Box
            style={css({
              flex: 1,
            })}
          >
            <Slider
              defaultValue={[50]}
              max={100}
              step={progressStep}
              aria-label="Volume"
              onValueChange={(e) => handleValueChange(e)}
              onKeyDown={handleKeyDown as any}
              size="1"
            />
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
};
