const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3030;
const server = require('http').Server(app);
const fs = require('fs');
const bodyParser = require('body-parser');
app.use(express.static('public'));

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/notes.html'));
});

app.get('/api/notes', (req, res) => {
  const notes = JSON.parse(fs.readFileSync('./db/db.json'));
  res.json(notes);
});

//TODO: add unique ID, return new note to the client
app.post('/api/notes', (req, res) => {
  const notes = JSON.parse(fs.readFileSync('./db/db.json'));
  notes.push(req.body);
  const stringNote = JSON.stringify(notes);
  console.log(stringNote);
  console.log('note', notes);

  fs.writeFileSync('./db/db.json', stringNote);

  // should receive a new note to save on the request body, add it to the `db.json` file, and then return the new note to the client.
  // Each note needs uuid value.
});

server.listen(PORT, () => {
  console.log('listening');
});
