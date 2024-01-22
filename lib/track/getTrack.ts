import { GetTrack } from "@/types/query";
import { gql } from "../helpers/gql";
import { appConfig } from "@/config";
import { setTrackInfo } from "../helpers/setTrackInfo";
import { TransactionEdge } from "arweave-graphql";

export const getTrack = async ({ txid }: GetTrack) => {
  try {
    const res = await gql({
      variables: {
        ids: [txid],
        tags: [
          {
            name: "Content-Type",
            values: appConfig.acceptedFileTypes.streamableAudio,
          },
        ],
      },
    });

    const track = res.transactions.edges.map((edge) =>
      setTrackInfo(edge as TransactionEdge)
    );

    if (track.length) {
      return track[0];
    } else {
      return {};
    }
  } catch (error: any) {
    console.error(error);
    throw new Error(error.message);
  }
};
