require('dotenv').config();

module.exports = {
    mongoURL: process.env.MONGOURL,
    PRIVATE_KEY: process.env.PRIVATE_KEY,
    CLIENT_ID: [process.env.GOOGLE_CLIENT_ID_ANDROID, process.env.GOOGLE_CLIENT_ID_WEB],
    FACEBOOK_SECRET: process.env.FACEBOOK_SECRET
}
