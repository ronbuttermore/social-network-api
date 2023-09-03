const mongoose = require('mongoose');

const thoughtSchema = new mongoose.Schema({
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

const userSchema = new mongoose.Schema({
    thoughts: [thoughtSchema],
    friends: { type: String, required: false },
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
});

const User = mongoose.model('User', userSchema);

const thoughtData = [
    { thoughtText: 'Dreaming in a dream', postedBy: 'fluffymunchkin', reactions: 5},
    { thoughtText: 'Dreaming in a dream again', postedBy: 'fluffymunchkin', reactions: 7},
]

const handleError = (err) => console.error(err);

User
    .create({
            thoughts: thoughtData, 
            friends: "none",
            username: "test1", 
            email: "test1@test.com", 
            friendCount: 4
    })
    .then(result => console.log('Created new document', result))
    .catch(err => handleError(err));

module.exports = User;