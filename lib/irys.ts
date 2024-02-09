import { WebIrys } from "@irys/sdk";
import { Tag } from "arweave-graphql";

export const getIrys = async () => {
  const irys = new WebIrys({
    token: "arweave",
    wallet: { provider: window.arweaveWallet },
    url: "https://up.arweave.net",
  });

  await irys.ready();

  return irys;
};

export const uploadTx = async (data: string, tags: Tag[], target?: string) => {
  const irys = await getIrys();

  const tx = irys.createTransaction(data, { tags, target });
  await tx.sign();
  const response = await tx.upload();
  return response;
};

export const uploadData = async (data: string, tags: Tag[]) => {
  const irys = await getIrys();

  const response = await irys.upload(data, { tags });
  return response;
};

export const uploadFile = async (data: File, tags: Tag[]) => {
  const irys = await getIrys();

  const response = await irys.uploadFile(data, { tags });
  return response;
};

export const uploadChunks = async (data: ArrayBuffer, tags: Tag[]) => {
  const irys = await getIrys();

  const transaction = irys.createTransaction(Buffer.from(data), { tags });

  await transaction.sign();

  let uploader = irys.uploader.chunkedUploader;

  const upload = uploader.uploadTransaction(transaction);

  uploader.on("chunkUpload", (chunkInfo) => {
    console.log(
      `Uploaded Chunk number ${chunkInfo.id}, offset of ${chunkInfo.offset}, size ${chunkInfo.size} Bytes, with a total of ${chunkInfo.totalUploaded} bytes uploaded.`
    );
  });

  uploader.on("chunkError", (e) => {
    console.error(`Error uploading chunk number ${e.id} - ${e.res.statusText}`);
  });

  uploader.on("done", (finishRes) => {
    console.log(`Upload completed with ID ${finishRes.id}`);
  });

  const response = await upload;
  return response;
};

export const getIrysBalance = async () => {
  const irys = await getIrys();

  const atomicBalance = await irys.getLoadedBalance();

  const convertedBalance = irys.utils.fromAtomic(atomicBalance);

  return convertedBalance;
};

// export const fundIrysNode = async ({
//   node,
//   amount,
//   currentProvider,
// }: {
//   node: IrysNode;
//   amount: number;
//   currentProvider: CurrentProvider;
// }) => {
//   const irys = await getIrys({ init: { node } });

//   const fundTx = await irys.fund(irys.utils.toAtomic(amount));
//   return {
//     quantity: irys.utils.fromAtomic(fundTx.quantity),
//     token: irys.token,
//   };
// };

// export const getIrysUploadCost = async (
//   byteCount: number,
//   currentProvider: CurrentProvider
// ) => {
//   const irys = await getIrys({
//     init: { provider: currentProvider === "othent" ? othentKMS : undefined },
//   });

//   console.log(byteCount);
//   const priceAtomic = await irys.getPrice(byteCount);

//   // Convert from atomic units to standard units
//   const priceConverted = irys.utils.fromAtomic(byteCount);
//   console.log(priceConverted.toNumber());

//   return priceConverted;
// };
