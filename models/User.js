const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    thoughts: { type: String, required: false },
    friends: { type: String, required: false },
    username:{ type: String, required: true },
    email: { type: String, required: true },
    friendCount: { type: Number, required: true }
});

const User = mongoose.model('User', userSchema);

const handleError = (err) => console.error(err);

User
    .create({
            thoughts: "hello", 
            friends: "none",
            username: "test1", 
            email: "test1@test.com", 
            friendCount: 4
    })
    .then(result => console.log('Created new document', result))
    .catch(err => handleError(err));

module.exports = User;