import { AppHeader } from "@/modules/layout/AppHeader";
import { Sidebar } from "@/modules/layout/Sidebar";
import { AudioPlayer } from "@/modules/player/AudioPlayer";
import { TrackGrid } from "@/modules/tracks/TrackGrid";
import { css } from "@/styles/css";
import { Box, Flex, Grid, ScrollArea } from "@radix-ui/themes";
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
      <Grid
        rows="1fr min-content"
        style={css({ height: "100%", backgroundColor: "var(--gray-1)" })}
      >
        <Grid columns="fit-content(420px) 1fr" gap="5">
          <Sidebar />
          <Grid rows="auto 1fr">
            <AppHeader />
            <TrackGrid />
          </Grid>
        </Grid>
        <AudioPlayer />
      </Grid>
    </>
  );
}
