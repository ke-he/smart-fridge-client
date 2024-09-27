import knex, { Knex } from 'knex';
import knexConfig from '../../../../knexfile';

const environment = 'development';
const _databaseService = knex(knexConfig[environment]);

export class DatabaseService {
  private static instance: DatabaseService;

  private readonly database: Knex;
  private readonly transactionContext: Knex.Transaction | null;

  private constructor() {
    this.database = _databaseService;
    this.transactionContext = null;
  }

  public static getInstance(): DatabaseService {
    if (!DatabaseService.instance) {
      DatabaseService.instance = new DatabaseService();
    }

    return DatabaseService.instance;
  }

  public table<T extends object>(
    table: string | Knex.AliasDict,
  ): Knex.QueryBuilder<T, Record<string, T>[]> {
    if (this.transactionContext) {
      return this.database
        .table<T>(table)
        .transacting(this.transactionContext) as Knex.QueryBuilder<
        T,
        Record<string, T>[]
      >;
    } else {
      return this.database.table<T>(table) as Knex.QueryBuilder<
        T,
        Record<string, T>[]
      >;
    }
  }

  public raw(sql: string) {
    return this.database.raw(sql);
  }
}
