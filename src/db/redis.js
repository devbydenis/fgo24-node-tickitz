const redis = require('redis');
const { promisify } = require('util');

// Setup Redis client
const redisClient = redis.createClient({
  host: process.env.REDIS_HOST || 'localhost',
  port: process.env.REDIS_PORT || 6379
});

// Promisify Redis methods
const setAsync = promisify(redisClient.setEx).bind(redisClient);
const getAsync = promisify(redisClient.get).bind(redisClient);
const delAsync = promisify(redisClient.del).bind(redisClient);
const incrAsync = promisify(redisClient.incr).bind(redisClient);
const expireAsync = promisify(redisClient.expire).bind(redisClient);

module.exports = {
  redisClient,
  setAsync,
  getAsync,
  delAsync,
  incrAsync,
  expireAsync
};