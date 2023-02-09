const express = require('express');
const json = require('./data.json');
const parsedNotes = json.notes;
let parsedNextId = json.nextId;
const app = express();
const exJSON = express.json();
const fs = require('fs');
app.use(exJSON);
let notesArray = [];

app.get('/api/notes', (req, res) => {
  for (const prop in parsedNotes) {
    notesArray.push(parsedNotes[prop]);
  }
  res.status(200).json(notesArray);
  notesArray = [];
});

app.get('/api/notes/:id', (req, res) => {
  const errObj = { error: `cannot find note with id ${req.params.id}` };
  // if client uses an id that is not a positive integer, return status 400 and errObj
  if (req.params.id <= -1 || isNaN(req.params.id)) {
    const errObj = { error: 'id must be a positive integer' };
    return res.status(400).json(errObj);
  }
  // if client uses an id for note that already exist in data.json, return status 200 and the note object
  for (const prop in parsedNotes) {
    if (req.params.id === prop) {
      return res.status(200).json(parsedNotes[prop]);
    }
  }
  // if client uses an id for note not in data.json, return status 404 and errObj
  res.status(404).json(errObj);
}
);

app.post('/api/notes', (req, res) => {
  const errObj = { error: 'An unexpected error occured' };
  // if req.body does not include content property return status 400 with errObj res.body
  if (!req.body.content) {
    const errObj = { error: 'content is a required field' };
    return res.status(400).json(errObj);
  } else if (req.body.content) { // if req.body does include content property write content to data.json and
    parsedNotes[parsedNextId] = {
      id: parsedNextId,
      content: req.body.content
    };
    json.notes = parsedNotes;
    json.nextId = parsedNextId;
    const dataJsonStringify = JSON.stringify(json, null, 2);
    fs.writeFile('data.json', dataJsonStringify, err => {
      if (err) {
        console.error(errObj);
        return res.status(500).json(errObj);
      } else {
        res.status(201).json(parsedNotes[parsedNextId++]);
        json.nextId = parsedNextId;
        const nexIdStringify = JSON.stringify(json, null, 2);
        fs.writeFile('data.json', nexIdStringify, err => {
          if (err) throw err;
        });
      }
    });
  }
});

app.delete('/api/notes/:id', (req, res) => {
  const errObj = { error: `'cannot find note with id ${req.params.id} ` };
  // if client uses an id that is not a positive integer, return status 400 and errObj
  if (req.params.id <= -1 || isNaN(req.params.id)) {
    const errObj = { error: 'id must be a positive integer' };
    return res.status(400).json(errObj);
  }
  // loop through props in parsedNotes to check if req.params.id matches any of the props in parsedNotes object
  for (const prop in parsedNotes) {
    if (req.params.id === prop) {
      delete parsedNotes[req.params.id];
      json.notes = parsedNotes;
      const jsonStringify = JSON.stringify(json, null, 2);
      fs.writeFile('data.json', jsonStringify, err => {
        if (err) {
          const errObj = { error: 'An unexpected error occured' };
          console.error(errObj);
          return res.status(500).json(errObj);
        } else {
          return res.sendStatus(204);
        }
      });
      return;
    }
  }
  res.status(404).json(errObj);
});

app.put('/api/notes/:id', (req, res) => {
  // if client uses an id that is not a positive integer, return status 400 and errObj OR they do not include a content property
  if (req.params.id <= -1 || isNaN(req.params.id)) {
    const errObj = { error: 'id must be a positive integer' };
    return res.status(400).json(errObj);
  } else if (!req.body.content) {
    const errObj = { error: 'content is a required field' };
    return res.status(400).json(errObj);
  }

  for (const prop in parsedNotes) {
    if (req.params.id === prop && req.body.content) {
      parsedNotes[req.params.id] = {
        content: req.body.content,
        id: req.params.id
      };
      json.notes = parsedNotes;
      const dataJsonStringify = JSON.stringify(json, null, 2);
      fs.writeFile('data.json', dataJsonStringify, err => {
        if (err) {
          const errObj = { error: 'An unexpected error occured' };
          console.error(errObj);
          return res.status(500).json(errObj);
        } else {
          res.status(200).json(parsedNotes[req.params.id]);
        }
      });
      return;
    }
  }
  const errObj = { error: `'cannot find note with id ${req.params.id} ` };
  res.status(404).json(errObj);
});

app.listen(3000, () => {

});
