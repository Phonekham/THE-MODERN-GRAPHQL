import { Prisma } from "prisma-binding";
import { fragmentReplacements } from "./resolvers/index";

const prisma = new Prisma({
  typeDefs: "src/generated/prisma.graphql",
  endpoint: process.env.PRISMA_ENDPOINT,
  secret: "mySecret",
  fragmentReplacements
});

export { prisma as default };

// const user = prisma.query
//   .users(null, "{id name posts {id title} }")
//   .then(data => {
//     console.log(JSON.stringify(data, undefined, 2));
//   });

// prisma.query
//   .comments(null, "{id text author {id name} post {id title}}")
//   .then(data => {
//     console.log(JSON.stringify(data, undefined, 2));
//   });

// Async/await
// 1/ create A new post
// 2/ fetch all of the info about the user (author)
// const createPostForUser = async (authorId, data) => {
//   const userExists = await prisma.exists.User({ id: authorId });
//   if (!userExists) {
//     throw new Error("USer not found");
//   }
//   const post = await prisma.mutation.createPost(
//     {
//       data: {
//         ...data,
//         author: {
//           connect: {
//             id: authorId
//           }
//         }
//       }
//     },
//     "{author{id name email posts{is title published}}}"
//   );
//   return post.author;
// };

// // prisma.query prisma.mutation prisma.subscription prisma.exists
// prisma.exists
//   .Comment({
//     id: "ck09b605u00p008112une313n"
//   })
//   .then(exists => {
//     console.log(exists);
//   });

// const updatePostForUser = async (postId, data) => {
//   const postExists = await prisma.exists.Post({ id: postId });
//   if (!postExists) {
//     throw new Error("post not found");
//   }
//   const post = await prisma.mutation.updatePost(
//     {
//       where: {
//         id: postId
//       },
//       data
//     },
//     "{ author { id name email posts{id title published} } }"
//   );

//   return post.author;
// };

// updatePostForUser("ck09ab3p9008k0811suiqzhoqf", {
//   published: false,
//   body: "updated"
// })
//   .then(user => {
//     console.log(JSON.stringify(user, undefined, 2));
//   })
//   .catch(err => {
//     console.log(err.message);
//   });

// createPostForUser("ck0983mul00sf071106j8drp9f", {
//   title: "post async",
//   body: "body async",
//   published: true
// })
//   .then(user => {
//     console.log(JSON.stringify(user, undefined, 2));
//   })
//   .catch(err => {
//     console.log(err.message);
//   });

// create post
// prisma.mutation
//   .createPost(
//     {
//       data: {
//         title: "My new graphql",
//         body: "text body",
//         published: true,
//         author: {
//           connect: {
//             id: "ck0983mul00sf071106j8drp9"
//           }
//         }
//       }
//     },
//     "{id title body published author{id name}}"
//   )
//   .then(data => {
//     console.log(data);
//     return prisma.query.users(null, "{id name posts {id title} }");
//   })
//   .then(data => {
//     console.log(JSON.stringify(data, undefined, 2));
//   });

// // update post
// prisma.mutation
//   .updatePost(
//     {
//       where: {
//         id: "ck09m9khi00cr0711kq6upfzy"
//       },
//       data: {
//         title: "updated"
//       }
//     },
//     "{id title}"
//   )
//   .then(data => {
//     return prisma.query.posts(null, "{id title body }");
//   })
//   .then(data => {
//     console.log(JSON.stringify(data, undefined, 2));
//   });
