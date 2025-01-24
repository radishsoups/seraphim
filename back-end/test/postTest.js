import { expect } from "chai";
import request from "supertest";
import server from "../app.js";

// Test suite for the /api/post route
describe("POST request to /api/post route", () => {
    it("should respond with HTTP 200 status code when valid data is sent", async () => {
        const newPost = {
            postContent: "Hello, this is a test post!",
            selectedOption: "Community 1"
        };

        const res = await request(server)
            .post("/api/post")
            .send(newPost);

        expect(res.status).to.equal(200);
        expect(res.body).to.be.an("object");
        expect(res.body).to.have.property("message").that.equals("Post received successfully");
        expect(res.body.data).to.have.property("postContent").that.equals(newPost.postContent);
        expect(res.body.data).to.have.property("selectedOption").that.equals(newPost.selectedOption);
    });

    it("should respond with HTTP 400 status code when required fields are missing", async () => {
        const res = await request(server).post("/api/post").send({});
        expect(res.status).to.equal(400);
        expect(res.body).to.have.property("error").that.includes("Missing required fields");
    });
});
