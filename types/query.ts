import { GetTransactionsQueryVariables } from "arweave-graphql";

export interface GQLQuery {
  variables: GetTransactionsQueryVariables;
}

export interface GetTrack {
  txid: string;
}
