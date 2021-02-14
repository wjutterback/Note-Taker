const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3030;
const server = require('http').Server(app);
const fs = require('fs');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');

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
  const newNote = JSON.stringify(req.body);
  const newParse = JSON.parse(newNote);
  const noteID = Object.assign(newParse, { id: `${uuidv4()}` });
  notes.push(noteID);
  const stringNote = JSON.stringify(notes);
  console.log('stringNote', stringNote);
  fs.writeFileSync('./db/db.json', stringNote);
});

server.listen(PORT, () => {
  console.log('listening');
});
