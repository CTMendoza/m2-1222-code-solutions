const express = require('express');
const json = require('./data.json');
const parsedNotes = json.notes;
const noteKeys = Object.keys(parsedNotes);
const app = express();
const exJSON = express.json();
app.use(exJSON);
const notesArray = [];

app.get('/api/notes', (req, res) => {
  for (const prop in parsedNotes) {
    notesArray.push(parsedNotes[prop]);
  }
  res.status(200).json(notesArray);
});

app.get('/api/notes/:id', (req, res) => {
  if (req.params.id <= 0 || isNaN(req.params.id)) {
    const errObj = { error: 'id mus be a positive integer' };
    res.status(400).json(errObj);
  }
});
app.listen(3000, () => {
  // console.log('Listening for port 3000!');
});
