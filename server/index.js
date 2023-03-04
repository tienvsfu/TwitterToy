import express from "express";
import bodyParser from "body-parser";
import * as _DbService from "./services/dbService.js";
import * as _cacheService from "./services/cacheService.js";

const dbService = _DbService.default;
const cacheService = _cacheService.default;

// setup express
const app = express();
const port = 5000;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// routing
app.get("/hi", async (req, res) => {
  const users = await dbService.getIdCounter();
  res.json(users);
});

app.get("/users", async (req, res) => {
  const users = await dbService.getAllUsers();
  res.json(users);
});

// make a tweet for this guy
app.post("/users/:user_id/tweets", async (req, res) => {
  const { user_id } = req.params;
  const tweetMessage = req.body.message ? req.body.message : "";

  const tweetId = await dbService.getTweetIdCounter();
  const tweet = { id: tweetId + 1, user_id, message: tweetMessage };
  const followers = await dbService.getFollowers(user_id);
  await dbService.insertTweet(tweet);
  await cacheService.postTweet(tweet, followers);

  res.json(tweet);
});

// get this guy tweets
app.get("/users/:id/tweets", async (req, res) => {
  const users = await dbService.getAllUsers();
  res.json(users);
});

// get this guy tweets + following
app.get("/users/:user_id/home", async (req, res) => {
  const users = await cacheService.getTimeline(req.params.user_id);
  res.json(users);
});

app.post("/users", async (req, res) => {
  const name = req.body.name ? req.body.name : "";

  if (!name) {
    return res.json({ success: false, message: "Name is required" });
  }

  const idCounter = await dbService.getIdCounter();
  const newGuy = await dbService.insertUser({ id: `${idCounter + 1}`, name });
  res.json(newGuy);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
