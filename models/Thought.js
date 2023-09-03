const { Schema, model } = require('mongoose');
const moment = require('moment');

function formatTimestamp() {
    let dateFormat = moment().format('MMMM Do YYYY, h:mm:ss a');
    return dateFormat;
};

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true
        },
        createdAt: {
            type: String,
            get: formatTimestamp,
        },
        postedBy: {
            type: String,
            required: true,
        },
        reactions: {
            type: Number
        }
    },
    {
        toJSON: {
            getters: true,
        },
    }
);

const Thought = model('thought', thoughtSchema);

module.exports = Thought;