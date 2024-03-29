import { css } from "@/styles/css";
import { Box, Flex, IconButton, Link, Text } from "@radix-ui/themes";
import { MdPause, MdPlayArrow } from "react-icons/md";
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import { styled } from "@stitches/react";
import { useState } from "react";
import { ActionsDropdown } from "./ActionsDropdown";
import { RxDotsHorizontal } from "react-icons/rx";
import { Track } from "@/types";
import { useAudioPlayer } from "@/hooks/useAudioPlayer";

const ActionsOverlay = styled(Flex, {
  width: "100%",
  height: "100%",
  position: "absolute",
  padding: "var(--space-3)",
  opacity: 0,
  background: `linear-gradient(
    to top,
    var(--black-a12) 0%,
    var(--black-a3) 50%,
    var(--black-a2) 65%,
    var(--black-a1) 75.5%,
    var(--black-a1) 82.85%,
    var(--black-a1) 88%,
    var(--black-a1) 100%
      )`,

  "&:hover, &:has(:focus-visible)": {
    opacity: 1,
  },

  variants: {
    showOverlay: {
      true: {
        opacity: 1,
      },
    },
  },
});

const AlphaIconButton = styled(IconButton, {
  color: "var(--white-a10)",

  "&:hover": {
    backgroundColor: "var(--white-a4)",
    color: "var(--white-a12)",
  },

  variants: {
    liked: {
      true: {
        color: "var(--accent-9)",
        "&:hover": {
          backgroundColor: "var(--white-a4)",
          color: "var(--accent-10)",
        },
      },
    },
  },
});

const TRACK_ITEM_SIZE = 180;
const OUTLINE_OFFSET = 0.5;
const TRACK_ITEM_RADIUS = `max(var(--radius-1), var(--radius-4) * 0.6)`;

interface TrackCardProps {
  track: Track;
  tracks: Track[];
  trackIndex: number;
}

export const TrackCard = ({ track, tracks, trackIndex }: TrackCardProps) => {
  const [actionsDropdownOpen, setActionsDropdownOpen] = useState(false);
  const [liked, setLiked] = useState(false);
  const {
    playing,
    togglePlaying,
    currentTrackId,
    setTracklist,
    setCurrentTrackId,
    setCurrentTrackIndex,
    handlePlayPause,
  } = useAudioPlayer();

  const isPlaying = playing && currentTrackId === track.txid;

  const handleClick = () => {
    handlePlayPause?.();

    if (currentTrackId === track.txid) {
      togglePlaying?.();
    } else {
      if (trackIndex >= 0) {
        setTracklist?.(tracks, trackIndex);
        setCurrentTrackId?.(track.txid);
        setCurrentTrackIndex?.(trackIndex);
      }
    }
  };

  return (
    <Box
      asChild
      style={css({
        width: `calc(${TRACK_ITEM_SIZE}px * var(--scaling))`,
      })}
    >
      <li>
        <Flex
          direction="column"
          gap="2"
          style={css({
            position: "relative",
          })}
        >
          <Box
            style={css({
              width: `calc(${TRACK_ITEM_SIZE}px * var(--scaling))`,
              height: `calc(${TRACK_ITEM_SIZE}px * var(--scaling))`,
              outline: `${OUTLINE_OFFSET}px solid var(--white-a3)`,
              outlineOffset: -OUTLINE_OFFSET,
              borderRadius: TRACK_ITEM_RADIUS,
              overflow: "hidden",
              position: "relative",
            })}
          >
            <ActionsOverlay
              justify="between"
              align="end"
              gap="3"
              showOverlay={actionsDropdownOpen || isPlaying}
            >
              <IconButton onClick={handleClick} size="3">
                {isPlaying ? <MdPause /> : <MdPlayArrow />}
              </IconButton>
              <Flex align="center" gap="3">
                <AlphaIconButton
                  onClick={() => setLiked(!liked)}
                  liked={liked}
                  size="2"
                  variant="ghost"
                  highContrast
                >
                  {liked ? <IoMdHeart /> : <IoMdHeartEmpty />}
                </AlphaIconButton>
                <ActionsDropdown
                  track={track}
                  open={actionsDropdownOpen}
                  setOpen={setActionsDropdownOpen}
                >
                  <AlphaIconButton variant="ghost" size="1" color="gray">
                    <RxDotsHorizontal />
                  </AlphaIconButton>
                </ActionsDropdown>
              </Flex>
            </ActionsOverlay>
            <img
              src={track.thumbnailSrc}
              alt={`Cover artwork for ${track.title}`}
              style={css({
                objectFit: "cover",
                width: "100%",
                height: "100%",
              })}
            />
          </Box>
          <Flex direction="column">
            <Link
              size="1"
              weight="medium"
              style={css({
                color: isPlaying ? "var(--accent-11)" : "var(--gray-12)",
              })}
            >
              {track.title}
            </Link>
            <Link
              size="1"
              color="gray"
              style={css({
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                overflow: "hidden",
                maxWidth: "20ch",
              })}
            >
              {track.creator}
            </Link>
          </Flex>
        </Flex>
      </li>
    </Box>
  );
};
