exports.up = function (knex) {
  return knex.schema.createTable("tweets", function (table) {
    table.string("id").notNullable();
    table.string("name", 255).notNullable();
    table.timestamps();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("tweets");
};
