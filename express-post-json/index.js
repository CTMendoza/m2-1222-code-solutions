const express = require('express');
const app = express();
let nextId = 1;
const grades = [];

app.get('/api/grades', (req, res) => {
  res.json(grades);
});

const exJSON = express.json();

app.use(exJSON);

app.post('/api/grades', (req, res) => {
  req.body.id = nextId++;
  grades.push(req.body);
  res.status(201).json(req.body);
});

app.listen(3000, () => {

});
