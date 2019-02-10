require('dotenv').config();

module.exports = {
    twitter: {
        consumer_key: process.env.TWITTER_CONSUMER_KEY,
        consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
        access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
        access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
    },
    webHookURL: process.env.WEBHOOK_URL,
    devAccount: {
        username: process.env.DEV_USERNAME,
        userID: process.env.DEV_USERID
    }
};