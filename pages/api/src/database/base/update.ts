import DatabaseBaseClient from "./base";
import { DocFieldValue } from "./types";

// See: https://www.mongodb.com/docs/manual/reference/operator/update/#std-label-update-operators
type UpdateType = "set" | "min" | "max";

interface DocumentUpdate {
  type: UpdateType;
  fields: object;
}

type UpdatesParam = DocumentUpdate | DocumentUpdate[];

export default class DatabaseUpdateClient extends DatabaseBaseClient {
  /**
   * @param filter - Matches where document.key = value
   * @param updates - Updates to perform on the document
   */
  updateSingleDocument = async (
    filter: DocFieldValue,
    updates: UpdatesParam
  ) => {
    const dbUpdates = this.parseDocumentUpdates(updates);

    const response = await this.collection.updateOne(filter, dbUpdates);
    return response.modifiedCount;
  };

  /**
   * @param filter - Matches where document.key = value
   * @param updates - Updates to perform on the document
   */
  updateManyDocuments = async (
    filter: DocFieldValue,
    updates: UpdatesParam
  ) => {
    const dbUpdates = this.parseDocumentUpdates(updates);
    const response = await this.collection.updateMany(filter, dbUpdates);
    return response.modifiedCount;
  };

  private parseDocumentUpdates = (updates: UpdatesParam): object => {
    const updatesArray = Array.isArray(updates) ? updates : [updates];

    return updatesArray.map((update) => ({
      [`$${update.type}`]: update.fields,
    }));
  };
}
