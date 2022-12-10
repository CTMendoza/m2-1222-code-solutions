var $countDown = document.querySelector('.countdown-display');

var h1Text = [3, 2, 1, '~Earth Beeeelooowww Us~'];

var counter = 0;

function $changeH1Text() {
  if (counter < 4) {
    $countDown.textContent = h1Text[counter];
    counter++;
  }
}

setInterval($changeH1Text, 1000);

var intervalId = setInterval($changeH1Text, 1000);

clearInterval(intervalId);
