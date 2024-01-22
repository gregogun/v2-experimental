export type IconProps = {
  width?: number | string | undefined;
  height?: number | string | undefined;
};

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
  title: string | undefined;
  description?: string;
  creator: string;
  artworkId: string | undefined;
  src: string;
  txid: string;
  dateCreated?: number;
  license?: License;
  cursor?: string;
};

export type Tracklist = Track[];
