const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const router = require("../routers/v1Router").v1Router;

const app = express();
app.use(express.json());

const username = 'talcohen111';
const password = 'Talco309!';
const cluster = 'cluster0.mu90v';
const dbName = 'epicure';

const url = `mongodb+srv://${username}:${password}@${cluster}.mongodb.net/${dbName}?retryWrites=true&w=majority`

mongoose.connect(url,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

app.use(express.urlencoded({ extended : true }));
app.use(cors());
app.use('/api', router);

app.listen(3000, () => console.log("connected"))