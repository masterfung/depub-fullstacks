import DatabaseBaseClient from './base.js';

export default class DatabaseInsertClient extends DatabaseBaseClient {
  insertSingleDocument = async (document: object) => {
    const response = await this.collection.insertOne(document);
    return response.insertedId;
  };

  insertManyDocuments = async (documents: object[]) => {
    const response = await this.collection.insertMany(documents);
    return response.insertedIds;
  };
}
