/* eslint-disable */
import type { NextApiRequest, NextApiResponse } from "next";
import { Writable, Transform, Readable } from "stream";
import { formidable } from "formidable";
import IPFSWriteClient, { FileParams } from "./src/ipfs/write";

export const config = {
  api: {
    bodyParser: false,
  },
};

async function* streamedDirectory(readable: Readable): AsyncIterable<FileParams> {
  for await (const entry of readable) {
    console.log('Dir entry: ')
    console.log(entry)
    yield entry as FileParams;
  }
}

async function* streamedFile(readable: Readable): AsyncIterable<Uint8Array> {
  for await (const entry of readable) {
    console.log('File entry: ')
    console.log(entry)
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

  const directoryFiles: FileParams[] = [];

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
        path: file.originalFilename,
        content: streamedFile(readable),
      })

      writable.on('close', () => {
        readable.push(null);
      })

      // directoryFiles.push({
      //   path: file.originalFilename,
      //   content: readable,
      // });

      return writable;
    },
  });

  form.keepExtensions = true;
  form.parse(_req, async (err: any, fields: any, files: any) => {
    console.log("Writing file to IPFS");
    console.log(fields);
    console.log(files);
    console.log(directoryFiles);
    dirReadable.push(null);
    const result = client.writeDirectory(streamedDirectory(dirReadable));

    console.log('Starting to log results:')

    for await (const el of result) {
      console.log('Parsing result');
      console.log(el);
      res.write(JSON.stringify(el));
    }

    res.status(200);
    res.end();
  });
};

export default handler;
