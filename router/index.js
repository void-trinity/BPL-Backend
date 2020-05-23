const express = require('express');
const bodyParser = require('body-parser');

const { getLeaderboard, login, updateNotificationId } = require('./users');
const  { verify_jwt } = require('../helpers/jwt');
const startConnection = require('../helpers/dbInit');


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

module.exports = router;