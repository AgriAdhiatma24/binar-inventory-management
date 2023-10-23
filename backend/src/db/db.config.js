const knex = require("knex");
const knexFile = require("./knexfile");

let db = null;
if (process.env.NODE_ENV === "test") {
  db = knex(knexFile.testing);
} else {
  db = knex(knexFile.development);
}

module.exports = db;
