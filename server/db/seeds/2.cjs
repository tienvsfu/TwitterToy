exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("tweets")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("tweets").insert([
        { id: 1, message: "tweet 1", user_id: 1 },
        { id: 2, message: "tweet 2", user_id: 3 },
      ]);
    });
};
