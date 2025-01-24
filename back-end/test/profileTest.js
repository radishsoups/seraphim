import { expect } from "chai";
import request from "supertest";
import server from "../app.js"; 
import * as authModule from "../routes/auth.js"; 

describe("Profile API", () => {

  // Test for GET /api/profile
  describe("GET /api/profile", () => {
    it("should return user profile data", async () => {
      const response = await request(server)
        .get("/api/profile")
        .expect("Content-Type", /json/)
        .expect(200);

      expect(response.body).to.be.an("object");
      expect(response.body).to.have.property("username");
      expect(response.body).to.have.property("display_name");
      expect(response.body).to.have.property("about");
      expect(response.body).to.have.property("email");
      expect(response.body).to.have.property("profile_pic");
    });
  });

  // Test for POST /api/profile
  describe("POST /api/profile", () => {
    it("should update the user profile data successfully", async () => {
      const updatedUser = {
        display_name: "New Display Name",
        username: "new_username",
        about: "Updated about information",
        email: "newemail@example.com",
        profile_pic: "http://example.com/new-pic.jpg"
      };

      const response = await request(server)
        .post("/api/profile")
        .send(updatedUser)
        .expect("Content-Type", /json/)
        .expect(200);

      expect(response.body).to.be.an("object");
      expect(response.body).to.have.property("message").eql("Profile updated successfully");
      expect(response.body.user).to.deep.include(updatedUser);
    });
  });
});
