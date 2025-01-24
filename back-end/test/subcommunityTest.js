//unit test of back-end route /api/community/:communityId
import { expect } from "chai"
import request from "supertest"
import server from "../app.js"

//checks the response of the route, including the specific community data (checks community id 1)
describe("GET request to /api/community/:communityId route", () => {
  const communityId = 1;

    it("it should respond with HTTP 200 status code", async () => {
      const res = await request(server).get(`/api/community/${communityId}`)
      expect(res.status).to.equal(200)
    })

    it("it should respond with one non-empty json object in the body", async () => {
      const res = await request(server).get(`/api/community/${communityId}`)
      expect(res.headers["content-type"]).to.include("application/json")
      expect(res.body).to.be.an("object").that.is.not.empty
    })

    it("the returned object should contain an 'id' property that is a positive number", async () => {
      const res = await request(server).get(`/api/community/${communityId}`)
      expect(res.body).to.have.property("id").that.is.a("number").and.is.above(0)

      
    })

    it("the returned object should contain an 'name' property that is a non-empty string", async () => {
      const res = await request(server).get(`/api/community/${communityId}`)
      expect(res.body).to.have.property("name").that.is.a("string").and.is.not.empty
    })

    it("the returned object should contain an 'description' property that is a non-empty string", async () => {
      const res = await request(server).get(`/api/community/${communityId}`)
      expect(res.body).to.have.property("description").that.is.a("string").and.is.not.empty

    })

    it("the returned object should contain an 'image' property with a valid image", async () => {
      const res = await request(server).get(`/api/community/${communityId}`)
      expect(res.body).to.have.property("image").that.is.a("string").and.is.not.empty
      
      const url = res.body.image
      const regex = /^(https?:\/\/)([\w-]+\.)+[\w-]+(\/[\w-]*)*(\?[a-zA-Z0-9=&]*)?$/i;
      expect(url).to.match(regex)
    })

    it("it should throw an error for an invalid community id", async () => {
      const res = await request(server).get(`/api/community/9999999999999`)
      expect(res.status).to.equal(404)
    })
    
})