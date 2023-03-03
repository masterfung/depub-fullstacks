import DatabaseClient from "../base/main";
import QueryWeights from "./constants";

interface IndexParams {
  title: string;
  description: string;
  // List of filenames (e.g. 'foo.pdf')
  attachments: string[];
}

export default class DatabaseIndexerClient extends DatabaseClient {
  insertContentIndex = async (cid: string, params: IndexParams) => {
    const { title, description, attachments } = params;

    const document = {
      _id: cid,
      title,
      description,
      attachments,
    };

    return this.insert.insertSingleDocument(document);
  };

  queryContentIndex = async (query: string) => {
    const index = process.env.MONGODB_INDEX_SEARCH ?? "";
    const weights = [QueryWeights.title, QueryWeights.cid];

    return this.query.queryAgainstIndex(index, query, weights);
  };
}
