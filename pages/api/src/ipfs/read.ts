import ipfs from "./client";
import extractFileContents from "./extract";

export default class IPFSReadClient {
  readContent = (cid: string) => {
    const byteStream = ipfs.get(cid);
    return extractFileContents(byteStream);
  };
}
