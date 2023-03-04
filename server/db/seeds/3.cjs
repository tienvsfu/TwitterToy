exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("followers")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("followers").insert([
        { id: 1, follower_id: 2, followee_id: 1 },
        { id: 2, follower_id: 3, followee_id: 1 },
        { id: 3, follower_id: 4, followee_id: 1 },
      ]);
    });
};
