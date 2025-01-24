import { expect } from "chai";
import request from "supertest";
import server from "../app.js";

describe("Authentication Tests", () => {
  describe("POST /api/signup", () => {
    it("should require all fields", async () => {
      const res = await request(server)
        .post("/api/signup")
        .send({ name: "John", username: "johnDoe", password: "123456" });
      expect(res.status).to.equal(400);
      expect(res.body.message).to.equal("All fields are required");
    });

    it("should enforce password length", async () => {
      const res = await request(server).post("/api/signup").send({
        name: "John",
        username: "johnDoe",
        email: "john@example.com",
        password: "123",
      });
      expect(res.status).to.equal(400);
      expect(res.body.message).to.equal(
        "Password should be at least 6 characters long"
      );
    });

    it("should create a user successfully", async () => {
      const res = await request(server).post("/api/signup").send({
        name: "John",
        username: "johnDoe",
        email: "john@example.com",
        password: "123456",
      });
      expect(res.status).to.equal(201);
      expect(res.body.message).to.equal("User created successfully");
      expect(res.body.user).to.include({
        display_name: "John",
        username: "johnDoe",
        email: "john@example.com",
      });
    });
  });

  describe("POST /api/login", () => {
    it("should log in a user", async () => {
      const res = await request(server)
        .post("/api/login")
        .send({ username: "johnDoe", password: "123456" });
      expect(res.status).to.equal(200);
      expect(res.body.message).to.equal("Logged in successfully");
      expect(res.body).to.have.property("username");
      expect(res.body).to.have.property("password");
    });
  });

  describe("POST /api/logout", () => {
    it("should log out a user", async () => {
      const res = await request(server).post("/api/logout");
      expect(res.status).to.equal(200);
      expect(res.body.message).to.equal("Logged out successfully");
    });
  });
});
