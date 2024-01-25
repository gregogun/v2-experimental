// UI
export type IconProps = {
  width?: number | string | undefined;
  height?: number | string | undefined;
};

export interface DialogOpenProps {
  // name is for if we have multiple dialogs inside dropdown
  name?: "share";
  open: boolean;
}

// Data
export type License = {
  tx: string | undefined;
  access: string | undefined;
  accessFee: string | undefined;
  commercial: string | undefined;
  derivative: string | undefined;
  licenseFee: string | undefined;
  paymentMode: string | undefined;
  currency: string | undefined;
};

export type Track = {
  title: string;
  creator: string;
  audioSrc: string;
  thumbnailSrc: string;
  artworkSrc: string;
  txid: string;
  cursor: string;
};

export type Tracklist = Track[];

export interface GetUseProfileProps {
  address: string | undefined;
}

export interface Profile {
  txid: string;
  addr: string;
  name: string;
  handle: string | undefined;
  thumbnailSrc: string | undefined;
  avatarSrc: string | undefined;
  bannerSrc: string | undefined;
  bio: string | undefined;
  links?: {
    [link: string]: string;
  };
  cursor: string;
}

// Interfaces for aoconnect
export interface SpawnProcessParams {
  moduleTxId: string;
  signer: any; // Replace 'any' with the specific signer type from aoconnect
  tags?: { name: string; value: string }[];
}

export interface SendMessageParams {
  processId: string;
  action: string;
  target: string;
  signer: any; // Replace 'any' with the specific signer type from aoconnect
  data?: string;
}

export interface MessageResult {
  Messages: any[]; // Replace 'any' with the specific message type from aoconnect
  Spawns: any[]; // Replace 'any' with the specific spawn type from aoconnect
  Output: string;
  Error?: string;
}

export interface ReadResultParams {
  messageId: string;
  processId: string;
}
