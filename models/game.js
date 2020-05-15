const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const gameSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    rules: {
        type: String,
        required: true,
        default: '',
    },
    description: {
        type: String,
        required: true,
        default: '',
    },
    shortDescription: {
        type: String,
        required: true,
        default: '',
    }
});

const Game = mongoose.model('Game', gameSchema);

module.exports = Game;