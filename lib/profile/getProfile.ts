import { gql } from "../helpers/gql";
import { TransactionEdge } from "arweave-graphql";
import { GetUseProfileProps, Profile } from "@/types";
import { setProfileInfo } from "./setProfileInfo";

export const getProfile = async ({ address }: GetUseProfileProps) => {
  if (!address) {
    throw new Error("No address has been given.");
  }
  try {
    const res = await gql({
      variables: {
        owners: [address],
        tags: [
          {
            name: "Type",
            values: ["profile"],
          },
        ],
      },
    });

    const profiles = res.transactions.edges
      .filter((edge) => edge.node.tags.find((x) => x.name === "Name")?.value)
      .map((edge) => setProfileInfo(edge as TransactionEdge));

    return profiles;
  } catch (error: any) {
    console.error(error);
    throw new Error(error.message);
  }
};
