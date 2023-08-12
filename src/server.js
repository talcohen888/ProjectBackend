const express = require("express");
const getV1Router = require("../routers/v1Router");

const app = express();
const port = 4000;

app.use(express.json()); 

app.use('/api', getV1Router());

app.listen(port, () => console.log(`Server started on port ${port}`));
