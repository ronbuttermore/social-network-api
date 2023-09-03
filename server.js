const express = require('express');
const db = require('./config/connection');
const { User } = require('./models');

const PORT = 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/all', async (req, res) => {
    try {
        const result = await User.find({});
        res.status(200).json(result);
    } catch {
        res.status(500).send({ message: 'Internal Server Error' });
    }
});

app.post('/addUser', (req, res) => {
    const newUser = new User(req.body);
    newUser.save();
    if (newUser) {
        res.status(200).json(newUser);
    } else {
        res.status(500).json({ message: 'something went wrong' });
    }
});

app.delete('/find-one-delete/:id', async (req, res) => {
    try {
        const result = await User.findOneAndDelete({ id: req.params.id });
        res.status(200).json(result);
        console.log(`Deleted: ${result}`);
    } catch (err) {
        console.log('Uh oh, something went wrong');
        res.status(500).json({ message: 'something went wrong'});
    }
});

db.once('open', () => {
    app.listen(PORT, () => {
        console.log(`API server running on port ${PORT}!`);
    });
});