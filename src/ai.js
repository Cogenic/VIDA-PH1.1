//const preception = require('../routes/trainer.js');

var slideIndex = 0;

 function showSlides() {
    var i;
    var aSlides = document.getElementsByClassName("aSlides");
    var bSlides= document.getElementsByClassName("bSlides");
    var cSlides= document.getElementsByClassName("cSlides");
    var vida2= document.getElementById("vida2");
    for (i = 0; i < aSlides.length; i++) {
        aSlides[i].style.display = "nones";
        bSlides[i].style.display = "none";
        cSlides[i].style.display = "none";
    }

    slideIndex++;
//    console.log(slideIndex);

    if (slideIndex > aSlides.length) {slideIndex = 1}
//    console.log("back to " + slideIndex);
    for (i = 0; i < aSlides.length; i++) {
    //    aSlides[i].className = aSlides[i].className.replace(" active", "");
    }
    aSlides[slideIndex-1].style.display = "block";
    bSlides[slideIndex-1].style.display = "block";
    cSlides[slideIndex-1].style.display = "block";

    setTimeout(showSlides, 4000); // Change image every 2 seconds
}


module.exports = {
    showSlides: showSlides
}
