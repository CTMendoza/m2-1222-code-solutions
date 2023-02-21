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
FROM "grades";
`;
  db.query(sql)
    .then(result => {
      const gradesTable = result.rows;
      res.status(200).json(gradesTable);
    })
    .catch(err => {
      err = {
        error: 'An unexpected error occurred.'
      };
      res.status(500).json(err);
    });
});

// POST - inserts a new grade into "grades" table and return the created grade.
// The client should receive and object, not an array
app.post('/api/grades', (req, res, next) => {

});

app.listen(3000, () => {
});
