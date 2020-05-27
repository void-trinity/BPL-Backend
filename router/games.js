const Game = require('../models/game');

const getAllGames = async (req, res, next) => {
    var result = await Game.find({}).sort('name')
    
    if(result) {
        res.status(200).json({
            success: true,
            data: result
        })
    } else {
        res.status(404).json({
            success: false,
            data: 'No events found'
        })
    }

    return result;
}


const addGame = async (req, res, next) => {
    var { name, rules, description, shortDescription } = req.body.game;

    var newGame = new Game({
        name,
        rules,
        description,
        shortDescription
    });

    newGame.save((error, result) => {
        if(error || !result) {
            console.log(error)
            res.status(400).json({
                success: false
            })
        } else {
            res.status(200).json({
                success: true,
                data: result
            })
        }
    })
}

module.exports = {
    getAllGames,
    addGame
}