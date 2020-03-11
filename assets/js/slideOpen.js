const slidableParts = document.querySelectorAll("#main section");
const slideButtons = document.querySelectorAll("#main button");
const collapsedHeight = 800;

for(var i = 0; i < slidableParts.length; i++){
  console.log("offsetHeight " + slidableParts[i].offsetHeight);
    slidableParts[i].style.overflow = "hidden";
    //slideButtons
    const index = i;
    slideButtons[i].addEventListener("click", function(){slideOpen(index)} );
}


function slideOpen(i){
  console.log("Slide Open");
  slidableParts[i].style.maxHeight = "none";
  slideButtons[i].textContent = "Weniger anzeigen";
  const index = i;
  slideButtons[i].addEventListener("click", function(){slideClose(index)});
}

function slideClose(i){
  console.log("Slide Close");
  slidableParts[i].style.maxHeight = collapsedHeight + "px";
  slideButtons[i].textContent = "Mehr anzeigen";
  const index = i;
  slideButtons[i].addEventListener("click", function(){slideOpen(index)});
}

function closeAll(){
  for(var i = 0; i < slidableParts.length; i++){
      slidableParts[i].style.maxHeight = collapsedHeight + "px";
      slideButtons[i].textContent = "Mehr anzeigen";
  }
}

closeAll();
