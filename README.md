# EvaExchange-API

EvaExchange-API is a Node.js-based API for managing trades and portfolios in a stock exchange simulation. It provides endpoints to execute buy and sell operations, track trades, shares and manage portfolios.

## Technologies Used

- Node.js
- Express.js
- Sequelize (ORM for PostgreSQL)
- PostgreSQL (as the database)

## Features

- **Buy Operation**: Execute buy operations for shares.
- **Sell Operation**: Execute sell operations for owned shares in a portfolio.
- **Trade History**: View a history of executed trades.
- **Portfolio Management**: Manage portfolios with real-time value updates.


### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/erennmutlu1/EvaExchange-API.git

-cd evaExchange-API
-npm install
-Set up the database:
  -Create a PostgreSQL database.
  -Update the database configuration in config/config.json.
  -Run migrations:
    npx sequelize-cli db:migrate
-npm start

The API will be accessible at http://localhost:3000 by default.
