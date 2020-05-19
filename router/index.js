const express = require('express');
const bodyParser = require('body-parser');

const { getLeaderboard, addUser, login } = require('./users');
const { getAllGames, addGame } = require('./games');
const { getAllEvents, addEvent } = require('./events');
const  { verify_jwt } = require('./jwt');
const startConnection = require('./dbInit');


startConnection();

const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Welcome to Byara Premier League Backend'
    });
});

router.get('/api/get/leaderboard', verify_jwt, getLeaderboard);

router.post('/api/add/user', bodyParser.json(), addUser);

router.get('/api/get/games', verify_jwt, async (req, res) => {
    var result = await getAllGames();
    if (result.success)
        res.status(200).json({
            success: true,
            data: result.data,
        });
    else
        res.status(400).json({
            success: false,
            error: result.data
        });
});

router.post('/api/add/game', verify_jwt, bodyParser.json(), async (req, res) => {
    const { game } = req.body;
    var result = await addGame(game);
    if (result.success)
        res.status(200).json({
            success: true,
            data: result.data
        });
    else
        res.status(400).json({
            success: false,
            error: result.data
        });
});

router.get('/api/get/events', verify_jwt, async (req, res) => {
    var result = await getAllEvents();
    if (result.success)
        res.status(200).json({
            success: true,
            data: result.data,
        });
    else
        res.status(400).json({
            success: false,
            error: result.data
        });
});

router.post('/api/add/event', verify_jwt, bodyParser.json(), async (req, res) => {
    const { event } = req.body;
    var result = await addEvent(event);
    if (result.success)
        res.status(200).json({
            success: true,
            data: result.data
        });
    else
        res.status(400).json({
            success: false,
            error: result.data
        });
});

router.post('/api/login', bodyParser.json(), login);

module.exports = router;