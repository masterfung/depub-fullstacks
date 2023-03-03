import ipfs from './client.js';

type FileContent =
  | AsyncIterable<Uint8Array>
  | Iterable<Uint8Array>
  | string
  | Uint8Array;

export interface FileParams {
  path: string;
  content: FileContent;
}

export default class IPFSWriteClient {
  writeFile = async (data: FileContent) => ipfs.add(data);

  writeDirectory = async (files: AsyncIterable<FileParams>) => {
    const options = {
      wrapWithDirectory: true,
    };

    return ipfs.addAll(files, options);
  };
}
