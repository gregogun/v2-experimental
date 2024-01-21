import { css } from "@/styles/css";
import { css as stitchesCss } from "@stitches/react";
import { DotsHorizontalIcon, HeartIcon, PlayIcon } from "@radix-ui/react-icons";
import { AspectRatio, Box, Flex, IconButton, Text } from "@radix-ui/themes";
import { MdPlayArrow } from "react-icons/md";
import { IoMdHeart } from "react-icons/io";
import { styled } from "@stitches/react";

const AlphaIconButton = styled(IconButton, {
  backgroundColor: "transparent",
  color: "var(--white-a10)",

  "&:hover": {
    color: "var(--white-a12)",
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

const childFocused = stitchesCss({
  "& button": {
    "&:focus": {
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
      opacity: 1,
    },
  },
});

export const TrackCard = () => {
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
          {/* <AspectRatio
        className="trackArt"
        ratio={1 / 1}
        style={css({
          objectFit: "cover",
          width: `calc(${TRACK_ITEM_SIZE}px * var(--scaling))`,
          height: `calc(${TRACK_ITEM_SIZE}px * var(--scaling))`,
          outline: `${OUTLINE_OFFSET}px solid var(--white-a3)`,
          outlineOffset: -OUTLINE_OFFSET,
          position: "relative",
        })}
      > */}
          <Box
            style={css({
              width: `calc(${TRACK_ITEM_SIZE}px * var(--scaling))`,
              height: `calc(${TRACK_ITEM_SIZE}px * var(--scaling))`,
              outline: `${OUTLINE_OFFSET}px solid var(--white-a3)`,
              outlineOffset: -OUTLINE_OFFSET,
              position: "relative",
            })}
          >
            <Flex
              justify="between"
              align="end"
              gap="3"
              style={css({
                width: "100%",
                height: "100%",
                position: "absolute",
                padding: "var(--space-3)",
                opacity: 0,

                "&:showOverlay": {
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
                  opacity: 1,
                },
              })}
            >
              <AlphaPlayIconButton variant="soft" size="4">
                <MdPlayArrow />
              </AlphaPlayIconButton>
              <Flex align="center" gap="3">
                <AlphaIconButton size="2" variant="ghost" highContrast>
                  <IoMdHeart width={15} height={15} />
                </AlphaIconButton>
                <AlphaIconButton size="2" variant="ghost" highContrast>
                  <DotsHorizontalIcon />
                </AlphaIconButton>
              </Flex>
            </Flex>
            <img
              src="https://images.unsplash.com/photo-1479030160180-b1860951d696?&auto=format&fit=crop&w=1200&q=80"
              alt="A house in a forest"
              style={css({
                objectFit: "cover",
                width: "100%",
                height: "100%",
              })}
            />
            {/* </AspectRatio> */}
          </Box>
          <Flex direction="column">
            <Text size="1">Permanence</Text>
            <Text size="1" color="gray">
              Arnold Winston
            </Text>
          </Flex>
        </Flex>
      </li>
    </Box>
  );
};
