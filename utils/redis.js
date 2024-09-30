const { createClient } = require('redis');
const { promisify } = require('util');

let connectionCheck = false;

class RedisClient {
  constructor() {
    this.client = createClient()
      .on('error', (error) => {
        console.error(error);
      })
      .on('connect', () => {
        connectionCheck = true;
      });
  }

  async isAlive() {
    if (!connectionCheck) {
      await new Promise((resolve) => {
        this.client.once('connect', resolve);
      });
    }
    return connectionCheck;
  }

  async get(key) {
    const promise = promisify(this.client.get).bind(this.client);
    return promise(key);
  }

  async set(key, value, duration) {
    await this.client.setex(key, duration, value);
  }

  async del(key) {
    await this.client.del(key);
  }
}

const redisClient = new RedisClient();
module.exports = redisClient;
