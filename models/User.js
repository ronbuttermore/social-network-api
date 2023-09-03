const { Schema, model } = require('mongoose');

const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now 
    },
    postedBy: {
        type: String,
        required: true
    },
    reactions: {
        type: Number
    }
});

const userSchema = new Schema(
    {
        thoughts: [thoughtSchema],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
            }
        ],
        username:{ 
            type: String, 
            required: true,
            unique: true,
            trim: true
        },
        email: { 
            type: String, 
            required: true,
            unique: true, 
        },
        friendCount: { type: Number, required: true }
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

const User = model('user', userSchema);

module.exports = User;