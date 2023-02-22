const express = require('express');
const exJSON = express.json();
const app = express();
app.use(exJSON);
const pg = require('pg');
const db = new pg.Pool({
  connectionString: 'postgres://dev:dev@localhost/studentGradeTable',
  ssl: {
    rejectUnauthorized: false
  }
});

// returns all rows from the "grades" table. Client should receive an array of objects.
// if there are no rows, returns an empty array
app.get('/api/grades', (req, res, next) => {
  const sql = `
SELECT *
FROM "grades"
ORDER BY "gradeId" ASC;
`;
  db.query(sql)
    .then(result => {
      const gradesTable = result.rows;
      res.status(200).json(gradesTable);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        error: 'An unexpected error occurred.'
      });
    });
});

// POST - inserts a new grade into "grades" table and return the created grade.
// The client should receive and object, not an array
app.post('/api/grades', (req, res, next) => {
  // status 400 if client supplies an invalid grade, including a missing name, course or score.
  if (!req.body || !req.body.name || !req.body.course || !req.body.score) {
    const errObj = { error: 'missing all or some of name, course, score query parameters' };
    return res.status(400).json(errObj);
  } else if (req.body.score < 0 || req.body.score > 100 || isNaN(req.body.score)) { // Or score isnt an integer from 0 to 10
    const errObj = { error: 'score value is not an integer from 0 to 100 or is NaN' };
    return res.status(400).json(errObj);
  }
  // create query to insert new row based on req.body key values
  const sql = `
    INSERT INTO "grade" ("name", "course", "score")
    VALUES($1, $2, $3)
    RETURNING *;
  `;
  const values = [req.body.name, req.body.course, req.body.score];
  db.query(sql, values)
    .then(result => {
      const newGrade = result.rows[result.rows.length - 1];
      res.status(201).json(newGrade);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        error: 'An unexpected error occurred.'
      });
    });
});

app.put('/api/grades/:gradeId', (req, res) => {
  // 400 because the client may supply an invalid gradeId or invalid/missing name, course, or score
  if (req.params.gradeId <= 0 || isNaN(req.params.gradeId)) {
    const errObj = { error: 'id must be a positive integer' };
    return res.status(400).json(errObj);
  } else if (!req.body || !req.body.name || !req.body.course || !req.body.score) {
    const errObj = { error: 'missing all or some of name, course, score query parameters' };
    return res.status(400).json(errObj);
  } else if (typeof req.body.name !== 'string' || typeof req.body.course !== 'string') {
    const errObj = { error: 'invalid type, name and course should hold string values' };
    return res.status(400).json(errObj);
  } else if (req.body.score < 0 || req.body.score > 100 || isNaN(req.body.score)) {
    const errObj = { error: 'score value is not an integer from 0 to 100 or is NaN' };
    return res.status(400).json(errObj);
  }

  const sql = `
  UPDATE "grades"
  SET "name" = $1,
      "course" = $2,
      "score" = $3
  WHERE "gradeId" = $4
  RETURNING *;
  `;
  const values = [req.body.name, req.body.course, req.body.score, req.params.gradeId];

  db.query(sql, values)
    .then(result => {
      const updatedGrade = result.rows[0];
      if (!updatedGrade) {
        const errObj = { error: `Cannot find grade with gradeId: ${req.params.gradeId}` };
        res.status(404).json(errObj);
      } else {
        res.status(200).json(updatedGrade);
      }
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        error: 'An unexpected error occurred.'
      });
    });
});

app.delete('/api/grades/:gradeId', (req, res) => {
  // 400 the client may supply an invalid gradeId
  if (req.params.gradeId <= -1 || isNaN(req.params.gradeId)) {
    const errObj = { error: 'id must be a positive integer' };
    return res.status(400).json(errObj);
  }
  const sql = `
    DELETE
    FROM "grades"
    WHERE "gradeId" = $1
    RETURNING *;
  `;
  const values = [req.params.gradeId];

  db.query(sql, values)
    .then(result => {
      const deletedGrade = result.rows[0];
      if (!deletedGrade) {
        const errObj = { error: `Cannot find grade with gradeId: ${req.params.gradeId}` };
        res.status(404).json(errObj);
      } else {
        res.sendStatus(204);
      }
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        error: 'An unexpected error occurred.'
      });
    });
});

app.listen(3000, () => {
});
