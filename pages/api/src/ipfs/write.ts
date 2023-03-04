import ipfs from "./client";

type FileContent =
  | AsyncIterable<Uint8Array>
  | ReadableStream<Uint8Array>
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

    console.log("Writing to IPFS from client");
    return ipfs.addAll(files, options);
  };
}
