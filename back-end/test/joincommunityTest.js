import { expect } from "chai";
import request from "supertest";
import server from "../app.js";

describe("Join Community", () => {
  let userId;
  let communityId;

  userId = 2;
  communityId = 1;

  it("should successfully join a community", async () => {
    const response = await request(server)
      .post(`/api/join-community/${communityId}`)
      .send({ communityId, userId });

    expect(response.status).to.equal(200);
    expect(response.body.message).to.equal(
      "You have successfully joined the community"
    );
  });

  it("should return an error if community does not exist", async () => {
    const nonexistentCommunityId = "notexist";
    const response = await request(server)
      .post(`/api/join-community/${nonexistentCommunityId}`)
      .send({ communityId: nonexistentCommunityId, userId });

    expect(response.status).to.equal(404);
    expect(response.body.message).to.equal("Invalid community ID");
  });

  it("should return an error if user is already a member of the community", async () => {
    const response = await request(server)
      .post(`/api/join-community/5`)
      .send({ communityId: 5, userId });

    expect(response.status).to.equal(400);
    expect(response.body.message).to.equal(
      "You have already joined this community"
    );
  });
});
