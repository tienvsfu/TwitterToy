import knexConfig from "../db/knexfile.js";
import knex1 from "knex";

const knex = knex1(knexConfig["development"]);
var GLOBAL_ID = 1;

const getUserById = (id) => {
  return knex("users")
    .select({
      id: "id",
      name: "name",
    })
    .where({ id })
    .then((users) => {
      return users;
    })
    .catch((err) => {
      console.error(err);
      return err;
    });
};

const getAllUsers = () => {
  return knex("users")
    .select({
      id: "id",
      name: "name",
    })
    .then((users) => {
      return users;
    })
    .catch((err) => {
      console.error(err);
      return err;
    });
};

const insertUser = ({ name }) => {
  return knex("users")
    .insert({ id: GLOBAL_ID, name })
    .then((id) => {
      GLOBAL_ID += 1;
      console.log(id);

      //get user by id
      return knex("users")
        .select({
          id: "id",
          name: "name",
        })
        .where({ id: GLOBAL_ID - 1 })
        .then((user) => {
          console.log("FOUND SHIT");
          console.log(user);
          return user[0];
        });
    })
    .catch((err) => {
      console.error(err);
      GLOBAL_ID -= 1;
      return err;
    });
};

export { getUserById, getAllUsers, insertUser };
