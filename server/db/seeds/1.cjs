exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("users").insert([
        { id: 1, name: "Hettie Marshall" },
        { id: 2, name: "Hester Owens" },
        { id: 3, name: "Henry Jackson" },
        { id: 4, name: "Tienboy" },
      ]);
    });
};
