// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
export default {
  dev1: {
    client: "mysql",
    connection: {
      host: "127.0.0.1",
      port: 3306,
      user: "root",
      password: "bananana",
      database: "shard1",
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },

  dev2: {
    client: "mysql",
    connection: {
      host: "127.0.0.1",
      port: 3306,
      user: "root",
      password: "bananana",
      database: "shard2",
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },

  production: {
    client: "mysql",
    connection: {
      host: "database-1.cawbmtcy0wvy.us-west-2.rds.amazonaws.com",
      port: 3306,
      user: "admin",
      password: "bananana",
      database: "banana",
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },
};
