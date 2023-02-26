exports.up = function (knex) {
  return knex.schema.createTable("users", function (table) {
    table.string("id").notNullable();
    table.string("name", 255).notNullable();
    table.timestamps();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("users");
};
