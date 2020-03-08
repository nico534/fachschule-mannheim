
const slide_wrapper = document.querySelector(".slider figure");
var slides = document.querySelectorAll(".slider figure img");

// Add first slider to end and last at the start
slide_wrapper.append(slides[0].cloneNode(true));
slide_wrapper.prepend(slides[slides.length - 1].cloneNode(true));
slides = document.querySelectorAll(".slider figure img");

slide_wrapper.style.width = (100 * (slides.length ) ) + "%";

let width = (100 / slides.length);

for(var i = 0; i < slides.length; i++){
  slides[i].style.width = width + "%";
}

let counter = 1;
var maxCount = slides.length - 1;
var canTranslate = true;
var posX1 = 0,
    offset = 0,
    posInitial,
    posFinal,
    threshold = 0.2,
    second = 0;
let interrupted = false;

slide_wrapper.style.transform = 'translateX(' + (-width * counter) + '%)';

/* Set Events */

slide_wrapper.onmousedown = dragStart;

slide_wrapper.addEventListener('transitionend', () => {
  canTranslate = true;
  slide_wrapper.style.transition = 'none';
  if(counter == 0){
    counter = maxCount - 1;
    slide_wrapper.style.transform = 'translateX(' + (-width * counter) + '%)';
  } else if (counter == (maxCount)) {
    counter = 1;
    slide_wrapper.style.transform = 'translateX(' + (-width * counter) + '%)';
  }
});

slide_wrapper.addEventListener('touchstart', dragStart);
slide_wrapper.addEventListener('touchend', dragEnd);
slide_wrapper.addEventListener('touchmove', dragAction);

/* Slide Functions */
function left(){
  second = 0;
  if(!canTranslate){
    return;
  }
  interrupted = true;
  canTranslate = false;
  slide_wrapper.style.transition = "transform 0.4s ease-in-out";
  counter--;
  slide_wrapper.style.transform = 'translateX(' + (-width * counter) + '%)';
}

function right(){
  second = 0;
  if(!canTranslate){
    return;
  }
  interrupted = true;
  canTranslate = false;
  slide_wrapper.style.transition = "transform 0.4s ease-out";
  counter++;
  slide_wrapper.style.transform = 'translateX(' + (-width * counter) + '%)';
}


function dragStart (e){
  if(!canTranslate) return;
  e = e || window.event;
    e.preventDefault();
    posInitial = counter;
    if (e.type == 'touchstart') {
      posX1 = e.touches[0].clientX;
    } else {
      posX1 = e.clientX;
      document.onmouseup = dragEnd;
      document.onmousemove = dragAction;
    }
}

function dragAction (e){
  e = e || window.event;
    if (e.type == 'touchmove') {
      offset = (posX1 - e.touches[0].clientX);
    } else {
      offset = (posX1 - e.clientX);
    }
    counter = posInitial + (offset / slides[0].width);
    slide_wrapper.style.transform = 'translateX(' + (-width * counter) + '%)';
}

function dragEnd (e){
    if (counter - posInitial < -threshold) {
      counter = posInitial;
      left();
    } else if (counter - posInitial > threshold) {
      counter = posInitial;
      right();
    } else {
      counter = posInitial - 1;
      right();
    }
    document.onmouseup = null;
    document.onmousemove = null;
}

/* auto slider */

window.setInterval(autoSlide, 1000);

function autoSlide(){
  second++;
  if(second > 5){
    right();
  }
}
