const express = require('express');
const bodyParser = require('body-parser');

const { getLeaderboard, login } = require('./users');
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

module.exports = router;