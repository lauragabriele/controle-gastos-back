const { gql } = require("apollo-server");
const typeDefs = gql`
  type Transaction {
    id: ID!
    description: String!
    date: String!
    value: Float!
  }

  input TransactionInput {
    description: String!
    value: Float!
    date: String!
  }

  type Query {
    transactions: [Transaction]
  }

  type Mutation {
    saveTransaction(transaction: TransactionInput!): Transaction
    deleteTransaction(id: ID!): Transaction
  }
`;
module.exports = {
  typeDefs,
};