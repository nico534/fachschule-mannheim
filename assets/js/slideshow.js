
const slide_wrapper = document.querySelector(".slider figure");
var slides = document.querySelectorAll(".slider figure img");

// Add first slider to end and last at the start
slide_wrapper.append(slides[0].cloneNode(true));
slide_wrapper.prepend(slides[slides.length - 1].cloneNode(true));
slides = document.querySelectorAll(".slider figure img");

slide_wrapper.style.width = (100 * (slides.length ) ) + "%";

console.log(slide_wrapper.style.width);

let width = (100 / slides.length);

for(var i = 0; i < slides.length; i++){
  slides[i].style.width = width + "%";
}

let counter = 1;
var maxCount = slides.length - 1;
var canTranslate = true;
let click_pos = -1;
let interrupted = false;

slide_wrapper.style.transform = 'translateX(' + (-width * counter) + '%)';

function left(){
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
  if(!canTranslate){
    return;
  }
  interrupted = true;
  canTranslate = false;
  slide_wrapper.style.transition = "transform 0.4s ease-in-out";
  counter++;
  slide_wrapper.style.transform = 'translateX(' + (-width * counter) + '%)';
}

slide_wrapper.addEventListener('touchstart', e => {
  click_pos = e.offsetX;
});
slide_wrapper.addEventListener('touchend', e => {
  if(click_pos < 0) return;
  if(click_pos < e.offsetX){
    left();
  } else {
    right();
  }
  click_pos = -1;
});

slide_wrapper.addEventListener('mousedown', e => {
  click_pos = e.offsetX;
});
slide_wrapper.addEventListener('mouseup', e => {
  if(click_pos < 0) return;
    if(click_pos < e.offsetX){
      left();
    } else {
      right();
    }
  click_pos = -1;
});

slide_wrapper.addEventListener('transitionend', () => {
  canTranslate = true;
  if(counter == 0){
    slide_wrapper.style.transition = 'none';
    counter = maxCount - 1;
    slide_wrapper.style.transform = 'translateX(' + (-width * counter) + '%)';
  } else if (counter == (maxCount)) {
    slide_wrapper.style.transition = 'none';
    counter = 1;
    slide_wrapper.style.transform = 'translateX(' + (-width * counter) + '%)';
  }
});

function carousel() {
  setTimeout(carousel, 8000); // Change image every 2 seconds
  right();
}
