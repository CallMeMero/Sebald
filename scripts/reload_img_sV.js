var camImage = '/data/Schuerstab/imgThermo.jpeg';
var rgbImage = '/data/Schuerstab/imgRGB.jpeg';
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
//Wenn der Intervall noch nicht fertig ist dann Funktion neu aufrufen
        date = new Date();
        imageNumber = date.getTime();
imageThermo.src = camImage + '?' + imageNumber;
imageRGB.src = rgbImage + '?' + imageNumber;
}
