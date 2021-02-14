const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3030;
const server = require('http').Server(app);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, 'notes.html'));
});

server.listen(PORT, () => {
  console.log('listening');
});