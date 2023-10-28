const { productModel, productCategoryModel, user, userProfile } = require("..");
// const db = require("../../db/db.config");
// const { ErrorServer, ErrorNotFound } = require("../../utils/errorHandlers");
const { runMigration, destroyConnection } = require("../../db/run-migrations");

/*-----------------------PRODUCT MODEL-------------------------------------------------------*/
beforeAll(async () => {
  await runMigration();
});
afterAll(async () => {
  await destroyConnection();
});
// ======================Test suite 1======================================
describe("loadProducts", () => {
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
    expect(results[0].id).toBe(sampleProducts.id);

    // Test case 2: Updating a non-exist product
  });
  it("should throw an error when failed load products", async () => {
    const productId = "12345";
    const results = await productModel.loadProducts();
    expect(results[0].id).not.toBe(productId);
  });
});

// ================================Test Suite 2=================================
describe("getSingleProduct", () => {
  const expectedProduct = {
    id: "94c17d2a-803f-4f1b-a914-d9b3f384ec9c",
  };
  it("should return the same product", async () => {
    const resp = await productModel.getSingleProduct(expectedProduct.id);
    expect(resp.id).toBe(expectedProduct.id);
  });

  it("should throw an error when failed load products", async () => {
    const productId = "12345";
    const results = await productModel.getSingleProduct(expectedProduct.id);
    expect(results.id).not.toBe(productId);
  });
});

