$(document).ready(function() {	//nur laden wenn die Seite fertig geladen ist
  load_csv(); //Funktion zum laden der CSV aufrufen

});

setInterval(load_csv, 1000); //die Funktion in abstaenden von 1000 Millisekunden aufrufen

function load_csv(){	//Funktion zum laden der CSV-Datei mit den aktuellen Sensordaten
  $.ajax({
      type: "GET",
      url: "../data/Schuerstab/actual.csv",	//Speicherort der CSV-Datei
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
  $("#c6").html("Temp: " + lines[0] + " &deg;C" + "</br>" + "Illu: " + lines[1] + " l" + "</br>" + "Hum: " + lines[2] + " %" + "</br>" + "Pres: " + lines[3] + " mbar");
  $("#a2").html("Temp: " + lines[4] + " &deg;C" + "</br>" + "Illu: " + lines[5] + " l" + "</br>" + "Hum: " + lines[6] + " %" + "</br>" + "Pres: " + lines[7] + " mbar");
  $("#a6").html("Temp: " + lines[8] + " &deg;C" + "</br>" + "Illu: " + lines[9] + " l" + "</br>" + "Hum: " + lines[10] + " %" + "</br>" + "Pres: " + lines[11] + " mbar");
  $("#a11").html("Temp: " + lines[12] + " &deg;C" + "</br>" + "Illu: " + lines[13] + " l" + "</br>" + "Hum: " + lines[14] + " %" + "</br>" + "Pres: " + lines[15] + " mbar");
}
