$(document).ready(function() {	//nur laden wenn die Seite fertig geladen ist
  load_csv(); //FUnktion zum laden der CSV aufrufen
});

setInterval(load_csv, 1000); //die Funktion in abstaenden von 1000 Millisekunden aufrufen

function load_csv(){	//Funktion zum laden der CSV-Datei mit den aktuellen Sensordaten
  $.ajax({
      type: "GET",
      url: "../data/Fuerer/actual.csv",//Speicherort der CSV-Datei
      dataType: "text",
      success: function(data) {display_csv(data);}	//Bei erfolg die Funktion display_csv(data) aufrufen
     });
}
// In dieser Funktion werden wird der geladene Text auf der Seite angezeigt
function display_csv(allText) {
  var lines = allText.split(";"); 	//Textzeile aufspalten mit ; als Trennzeichen und als Array speichern
  //Jeden Arrayeintrag in einen Integer umwandeln um die Nachkommastellen zu kürzen
  for(var i=0; i<lines.length;i++){
    lines[i]=parseInt(lines[i], 10);
  }
  //Hier werden die Sensordaten in den entsprechenden Textfeldern eingetragen
  $("#c6").html("Hum: " + lines[1] + " %</br>" + "Temp: " + lines[2] + " &deg;C");
  $("#a1").html("Hum: " + lines[4] + " %</br>" + "Temp: " + lines[5] + " &deg;C");
  $("#a3").html("Hum: " + lines[7] + " %</br>" + "Temp: " + lines[8] + " &deg;C");
  $("#a5").html("Hum: " + lines[10] + " %</br>" + "Temp: " + lines[11] + " &deg;C");
  $("#a7").html("Hum: " + lines[13] + " %</br>" + "Temp: " + lines[14] + " &deg;C");
  $("#a10").html("Hum: " + lines[16] + " %</br>" + "Temp: " + lines[17] + " &deg;C");
}
