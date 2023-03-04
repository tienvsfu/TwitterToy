import { createClient } from "redis";

// setup redis
const redisClient = createClient();
redisClient.on("error", (err) => console.log("Redis Client Error", err));
await redisClient.connect();
console.log(`The redis version is ${redisClient.version}`);

const things = {
  postTweet: async (tweet, followerIds) => {
    const { id, message } = tweet;
    await redisClient.set(`tweet:${id}`, message);

    for (let i = 0; i < followerIds.length; i++) {
      const followerId = followerIds[i];
      console.log(`timeline:${followerId}`);
      redisClient.lPush(`timeline:${followerId}`, `${id}`);
      //   redisClient.sendCommand(["LPUSH", `timeline:${followerId}`, "1"]);
    }
  },

  getTimeline: async (userId) => {
    const tweetIds = await redisClient.lRange(`timeline:${userId}`, 0, 100);
    const tweetMessages = await redisClient.mGet([
      ...tweetIds.map((id) => `tweet:${id}`),
    ]);
    return tweetMessages;
  },
};

export default things;
