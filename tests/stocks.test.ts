import supertest from "supertest";
import httpStatus from "http-status";
import app, { init } from "../src/app";
import { prisma } from "../src/config";
import { faker } from "@faker-js/faker";

const server = supertest(app);

beforeAll(async () => {
  await init();
  await prisma.cart.deleteMany({});
  await prisma.stock.deleteMany({});
  await prisma.products.deleteMany({});
});

describe("POST /stock/:id", () => {
  describe("when body is valid", () => {
    const generateValidBody = () => ({
      name: faker.internet.userName(),
      description: faker.lorem.sentence(),
      price: faker.random.numeric(3),
      image: faker.lorem.sentence(),
      itemQuality: faker.random.numeric(6),
      category: faker.lorem.word(),
    });

    it("should respond with status 201", async () => {
      const body = generateValidBody();
      const generateValidStockBody = () => ({
        amount: 5,
      });
      const stockbody = generateValidStockBody();
      const productResponse = await server
        .post("/products-registration/")
        .send(body);

      const response = await server
        .post(`/stock/${productResponse.body.id}`)
        .send(stockbody);

      expect(response.status).toBe(httpStatus.CREATED);
    });
  });
});
describe("GET /stock/:id", () => {
  it("should respond with status 200 when stock is returned", async () => {
    const generateValidBody = () => ({
      name: faker.internet.userName(),
      description: faker.lorem.sentence(),
      price: faker.random.numeric(3),
      image: faker.lorem.sentence(),
      itemQuality: faker.random.numeric(6),
      category: faker.lorem.word(),
    });
    const body = generateValidBody();
    const generateValidStockBody = () => ({
      amount: 5,
    });
    const stockbody = generateValidStockBody();
    const productResponse = await server
      .post("/products-registration/")
      .send(body);
    await server.post(`/stock/${productResponse.body.id}`).send(stockbody);
    const response = await server.get(`/stock/${productResponse.body.id}`);

    expect(response.status).toBe(httpStatus.OK);
  });
});
