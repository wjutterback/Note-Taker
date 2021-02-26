const express = require('express');
const app = express();
const PORT = process.env.PORT || 3030;
const server = require('http').Server(app);
const router = require('./routes');

app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(router);

server.listen(PORT, () => {});
