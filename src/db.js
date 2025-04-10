const express = require('express');
const app = express();
const path = require('path');

const { MongoClient } = require('mongodb');
const url = "mongodb://admin:password@mongodb:27017";

const client = new MongoClient(url);

app.use(express.urlencoded({ extended: true }));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'form.html'));
});

app.post('/submit', async (req, res) => {
    try {
        const { name, email, message } = req.body;
        await client.connect();
        const db = client.db('testdb');
        const collection = db.collection('info');
        const result = await collection.insertOne({name, email, message});
        console.log("Inserted document: ", result.insertedId);
        res.send("Data saved successuflly");
    }catch(err) {
        console.error("Failed to connect to MongoDB:", err);
    }
    finally {
        await client.close();
        console.log("Closed connection to MongoDB!");
    }
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000/');
});