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

describe("POST /products-registration/", () => {
  it("should respond with status 400 when body is not given", async () => {
    const response = await server.post("/products-registration/");

    expect(response.status).toBe(httpStatus.BAD_REQUEST);
  });

  it("should respond with status 400 when body is not valid", async () => {
    const invalidBody = {
      [faker.lorem.word()]: faker.lorem.word(),
    };

    const response = await server
      .post("/products-registration/")
      .send(invalidBody);

    expect(response.status).toBe(httpStatus.BAD_REQUEST);
  });

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

      const response = await server.post("/products-registration/").send(body);

      expect(response.status).toBe(httpStatus.CREATED);
    });
  });
});
describe("GET /", () => {
  it("should respond with status 200 when products are returned", async () => {
    const response = await server.get("/");

    expect(response.status).toBe(httpStatus.OK);
  });
});
