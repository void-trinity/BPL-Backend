const express = require('express');
const bodyParser = require('body-parser');

const { getLeaderboard, login, updateNotificationId, updateAvatar, getUserInfo, updateUsername } = require('./users');
const  { verify_jwt } = require('../helpers/jwt');
const startConnection = require('../helpers/dbInit');
const  verify_admin = require('../helpers/admin');
const { getAllEvents, addEvent } = require('./events');
const { getAllGames, addGame } = require('./games');


startConnection();

const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Welcome to Byara Premier League Backend'
    });
});

router.get('/api/get/leaderboard', verify_jwt, getLeaderboard);

router.post('/api/login', bodyParser.json(), login);

router.post('/api/update/notificationid', verify_jwt, bodyParser.json(), updateNotificationId);

router.post('/api/update/avatar', verify_jwt, bodyParser.json(), updateAvatar);

router.post('/api/get/user', verify_jwt, bodyParser.json(), getUserInfo);

router.post('/api/update/username', verify_jwt, bodyParser.json(), updateUsername);

router.post('/api/get/events', verify_jwt, bodyParser.json(), getAllEvents);

router.post('/api/add/event', bodyParser.json(), verify_admin, addEvent);

router.post('/api/get/games', verify_jwt, bodyParser.json(), getAllGames);

router.post('/api/add/game', bodyParser.json(), verify_admin, addGame);



module.exports = router;