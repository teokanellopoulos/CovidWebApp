var i = 0;
var images = [];
var time = 10000;

images[0] = "../images/1.jpg";
images[1] = "../images/2.jpg";
images[2] = "../images/3.jpg";

function changeImg () {
    document.slide.src = images[i];

    if(i < images.length - 1) {
        i++;
    }else {
        i = 0;
    }

    setTimeout("changeImg()", time);
}

window.onload = changeImg;
