/**
 * Use Redis to store the token. If token is not existing, get a new one and store it to use later
 * { REFRESH_TOKEN: 'token' }
 */
const { promisify } = require('util');
const redis = require("redis");
const axios = require('axios');

// Connect Redis
const client = redis.createClient({ host: process.env.REDIS_HOST, port: process.env.REDIS_PORT });
client.on("error", err => {
  console.log("Redis: " + err);
  throw err;    
});
/**
 * 
 */
async function getRefreshToken() {
  try {
    return await axios({
      method: 'post',
      url: process.env.IAM_URL,
      params: {
        refresh_token: process.env.REFRESH_TOKEN,
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        grant_type: process.env.GRANT_TYPE,
      },
      data: {}
    });
  } catch (error) {
    console.log(error);
    throw new Error('Cannot get refresh token');
  }  
};

async function getToken() {
  const getAsync = promisify(client.get).bind(client);
  const setAsync = promisify(client.setex).bind(client);

  const token = await getAsync(process.env.REFRESH_TOKEN);
  if (token) {
    //client.quit();
    return token;
  }
  else { // Token is expired, get a refresh token and store it into redis
    const res = await getRefreshToken();
    
    await setAsync(process.env.REFRESH_TOKEN, res.data.expires_in_sec, res.data.access_token);
    //client.quit();
    return res.data.access_token;
  }  
};

module.exports = {
  getToken,
}
