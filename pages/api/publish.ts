import type { NextApiRequest, NextApiResponse } from "next";
import { Writable, Readable } from "stream";
import { formidable } from "formidable";
import IPFSWriteClient, { FileParams } from "./src/ipfs/write";

export const config = {
  api: {
    bodyParser: false,
  },
};

async function* streamedDirectory(
  readable: Readable
): AsyncIterable<FileParams> {
  for await (const entry of readable) {
    console.log("Yielding dir entry:");
    console.log(entry);
    yield entry as FileParams;
  }
}

async function* streamedFile(readable: Readable): AsyncIterable<Uint8Array> {
  for await (const entry of readable) {
    yield entry;
  }
}

const handler = (_req: NextApiRequest, res: NextApiResponse) => {
  const client = new IPFSWriteClient();
  const dirReadable = new Readable({
    objectMode: true,
  });
  dirReadable._read = () => {
    // Do nothing
  };

  // eslint-disable-next-line
  // @ts-ignore
  // eslint-disable-next-line
  const form = new formidable.IncomingForm({
    fileWriteStreamHandler: (file: any) => {
      const writable = new Writable();

      const readable = new Readable();
      readable._read = () => {
        // Do nothing
      };

      // eslint-disable-next-line no-underscore-dangle
      writable._write = (chunk, enc, next) => {
        readable.push(chunk);
        next();
      };

      dirReadable.push({
        // eslint-disable-next-line
        path: file.originalFilename,
        content: streamedFile(readable),
      });

      writable.on("close", () => {
        readable.push(null);
      });

      return writable;
    },
  });

  // eslint-disable-next-line
  form.keepExtensions = true;
  // eslint-disable-next-line
  form.parse(_req, async (err: any, fields: any, files: any) => {
    console.log("Writing file to IPFS");
    dirReadable.push(null);
    const result = client.writeDirectory(streamedDirectory(dirReadable));

    for await (const el of result) {
      if (el.path === "") {
        res.write(el.cid.toString());
      }
    }

    res.status(200);
    res.end();
  });
};

export default handler;
