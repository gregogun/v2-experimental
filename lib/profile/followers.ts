import { appConfig } from "@/config";
import { sendMessage, spawnProcess } from "../ao/aoconnect";
import { gql } from "../helpers/gql";
import { createDataItemSigner } from "@permaweb/aoconnect";
import { followProcessCode } from "@/utils/processes";
import { uploadTx } from "../irys";

interface FollowProps {
  processId: string;
  targetProcessId: string;
}

export const follow = async (props: FollowProps) => {
  try {
    const messageId = await sendMessage({
      signer: createDataItemSigner(window.arweaveWallet),
      processId: props.processId,
      target: props.processId,
      action: "Follow",
      data: props.targetProcessId,
    });

    return messageId;
  } catch (error) {
    throw error;
  }
};

export const unfollow = async (props: FollowProps) => {
  try {
    const messageId = await sendMessage({
      signer: createDataItemSigner(window.arweaveWallet),
      processId: props.processId,
      target: props.processId,
      action: "Unfollow",
      data: props.targetProcessId,
    });

    return messageId;
  } catch (error) {
    throw error;
  }
};

export const deploySource = async ({ processId }: { processId: string }) => {
  try {
    const res = await uploadTx(
      followProcessCode,
      [
        {
          name: "Action",
          value: "Eval",
        },
        {
          name: "Data-Protocol",
          value: "ao",
        },
        {
          name: "Variant",
          value: "ao.TN.1",
        },
        {
          name: "Type",
          value: "Message",
        },
        {
          name: "SDK",
          value: "aoconnect",
        },
      ],
      processId
    );

    return res.id;
  } catch (error) {
    throw error;
  }
};

export const createFollowProcess = async () => {
  try {
    const processId = await spawnProcess({
      moduleTxId: appConfig.ao.MODULE,
      signer: createDataItemSigner(window.arweaveWallet),
      tags: [
        {
          name: "Process-Type",
          value: "Follow",
        },
        {
          name: "Process-Variant",
          value: "0.0.1",
        },
        {
          name: "DApp-Name",
          value: "arcadia-v2",
        },
      ],
    });

    const sourceId = await deploySource({ processId });

    return {
      processId,
      sourceId,
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getFollowProcess = async ({ address }: { address: string }) => {
  try {
    const res = await gql({
      variables: {
        owners: [address],
        tags: [
          {
            name: "Type",
            values: ["Process"],
          },
          {
            name: "Process-Type",
            values: ["Follow"],
          },
          {
            name: "Process-Variant",
            values: ["0.0.1"],
          },
          {
            name: "DApp-Name",
            values: ["arcadia-v2"],
          },
        ],
      },
    });

    const data = res.transactions.edges;

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
