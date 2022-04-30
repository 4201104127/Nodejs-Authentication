const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    event: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    work_location: {
        type: String,
    },
    hobbies: {
        type: String,
    }
});

module.exports = mongoose.model('Event', eventSchema);