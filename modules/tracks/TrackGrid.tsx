import { Box, Grid } from "@radix-ui/themes";
import { TrackCard } from "./TrackCard";
import { TrackItem } from "./TrackItem";

export const TrackGrid = () => {
  return (
    <Grid p="5" gap="9" asChild>
      <ul>
        <TrackCard />
        <Box style={{ maxWidth: 500 }}>
          <TrackItem />
        </Box>
      </ul>
    </Grid>
  );
};
