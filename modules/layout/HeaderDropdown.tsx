import { appConfig } from "@/config";
import { useGetUserProfile } from "@/hooks/appData";
import { css } from "@/styles/css";
import {
  Avatar,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRoot,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Flex,
  IconButton,
  Text,
} from "@radix-ui/themes";
import { styled } from "@stitches/react";
import { useConnection } from "arweave-wallet-kit";
import {
  BsPersonBoundingBox,
  BsPlugFill,
  BsQuestionCircleFill,
} from "react-icons/bs";

const AVATAR_SIZE = 32;
const AVATAR_RADIUS = `max(var(--radius-1), var(--radius-full) * 0.8)`;

const StyledDropdownMenuItem = styled(DropdownMenuItem, {
  justifyContent: "start",
  gap: "var(--space-2)",
});

interface HeaderDropdownProps {
  address: string | undefined;
}

export const HeaderDropdown = (props: HeaderDropdownProps) => {
  const { disconnect } = useConnection();
  const { data } = useGetUserProfile({ address: props.address });

  if (!props.address) {
    return null;
  }

  const profile = data?.length ? data[0] : undefined;

  return (
    <DropdownMenuRoot>
      <DropdownMenuTrigger>
        <IconButton variant="ghost" color="gray">
          <Avatar
            size="2"
            src={profile?.thumbnailSrc || ``}
            fallback={
              <img
                src={`${appConfig.boringAvatarsUrl}/marble/${AVATAR_SIZE}/${props.address}?square=true`}
                style={css({
                  width: AVATAR_SIZE,
                  height: AVATAR_SIZE,
                  borderRadius: AVATAR_RADIUS,
                })}
              />
            }
            style={css({
              borderRadius: AVATAR_RADIUS,
            })}
          />
        </IconButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent sideOffset={6}>
        <Flex
          style={css({
            padding: "var(--space-1)",
            paddingRight: "var(--space-7)",
            // paddingLeft: "var(--space-3)",
          })}
          gap="3"
        >
          <Avatar
            size="2"
            src={profile?.thumbnailSrc}
            fallback={
              <img
                src={`${appConfig.boringAvatarsUrl}/marble/${AVATAR_SIZE}/${props.address}?square=true`}
                style={css({
                  width: AVATAR_SIZE,
                  height: AVATAR_SIZE,
                  borderRadius: AVATAR_RADIUS,
                })}
              />
            }
            style={css({
              borderRadius: AVATAR_RADIUS,
            })}
          />
          <Flex direction="column">
            <Text
              size="1"
              weight="medium"
              style={css({
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                overflow: "hidden",
                maxWidth: "16ch",
              })}
            >
              {profile?.name || props.address}
            </Text>
            {profile?.name && (
              <Text
                size="1"
                color="gray"
                style={css({
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  maxWidth: "16ch",
                })}
              >
                {props.address}
              </Text>
            )}
          </Flex>
        </Flex>
        <DropdownMenuSeparator style={css({ marginInline: 0 })} />
        <StyledDropdownMenuItem>
          <BsPersonBoundingBox />
          Profile
        </StyledDropdownMenuItem>
        <StyledDropdownMenuItem>
          <BsQuestionCircleFill />
          Help
        </StyledDropdownMenuItem>
        <StyledDropdownMenuItem onSelect={disconnect}>
          <BsPlugFill />
          Disconnect
        </StyledDropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenuRoot>
  );
};
