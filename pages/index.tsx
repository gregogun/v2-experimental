import { AppHeader } from "@/modules/layout/AppHeader";
import { AudioPlayer } from "@/modules/player/AudioPlayer";
import { TrackGrid } from "@/modules/tracks/TrackGrid";
import { css } from "@/styles/css";
import { Box } from "@radix-ui/themes";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Arcadia - V2</title>
        <meta name="description" content="A platform for forever music" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="favicon.ico" />
      </Head>
      <AppHeader />
      <Box
        style={css({
          height: 1,
          backgroundColor: "var(--slate-5)",
        })}
        mx="-2"
      />
      <TrackGrid />
      <AudioPlayer />
    </>
  );
}
