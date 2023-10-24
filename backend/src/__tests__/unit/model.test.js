const { productModel } = require("../../models");
const db = require("../../db/db.config");
const { ErrorServer, ErrorNotFound } = require("../../utils/errorHandlers");
const { runMigration } = require("../../db/run-migrations");

// ======================Test suite 1======================================
describe("loadProducts", () => {
  beforeAll(async () => {
    await runMigration();
  });

  afterAll(async () => {
    if (db) {
      await db.destroy();
    }
  });

  // Test 1
  it("should load products from the database", async () => {
    const sampleProducts = {
      id: "94c17d2a-803f-4f1b-a914-d9b3f384ec9c",
      name: "Car Wash Shampoo",
      price: 30000,
      stock_amount: 10,
      image_url: "https://urlis.net/nu6v24yy",
      category_id: "a2bfdf4b-6961-4861-a629-5c243d004f95",
    };

    const results = await productModel.loadProducts();
    console.log(results[0]);
    expect(results[0].id).toBe(sampleProducts.id);
  });
});

// ================================Test Suite 2=================================
describe("getSingleProduct", () => {
  beforeAll(async () => {
    await runMigration();
  });

  afterAll(async () => {
    await db.destroy();
  });

  test("should return the same product", async () => {
    const expectedProduct = {
      id: "94c17d2a-803f-4f1b-a914-d9b3f384ec9c",
    };

    const resp = await productModel.getSingleProduct(expectedProduct.id);
    expect(resp.id).toBe(expectedProduct.id);
  });
});

// =========================Test Suite 3=========================================
describe("editProduct", () => {
  beforeAll(async () => {
    await runMigration();
  });

  afterAll(async () => {
    await db.destroy();
  });

  // Test case 1: Updating an existing product
  it("should update an existing product", async () => {
    // Create a mock product and updated data
    const productId = "94c17d2a-803f-4f1b-a914-d9b3f384ec9c";
    const updatedData = {
      name: "Mop",
    };

    const updatedProduct = await productModel.editProduct(
      productId,
      updatedData
    );
    console.log(updatedProduct);

    expect(updatedProduct.id).toBe(productId);
    expect(updatedProduct.name).toBe(updatedData.name);
  });

  // Test case 2: Updating a non-exist product
  it("should throw an error when updating a non-existent product", async () => {
    const productId = "1234";
    const updatedData = {
      name: "Mop",
    };

    await expect(
      productModel.editProduct(productId, updatedData)
    ).rejects.toThrow(
      `server error: not found: Product with ID ${productId} not found`
    );
  });
});

// =================== TEST SUITE 4 =========================
describe("get product count", () => {
  beforeAll(async () => {
    await runMigration();
  });

  afterAll(async () => {
    await db.destroy();
  });

  test("should return the total product count", async () => {
    const resp = await productModel.getTotalProductCount();
    expect(typeof resp).toBe("number");
    expect(resp).toBeGreaterThanOrEqual(0);
  });
});

// ================= TEST SUITE 5 =========================
describe("getTotalStoreValue", () => {
  beforeAll(async () => {
    await runMigration();
  });

  afterAll(async () => {
    await db.destroy();
  });

  it("should calculate the total store value correctly", async () => {
    const mockProducts = [
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
    ];

    const resp = await productModel.getTotalStoreValue();
    const expectedTotalValue = mockProducts.reduce((total, product) => {
      return total + product.price * product.stock_amount;
    }, 0);

    expect(resp).toBe(expectedTotalValue);
  });
});

// ================ TEST SUITE 6 ==========================
describe("getOutOfStockProducts", () => {
  beforeAll(async () => {
    await runMigration();
  });

  afterAll(async () => {
    await db.destroy();
  });

  it("should return an empty array and a count of zero when there are no out-of-stock products", async () => {
    const { outOfStockItems, outOfStockItemsCount } =
      await productModel.getOutOfStockProducts();

    // Assert that the outOfStockItems array is empty, and the count is zero
    expect(outOfStockItemsCount).toBe(0);
    expect(outOfStockItems).toHaveLength(0);
  });
});

// ================= TEST SUITE 7 ==============================
describe("addProduct", () => {
  beforeAll(async () => {
    await runMigration();
  });

  afterAll(async () => {
    await db.destroy();
  });

  // Test case 1: Adding a new product
  it("should add a new product", async () => {
    // Create new product data
    const newProductData = {
      name: "Testing Product",
      price: 69000,
      stock_amount: 69,
      image_url: "https://urlis.net/nu6v24yy",
      category_id: "a2bfdf4b-6961-4861-a629-5c243d004f95",
    };

    // Call the addProduct function
    const resp = await productModel.addProduct(newProductData);

    // Assert that the addedProduct matches the newProductData
    expect(resp.name).toBe(newProductData.name);
    expect(resp.price).toBe(newProductData.price);
    expect(resp.stock_amount).toBe(newProductData.stock_amount);
    expect(resp.image_url).toBe(newProductData.image_url);
    expect(resp.category_id).toBe(newProductData.category_id);
  });
});

// =============== TEST SUITE 8 ===========================
describe("deleteProduct", () => {
  beforeAll(async () => {
    await runMigration();
  });

  afterAll(async () => {
    await db.destroy();
  });

  it("should delete an existing product", async () => {
    const newProductData = {
      name: "Testing Product",
      price: 69000,
      stock_amount: 69,
      image_url: "https://urlis.net/nu6v24yy",
      category_id: "a2bfdf4b-6961-4861-a629-5c243d004f95",
    };

    const productMock = await productModel.addProduct(newProductData);

    const productId = productMock.id;
    const result = await productModel.deleteProduct(productId);

    expect(result.success).toBe(true);
    expect(result.message).toBe("Product deleted successfully");
  });
});
