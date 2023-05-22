const knex = require("knex");
const knexConfig = require("./knexfile");
const db = knex(knexConfig.development);
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
        throw new Error("Failed to save transaction");
      }
    },

    async deleteTransaction(_, args) {
      const id = args.id;

      try {
        const [transaction] = await db("transactions")
          .where({ id })
          .del()
          .returning("*");

        if (!transaction) {
          throw new Error("Transaction not found");
        }

        return transaction;
      } catch (error) {
        throw new Error("Failed to delete transaction");
      }
    },
  },
};
module.exports = {
  resolvers, transactions
};