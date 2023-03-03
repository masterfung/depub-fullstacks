import ipfs from "./client";

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
  writeFile = (data: FileContent) => ipfs.add(data);

  writeDirectory = (files: AsyncIterable<FileParams>) => {
    const options = {
      wrapWithDirectory: true,
    };

    return ipfs.addAll(files, options);
  };
}
