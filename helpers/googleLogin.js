const {OAuth2Client} = require('google-auth-library');
const { CLIENT_ID } = require('../config');

const googleLogin = async (token) => {
    const client = new OAuth2Client(CLIENT_ID);
    
    var result = await client.verifyIdToken({ idToken: token, audience: CLIENT_ID})
        .then(data => {
            console.log(data)
            return {
                success: true,
                email: data.payload.email,
                name: data.payload.name
            }
        })
        .catch(error => {
            return {
                success: false
            }
        });
    
    return result;
}

module.exports = googleLogin;