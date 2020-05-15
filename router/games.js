const Game = require('../models/game');

const getAllGames = async () => {
    var result = await Game.find({}).sort('name')
        .then((data) => {
            return { success: true, data }
        })
        .catch((error) => {
            return { success: false, data: error }
        });

    return result;
}


const addGame = async (game) => {
    var { name, rules, description, shortDescription } = game;

    var newGame = new Game({
        name,
        rules,
        description,
        shortDescription
    });

    var result = await newGame.save()
        .then(() => {
            return { success: true, data: newGame }
        })
        .catch((error) => {
            return {success: false, data: error }
        });

    return result;
}

module.exports = {
    getAllGames,
    addGame
}