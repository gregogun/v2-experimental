import { AppHeader } from "@/modules/layout/AppHeader";
import { TrackGrid } from "@/modules/tracks/TrackGrid";
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
      <TrackGrid />
    </>
  );
}
