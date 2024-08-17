require("dotenv").config();
const express = require("express");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const port = process.env.PORT || 5000;

const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

// const { MongoClient, ServerApiVersion } = require('mongodb');

const uri =`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.jvi5uyr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();

    const productsCollection=client.db('Task_eShop').collection('products')

     // -----jwt related api start-----

      //jwt create
      app.post('/jwt', async (req, res) => {
        const user = req.body
        const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' })
        res.send({ token })
      })

      // verify jwt
    const verifyToken = (req, res, next) => {
      // console.log("inside verify token : ", req.headers.authorization);
      if (!req.headers.authorization) {
        return res.status(401).send({ message: 'unathorized access' })
      }
      const token = req.headers.authorization.split(' ')[1]
      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
         return res.status(401).send({ message: 'unathorized access' })
        }
        req.decoded = decoded
        next()
      })
      // next()
    }


      // -----------------

    app.get('/allProducts',async(req,res)=>{
      const result=await productsCollection.find().toArray()
      res.send(result)
    })


    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    // console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("eShop is running");
});

app.listen(port, () => {
  console.log(`eShop is running on port ${port}`);
});
