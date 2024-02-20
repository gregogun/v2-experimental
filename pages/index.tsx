import { appConfig } from "@/config";
import { AppHeader } from "@/modules/layout/AppHeader";
import { Sidebar } from "@/modules/layout/Sidebar";
import { AudioPlayer } from "@/modules/player/AudioPlayer";
import { Profile } from "@/modules/profile";
import { TrackGrid } from "@/modules/tracks/TrackGrid";
import { css } from "@/styles/css";
import { Grid, ScrollArea } from "@radix-ui/themes";
import dynamic from "next/dynamic";
import Head from "next/head";
import { HashRouter, Routes, Route } from "react-router-dom";

const Router = dynamic<React.ComponentProps<typeof HashRouter>>(
  () => import("react-router-dom").then((mod) => mod.HashRouter),
  {
    ssr: false,
  }
);

export default function Home() {
  return (
    <>
      <Head>
        <title>Arcadia - V2</title>
        <meta name="description" content="A platform for forever music" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="favicon.ico" />
      </Head>
      <Router>
        <Grid rows="1fr min-content" style={css({ height: "100%" })}>
          <Grid columns="fit-content(420px) 1fr">
            <Sidebar />
            <Grid
              rows="auto 1fr"
              style={css({ paddingBlockEnd: appConfig.playerMaxHeight })}
            >
              <ScrollArea
                scrollbars="vertical"
                style={css({
                  height: `calc(100dvh - calc(${appConfig.playerMaxHeight})`,
                })}
              >
                <AppHeader />
                <Routes>
                  <Route path="/" element={<TrackGrid />} />
                  <Route path="/profile" element={<Profile />} />
                </Routes>
              </ScrollArea>
            </Grid>
          </Grid>
          <AudioPlayer />
        </Grid>
      </Router>
    </>
  );
}
