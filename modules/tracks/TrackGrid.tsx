import { Grid } from "@radix-ui/themes";
import { TrackItem } from "./TrackItem";

export const TrackGrid = () => {
  return (
    <Grid p="5" asChild>
      <ul>
        <TrackItem />
      </ul>
    </Grid>
  );
};
