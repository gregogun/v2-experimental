import { css } from "@/styles/css";
import { Box, Flex, IconButton, Text } from "@radix-ui/themes";
import { MdPause, MdPlayArrow } from "react-icons/md";
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import { styled } from "@stitches/react";
import { useState } from "react";
import { ActionsDropdown } from "./ActionsDropdown";
import { RxDotsHorizontal } from "react-icons/rx";

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
  const [actionsDropdownOpen, setActionsDropdownOpen] = useState(false);
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
            <ActionsOverlay
              justify="between"
              align="end"
              gap="3"
              showOverlay={actionsDropdownOpen}
            >
              <AlphaPlayIconButton
                onClick={() => setPlaying(!playing)}
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
                  {liked ? <IoMdHeart /> : <IoMdHeartEmpty />}
                </AlphaIconButton>
                <ActionsDropdown
                  open={actionsDropdownOpen}
                  setOpen={setActionsDropdownOpen}
                >
                  <AlphaIconButton variant="ghost" size="1" highContrast>
                    <RxDotsHorizontal />
                  </AlphaIconButton>
                </ActionsDropdown>
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
