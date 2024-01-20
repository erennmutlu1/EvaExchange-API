// src/index.js
const express = require('express');
const routes = require('./routes');

const app = express();
const port = process.env.PORT || 3000;

// Use the routes defined in src/routes/index.js
app.use('/', routes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
