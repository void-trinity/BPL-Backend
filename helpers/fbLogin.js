const axios = require('axios');
const hmacSHA256 = require('crypto-js/hmac-sha256');
const { FACEBOOK_SECRET } = require('../config');

const facebookLogin = async (token) => {
    const appSecretProof = hmacSHA256(token, FACEBOOK_SECRET);
    var result = await axios.get(`https://graph.facebook.com/me?fields=id,name,gender,email&access_token=${token}&appsecret_proof=${appSecretProof}`)
        .then(({ data }) => {
            return {
                success: true,
                email: data.email,
                name: data.name 
            }
        })
        .catch(error => {
            return {
                success: false
            }
        });

    return result;
}

module.exports = facebookLogin;