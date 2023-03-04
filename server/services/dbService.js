import knexConfig from "../db/knexfile.js";
import knex from "knex";

const shard1 = knex(knexConfig["dev1"]);
const shard2 = knex(knexConfig["dev2"]);
const shard3 = knex(knexConfig["production"]);

const things = {
  getIdCounter: () => {
    return shard1("users")
      .max("id")
      .then((users) => {
        console.log("GOT", users);
        return parseInt(users[0]["max(`id`)"]);
      })
      .catch((err) => {
        console.error(err);
        return err;
      });
  },

  getTweetIdCounter: () => {
    return shard1("tweets")
      .max("id")
      .then((result) => {
        return parseInt(result[0]["max(`id`)"]);
      })
      .catch((err) => {
        console.error(err);
        return err;
      });
  },

  getUserById: (id) => {
    return shard1("users")
      .select({
        id: "id",
        name: "name",
      })
      .where({ id })
      .then((result) => {
        return result;
      })
      .catch((err) => {
        console.error(err);
        return err;
      });
  },

  getAllUsers: () => {
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
  },

  insertUser: ({ id, name }) => {
    return shard1("users")
      .insert({ id, name })
      .then((wtfIsThisParam) => {
        return shard1("users")
          .select({
            id: "id",
            name: "name",
          })
          .where("id", id)
          .then((user) => {
            //   console.log("FOUND SHIT");
            //   console.log(user);
            return user[0];
          });
      })
      .catch((err) => {
        console.error(err);
        return err;
      });
  },

  getFollowers: (followee_id) => {
    return shard1("followers")
      .select({
        follower_id: "follower_id",
      })
      .where({ followee_id })
      .then((rows) => {
        return rows.map((row) => row.follower_id);
      })
      .catch((err) => {
        console.error(err);
        return err;
      });
  },

  getFollowing: (follower_id) => {
    return shard1("followers")
      .select({
        followee_id: "followee_id",
      })
      .where({ follower_id })
      .then((rows) => {
        return rows.map((row) => row.followee_id);
      })
      .catch((err) => {
        console.error(err);
        return err;
      });
  },

  getTweets: () => {
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
  },

  insertTweet: ({ id, user_id, message }) => {
    return shard1("tweets")
      .insert({ id, user_id, message })
      .then((wtfIsThisParam) => {
        return shard1("tweets")
          .select({
            id: "id",
            message: "message",
          })
          .where("id", id)
          .then((row) => {
            return row[0];
          });
      })
      .catch((err) => {
        console.error(err);
        return err;
      });
  },
};

export default things;
