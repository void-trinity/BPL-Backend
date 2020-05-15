const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const score = mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true,
        autopopulate: true,
    },
    points: {
        type: Number,
        required: true,
    }
});

const eventSchema = mongoose.Schema({
    game: {
        type: mongoose.Schema.ObjectId,
        ref: 'Game',
        required: true,
        autopopulate: true,
    },
    scores: [{
        type: score,
        required: true
    }],
    time: {
        type: Date,
        default: Date.now,
    }
});

eventSchema.plugin(require('mongoose-autopopulate'));

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;