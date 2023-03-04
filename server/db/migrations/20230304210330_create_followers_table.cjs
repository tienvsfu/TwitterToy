exports.up = function (knex) {
  return knex.schema.createTable("followers", function (table) {
    table.integer("id").unsigned().primary();
    table.integer("follower_id").unsigned().notNullable();
    table
      .foreign("follower_id")
      .references("users.id")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    table.integer("followee_id").unsigned().notNullable();
    table
      .foreign("followee_id")
      .references("users.id")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    table.timestamps();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("followers");
};
