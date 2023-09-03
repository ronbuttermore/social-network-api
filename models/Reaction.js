const { Schema, Types } = require('mongoose');
const { formatTimestamp } = require('../utils/getters');

const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
          },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280,
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: String,
            get: formatTimestamp,
        },
    },
    {
        toJSON: {
          getters: true,
        },
        id: false,
    }
);

module.exports = reactionSchema;