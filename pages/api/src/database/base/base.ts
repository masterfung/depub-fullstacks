import { MongoClient, Collection } from 'mongodb';
import client from './client.js';

export default class DatabaseBaseClient {
  protected client: MongoClient;

  protected collection: Collection;

  constructor(collection: string) {
    this.client = client;
    const db = this.client.db(process.env.MONGODB_DB);
    this.collection = db.collection(collection);
  }
}
