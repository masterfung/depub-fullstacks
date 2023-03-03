import DatabaseBaseClient from "./base";
import { DocFieldValue } from "./types";

interface QueryWeight {
  path: string;
  value: number;
}

export default class DatabaseQueryClient extends DatabaseBaseClient {
  queryAllDocuments = async () => this.collection.find({}).toArray();

  /**
   * @param filter - Matches where document.key = value
   */
  queryByEquality = async (filter: DocFieldValue) =>
    this.collection.find(filter).toArray();

  /**
   * Query against a MongoDB Atlas database index with a given searchText
   * and compare against all document fields.
   *
   * @remarks
   * See {@link https://www.mongodb.com/docs/atlas/atlas-search/tutorial/run-query/ | the docs on Atlas Search}.
   */
  queryAgainstIndex = async (
    index: string,
    query: string,
    weights?: QueryWeight[]
  ) => {
    const searchQuery = this.buildSearchQuery(index, query, weights);
    return this.collection.aggregate([searchQuery]).toArray();
  };

  /**
   * Build default search params for index and query (search all fields).
   *
   * @remarks
   * See {@link https://www.mongodb.com/docs/atlas/atlas-search/query-syntax/#mongodb-pipeline-pipe.-search | docs on search parameters}
   * and {@link https://www.mongodb.com/docs/atlas/atlas-search/scoring/ | docs on weighting}
   */
  private buildSearchQuery = (
    index: string,
    query: string,
    weights?: QueryWeight[]
  ) => {
    const defaultQuery = {
      text: {
        query,
        path: {
          wildcard: "*",
        },
        fuzzy: {},
      },
    };

    const weightedQueries = weights?.map((weight) => ({
      text: {
        query,
        path: weight.path,
        score: {
          boost: {
            value: weight.value,
          },
        },
        fuzzy: {},
      },
    }));

    return {
      $search: {
        index,
        compound: {
          should: [defaultQuery, ...(weightedQueries ?? [])],
        },
      },
    };
  };
}
