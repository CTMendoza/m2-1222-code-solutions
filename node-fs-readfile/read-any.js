const fs = require('fs');
var myArgs = process.argv[2];
fs.readFile(myArgs, 'utf8', (err, data) => {
  if (err) throw err;
  console.log(data);
});
