const express = require("express");
const getV1Router = require("../routers/v1Router");

const app = express();
const port = 4000;

app.use(express.urlencoded({ extended: true }));
app.use('/api', getV1Router());

app.get('/getusers', (req, res) => {
  console.log(2222);
  res.status(200).send();
});

app.listen(port, () => console.log(`Server started on port ${port}`));
