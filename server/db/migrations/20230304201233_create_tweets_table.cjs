exports.up = function (knex) {
  return knex.schema.createTable("tweets", function (table) {
    table.integer("id").primary();
    table.string("message", 255).notNullable();
    table.integer("user_id").unsigned().notNullable();
    table
      .foreign("user_id")
      .references("users.id")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    table.timestamps();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("tweets");
};
