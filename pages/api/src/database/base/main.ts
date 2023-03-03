import InsertClient from './insert.js';
import QueryClient from './query.js';
import UpdateClient from './update.js';
import DeleteClient from './delete.js';

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
