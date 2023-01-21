const fs = require('fs');
const myArgs = String(process.argv.slice(2)) + '\n';
fs.writeFile('note.txt', myArgs, 'utf8', (err, data) => {
  if (err) throw err;
});
