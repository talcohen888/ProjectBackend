const express = require("express");
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');

const getV1Router = require("../routers/v1Router");

const app = express();
const port = 4000;
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(express.json());
app.use(cookieParser());

app.use('/api', getV1Router());
app.get('/readme.html', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'readme.html'));
});

app.listen(port, () => console.log(`Server started on port ${port}`));
