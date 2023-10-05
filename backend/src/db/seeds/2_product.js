/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("product").del();
  await knex("product").insert([
    {
      id: "94c17d2a-803f-4f1b-a914-d9b3f384ec9c",
      name: "Car Wash Shampoo",
      price: 30000,
      stock_amount: 10,
      image_url: "https://urlis.net/nu6v24yy",
      category_id: "a2bfdf4b-6961-4861-a629-5c243d004f95",
    },
    {
      id: "dac3c230-9352-4ea9-8879-3419fb39de90",
      name: "Kitchen Cleaner",
      price: 10000,
      stock_amount: 15,
      image_url: "https://urlis.net/goun757v",
      category_id: "9ccd22dd-2b19-4772-80b1-17a5e832c64a",
    },
  ]);
};
