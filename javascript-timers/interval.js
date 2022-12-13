var $countDown = document.querySelector('.countdown-display');

var h1Text = [3, 2, 1, '~Earth Beeeelooowww Us~'];

var counter = 0;

function $changeH1Text() {
  $countDown.textContent = h1Text[counter];
  counter++;
  if (counter >= h1Text.length) {
    clearInterval(interval);
  }
}

var interval = setInterval($changeH1Text, 1000);
