import { Profile } from "@/types";
import { gateway } from "@/utils";
import { TransactionEdge } from "arweave-graphql";

export const setProfileInfo = (edge: TransactionEdge): Profile => {
  // casting as the filter in query func is/should be ensuring value exists
  const name = edge.node.tags.find((x) => x.name === "Name")?.value as string;
  const handle = edge.node.tags.find((x) => x.name === "Handle")
    ?.value as string;
  const bio = edge.node.tags.find((x) => x.name === "Bio")?.value as string;

  // casting as the filter in query func is/should be ensuring value exists
  const thumbnailId = edge.node.tags.find((x) => x.name === "Thumbnail")?.value;
  const avatarId = edge.node.tags.find((x) => x.name === "Avatar")?.value;
  const bannerId = edge.node.tags.find((x) => x.name === "Banner")?.value;

  const thumbnailSrc = thumbnailId ? gateway() + "/" + thumbnailId : undefined;
  const avatarSrc = avatarId ? gateway() + "/" + avatarId : undefined;
  const bannerSrc = bannerId ? gateway() + "/" + bannerId : undefined;
  const txid = edge.node.id;
  const cursor = edge.cursor;
  const owner = edge.node.owner.address;

  return {
    txid,
    addr: owner,
    name,
    handle,
    bio,
    thumbnailSrc,
    avatarSrc,
    bannerSrc,
    cursor,
  };
};
