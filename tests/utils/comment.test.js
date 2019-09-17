import "cross-fetch/polyfill";
import seedDatabase, {
  userOne,
  commentOne,
  commentTwo,
  postOne
} from "./utils/seedDatabase";
import getClient from "./utils/getClient";
import prisma from "../src/prisma";
import { deleteComment } from "./utils/operations";

beforeEach(seedDatabase);

test("Should not delete other users comment", async () => {
  const client = getClient(userOne.jwt);
  const variables = {
    id: commentOne.comment.id
  };

  await expect(
    client.mutate({ mutation: deleteComment, variables })
  ).rejects.toThrow();
});
