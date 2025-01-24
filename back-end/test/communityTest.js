//unit test of back-end route /api/community 
import { expect } from "chai"
import request from "supertest"
import server from "../app.js"

//checks the response of the route, including the specific community data 
describe("GET request to /api/community route", () => {
    it("it should respond with HTTP 200 status code", async () => {
      const res = await request(server).get("/api/community")
      expect(res.status).to.equal(200)
    })

    it("it should respond with non-empty json data in the body", async () => {
      const res = await request(server).get("/api/community")
      expect(res.headers["content-type"]).to.include("application/json")
      expect(res.body).to.be.an("array").to.have.length.above(0)
    })

    it("the returned object should contain an 'id' property that is a positive number", async () => {
      const res = await request(server).get("/api/community")
      res.body.forEach(community => {
        expect(community).to.be.an("object")
        expect(community).to.have.property("id").that.is.a("number").and.is.above(0)
      })
    })

    it("the returned object should contain an 'name' property that is a non-empty string", async () => {
      const res = await request(server).get("/api/community")
      res.body.forEach(community => {
        expect(community).to.be.an("object")
        expect(community).to.have.property("name").that.is.a("string").and.is.not.empty
      })
    })

    it("the returned object should contain an 'description' property that is a non-empty string", async () => {
      const res = await request(server).get("/api/community")
      res.body.forEach(community => {
        expect(community).to.be.an("object")
        expect(community).to.have.property("description").that.is.a("string").and.is.not.empty
      })
    })
    
})
