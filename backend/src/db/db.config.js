const knex = require("knex");
const knexFile = require("./knexfile");

let db = null;
if (process.env.NODE_ENV === "test") {
  db = knex(knexFile.test);
} else if (process.env.NODE_ENV === "production") {
  db = knex(knexFile.production);
} else {
  db = knex(knexFile.development);
}

module.exports = db;
