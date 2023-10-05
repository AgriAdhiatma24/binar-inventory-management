/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("product_category").del();
  await knex("product_category").insert([
    { id: "a2bfdf4b-6961-4861-a629-5c243d004f95", name: "Automotive" },
    { id: "9ccd22dd-2b19-4772-80b1-17a5e832c64a", name: "Electronic" },
  ]);
};
