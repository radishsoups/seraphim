// unit tests for settings routes
import { expect } from 'chai';
import request from "supertest";
import server from "../app.js";

describe("Settings Tests", () => {
    //check response of account settings route
    describe("GET request to /api/account-settings route", () => {
        it("it should respond with HTTP 200 status code with one object in the body with five properties", async () => {
            const res = await request(server).get("/api/account-settings")
            expect(res.status).to.equal(200)
            expect(res.body).to.be.an('object')
            expect(res.body).to.have.property('id')
            expect(res.body).to.have.property('username')
            expect(res.body).to.have.property('name')
            expect(res.body).to.have.property('email')
            expect(res.body).to.have.property('password')
        })
    })

    //check response of deactivation route
    describe("POST request to /api/deactivate route", () => {
        it("it should let a user deactivate successfully and respond with HTTP 200 status code", async () => {
            const res = await request(server)
                .post("/api/deactivate")
                .send({ id: 1 })
            expect(res.status).to.equal(200);
        })
    })

    // check response of blocked users routes
    describe("GET request to /api/blocked-users route", () => {
        it("it should respond with HTTP 200 status code with a non-empty array in the body", async () => {
            const res = await request(server).get("/api/blocked-users")
            expect(res.status).to.equal(200)
            expect(res.body).to.be.an('array')
            expect(res.body).to.have.length.above(0)
        })
    })

    describe("POST request to /api/blocked-users route", () => {
        it("it should block a user successfully and respond with HTTP 200 status code", async () => {
            const res = await request(server)
                .post("/api/blocked-users")
                .send({ request: 'block', user: 'foostein', users: [] })
            expect(res.status).to.equal(200);
        })

        it("it should unblock a user successfully and respond with HTTP 200 status code", async () => {
            const res = await request(server)
                .post("/api/blocked-users")
                .send({ request: 'unblock', user: 'foostein', users: [] })
            expect(res.status).to.equal(200);
        })
    })

    // check response of blocked communities routes
    describe("GET request to /api/blocked-communities route", () => {
        it("it should respond with HTTP 200 status code with a non-empty array in the body", async () => {
            const res = await request(server).get("/api/blocked-communities")
            expect(res.status).to.equal(200)
            expect(res.body).to.be.an('array')
            expect(res.body).to.have.length.above(0)
        })
    })

    describe("POST request to /api/blocked-communities route", () => {
        it("it should block a community successfully and respond with HTTP 200 status code", async () => {
            const res = await request(server)
                .post("/api/blocked-communities")
                .send({ request: 'block', name: 'Test', communities: [] })
            expect(res.status).to.equal(200);
        })

        it("it should unblock a community successfully and respond with HTTP 200 status code", async () => {
            const res = await request(server)
                .post("/api/blocked-communities")
                .send({ request: 'unblock', name: 'Test', communities: [] })
            expect(res.status).to.equal(200);
        })
    })

    // check response of muted words routes
    describe("GET request to /api/muted-words route", () => {
        it("it should respond with HTTP 200 status code with a non-empty array in the body", async () => {
            const res = await request(server).get("/api/muted-words")
            expect(res.status).to.equal(200)
            expect(res.body).to.be.an('array')
            expect(res.body).to.have.length.above(0)
        })
    })

    describe("POST request to /api/muted-words route", () => {
        it("it should mute a word successfully and respond with HTTP 200 status code", async () => {
            const res = await request(server)
                .post("/api/muted-words")
                .send({ request: 'mute', word: 'Test', words: [] })
            expect(res.status).to.equal(200);
        })

        it("it should unmute a word successfully and respond with HTTP 200 status code", async () => {
            const res = await request(server)
                .post("/api/muted-words")
                .send({ request: 'unmute', id: 1, words: [{ "id": 1, "muted_word": "politics" }] })
            expect(res.status).to.equal(200);
        })
    })

    // check response of color mode routes
    describe("GET request to /api/color-mode route", () => {
        it("it should respond with HTTP 200 status code", async () => {
            const res = await request(server).get("/api/color-mode")
            expect(res.status).to.equal(200)
            expect(res.body).to.be.an('string')
        })
    })

    describe("POST request to /api/color-mode route", () => {
        it("it should successfully change color modes and respond with HTTP 200 status code", async () => {
            const res = await request(server)
                .post("/api/color-mode")
                .send({ id: 1, color: 'light' })
            expect(res.status).to.equal(200);
        })
    })

    // check response of image mode routes
    // describe("GET request to /api/image-mode route", () => {
    //     it("it should respond with HTTP 200 status code", async () => {
    //         const res = await request(server).get("/api/image-mode")
    //         expect(res.status).to.equal(200)
    //         expect(res.body).to.be.an('string')
    //     })
    // })

    // describe("POST request to /api/image-mode route", () => {
    //     it("it should successfully change image modes and respond with HTTP 200 status code", async () => {
    //         const res = await request(server)
    //             .post("/api/image-mode")
    //             .send({ id: 1, color: 'hide' })
    //         expect(res.status).to.equal(200);
    //     })
    // })

    // check response of font size routes
    describe("GET request to /api/font-size route", () => {
        it("it should respond with HTTP 200 status code", async () => {
            const res = await request(server).get("/api/font-size")
            expect(res.status).to.equal(200)
            expect(res.body).to.be.an('number')
        })
    })

    describe("POST request to /api/font-size route", () => {
        it("it should successfully change font size and respond with HTTP 200 status code", async () => {
            const res = await request(server)
                .post("/api/font-size")
                .send({ id: 1, fontSize: 18 })
            expect(res.status).to.equal(200);
        })
    })

})