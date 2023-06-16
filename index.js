const express = require("express")
const app = express()
const cors = require('cors')
require('dotenv').config()
const port = process.env.PORT || 5000;
const stripe = require('stripe')(process.env.PAYMENT_SECRET_KEY)
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');


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
        // await client.connect();

        const classesCollection = client.db("summerDb").collection("classes");
        const instructorCollection = client.db("summerDb").collection("instructors");
        const allClassCollection = client.db("summerDb").collection("allClasses");
        const myClassCollection = client.db("summerDb").collection("myClasses");
        // all classes 
        app.get('/classes', async (req, res) => {

            const result = await classesCollection.find().toArray()
            res.send(result)
        })

        // all instructors 

        app.get('/instructors', async (req, res) => {
            const result = await instructorCollection.find().toArray();
            res.send(result)
        })
        app.get('/allClasses', async (req, res) => {
            const result = await allClassCollection.find().toArray()
            res.send(result)
        })
        // my classes 

        app.get('/myClass', async (req, res) => {
            let query = {}

            if (req.query?.email) {
                query = { email: req.query.email }

            }
            const result = await myClassCollection.find(query).toArray();
            res.send(result)
        })

        app.get('/myClass', async (req, res) => {
            const result = await myClassCollection.find().toArray()
            res.send(result)
        })

        app.post('/myClass', async (req, res) => {
            const doc = req.body;
            const result = await myClassCollection.insertOne(doc);
            res.send(result)
        })

        app.delete('/myClass/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) }
            const result = await myClassCollection.deleteOne(query);
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