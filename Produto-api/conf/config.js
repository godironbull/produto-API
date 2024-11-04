require('dotenv').config();
const { Client } = require('pg');

const client = new Client({connectionString: process.env.POSTGRES});

client.connect((err) => {
  if (err) {
    console.error('Erro', err.stack);
  } 
});

module.exports = client;
