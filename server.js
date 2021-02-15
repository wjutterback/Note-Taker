const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3030;
const server = require('http').Server(app);
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

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

app.post('/api/notes', (req, res) => {
  const notes = JSON.parse(fs.readFileSync('./db/db.json'));
  const newParse = JSON.parse(JSON.stringify(req.body));
  const noteID = Object.assign(newParse, { id: `${uuidv4()}` });
  notes.push(noteID);
  const stringNote = JSON.stringify(notes);
  fs.writeFileSync('./db/db.json', stringNote);
  res.json(notes);
});

app.delete('/api/notes/:id', (req, res) => {
  const notes = JSON.parse(fs.readFileSync('./db/db.json'));
  const noteID = req.params.id;
  for (let i = 0; i < notes.length; i++) {
    if (notes[i].id === noteID) {
      notes.splice(i, 1);
      const newNotes = JSON.stringify(notes);
      fs.writeFileSync('./db/db.json', newNotes);
      return res.json(notes);
    }
  }
});

server.listen(PORT, () => {});
