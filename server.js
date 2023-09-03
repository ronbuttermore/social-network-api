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

db.once('open', () => {
    app.listen(PORT, () => {
        console.log(`API server running on port ${PORT}!`);
    });
});