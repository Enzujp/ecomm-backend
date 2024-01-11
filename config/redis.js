const redis = require("redis");
const client = redis.createClient();
const bluebird = require("bluebird");
// bluebird.promisifyAll(redis.RedisClient.prototype);
// bluebird.promisifyAll(redis.Multi.prototype);

client.on('ready', function() {
    client.on('error', ()=> {
        console.log("Error connecting to the cache")
    })
    console.log("Connection to cache successful")
})


module.exports = client

