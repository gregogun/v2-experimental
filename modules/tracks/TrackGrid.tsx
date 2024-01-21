import { Grid } from "@radix-ui/themes";
import { TrackCard } from "./TrackCard";

export const TrackGrid = () => {
  return (
    <Grid p="5" asChild>
      <ul>
        <TrackCard />
      </ul>
    </Grid>
  );
};
