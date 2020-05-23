const User = require('../models/user');
const { generate_jwt } = require('../helpers/jwt');
const facebookLogin = require('../helpers/fbLogin');
const googleLogin = require('../helpers/googleLogin');


const checkUserInDB = async (email) => {
    let result = {};
    await User.findOne({ email }, (error, user) => {
        if (error || user === null) {
            result = { success: false };
        } else {
            result = { success: true, user };
        }
    });

    return result;
}

const getLeaderboard = (req, res, next) => {
    User.find({}).sort([['totalScore', 'descending'], ['totalGames', 'ascending']])
        .then((data) => {
            var result = data.map((item, index) => {
                return {
                    name: item.name,
                    totalScore: item.totalScore,
                    totalGames: item.totalGames,
                    rank: index + 1,
                }
            });
            res.status(200).json({
                success: true,
                data: result
            })
        })
        .catch((error) => {
            res.status(400).json({
                success: false,
                data: 'Something went wrong, we\'ll be back soon' 
            });
        });
}


const login = async (req, res, next) => {
    var result;
    const { token, type } = req.body;
    if (type === 'G') {
        result = await googleLogin(token);
        if (!result.success) {
            res.status(404).json({
                success: 'false',
                data: 'Invalid token sent'
            });
            return;
        }
    } else if (type === 'F') {
        result = await facebookLogin(token);
        if (!result.success) {
            res.status(404).json({
                success: 'false',
                data: 'Invalid token sent'
            });
            return;
        }
    }

    var isUserPresent = await checkUserInDB(result.email);
    
    if (!isUserPresent.success) {
        var { name, email } = result;
        var newUser = new User({
            name,
            email,
            username: email
        });

        newUser.save((error, user) => {
            if (error || user === null) {
                res.status(400).json({
                    success: false,
                    data: 'Something went wrong, we\'ll be back soon.'
                })
            } else {
                var jwt_token = generate_jwt(user);
                res.status(200).json({
                    success: true,
                    token: jwt_token
                });
            }
        });
    } else {
        var jwt_token = generate_jwt(isUserPresent.user);
        res.status(200).json({
            success: true,
            token: jwt_token
        });
    }
}


module.exports = {
    getLeaderboard,
    login,
}