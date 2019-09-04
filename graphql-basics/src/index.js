import { GraphQLServer } from "graphql-yoga";
import uuidv4 from "uuid/v4";

// demo user data
let users = [
  {
    id: "1",
    name: "Phone",
    email: "phone@gmail.com",
    age: 24
  },
  {
    id: "2",
    name: "love",
    email: "love@gmail.com",
    age: 24
  }
];

// demo post data
let posts = [
  {
    id: "1",
    title: "post1",
    body: "love@gmail.com",
    published: true,
    author: "2"
  },
  {
    id: "2",
    title: "post2",
    body: "love@gmail.com",
    published: true,
    author: "1"
  }
];
let comments = [
  {
    id: "1",
    text: "com1",
    author: "1",
    post: "2"
  },
  {
    id: "2",
    text: "com2",
    author: "1",
    post: "1"
  },
  {
    id: "3",
    text: "com3",
    author: "2",
    post: "2"
  },
  {
    id: "4",
    text: "com4",
    author: "2",
    post: "2"
  }
];

// Type Definitions(Schema)
const typeDefs = `
type Query{
    greeting(name:String, position:String):String!
    me:User!
    post: Post
    users(query: String): [User!]!
    posts(query: String):[Post!]!
    comments:[Comment!]!
}

type Mutation{
  createUser(data:CreateUserInput):User!
  deleteUser(id:ID!): User!
  createPost(data:CreatePostInput):Post!
  deletePost(id:ID!): Post!
  createComment(data:CreateCommentInput):Comment!
  deleteComment(id:ID!): Comment!
}

input CreateUserInput{
  name:String!
  email:String!
  age:Int
}
input CreatePostInput{
  title:String!
  body:String!
  published:Boolean!
  author:ID!
}
input CreateCommentInput{
  text:String!
  author:ID!
  post:ID!
}

type User{
    id: ID!
    name:String!
    email:String!
    age:Int!
    posts:[Post!]!
    comments:[Comment!]!
}
type Post{
    id: ID!
    title: String!
    body: String!
    published: Boolean!
    author:User!
    comments:[Comment!]!
}
type Comment{
  id:ID!
  text:String!
  author:User!
  post:Post!
}
`;
// Resolvers
const resolvers = {
  Query: {
    users(parent, args, ctx, info) {
      if (!args.query) {
        return users;
      }
      return users.filter(user => {
        return user.name.toLowerCase().includes(args.query.toLowerCase());
      });
    },
    posts(parent, args, ctx, info) {
      if (!args.query) {
        return posts;
      }
      return posts.filter(post => {
        const isTitleMatch = post.title
          .toLowerCase()
          .includes(args.query.toLowerCase());
        const isBodyMatch = post.body
          .toLowerCase()
          .includes(args.query.toLowerCase());
        return isTitleMatch || isBodyMatch;
      });
    },
    comments(parent, args, ctx, info) {
      return comments;
    },
    greeting(parent, args, ctx, info) {
      console.log(args);
      if (args.name && args.position) {
        return `Hello ${args.name} you are ${args.position}`;
      } else {
        return "Hello";
      }
    },
    me() {
      return {
        id: "1212",
        name: "Phone",
        email: "phone@gmail.com",
        age: 24
      };
    },
    post() {
      return {
        id: "123",
        title: "graph",
        body: "test",
        published: false
      };
    }
  },
  Mutation: {
    createUser(parent, args, ctx, info) {
      const emailTaken = users.some(user => user.email === args.data.email);
      if (emailTaken) {
        throw new Error("Email Taken");
      }
      const user = {
        id: uuidv4(),
        ...args.data
      };
      users.push(user);
      return user;
    },
    deleteUser(parent, args, ctx, info) {
      const userIndex = users.findIndex(user => user.id === args.id);
      if (userIndex === -1) {
        throw new Error("no user found");
      }
      const deleteUsers = users.splice(userIndex, 1);
      posts = posts.filter(post => {
        const match = post.author === args.id;
        if (match) {
          comments = comments.filter(comment => comment.post !== post.id);
        }
        return !match;
      });
      comments = comments.filter(comment => comment.author !== args.id);
      return deleteUsers[0];
    },
    createPost(parent, args, ctx, info) {
      const userExist = users.some(user => user.id === args.data.author);
      if (!userExist) {
        throw new Error("User not found");
      }
      const post = {
        id: uuidv4(),
        ...args.data
      };
      posts.push(post);
      return post;
    },
    deletePost(parent, args, ctx, info) {
      const postIndex = posts.findIndex(post => post.id === args.id);
      if (postIndex === -1) {
        throw new Error("post not found");
      }
      const deletePosts = posts.splice(postIndex, 1);
      comments = comments.filter(comment => comment.post !== args.id);
      return deletePosts[0];
    },
    createComment(parent, args, ctx, info) {
      const userExist = users.some(user => user.id === args.data.author);
      const postExist = posts.some(
        post => post.id === args.data.post && post.published
      );
      if (!userExist || !postExist) {
        throw new Error("Unable to find user and post");
      }
      const comment = {
        id: uuidv4(),
        ...args.data
      };
      comments.push(comment);
      return comment;
    },
    deleteComment(parent, args, ctx, info) {
      const commentIndex = comments.findIndex(
        comment => comment.id === args.id
      );
      if (commentIndex === -1) {
        throw new Error("Comment not found");
      }
      const deletedComments = comments.splice(commentIndex, 1);
      return deletedComments[0];
    }
  },
  Post: {
    author(parent, args, ctx, info) {
      return users.find(user => {
        return user.id === parent.author;
      });
    },
    comments(parent, args, ctx, info) {
      return comments.filter(comment => {
        return comment.post === parent.id;
      });
    }
  },
  Comment: {
    author(parent, args, ctx, info) {
      return users.find(user => {
        return user.id === parent.author;
      });
    },
    post(parent, args, ctx, info) {
      return posts.find(post => {
        return post.id === parent.post;
      });
    }
  },
  User: {
    posts(parent, args, ctx, info) {
      return posts.filter(post => {
        return post.author === parent.id;
      });
    },
    comments(parent, args, ctx, info) {
      return comments.filter(comment => {
        return comment.author === parent.id;
      });
    }
  }
};

const server = new GraphQLServer({
  typeDefs,
  resolvers
});

server.start(() => {
  console.log("server is up");
});
