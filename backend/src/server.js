const express = require('express');
const serverless = require('serverless-http');
const app = express();
app.use(express.json());
app.get('/', (req, res) => res.send('¡Hola Serverless!'));
module.exports.handler = serverless(app);