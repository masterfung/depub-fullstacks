import ipfs from "./client";
import extractFileContents from "./extract";

export default class IPFSReadClient {
  readContent = (cid: string) => {
    const byteStream = ipfs.get(cid);
    return extractFileContents(byteStream);
  };

  readDirectory = (directoryCID: string) => {
    return ipfs.get(directoryCID, {
      archive: true,
      compress: true,
      compressionLevel: 5,
    });
  };
}
