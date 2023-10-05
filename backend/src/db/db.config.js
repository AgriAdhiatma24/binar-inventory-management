const knex = require("knex");
// const knexFile = require("../knexfile.js");
const knexFile = require("./knexfile");

const db = knex(knexFile.development);

module.exports = db;
