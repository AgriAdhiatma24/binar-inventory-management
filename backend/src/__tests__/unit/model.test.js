const { productModel } = require("../../models");
const db = require("../../db/db.config");
const { ErrorServer, ErrorNotFound } = require("../../utils/errorHandlers");

// ======================Test suite 1======================================
describe("loadProducts", () => {
  // Test 1
  it("should load products from the database", async () => {
    const mockSelect = jest.fn().mockReturnThis(); // Chainable select
    const sampleProducts = [
      {
        id: "de60c2c7-21f8-4f01-a8d9-783ac1418b1c",
        name: "HeheHoho Chain",
        price: 50000,
        stock_amount: 100,
        image_url: "image1.jpg",
        category_id: "940bbe8c-76c1-423d-b8ca-d3414bc295ce",
      },
      {
        id: "cdceacff-1188-4e80-a4b7-312fa645ff1d",
        name: "Pediger",
        price: 25000,
        stock_amount: 50,
        image_url: "image2.jpg",
        category_id: "85360d6d-c61c-4c41-ac72-f16c5dd90916",
      },
    ];

    const mockFrom = jest.fn().mockResolvedValue(sampleProducts);

    db.select = mockSelect;
    db.from = mockFrom;

    const results = await productModel.loadProducts();
    // Expectations
    expect(mockSelect).toHaveBeenCalledWith("*");
    expect(mockFrom).toHaveBeenCalledWith("product");
  });

  // Test 2
  // it("should throw an ErrorServer on database error", async () => {
  //   // Mock a database error by rejecting the promise
  //   const mockFrom = jest.fn().mockRejectedValue(new Error("Database error"));
  //   db.from = mockFrom;

  //   // Call the function and expect it to throw an ErrorServer
  //   await expect(productModel.loadProducts()).rejects.toThrow(ErrorServer);
  // });
});

// ================================Test Suite 2=================================
describe("getSingleProduct", () => {
  it("should retrieve a single product from the database", async () => {
    // Mock the Knex functions and their behavior
    const mockSelect = jest.fn();
    const mockFrom = jest.fn();
    const mockWhere = jest.fn();
    const mockFirst = jest.fn();

    const knex = require("knex");
    const knexFile = require("../../db/knexfile");

    const db = knex(knexFile.development);

    db.select = mockSelect;
    mockSelect.from = mockFrom;
    mockFrom.where = mockWhere;
    mockWhere.first = mockFirst;

    // Set up the expected product data
    const expectedProduct = {
      id: "dac3c230-9352-4ea9-8879-3419fb39de90",
      name: "Kitchen Cleaner",
      price: 10000,
      stock_amount: 15,
      image_url: "https://urlis.net/goun757v",
      category_id: "9ccd22dd-2b19-4772-80b1-17a5e832c64a",
    };

    mockFirst.mockResolvedValue(expectedProduct);

    // Call the function
    const result = await productModel.getSingleProduct(
      "dac3c230-9352-4ea9-8879-3419fb39de90"
    );
    // console.log(result);

    // Assertions
    expect(mockSelect).toHaveBeenCalled("*");
    expect(mockFrom).toHaveBeenCalledWith("product");
    expect(mockWhere).toHaveBeenCalledWith(
      "id",
      "dac3c230-9352-4ea9-8879-3419fb39de90"
    );
    expect(result).toEqual(expectedProduct);
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
