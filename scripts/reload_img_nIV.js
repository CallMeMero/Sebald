var camImage = '../data/Fuerer/imgThermo.jpg';
var rgbImage = '../data/Fuerer/imgRGB.jpg';
var imageNumber;
var imageThermo = new Image();
var imageRGB = new Image();

//Funktion aufrufen wenn die Seite fertig geladen ist
$(document).ready(function() {
  //Funktion startImageRefresh im 10 Sekunden takt aufrufen
  startImageRefresh();
});

//Funktion startImageRefresh im 10 Sekunden takt aufrufen
setInterval(startImageRefresh, 10000);

//neue Pfade zuweisen
imageThermo.onload = function()
{
  $("#thermocam").src = imageThermo.src;
};
imageRGB.onload = function()
{
  $("#rgbcam").src = imageRGB.src;
};

//Refresh funktion fuer die Bilder
function startImageRefresh() {
  date = new Date();
  imageNumber = date.getTime();
  imageThermo.src = camImage + '?' + imageNumber;
  imageRGB.src = rgbImage + '?' + imageNumber;
}
