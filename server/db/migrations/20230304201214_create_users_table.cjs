exports.up = function (knex) {
  return knex.schema.createTable("users", function (table) {
    table.integer("id").unsigned().primary();
    table.string("name", 255).notNullable();
    table.timestamps();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("users");
};
