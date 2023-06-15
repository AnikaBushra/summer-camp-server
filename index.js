const express = require("express")
const app = express()
const cors = require('cors')
require('dotenv').config()
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require('mongodb');
// summerCamp 
// mukVm49gd6Oosn3J 

// middleware 
app.use(cors())
app.use(express.json())





const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.sdtdalu.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();

        const classesCollection = client.db("summerDb").collection("classes");
        const instructorCollection = client.db("summerDb").collection("instructors");
        const allClassCollection = client.db("summerDb").collection("allClasses");

        app.get('/classes', async (req, res) => {

            const result = await classesCollection.find().toArray()
            res.send(result)
        })

        app.get('/instructors', async (req, res) => {
            const result = await instructorCollection.find().toArray();
            res.send(result)
        })
        app.get('/allClasses', async (req, res) => {
            const result = await allClassCollection.find().toArray()
            res.send(result)
        })

        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);



app.get('/', (req, res) => {
    res.send('hello world')
})

app.listen(port, () => {
    console.log("hello world", port);
})