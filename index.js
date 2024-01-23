require('dotenv').config();
console.log("starting");
const express = require('express');
const routes = require('./routes');
const sequelize = require('./models').sequelize;


const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());

sequelize.sync().then(() => {
  console.log('Database synced');
}).catch((error) => {
  console.error('Error syncing database:', error);
});

app.use('/v1/', routes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
