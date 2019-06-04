const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const http = require('http');
const config = require('./config');
const controllers = require('./controllers');

// Create the express application
const app = express();

// Set middleware
app.use(
  cors({
    origin: config.siteUrl,
    credentials: true,
  }),
);
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Define routes
controllers.set(app);

// Set up server
const server = http.createServer(app);
server.listen(8000, () => {
  console.log('app listening on port 8000!');
});
