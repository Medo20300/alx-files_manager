const redisClient = require('../utils/redis');
const dbClient = require('../utils/db');

const AppController = {
  async getStatus(req, res) {
    return res
      .json({
        redis: await redisClient.isAlive(),
        db: await dbClient.isAlive(),
      })
      .status(200);
  },
  async getStats(req, res) {
    return res
      .json({
        users: await dbClient.nbUsers(),
        files: await dbClient.nbFiles(),
      })
      .status(200);
  },
};

module.exports = AppController;
