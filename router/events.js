const Event = require('../models/event');
const User = require('../models/user');


const updateScores = async (game, scores) => {
    const session = await Event.startSession();

    session.startTransaction();

    try {
        scores.map(async (item) => {
            await User.findOneAndUpdate({ username: item.username }, { $inc: { totalScore: item.points, totalGames: 1 } })
        });

        var newEvent = new Event({
            game, scores
        });

        await newEvent.save();
        await session.commitTransaction();
        session.endSession();
        return true;

    } catch(error) {
        await session.abortTransaction();
        session.endSession();
        return false; 
    }
}


const getAllEvents = async (req, res, next) => {
    var result = await Event.find({}).sort('time')
    
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

}


const addEvent = async (req, res, next) => {
    var { game, scores } = req.body.event;
    var result = updateScores(game, scores);

    if(result) {
        res.status(200).json({
            success: true
        });
    } else {
        res.status(400).json({
            success: false
        })
    }
    
}

module.exports = {
    getAllEvents,
    addEvent
};