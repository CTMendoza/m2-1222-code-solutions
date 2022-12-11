// query select the img element
var $img = document.querySelector('img');
// cCI1= currentCarouselIndex
var currentCarouselItem = 0;
// query select previous icon
var $previousIcon = document.querySelector('.fa-thin.fa-angle-left');
// query select next icon
var $nextIcon = document.querySelector('.fa-thin.fa-angle-right');

// 3 second timer
var timer = setInterval($handleNextIcon, 3000);
// new 3 second timer after reset
// var newTimer = setInterval($handleNextIcon, 3000);
// create and click event listener function to check the  previous icon click event fires
$previousIcon.addEventListener('click', $handlePreviousIcon);
// query parent container of all i elements
function $handlePreviousIcon(event) {
  $iContainerChildren[currentCarouselItem].setAttribute('class', 'fa-regular fa-circle margin-right');
  if (currentCarouselItem === 0) {
    currentCarouselItem = poke.length - 1;
  } else {
    currentCarouselItem -= 1;
  }
  $img.setAttribute('src', poke[currentCarouselItem].img);
  $iContainerChildren[currentCarouselItem].setAttribute('class', 'fa-solid fa-circle margin-right');
  resetTimer();
}

// create and click event listener function to check the next icon click event fires
$nextIcon.addEventListener('click', $handleNextIcon);

function $handleNextIcon(event) {
  // console.log('clicking $nextIcon works');
  // for (var i = 0; i < poke.length; i++) {
  //   if ($img.getAttribute('src') === poke[i]) {
  //     $img.setAttribute('src', poke[i += 1]);
  //   } else if ($img.getAttribute('src') === poke[poke.length - 1]) {
  //     $img.setAttribute('src', poke[0]);
  //   }
  // }
  $iContainerChildren[currentCarouselItem].setAttribute('class', 'fa-regular fa-circle margin-right');
  currentCarouselItem += 1;
  if (currentCarouselItem === poke.length) {
    currentCarouselItem = 0;
  }
  $img.setAttribute('src', poke[currentCarouselItem].img);
  $iContainerChildren[currentCarouselItem].setAttribute('class', 'fa-solid fa-circle margin-right');
  resetTimer();
}

// create an array consisting objects that contain properties for the image file paths amd methods

var poke = [
  {
    img: 'images/001.png',
    imgClick: function (event) {
      $handleSpecificIcon(0);
    }
  },
  {
    img: 'images/004.png',
    imgClick: function (event) {
      $handleSpecificIcon(1);
    }
  },
  {
    img: 'images/007.png',
    imgClick: function (event) {
      $handleSpecificIcon(2);
    }
  },
  {
    img: 'images/025.png',
    imgClick: function (event) {
      $handleSpecificIcon(3);
    }
  },
  {
    img: 'images/039.png',
    imgClick: function (event) {
      $handleSpecificIcon(4);
    }
  }
];

function $handleSpecificIcon(specificItem) {
  $iContainerChildren[currentCarouselItem].setAttribute('class', 'fa-regular fa-circle margin-right');
  currentCarouselItem = specificItem;
  $img.setAttribute('src', poke[currentCarouselItem].img);
  $iContainerChildren[currentCarouselItem].setAttribute('class', 'fa-solid fa-circle margin-right');
  resetTimer();
}

var $iContainer = document.getElementById('progress-container');
var $iContainerChildren = $iContainer.children;

for (var i = 0; i < $iContainerChildren.length; i++) {
  $iContainerChildren[i].addEventListener('click', poke[i].imgClick);
}

var autoNext = function () {
  timer();
};

window.addEventListener('load', autoNext);

function resetTimer() {
  clearInterval(timer);
  timer = setInterval($handleNextIcon, 3000);
}
