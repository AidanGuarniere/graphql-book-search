// import gql from apollo server express
const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    books: [Book]
  }

  type Book {
    authors: [String]
    description: String
    bookId: ID
    image: String
    link: String
    title: String
  }
`;
