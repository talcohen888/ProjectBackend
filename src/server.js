const { v1Router } = require("../routers/v1Router");
const { MongoClient } = require("mongodb");
const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());

const username = 'adminUser';
const password = 'nuYdv8kETjz1nZMA';

const uri = `mongodb+srv://${username}:${password}@socialnetwrok.cuyk8rc.mongodb.net/?retryWrites=true&w=majority`;

async function startServer() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log("MongoDB connected!");

    app.use(express.urlencoded({ extended: true }));
    app.use(cors());
    app.use('/api', v1Router);

    const port = 3000;
    app.listen(port, () => console.log(`Server started on port ${port}`));
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  }
}

startServer().catch(console.error);