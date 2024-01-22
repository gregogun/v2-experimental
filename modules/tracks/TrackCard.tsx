import { css } from "@/styles/css";
import { css as stitchesCss } from "@stitches/react";
import { DotsHorizontalIcon, HeartIcon, PlayIcon } from "@radix-ui/react-icons";
import {
  AspectRatio,
  Box,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRoot,
  DropdownMenuTrigger,
  Flex,
  IconButton,
  Text,
} from "@radix-ui/themes";
import {
  MdLink,
  MdPause,
  MdPlayArrow,
  MdPlaylistAdd,
  MdPlaylistPlay,
  MdShare,
} from "react-icons/md";
import { IoMdHeart } from "react-icons/io";
import { styled } from "@stitches/react";
import { useState } from "react";

const StyledDropdownMenuItem = styled(DropdownMenuItem, {
  justifyContent: "start",
  gap: "var(--space-2)",
});

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
});

const AlphaIconButton = styled(IconButton, {
  backgroundColor: "transparent",
  color: "var(--white-a10)",

  "&:hover": {
    color: "var(--white-a12)",
  },

  variants: {
    liked: {
      true: {
        color: "var(--red-9)",
        "&:hover": {
          color: "var(--red-10)",
        },
      },
    },
  },
});

const AlphaPlayIconButton = styled(IconButton, {
  backgroundColor: "var(--white-a3)",
  color: "var(--white-a11)",

  "&:hover": {
    backgroundColor: "var(--white-a4)",
    color: "var(--white-a12)",
  },

  "&:active": {
    backgroundColor: "var(--white-a5)",
  },
});

const TRACK_ITEM_SIZE = 220;
const OUTLINE_OFFSET = 0.5;
const TRACK_ITEM_RADIUS = `max(var(--radius-1), var(--radius-4) * 0.6)`;

export const TrackCard = () => {
  const [playing, setPlaying] = useState(false);
  const [liked, setLiked] = useState(false);

  return (
    <Box asChild>
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
            <ActionsOverlay justify="between" align="end" gap="3">
              <AlphaPlayIconButton
                onClick={() => setPlaying(!playing)}
                variant="soft"
                size="3"
              >
                {playing ? <MdPause /> : <MdPlayArrow />}
              </AlphaPlayIconButton>
              <Flex align="center" gap="3">
                <AlphaIconButton
                  onClick={() => setLiked(!liked)}
                  liked={liked}
                  size="2"
                  variant="ghost"
                  highContrast
                >
                  <IoMdHeart width={15} height={15} />
                </AlphaIconButton>
                <DropdownMenuRoot>
                  <DropdownMenuTrigger>
                    <AlphaIconButton size="2" variant="ghost" highContrast>
                      <DotsHorizontalIcon />
                    </AlphaIconButton>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent data-track-actions-dropdown>
                    <StyledDropdownMenuItem>
                      <MdShare />
                      Share
                    </StyledDropdownMenuItem>
                    <StyledDropdownMenuItem>
                      <MdLink />
                      Copy link
                    </StyledDropdownMenuItem>
                    <StyledDropdownMenuItem>
                      <MdPlaylistAdd />
                      Add to playlist
                    </StyledDropdownMenuItem>
                    <StyledDropdownMenuItem>
                      <MdPlaylistPlay />
                      Add to queue
                    </StyledDropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenuRoot>
              </Flex>
            </ActionsOverlay>
            <img
              src="https://images.unsplash.com/photo-1479030160180-b1860951d696?&auto=format&fit=crop&w=1200&q=80"
              alt="A house in a forest"
              style={css({
                objectFit: "cover",
                width: "100%",
                height: "100%",
              })}
            />
          </Box>
          <Flex direction="column">
            <Text size="1">Track Title</Text>
            <Text size="1" color="gray">
              Artist Name
            </Text>
          </Flex>
        </Flex>
      </li>
    </Box>
  );
};
