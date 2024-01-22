import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRoot,
  DropdownMenuTrigger,
} from "@radix-ui/themes";
import { styled } from "@stitches/react";
import { Dispatch, SetStateAction } from "react";
import { MdLink, MdPlaylistAdd, MdPlaylistPlay, MdShare } from "react-icons/md";

const StyledDropdownMenuItem = styled(DropdownMenuItem, {
  justifyContent: "start",
  gap: "var(--space-2)",
});

interface ActionsDropdownProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  children: React.ReactNode;
}

export const ActionsDropdown = (props: ActionsDropdownProps) => {
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
