// demo user data
const users = [
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
const posts = [
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
const comments = [
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
const db = {
  users,
  posts,
  comments
};
export { db as default };
