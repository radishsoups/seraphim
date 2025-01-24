import { expect } from "chai";
import request from "supertest";
import server from "../app.js";

// Test suite for the /api/home route
describe("GET request to /api/home route", () => {
    it("should respond with HTTP 200 status code", async () => {
        const res = await request(server).get("/api/home");
        expect(res.status).to.equal(200);
    });

    it("should respond with JSON data in the body", async () => {
        const res = await request(server).get("/api/home");
        expect(res.headers["content-type"]).to.include("application/json");
        expect(res.body.posts).to.be.an("array");
    });

    it("should contain posts with expected properties", async () => {
        const res = await request(server).get("/api/home");
        
        res.body.posts.forEach(post => {
            expect(post).to.be.an("object");
            expect(post).to.have.property("id").that.is.a("number");
            expect(post).to.have.property("user").that.is.an("object");
            expect(post.user).to.have.property("username").that.is.a("string");
            expect(post.user).to.have.property("display_name").that.is.a("string");
            expect(post).to.have.property("content").that.is.a("string");
            expect(post).to.have.property("likes").that.is.a("number");
            expect(post).to.have.property("liked_by").that.is.a("array");
            expect(post).to.have.property("images").that.is.an("array");
        });
    });
});
