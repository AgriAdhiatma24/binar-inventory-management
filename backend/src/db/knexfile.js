// Update with your config settings.
const dotenv = require("dotenv");
if (process.env.NODE_ENV === "production") {
  dotenv.config({ path: "../../../.env.production" });
} else {
  // dotenv.config({ path: "../.env.development" });
  dotenv.config({ path: "../../../.env.development" });
}

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: "postgresql",
    connection: process.env.DATABASE_URI,
    migrations: {
      directory: "./migrations",
    },
    seeds: {
      directory: "./seeds",
    },
  },

  test: {
    client: "sqlite3",
    connection: ":memory:",
    useNullAsDefault: true,
    migrations: {
      // directory: "./__test__/migrations",
      directory: "./src/db/migrations",
    },
    seeds: {
      // directory: "./__test__/seeds",
      // directory: "./seeds",
      directory: "./src/db/seeds",
    },
  },

  staging: {
    client: "postgresql",
    connection: {
      database: "my_db",
      user: "username",
      password: "password",
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },

  production: {
    client: "postgresql",
    connection: {
      database: "my_db",
      user: "username",
      password: "password",
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },
};
