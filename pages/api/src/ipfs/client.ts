import * as ipfs from 'ipfs-http-client';
import * as dotenv from 'dotenv';

// Config .env variables
dotenv.config();

const host = process.env.INFURA_HOST;
const port = parseInt(process.env.INFURA_PORT, 10);
const protocol = 'https';

const id = process.env.INFURA_PROJECT_ID;
const secret = process.env.INFURA_API_SECRET;
const auth = `Basic ${Buffer.from(`${id}:${secret}`).toString('base64')}`;

const client = ipfs.create({
  host,
  port,
  protocol,
  headers: {
    authorization: auth,
  },
});

export default client;
