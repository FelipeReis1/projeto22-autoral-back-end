import supertest from "supertest";
import httpStatus from "http-status";
import app, { init } from "../src/app";
import { prisma } from "../src/config";
import { faker } from "@faker-js/faker";
import { createUser } from "./factories/users-factory";

const server = supertest(app);
beforeAll(async () => {
  await init();
  await prisma.stock.deleteMany({});
  await prisma.products.deleteMany({});
  await prisma.cart.deleteMany({});
});

describe("POST /cart/", () => {
  it("should respond with status 400 when body is not given", async () => {
    const response = await server.post("/cart/");

    expect(response.status).toBe(httpStatus.BAD_REQUEST);
  });

  it("should respond with status 400 when body is not valid", async () => {
    const invalidBody = {
      [faker.lorem.word()]: faker.lorem.word(),
    };

    const response = await server.post("/cart/").send(invalidBody);

    expect(response.status).toBe(httpStatus.BAD_REQUEST);
  });

  describe("when body is valid", () => {
    const generateValidUserBody = () => ({
      email: faker.internet.email(),
      password: faker.internet.password(6),
    });
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

      await server.post(`/stock/${productResponse.body.id}`).send(stockbody);
      const userBody = generateValidUserBody();
      await createUser(userBody);

      const userResponse = await server.post("/auth/signin").send(userBody);
      const generateValidCartBody = () => ({
        userId: userResponse.body.id,
        productId: productResponse.body.id,
        amount: 1,
      });
      const cartBody = generateValidCartBody();
      const response = await server.post("/cart").send(cartBody);

      expect(response.status).toBe(httpStatus.CREATED);
    });
  });
});
