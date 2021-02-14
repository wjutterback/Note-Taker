const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3030;
const server = require('http').Server(app);
const fs = require('fs');
const notes = JSON.parse(fs.readFileSync('./db/db.json'));

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/notes.html'));
});

app.get('/api/notes', (req, res) => {
  res.json(notes);
});

app.post('/api/notes', (req, res) => {
  // should receive a new note to save on the request body, add it to the `db.json` file, and then return the new note to the client.
  // Each note needs uuid value.
});

server.listen(PORT, () => {
  console.log('listening');
});
