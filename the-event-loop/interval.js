let currCount = 3;
const timer = setInterval(() => {
  if (currCount > 0) {
    console.log(currCount);
    currCount--;
  } else if (currCount === 0) {
    console.log('Blast off!');
    clearInterval(timer);
  }
}, 1000);
