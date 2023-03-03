import { MongoClient } from 'mongodb';
import * as dotenv from 'dotenv';

// Config .env variables
dotenv.config();

const client = new MongoClient(process.env.MONGODB_URL);

export const shutdown = () => {
  client.close();
};

export default client;
