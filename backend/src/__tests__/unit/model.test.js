const { productModel } = require("../../models");
const db = require("../../db/db.config");
const { ErrorServer, ErrorNotFound } = require("../../utils/errorHandlers");
const { runMigration } = require("../../db/run-migrations");

// ======================Test suite 1======================================
// describe("loadProducts", () => {
//   beforeAll(async () => {
//     await runMigration();
//   });

//   afterAll(async () => {
//     await db.destroy();
//   });

//   // Test 1
//   it("should load products from the database", async () => {
//     const mockSelect = jest.fn().mockReturnThis(); // Chainable select
//     const sampleProducts = {
//       id: "94c17d2a-803f-4f1b-a914-d9b3f384ec9c",
//       name: "Car Wash Shampoo",
//       price: 30000,
//       stock_amount: 10,
//       image_url: "https://urlis.net/nu6v24yy",
//       category_id: "a2bfdf4b-6961-4861-a629-5c243d004f95",
//     };

//     const mockFrom = jest.fn().mockResolvedValue(sampleProducts);

//     db.select = mockSelect;
//     db.from = mockFrom;

//     const results = await productModel.loadProducts();
//     expect(results.id).toBe(sampleProducts.id);
//   });
// });

// ================================Test Suite 2=================================
describe("getSingleProduct", () => {
  beforeAll(async () => {
    await runMigration();
  });

  // afterAll(async () => {
  //   await db.destroy();
  // });

  test("should return the same product", async () => {
    const expectedProduct = {
      id: "94c17d2a-803f-4f1b-a914-d9b3f384ec9c",
      name: "Car Wash Shampoo",
      price: 30000,
      stock_amount: 10,
      image_url: "https://urlis.net/nu6v24yy",
      category_id: "a2bfdf4b-6961-4861-a629-5c243d004f95",
    };

    const resp = await productModel.getSingleProduct(expectedProduct);
    expect(resp).toBe(expectedProduct);
  });
});

// =========================Test Suite 3=========================================
// const environment = process.env.NODE_ENV || "development";
// const knexConfig = require("../../db/knexfile")[environment];
// const knexDB = require("knex")(knexConfig);

// describe("getSingleProduct", () => {
//   it("should retrieve a single product from the database", async () => {
//     // Mock the Knex functions and their behavior
//     const mockSelect = jest.fn().mockReturnThis(); // Chainable select
//     const mockFrom = jest.fn().mockReturnThis(); // Chainable from
//     const mockWhere = jest.fn().mockReturnThis(); // Chainable where
//     const mockFirst = jest.fn(); // Not chainable

//     // Set up the expected product data
//     const expectedProduct = {
//       id: "dac3c230-9352-4ea9-8879-3419fb39de90",
//       name: "Kitchen Cleaner",
//       price: 10000,
//       stock_amount: 15,
//       image_url: "https://urlis.net/goun757v",
//       category_id: "9ccd22dd-2b19-4772-80b1-17a5e832c64a",
//     };

//     mockFirst.mockResolvedValue(expectedProduct);

//     // Set up the chainable functions
//     mockSelect.mockReturnThis();
//     mockFrom.mockReturnThis();
//     mockWhere.mockReturnThis();

//     knexDB.select = mockSelect;
//     knexDB.from = mockFrom;
//     knexDB.where = mockWhere;
//     mockWhere.first = mockFirst;

//     // Call the function
//     const result = await productModel.getSingleProduct(
//       "dac3c230-9352-4ea9-8879-3419fb39de90"
//     );

//     // Assertions
//     expect(mockSelect).toHaveBeenCalledWith("*");
//     expect(mockFrom).toHaveBeenCalledWith("product");
//     expect(mockWhere).toHaveBeenCalledWith(
//       "id",
//       "dac3c230-9352-4ea9-8879-3419fb39de90"
//     );
//     expect(result).toEqual(expectedProduct);
//   });
// });

// =================== TEST SUITE 4 =========================
// describe("get product count", () => {
//   beforeAll(async () => {
//     await runMigration();
//   });

//   afterAll(async () => {
//     await db.destroy();
//   });

//   test("should return the same product", async () => {
//     const a = await productModel.getTotalProductCount();
//     expect(a).toBe(0);

//     // expect(resp).toBe(expectedProduct);
//   });
// });
