const Event = require('../models/event');

const getAllEvents = async () => {
    var result = await Event.find({}).sort('time').populate('User')
        .then((data) => {
            return { success: true, data }
        })
        .catch((error) => {
            return { success: false, data: error }
        });

    return result;
}


const addEvent = async (event) => {
    var { game, scores } = event;

    var newEvent = new Event({
        game,
        scores
    });

    var result = await newEvent.save()
        .then(() => {
            return { success: true, data: newEvent }
        })
        .catch((error) => {
            return {success: false, data: error }
        });

    return result;
}

module.exports = {
    getAllEvents,
    addEvent
};