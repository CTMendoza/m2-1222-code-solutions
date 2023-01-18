const add = require('./add');
const subtract = require('./subtract');
const multiply = require('./multiply');
const divide = require('./divide');
const myArgs = process.argv.slice(2);

if (myArgs[1] === 'plus') {
  const sum = add(Number(myArgs[0]), Number(myArgs[2]));
  console.log(`result: ${sum}`);
}

if (myArgs[1] === 'minus') {
  const difference = subtract(Number(myArgs[0]), Number(myArgs[2]));
  console.log(`result: ${difference}`);
}

if (myArgs[1] === 'times') {
  const product = multiply(Number(myArgs[0]), Number(myArgs[2]));
  console.log(`result: ${product}`);
}

if (myArgs[1] === 'over') {
  const quotient = divide(Number(myArgs[0]), Number(myArgs[2]));
  console.log(`result: ${quotient}`);
}
