const { productModel, productCategoryModel, user } = require("../../models");
const { productController, productCategoryController } = require("..");
const { runMigration, destroyConnection } = require("../../db/run-migrations");
const { isLogin } = require("../user.controller");

/*-----------------------PRODUCT CONTROLLER-------------------------------------------------------*/

beforeAll(async () => {
  await runMigration();
});

afterAll(async () => {
  await destroyConnection();
});
// ======================Test suite 1======================================
describe("productController.getAllProducts", () => {
  it("should fetch all products from the database", async () => {
    const req = {}; // Mock request
    const res = {
      json: jest.fn(),
      status: jest.fn(() => res), // Make status() a chainable function
    };

    await productController.getAllProducts(req, res);

    expect(res.status).toHaveBeenCalledWith(200); // Check if the response status is set to 200
    const responseJSON = res.json.mock.calls[0][0];
    expect(res.json).toHaveBeenCalledWith(responseJSON);
  });
});

// ======================Test suite 2======================================
describe("productController.getOneProduct", () => {
  it("should fetch one product from the database", async () => {
    const req = {
      params: {
        id: "94c17d2a-803f-4f1b-a914-d9b3f384ec9c",
      },
    };
    const res = {
      json: jest.fn(),
      status: jest.fn(() => res),
    };

    await productController.getOneProduct(req, res);
    expect(res.status).toHaveBeenCalledWith(200);

    const responseJSON = res.json.mock.calls[0][0];
    expect(responseJSON).not.toBeUndefined();
  });
});

// ======================Test suite 3======================================
describe("productController.updateProduct", () => {
  it("should update a product in the database", async () => {
    const req = {
      params: { id: "94c17d2a-803f-4f1b-a914-d9b3f384ec9c" },
      body: {
        name: "Updated Hehe",
        price: 25000,
        stock_amount: 50,
      },
    };
    const res = {
      json: jest.fn(),
      status: jest.fn(() => res),
    };

    await productController.updateProduct(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    const responseJSON = res.json.mock.calls[0][0];
    expect(responseJSON).not.toBeUndefined();
  });
});

// ======================Test suite 4======================================
describe("productController.getTotalProductCount", () => {
  it("should return the total product count", async () => {
    const req = {};
    const res = {
      json: jest.fn(),
      status: jest.fn(() => res),
    };

    await productController.getTotalProductCount(req, res);

    const responseJSON = res.json.mock.calls[0][0];
    expect(responseJSON).not.toBeUndefined();

    expect(responseJSON.message).toBe("Successfully get product count");
    expect(responseJSON.data).toBeGreaterThanOrEqual(0);
  });
});

// ======================Test suite 5======================================
describe("productController.getTotalStoreValue", () => {
  it("should return the total store value", async () => {
    const req = {};
    const res = {
      json: jest.fn(),
      status: jest.fn(() => res),
    };

    await productController.getTotalStoreValue(req, res);

    expect(res.status).toHaveBeenCalledWith(200);

    const responseJSON = res.json.mock.calls[0][0];
    expect(responseJSON).not.toBeUndefined();
  });
});

// ======================Test suite 6======================================
describe("productController.getOutOfStockItemsWithCount", () => {
  it("should get out of stock items with count", async () => {
    productModel.getOutOfStockProducts = jest.fn(() => ({
      outOfStockItems: [
        {
          name: "Car Wash Shampoo",
          price: 30000,
          stock_amount: 0,
          image_url: "https://urlis.net/nu6v24yy",
          category_id: "a2bfdf4b-6961-4861-a629-5c243d004f95",
        },
      ],
      outOfStockItemsCount: 1,
    }));

    const req = {};
    const res = {
      json: jest.fn(),
      status: jest.fn(() => res),
    };

    await productController.getOutOfStockItemsWithCount(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    const responseJSON = res.json.mock.calls[0][0];
    expect(responseJSON).not.toBeUndefined();
  });
});

// ======================Test suite 7======================================
describe("productController.insertProductController", () => {
  it("should insert a product and return a response", async () => {
    const req = {
      body: {
        name: "Sample Product",
        price: 1000,
        stock_amount: 50,
        image_url: "sample.jpg",
        category_id: "sample-category-id",
      },
    };
    const res = {
      json: jest.fn(),
      status: jest.fn(() => res),
    };

    await productController.insertProductController(req, res);

    expect(res.status).toHaveBeenCalledWith(200);

    const responseJSON = res.json.mock.calls[0][0];
    expect(responseJSON).not.toBeUndefined();
    expect(responseJSON.message).toBe("Successfully add product");
  });
});

// ======================Test suite 8======================================
describe("productController.deleteProductController", () => {
  it("should delete a product and return a success response", async () => {
    const mockReq = {
      params: { id: "94c17d2a-803f-4f1b-a914-d9b3f384ec9c" },
    };

    const mockRes = {
      json: jest.fn(),
      status: jest.fn(() => mockRes),
    };

    const deleteProductResult = { id: "94c17d2a-803f-4f1b-a914-d9b3f384ec9c" };
    const deleteProductMock = jest.spyOn(productModel, "deleteProduct");
    deleteProductMock.mockResolvedValue(deleteProductResult);

    await productController.deleteProductController(mockReq, mockRes);

    const responseJSON = mockRes.json.mock.calls[0][0];
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(responseJSON.message).toBe("Successfully deleting product");
    expect(deleteProductMock).toHaveBeenCalledWith(
      "94c17d2a-803f-4f1b-a914-d9b3f384ec9c"
    );
  });
});

/*-----------------------PRODUCT CATEGORY CONTROLLER-------------------------------------------------------*/

// ======================Test suite 1======================================
describe("getCategories", () => {
  it("should return all product categories", async () => {
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const mockCategories = [
      {
        id: "1",
        name: "Category 1",
      },
      {
        id: "2",
        name: "Category 2",
      },
    ];
    productCategoryModel.loadCategories = jest
      .fn()
      .mockResolvedValue(mockCategories);

    // Call the controller function
    await productCategoryController.getCategories({}, res);

    // Assertions
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it("should handle errors", async () => {
    // Mock your Express response object
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mock an error in the productCategoryModel
    const errorMessage = "Database error";
    productCategoryModel.loadCategories = jest
      .fn()
      .mockRejectedValue(new Error(errorMessage));

    // Call the controller function
    await productCategoryController.getCategories({}, res);

    expect(res.status).toHaveBeenCalledWith(500);
  });
});

// ======================Test suite 2======================================
// ======================Test suite 3======================================
// ======================Test suite 4======================================

/*-----------------------USER CONTROLLER-------------------------------------------------------*/

// ======================Test suite 1======================================
// ======================Test suite 2======================================
// ======================Test suite 3======================================

/*-----------------------USER PROFILE CONTROLLER-------------------------------------------------------*/
// ======================Test suite 1======================================
