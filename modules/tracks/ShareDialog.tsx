import { css } from "@/styles/css";
import { DialogOpenProps, Track } from "@/types";
import {
  Box,
  DialogClose,
  DialogContent,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
  Flex,
  Heading,
  IconButton,
  Text,
} from "@radix-ui/themes";
import { Dispatch, MutableRefObject, SetStateAction } from "react";
import { BsTelegram, BsTwitterX, BsWhatsapp } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";

const HEADING_SIZE = 4;
const TRACK_ARTWORK_SIZE = 80;
const OUTLINE_OFFSET = 0.5;
const TRACK_ARTWORK_RADIUS = `max(var(--radius-1), var(--radius-4) * 0.6)`;

interface ShareDialogProps {
  track: Track;
  open: boolean;
  setOpen: Dispatch<SetStateAction<DialogOpenProps>>;
  triggerRef: MutableRefObject<HTMLButtonElement | null>;
  children: React.ReactNode;
}

export const ShareDialog = (props: ShareDialogProps) => {
  return (
    <DialogRoot
      open={props.open}
      onOpenChange={(open) => {
        props.setOpen({ open: open ? true : false, name: "share" });
        props.triggerRef.current?.focus();
      }}
    >
      <DialogTrigger>{props.children}</DialogTrigger>
      <DialogContent style={css({ maxWidth: 500, position: "relative" })}>
        <DialogTitle size={`${HEADING_SIZE}`}>
          Share this sound with the world
        </DialogTitle>

        <DialogClose>
          <IconButton
            color="gray"
            variant="soft"
            style={css({
              position: "absolute",
              right: "var(--space-3)",
              top: "var(--space-3)",
            })}
          >
            <RxCross2 />
          </IconButton>
        </DialogClose>

        <Flex
          gap="5"
          mt="5"
          style={css({
            padding: "var(--space-3)",
            backgroundColor: "var(--gray-3)",
            borderRadius: TRACK_ARTWORK_RADIUS,
          })}
        >
          <Box
            style={css({
              width: `calc(${TRACK_ARTWORK_SIZE}px * var(--scaling))`,
              height: `calc(${TRACK_ARTWORK_SIZE}px * var(--scaling))`,
              outline: `${OUTLINE_OFFSET}px solid var(--white-a3)`,
              outlineOffset: -OUTLINE_OFFSET,
              borderRadius: TRACK_ARTWORK_RADIUS,
              overflow: "hidden",
              position: "relative",
            })}
          >
            <img
              src={props.track.thumbnailSrc}
              alt={`Cover artwork for ${props.track.title}`}
              style={css({
                objectFit: "cover",
                width: "100%",
                height: "100%",
              })}
            />
          </Box>
          <Flex direction="column" justify="between">
            <Box>
              <Text weight="medium">{props.track.title}</Text>
              <Text
                color="gray"
                style={css({
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  maxWidth: "24ch",
                  display: "block",
                })}
              >
                {props.track.creator}
              </Text>
            </Box>
            <Text size="1">2:36</Text>
          </Flex>
        </Flex>

        <Flex mt="5" direction="column" gap="3" align="center">
          <Text size="2" color="gray">
            Share this track via:{" "}
          </Text>
          <Flex align="center" justify="center" gap="5">
            <IconButton size="4" variant="soft">
              <BsTwitterX />
            </IconButton>
            <IconButton size="4" variant="soft">
              <BsWhatsapp />
            </IconButton>
            <IconButton size="4" variant="soft">
              <BsTelegram />
            </IconButton>
          </Flex>
        </Flex>
      </DialogContent>
    </DialogRoot>
  );
};
