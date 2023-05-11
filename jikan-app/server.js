const express = require('express');
const path = require('path');

const app = express();
const port = 8888;

// require in out database functionality
const mongo = require('./db');

// require in client to use with express.static for serving static files
app.use('/', express.static(path.join(__dirname, './client')));

// require in the exported router from poker.js
const poker = require('./routes/poker.js');
app.use('/poker', poker);

// require in the exported router from results.js
const results = require('./routes/results.js');
app.use('/results', results);

// start the server
app.listen(port, async () => {
    console.log(`Server is listening on port ${port}`);
    await mongo.connect();
});
