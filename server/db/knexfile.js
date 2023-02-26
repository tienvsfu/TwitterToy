// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
export default {
  development: {
    client: "mysql",
    connection: {
      host: "127.0.0.1",
      port: 3306,
      user: "root",
      password: "bananana",
      database: "banana",
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },

  // staging: {
  //   client: 'postgresql',
  //   connection: {
  //     database: 'my_db',
  //     user:     'username',
  //     password: 'password'
  //   },
  //   pool: {
  //     min: 2,
  //     max: 10
  //   },
  //   migrations: {
  //     tableName: 'knex_migrations'
  //   }
  // },

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
