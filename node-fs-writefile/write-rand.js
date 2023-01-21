const fs = require('fs');
const ranNum = String(Math.random()) + '\n';

fs.writeFile('random.txt', ranNum, (err, data) => {
  if (err) throw err;
});
