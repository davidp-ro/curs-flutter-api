const express = require('express');

const app = express();
const port = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.status(418).json({
    'what_is_this': 'Simple REST API for a flutter course',
    'readme': 'https://github.com/davidp-ro/curs-flutter-api'
  });
});

app.listen(port, () => {
  console.log(`Running on port ${port}`);
})
