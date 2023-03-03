import ipfs from './client.js';
import extractFileContents from './extract.js';

export default class IPFSReadClient {
  readContent = async (cid: string) => {
    const byteStream = await ipfs.get(cid);
    return extractFileContents(byteStream);
  };
}
