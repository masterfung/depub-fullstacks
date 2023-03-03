import DatabaseBaseClient from "./base";
import { DocFieldValue } from "./types";

export default class DatabaseDeleteClient extends DatabaseBaseClient {
  deleteSingleDocument = async (filter: DocFieldValue) => {
    const result = await this.collection.deleteOne(filter);
    return result.deletedCount;
  };

  deleteManyDocuments = async (filter: DocFieldValue) => {
    const result = await this.collection.deleteMany(filter);
    return result.deletedCount;
  };
}
