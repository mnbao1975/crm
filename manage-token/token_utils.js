const axios = require('axios');
const config = require('dotenv').config();

if (config.error) {
  throw config.error;
}

const getRefreshToken = async () => {
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
    throw error;
  }  
}

const refreshToken = async () => {
  try {
    const res = await getRefreshToken();
    if(res) {
      console.log(res.data);
    }  
  } catch (error) {
    console.log(error.message);
  }    
};

//refreshToken();

module.exports = {
  getRefreshToken,
}