import { css } from "@/styles/css";
import { Track } from "@/types";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRoot,
  DropdownMenuTrigger,
} from "@radix-ui/themes";
import { styled } from "@stitches/react";
import { Dispatch, SetStateAction } from "react";
import { MdLink, MdPlaylistAdd, MdPlaylistPlay, MdShare } from "react-icons/md";
import { toast } from "sonner";

const StyledDropdownMenuItem = styled(DropdownMenuItem, {
  justifyContent: "start",
  gap: "var(--space-2)",
});

interface ActionsDropdownProps {
  track: Track;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  children: React.ReactNode;
}

export const ActionsDropdown = (props: ActionsDropdownProps) => {
  const handleCopy = async () => {
    if (typeof window === "undefined") {
      return;
    }
    try {
      const origin = window.location.origin;
      await navigator.clipboard.writeText(
        `${origin}/track?tx=${props.track.txid}`
      );
      toast.success("Link copied to clipboard", {
        style: css({ padding: "var(--space-3)" }),
      });
    } catch (err) {
      console.error(err);
      toast.error("Failed to copy link to clipboard", {
        style: css({ padding: "var(--space-3)" }),
      });
    }
  };

  return (
    <DropdownMenuRoot
      open={props.open}
      onOpenChange={(open) => props.setOpen(open ? true : false)}
    >
      <DropdownMenuTrigger>{props.children}</DropdownMenuTrigger>
      <DropdownMenuContent data-track-actions-dropdown>
        <StyledDropdownMenuItem>
          <MdShare />
          Share
        </StyledDropdownMenuItem>
        <StyledDropdownMenuItem onSelect={handleCopy}>
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
  );
};
