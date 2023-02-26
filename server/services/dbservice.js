import knexConfig from "../db/knexfile.js";
import knex from "knex";

const shard1 = knex(knexConfig["development"]);
const shard2 = knex(knexConfig["production"]);

var GLOBAL_ID = 1;

const getIdCounter = () => {};

const getUserById = (id) => {
  return shard1("users")
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
  return shard1("users")
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
  return shard1("users")
    .insert({ id: GLOBAL_ID, name })
    .then((id) => {
      GLOBAL_ID += 1;
      console.log(id);

      //get user by id
      return shard1("users")
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
