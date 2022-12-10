var $message = document.querySelector('.message');

function $changeText() {
  $message.textContent = 'Hello There';
}

setTimeout($changeText, 2000);
