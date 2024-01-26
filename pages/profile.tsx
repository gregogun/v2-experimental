import { appConfig } from "@/config";
import { useGetUserProfile } from "@/hooks/appData";
import { AppHeader } from "@/modules/layout/AppHeader";
import { AudioPlayer } from "@/modules/player/AudioPlayer";
import { css } from "@/styles/css";
import {
  AspectRatio,
  Avatar,
  Box,
  Flex,
  Grid,
  IconButton,
  Text,
} from "@radix-ui/themes";
import { styled } from "@stitches/react";
import { useActiveAddress } from "arweave-wallet-kit";
import BoringAvatar from "boring-avatars";
import { BsCopy, BsPatchCheckFill } from "react-icons/bs";

const StyledBoringAvatar = styled(BoringAvatar);

const BANNER_RADIUS = `max(var(--radius-1), var(--radius-4) * 0.8)`;
const AVATAR_RADIUS = `max(var(--radius-3), var(--radius-full) * 0.8)`;
const AVATAR_SIZE = 200;
const OUTLINE_OFFSET = 2;
const BANNER_HEIGHT = 320;
const VOUCHED_ICON_SIZE = 40;

export default function Profile() {
  const address = useActiveAddress();
  const query = typeof window !== "undefined" ? window.location.search : "";
  const urlParams = new URLSearchParams(query);
  const addressFromParams = urlParams.get("addr");

  const addr = addressFromParams || address;

  const { data } = useGetUserProfile({ address: addr });
  const profile = data?.length ? data[0] : undefined;

  const bannerUrl = profile?.bannerSrc
    ? profile.bannerSrc
    : `${appConfig.boringAvatarsUrl}/marble/${AVATAR_SIZE}/${addr}?square=true`;

  const avatarUrl = profile?.avatarSrc
    ? profile.avatarSrc
    : `${appConfig.boringAvatarsUrl}/marble/${AVATAR_SIZE}/${addr}?square=true`;

  if (!addr) {
    // temp
    return (
      <Grid>
        <Text>No wallet found</Text>
      </Grid>
    );
  }

  return (
    <>
      <AppHeader />
      <Box
        style={css({
          height: 1,
          backgroundColor: "var(--slate-5)",
        })}
        mx="-2"
      />
      <Box
        mt="2"
        style={css({
          width: "100%",
          height: BANNER_HEIGHT,
          position: "relative",
        })}
      >
        <Avatar
          src={bannerUrl}
          fallback={<StyledBoringAvatar name={addr} variant="marble" />}
          style={css({
            width: "100%",
            height: "100%",
            aspectRatio: 3 / 1,
            borderRadius: BANNER_RADIUS,
          })}
        />
        <Box
          style={css({
            position: "absolute",
            inset: 0,
            backgroundColor: "var(--black-a5)",
          })}
        />
        <Flex
          gap="5"
          style={css({
            position: "absolute",
            inset: 0,
          })}
          align="center"
          mx="9"
        >
          <Avatar
            src={avatarUrl}
            fallback={
              <BoringAvatar size={AVATAR_RADIUS} name={addr} variant="marble" />
            }
            style={css({
              width: AVATAR_SIZE,
              height: AVATAR_SIZE,
              borderRadius: AVATAR_RADIUS,
              outline: `${OUTLINE_OFFSET}px solid var(--white-a3)`,
              outlineOffset: -OUTLINE_OFFSET,
            })}
          />
          <Flex direction="column">
            <Flex
              align="center"
              gap="2"
              style={css({
                background: "var(--black-a5)",
                padding: "var(--space-3)",
              })}
            >
              <Text
                size="9"
                weight="medium"
                style={css({
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  maxWidth: "20ch",
                  padding: "var(--space-1)",
                })}
              >
                {profile?.name || addr}
              </Text>
              <BsPatchCheckFill
                style={css({
                  width: VOUCHED_ICON_SIZE,
                  height: VOUCHED_ICON_SIZE,
                  color: "var(--accent-9)",
                })}
              />
            </Flex>
            {profile?.name && (
              <Flex
                align="center"
                gap="2"
                style={css({
                  background: "var(--black-a5)",
                  padding: "var(--space-3)",
                })}
              >
                <Text
                  size="6"
                  style={css({
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    maxWidth: "20ch",
                  })}
                >
                  {addr}
                </Text>
                <IconButton size="1" color="gray" variant="ghost">
                  <BsCopy />
                </IconButton>
              </Flex>
            )}
          </Flex>
        </Flex>
      </Box>
      <AudioPlayer />
    </>
  );
}
