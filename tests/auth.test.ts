import supertest from "supertest";
import httpStatus from "http-status";
import app, { init } from "../src/app";
import { prisma } from "../src/config";
import { faker } from "@faker-js/faker";
import { createUser } from "./factories/users-factory";

const server = supertest(app);

beforeAll(async () => {
  await init();
  await prisma.cart.deleteMany({});
  await prisma.users.deleteMany({});
});

describe("POST /auth/signin", () => {
  it("should respond with status 400 when body is not given", async () => {
    const response = await server.post("/auth/signin");

    expect(response.status).toBe(httpStatus.BAD_REQUEST);
  });

  it("should respond with status 400 when body is not valid", async () => {
    const invalidBody = {
      [faker.lorem.word()]: faker.lorem.word(),
    };

    const response = await server.post("/auth/signin").send(invalidBody);

    expect(response.status).toBe(httpStatus.BAD_REQUEST);
  });

  describe("when body is valid", () => {
    const generateValidBody = () => ({
      email: faker.internet.email(),
      password: faker.internet.password(6),
    });

    it("should respond with status 401 if there is no user for given email", async () => {
      const body = generateValidBody();

      const response = await server.post("/auth/signin").send(body);

      expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });

    it("should respond with status 401 if there is a user for given email but password is not correct", async () => {
      const body = generateValidBody();
      await createUser(body);

      const response = await server.post("/auth/signin").send({
        ...body,
        password: faker.lorem.word(),
      });

      expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });

    describe("when credentials are valid", () => {
      it("should respond with status 200", async () => {
        const body = generateValidBody();
        await createUser(body);

        const response = await server.post("/auth/signin").send(body);

        expect(response.status).toBe(httpStatus.OK);
      });
    });
  });
});
