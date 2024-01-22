import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRoot,
  DropdownMenuTrigger,
} from "@radix-ui/themes";
import { styled } from "@stitches/react";
import { MdLink, MdPlaylistAdd, MdPlaylistPlay, MdShare } from "react-icons/md";

const StyledDropdownMenuItem = styled(DropdownMenuItem, {
  justifyContent: "start",
  gap: "var(--space-2)",
});

interface ActionsDropdownProps {
  open: boolean;
  onClose: () => void;
}

export const ActionsDropdown = (props: ActionsDropdownProps) => {
  return (
    <DropdownMenuRoot open={props.open} onOpenChange={props.onClose}>
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
  );
};
