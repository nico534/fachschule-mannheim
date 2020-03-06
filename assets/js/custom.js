var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    // this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.maxHeight){
      content.style.maxHeight = null;
      this.classList.remove("active");
    } else {
      // close all Items
      for (i = 0; i < coll.length; i++) {
        coll[i].nextElementSibling.style.maxHeight = null;
        coll[i].classList.remove("active");
      }
      content.style.maxHeight = content.scrollHeight + "px";
      this.classList.add("active");
    }
  });

}
