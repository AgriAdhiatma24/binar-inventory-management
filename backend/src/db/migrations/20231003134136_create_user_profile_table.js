/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("user_profile", (table) => {
    table.uuid("id").primary();
    table.uuid("user_id").references("id").inTable("user").onDelete("CASCADE");
    table.string("full_name");
    table.string("date_of_birth");
    table.string("address");
    table.string("email").notNullable()
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("user_profile");
};
