import { Flex, Grid } from "@radix-ui/themes";
import { TrackCard } from "./TrackCard";
import { TrackItem } from "./TrackItem";
import { useEffect, useState } from "react";
import { getTrack } from "@/lib/track/getTrack";
import { Track } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { getTracks } from "@/lib/track/getTracks";

export const TrackGrid = () => {
  const { data: tracks } = useQuery({
    queryKey: [`tracks`],
    refetchOnWindowFocus: false,
    queryFn: () => getTracks({ txids: undefined }),
  });

  return (
    <Flex direction="column" gap="8">
      <Grid p="3" asChild columns="5" gap="3" width="auto">
        <ul>
          {tracks?.length &&
            tracks.map((track, idx) => (
              <TrackCard
                key={track.txid}
                track={track}
                tracks={tracks}
                trackIndex={idx}
              />
            ))}
        </ul>
      </Grid>
      <Grid p="3" gap="2" asChild>
        <ul>
          {tracks?.length &&
            tracks.map((track, idx) => (
              <TrackItem
                key={track.txid}
                track={track}
                tracks={tracks}
                trackIndex={idx}
              />
            ))}
        </ul>
      </Grid>
    </Flex>
  );
};
