const myArgs = process.argv.slice(2);
const json = require('./data.json'); // json is assigned the required data.json file that converts the JSON object to JS object
const parsedNotes = json.notes; // parsedNotes is assigned the notes javascript object
let parsedNextId = json.nextId;
const noteKeys = Object.keys(parsedNotes);
const fs = require('fs');
// console.log(`Value of parsedNextId: ${parsedNextId}`);
// console.log(json);

// reads notes from data.json
if (myArgs[0] === 'read') {
  noteKeys.forEach(key => {
    console.log(`${key}: ${parsedNotes[key]}`);
  });
}

// creates new note and appends to data.json
if (myArgs[0] === 'create') {
  parsedNotes[parsedNextId] = myArgs[1];
  parsedNextId++;
  json.notes = parsedNotes;
  json.nextId = parsedNextId;
  const jsonStringify = JSON.stringify(json, null, 2);
  fs.writeFile('data.json', jsonStringify, err => {
    if (err) throw err;
  });
  // console.log(JSON.stringify(json, null, 2), `parsedNextId increments to: ${parsedNextId}`);
}

// deletes an existing a note based on it's id
if (myArgs[0] === 'delete') {
  delete parsedNotes[myArgs[1]];
  json.notes = parsedNotes;
  const jsonStringify = JSON.stringify(json, null, 2);
  fs.writeFile('data.json', jsonStringify, err => {
    if (err) throw err;
  });
}

// update an existing note by its id
if (myArgs[0] === 'update') {
  noteKeys.forEach(key => {
    if (myArgs[1] === key) {
      parsedNotes[myArgs[1]] = myArgs[2];
      json.notes = parsedNotes;
      const jsonStringify = JSON.stringify(json, null, 2);
      fs.writeFile('data.json', jsonStringify, err => {
        if (err) throw err;
      });
    }
  });
}
