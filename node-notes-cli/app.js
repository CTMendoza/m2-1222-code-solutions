const myArgs = process.argv.slice(2);
const json = require('./data.json');
const parsedNotes = json.notes;
const noteKeys = Object.keys(parsedNotes);

// reads notes from data.json
if (myArgs[0] === 'read') {
  noteKeys.forEach(key => {
    console.log(`${key}: ${parsedNotes[key]}`);
  });
}
