import express from "express";
import bodyParser from "body-parser";
import { createClient } from "redis";
import * as DbService from "./services/dbService.js/index.js";

const { getUserById, getIdCounter, getAllUsers, insertUser } =
  DbService.default;

// setup redis
const client = createClient();
client.on("error", (err) => console.log("Redis Client Error", err));
await client.connect();

// setup express
const app = express();
const port = 5000;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// routing
app.get("/hi", async (req, res) => {
  const users = await getIdCounter();
  res.json(users);
});

app.get("/users", async (req, res) => {
  const users = await getAllUsers();
  res.json(users);
});

app.post("/users", async (req, res) => {
  const name = req.body.name ? req.body.name : "";

  if (!name) {
    return res.json({ success: false, message: "Name is required" });
  }

  const idCounter = await getIdCounter();
  const newGuy = await insertUser({ id: `${idCounter + 1}`, name });
  res.json(newGuy);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
