/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("user").del();
  await knex("user").insert([
    {
      id: "24ca04d6-67bc-4594-a9d1-b824717b64f0",
      username: "John_Doe",
      hash_password:
        "$2y$10$gTzQpD17CV1UHmqvNO3Q.eMJJsAMD9X4LYXlLST7hY6TLtkJhy/7q",
    },
    {
      id: "d4991e9e-e681-4007-b27f-518fa0524ce8",
      username: "Jean_Doe",
      hash_password:
        "$2y$10$z3JfxkYxr/lu1EjRDBvJC.nFTYyJMb..0PbE7hFZlRcBLxtMyFqL.",
    },
  ]);
};
