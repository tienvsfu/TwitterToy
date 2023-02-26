exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("tweets")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("tweets").insert([
        { id: 1, name: "tweet 1" },
        { id: 2, name: "tweet 2" },
      ]);
    });
};
