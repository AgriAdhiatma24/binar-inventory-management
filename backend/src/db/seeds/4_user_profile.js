/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("user_profile").del();
  await knex("user_profile").insert([
    {
      id: "c169e445-b5da-43f2-ad28-77acc613daa3",
      user_id: "24ca04d6-67bc-4594-a9d1-b824717b64f0",
      full_name: "John Doe",
      date_of_birth: "1999-01-01",
      address: "Central Java, Indonesia",
      email: "johndoe@gmail.com",
    },
    {
      id: "4b1b18cf-8059-48b9-b361-1bc5748dc4ac",
      user_id: "d4991e9e-e681-4007-b27f-518fa0524ce8",
      full_name: "Jean Doe",
      date_of_birth: "1999-01-02",
      address: "East Java, Indonesia",
      email: "jeandoe@gmail.com",
    },
  ]);
};
