import { Grid } from "@radix-ui/themes";
import { TrackCard } from "./TrackCard";
import { TrackItem } from "./TrackItem";
import { useEffect, useState } from "react";
import { getTrack } from "@/lib/track/getTrack";
import { Track } from "@/types";

export const TrackGrid = () => {
  const [track, setTrack] = useState<Track>();

  useEffect(() => {
    const fetchTrack = async () => {
      const track = await getTrack({
        txid: "dPphYEIrNXd0GUsDNqCiUWshIT-uHuPZRE-i-9Iu910",
      });

      if (track) {
        console.log(track);
        setTrack(track);
      }
    };
    fetchTrack();
  }, []);

  return (
    <Grid p="5" gap="9" asChild>
      <ul>
        {track && (
          <>
            <TrackCard track={track} />
            <TrackItem track={track} />
          </>
        )}
      </ul>
    </Grid>
  );
};
