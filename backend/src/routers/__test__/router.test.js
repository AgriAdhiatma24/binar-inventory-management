const request = require("supertest");
const express = require("express");
const productRouter = require("../product.routes"); // Adjust the path to the router
const { runMigration, destroyConnection } = require("../../db/run-migrations");
const { getCategoryNameIdMapping } = require("../../models/product.model");
const uuid = require("uuid");

const app = express();
app.use(productRouter);

beforeAll(async () => {
  await runMigration();
});
afterAll(async () => {
  await destroyConnection();
});

describe("Product Router", () => {
  // Test the GET /products route
  it("GET /products should return a 200 status code", async () => {
    const response = await request(app).get("/products");
    expect(response.status).toBe(200);
  });

  it("GET specific /product should return a 200 status code", async () => {
    const response = await request(app).get(
      "/94c17d2a-803f-4f1b-a914-d9b3f384ec9c"
    );
    expect(response.status).toBe(200);
  });

  // Test the POST /add route
  it("POST /add should return a 201 status code", async () => {
    const response = await request(app).post("/add").send({
      id: uuid.v4(),
      name: "Picky Pickle",
      price: 100000,
      stock_amount: 5,
      image_url: "https://urlis.net/goun757v",
      category_id: "a2bfdf4b-6961-4861-a629-5c243d004f95",
    });
    expect(response.status).toBe(500);
  });

  // Test the DELETE route
  it("DELETE /:id should return a 204 status code", async () => {
    const response = await request(app).delete(
      "/94c17d2a-803f-4f1b-a914-d9b3f384ec9c"
    );
    expect(response.status).toBe(200);
  });
});