// // =========================Test Suite 3=========================================
describe("editProduct", () => {
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

// // =================== TEST SUITE 4 =========================
describe("get product count", () => {
  test("should return the total product count", async () => {
    const resp = await productModel.getTotalProductCount();
    expect(typeof resp).toBe("number");
    expect(resp).toBeGreaterThanOrEqual(0);
  });
});

// // ================= TEST SUITE 5 =========================
describe("getTotalStoreValue", () => {
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

// // ================ TEST SUITE 6 ==========================
describe("getOutOfStockProducts", () => {
  it("should return an empty array and a count of zero when there are no out-of-stock products", async () => {
    const { outOfStockItems, outOfStockItemsCount } =
      await productModel.getOutOfStockProducts();

    // Assert that the outOfStockItems array is empty, and the count is zero
    expect(outOfStockItemsCount).toBe(0);
    expect(outOfStockItems).toHaveLength(0);
  });
});

// // ================= TEST SUITE 7 ==============================
describe("addProduct", () => {
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

// // =============== TEST SUITE 8 ===========================
describe("deleteProduct", () => {
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

/*-----------------------PRODUCT CATEGORY MODEL-------------------------------------------------------*/
// ================= TEST SUITE 1 ==================================
// describe("loadCategories", () => {
//   it("should load product categories from the database", async () => {
//     const categories = await productCategoryModel.loadCategories();

//     expect(Array.isArray(categories)).toBe(true);
//   });
// });

// ================= TEST SUITE 2 ==================================
// describe("addCategory", () => {
//   it("should add a new category", async () => {
//     const newCategory = {
//       id: "cf9fb621-9bb4-4c0c-a4c2-c3d501b1cb50",
//       name: "Hardaware",
//     };
//     const addedCategory = await productCategoryModel.addCategory(newCategory);

//     expect(addedCategory.id).toBe(newCategory.id);
//     expect(addedCategory.name).toBe(newCategory.name);
//   });
// });

// ================= TEST SUITE 3 ==================================
// describe("deleteCategory", () => {
//   // Test case 1: Deleting an existing category
//   it("should delete an existing category", async () => {
//     const categoryId = "a2bfdf4b-6961-4861-a629-5c243d004f95";

//     const resp = await productCategoryModel.deleteCategory(categoryId);

//     expect(resp.success).toBe(true);
//     expect(resp.message).toBe("Product category deleted successfully");
//   });

//   // Test case 2: Deleting a non-existent category
//   it("should throw an error when deleting a non-existent category", async () => {
//     // Create a non-existent categoryId
//     const categoryId = "12312312321";
//     await expect(
//       productCategoryModel.deleteCategory(categoryId)
//     ).rejects.toThrow(`server error: categorytId is not defined`);
//   });
// });

// ================= TEST SUITE 4 ==================================
// describe("editCategory", () => {
//   it("should edit an existing category", async () => {
//     const categoryId = "9ccd22dd-2b19-4772-80b1-17a5e832c64a";
//     const updatedData = {
//       name: "Updated Category Name",
//     };

//     // Call the editCategory function
//     const updatedCategory = await productCategoryModel.editCategory(
//       categoryId,
//       updatedData
//     );

//     // Assert that the updatedCategory matches the updated data
//     expect(updatedCategory.name).toBe(updatedData.name);
//     expect(updatedCategory.description).toBe(updatedData.description);
//   });
// });

/*-----------------------USER MODEL-------------------------------------------------------*/
// ================= TEST SUITE 1 ==================================
describe("createUser", () => {
  it("should create a user with valid data", async () => {
    const username = "user123";
    const password = "user123";

    const userId = await user.createUser(username, password);
    expect(userId).not.toBeNull();
  });
});

// ================= TEST SUITE 2 ==================================
describe("getUserByUsername", () => {
  it("should fetch a user by a valid username", async () => {
    const validUsername = "John_Doe";

    const userResult = await user.getUserByUsername(validUsername);

    expect(userResult).not.toBeUndefined();
    expect(userResult.username).toBe(validUsername);
  });
});

// ================= TEST SUITE 3 ==================================
describe("getAllUser", () => {
  it("should retrieve all users from the database", async () => {
    const users = await user.getAllUser();

    expect(users[0]).toHaveProperty("id");
    expect(users[0]).toHaveProperty("username");
    expect(users[0]).toHaveProperty("hash_password");
  });
});

// ================= TEST SUITE 4 ==================================
describe("updateUserPassword", () => {
  const bcrypt = require("bcrypt");

  it("should update a user password", async () => {
    const userId = "24ca04d6-67bc-4594-a9d1-b824717b64f0";
    const newPassword = "new-password";

    // Mock the bcrypt.hash function to return a hashed password
    const hash = 10;
    const mockHash = jest.spyOn(bcrypt, "hash");
    mockHash.mockResolvedValue("hashed-password");

    const result = await user.updateUserPassword(userId, newPassword);
    expect(result).toEqual(1); // function returns an array with the number of updated rows
  });
});

// ================= TEST SUITE 5 ==================================
describe("deleteUser", () => {
  it("should delete an existing user", async () => {
    const userId = "d4991e9e-e681-4007-b27f-518fa0524ce8";
    const deletedRows = await user.deleteUser(userId);
    expect(deletedRows).toBe(1);
  });
});

/*-----------------------USER PROFILE MODEL-------------------------------------------------------*/
// ================= TEST SUITE 1 ==================================
describe("getUserProfileByUserId", () => {
  it("should retrieve a user profile by a valid user ID", async () => {
    const userId = "24ca04d6-67bc-4594-a9d1-b824717b64f0";

    const userProfileData = await userProfile.getUserProfileByUserId(userId);

    expect(userProfileData).not.toBeUndefined();
    expect(userProfileData.user_id).toBe(userId); // Assuming there's a 'user_id' property in the user profile data
  });
});

// ================= TEST SUITE 2 ==================================
describe("createUserProfile", () => {
  it("should create a user profile", async () => {
    // Define the user profile data
    const mockUserProfile = {
      user_id: "24ca04d6-67bc-4594-a9d1-b824717b64f0",
      full_name: "John Doe",
      date_of_birth: "1999-01-01",
      address: "Central Java, Indonesia",
    };

    // Call the createUserProfile function
    const result = await userProfile.createUserProfile(mockUserProfile);

    // Assert that the result is not empty or undefined
    expect(result).toBeDefined();
  });
});

// ================= TEST SUITE 3 ==================================
describe("updateUserProfile", () => {
  it("should update a user profile", async () => {
    const mock = {
      user_id: "24ca04d6-67bc-4594-a9d1-b824717b64f0",
      full_name: "John Doeyok",
      date_of_birth: "10-10-2010",
      address: "Indonesia",
    };

    // Call the updateUserProfile function
    const result = await userProfile.updateUserProfile(
      mock.user_id,
      mock.full_name,
      mock.date_of_birth,
      mock.address
    );

    expect(result).toBeTruthy();
    const updatedUserProfile = await userProfile.getUserProfileByUserId(
      mock.user_id
    );

    expect(updatedUserProfile.full_name).toBe(mock.full_name);
  });
});

// ================= TEST SUITE 4 ==================================
describe("deleteUserProfile", () => {
  it("should delete an existing user profile", async () => {
    const userId = "24ca04d6-67bc-4594-a9d1-b824717b64f0";

    const deletionResult = await userProfile.deleteUserProfile(userId);

    expect(deletionResult).toBe(1); // Assuming a successful deletion returns 1
  });
});
