exports.up = function (knex) {
  return knex.schema.createTable("transactions", function (table) {
    table.increments("id").primary();
    table.string("description").notNullable();
    table.float("value").notNullable();
    table.date("date").notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("transactions");
};
