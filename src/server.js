const express = require("express");
const { v1Router } = require("../routers/v1Router");

const app = express();
const port = 4000;

app.use(express.urlencoded({ extended: true }));
app.use('/api', v1Router);

app.listen(port, () => console.log(`Server started on port ${port}`));


app.get('/getusers', (req, res) => {
  const set = new Set()
  console.log(2222);
  res.status(200).send()
  return;
})

