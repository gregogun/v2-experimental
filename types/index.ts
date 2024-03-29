export type IconProps = {
  width?: number | string | undefined;
  height?: number | string | undefined;
};

export interface DialogOpenProps {
  // name is for if we have multiple dialogs inside dropdown
  name?: "share";
  open: boolean;
}

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
