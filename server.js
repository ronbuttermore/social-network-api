const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');

const app = express();
const port = 3001;

const connectionStringURI = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(connectionStringURI);

let db;
const dbName = 'socialDB';

client.connect()
    .then(() => {
        console.log('Connected to MongoDB');
        db = client.db(dbName);
        app.listen(port, () => {
            console.log(`Listening at http://localhost:${port}`);
        });
    })
    .catch((err) => {
        console.error('Connection error: ', err.message);
    });

app.use(express.json());

app.post('/createUser', (req, res) => {
    db.collection('userCollection').insertOne({
        username: req.body.username,
        email: req.body.email,
        thoughts: req.body.thoughts,
        friends: req.body.friends 
    })
    .then(results => res.json(results))
    .catch(err => {
        if (err) throw err;
    });
});

app.post('/create-many', (req, res) => {
    db.collection('userCollection').insertMany(
        [
            { 
                "username": "test1", 
                "email": "test1@test.com", 
                "thoughts": [
                    {"thoughtText": "Hello world!", "createdAt": "random date", "username": "test1", "reactions": "in progress"}
                ], 
                "friends": [
                    {"friend1": "test2"},
                    {"friend2": "ron"}
                ]
            },
            { 
                "username": "test2", 
                "email": "test2@test.com", 
                "thoughts": [
                    {"thoughtText": "World Hello!", "createdAt": "random time", "username": "test2", "reactions": "in progress"}
                ], 
                "friends": "one"}
        ]
    )
    .then(results => res.json(results))
    .catch (err => {
        if (err) throw err;
    });
});

app.get('/allUsers', (req, res) => {
    db.collection('userCollection')
        .find({})
        .toArray()
        .then(results => res.json(results))
        .catch(err => {
            if (err) throw err;
        });
});

app.delete('/delete', (req, res) => {
    const userId = new ObjectId(req.body.id);
    db.collection('userCollection').deleteOne(
        { _id: userId}
    )
    .then(results => {
        console.log(results);
        res.send(
            results.deletedCount ? 'Document deleted' : 'No document found!'
        );
    })
    .catch(err => {
        if (err) throw err;
    });
});