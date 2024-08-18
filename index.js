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


    app.get('/allProducts', async (req, res) => {
  const { page = 1, limit = 10, search = '', brand, category, minPrice, maxPrice, sortBy } = req.query;
  const skip = (page - 1) * limit;

  // Build the filter object
  let filter = {};
  if (search) {
    filter.productName = { $regex: search, $options: "i" }; // Case-insensitive search
  }
  if (brand) {
    filter.brand = brand;
  }
  if (category) {
    filter.category = category;
  }
  if (minPrice && maxPrice) {
    filter.price = { $gte: parseFloat(minPrice), $lte: parseFloat(maxPrice) };
  }

  // Determine sort criteria
  let sortCriteria = {};
  if (sortBy === 'priceLowToHigh') {
    sortCriteria.price = 1;
  } else if (sortBy === 'priceHighToLow') {
    sortCriteria.price = -1;
  } else if (sortBy === 'newest') {
    sortCriteria.date = -1;
  }

  // Fetch products based on filters, sort, and pagination
  const totalProducts = await productsCollection.countDocuments(filter);
  const result = await productsCollection.find(filter)
    .sort(sortCriteria)
    .skip(skip)
    .limit(parseInt(limit))
    .toArray();

  res.send({
    totalProducts,
    totalPages: Math.ceil(totalProducts / limit),
    currentPage: parseInt(page),
    products: result,
  });
});


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
