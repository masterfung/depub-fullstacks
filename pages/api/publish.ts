import type { NextApiRequest, NextApiResponse } from "next";
import { Writable, Transform, Readable } from "stream";
import { formidable } from "formidable";
import IPFSWriteClient from "./src/ipfs/write";

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
  const readable = new Readable();
  readable._read = () => {
    // Do nothing
  };

  const client = new IPFSWriteClient();
  // const result = client.writeDirectory(readable);
  const result = client.writeFile(readable);

  const form = new formidable.IncomingForm({
    fileWriteStreamHandler: (file: any) => {
      const writable = new Writable();

      readable.push(
        Buffer.from(`{"path":"${file.originalFilename}","content":`)
      );

      // eslint-disable-next-line no-underscore-dangle
      writable._write = (chunk, enc, next) => {
        console.log(chunk);
        readable.push(chunk);
        next();
      };

      writable.on("close", () => {
        readable.push(Buffer.from("}"));
        readable.push(null);
      });

      return writable;
    },
  });

  form.keepExtensions = true;
  form.parse(_req, async (err: any, fields: any, files: any) => {
    console.log("Writing file to IPFS");
    console.log(fields);
    // readable.push(null);

    result.then((el) => console.log(el));

    // for await (const el of result) {
    //   console.log(el);
    // }
  });

  res.status(200);
  res.end();
};

export default handler;
