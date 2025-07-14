require('dotenv').config();
const { Client } = require('pg');
const { MongoClient } = require('mongodb');

const pgClient = new Client({
  host: process.env.PG_HOST,
  port: process.env.PG_PORT,
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE,
});

const mongoClient = new MongoClient(process.env.MONGO_URI);

module.exports = { pgClient, mongoClient };
