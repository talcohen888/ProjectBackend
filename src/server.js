const express = require("express");
const cors = require("cors");
const { v1Router } = require("../routers/v1Router");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use('/api', v1Router);

const port = 3000;
app.listen(port, () => console.log(`Server started on port ${port}`));
