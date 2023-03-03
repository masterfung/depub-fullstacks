import InsertClient from "./insert";
import QueryClient from "./query";
import UpdateClient from "./update";
import DeleteClient from "./delete";

export default class DatabaseClient {
  protected insert: InsertClient;

  protected query: QueryClient;

  protected update: UpdateClient;

  protected delete: DeleteClient;

  constructor(collection: string) {
    this.insert = new InsertClient(collection);
    this.query = new QueryClient(collection);
    this.update = new UpdateClient(collection);
    this.delete = new DeleteClient(collection);
  }
}
