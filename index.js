// @ts-check

/**
 * Simple REST Api used to teach Flutter.
 * 
 * For endpoints / setup see the Readme
 * License: MIT
 */

const express = require("express");
const rateLimit = require("express-rate-limit");
const morgan = require('morgan');
require("dotenv").config();
const handlers = require("./handlers");

const PORT = process.env.PORT || 5000;

const app = express();
// Limit each IP to 50 requests / 5 secs
const limiter = rateLimit({
  windowMs: 5 * 1000,
  max: 50,
});

// Middlewares:
app.use(limiter);
app.use(morgan('short'))

// Endpoints:
app.get("/", (req, res) => {
  res.status(418).json({
    what_is_this: "Simple REST API for a flutter course",
    readme: "https://github.com/davidp-ro/curs-flutter-api",
  });
});

app.get("/sneakers", (req, res) => handlers.getAllSneakers(req, res));

app.get("/sneaker/:id", (req, res) => handlers.getSneakerWithID(req, res));

// Start:
app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
