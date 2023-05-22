const { ApolloServer, gql } = require("apollo-server");
const knex = require("knex");
const knexConfig = require("./knexfile");
const db = knex(knexConfig.development);
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

const transactions = [];

const resolvers = {
  Query: {
    transactions: async () => await db("transactions"),
  },
  Mutation: {
    async saveTransaction(_, args) {
      const transaction = args.transaction;

      try {
        const [savedTransaction] = await db("transactions")
          .insert(transaction)
          .returning("*");

        return savedTransaction;
      } catch (error) {
        console.error(error);
        throw new Error("Failed to save transaction");
      }
    },

    async deleteTransaction(_, args) {
      const id = args.id;

      try {
        // Find the transaction by ID
        const [transaction] = await db("transactions")
          .where({ id })
          .del()
          .returning("*");

        if (!transaction) {
          throw new Error("Transaction not found");
        }

        return transaction;
      } catch (error) {
        console.error(error);
        throw new Error("Failed to delete transaction");
      }
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
