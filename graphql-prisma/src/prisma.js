import { Prisma } from "prisma-binding";

const prisma = new Prisma({
  typeDefs: "src/generated/prisma.graphql",
  endpoint: "http://localhost:4466"
});

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
//     "{id}"
//   );
//   const user = await prisma.query.user(
//     {
//       where: {
//         id: authorId
//       }
//     },
//     "{id name email posts {id title published}}"
//   );
//   return user;
// };

const updatePostForUser = async (postId, data) => {
  const post = await prisma.mutation.updatePost(
    {
      where: {
        id: postId
      },
      data
    },
    "{ author { id } }"
  );
  const user = await prisma.query.user(
    {
      where: {
        id: post.author.id
      }
    },
    "{ id name email posts { id title published } }"
  );
  return user;
};

updatePostForUser("ck09ab3p9008k0811suiqzhoq", {
  published: false,
  body: "updated"
}).then(user => {
  console.log(JSON.stringify(user, undefined, 2));
});

// createPostForUser("ck0983mul00sf071106j8drp9", {
//   title: "post async",
//   body: "body async",
//   published: true
// }).then(user => {
//   console.log(JSON.stringify(user, undefined, 2));
// });

// // create post
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
