require('dotenv').config();

module.exports = {
    mongoURL: process.env.MONGOURL,
    PRIVATE_KEY: process.env.PRIVATE_KEY
}
