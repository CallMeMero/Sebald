//In dem corechart packet befindet sich die Bibliothek fuer die Liniendiagramme
google.load('visualization', '1', {packages: ['corechart']});

//mit dieser Funktion werden die Diagramme generiert
function drawChart(selectvalue, selectwindow) {
  //Die Messwerte von der Datenbank abfragen
  var jsonData
  $.ajax({
    type: "GET",
    url: "../chart/data_selectable.php?swindow=" + selectwindow + "&svalue=" + selectvalue, //Der Datenbank muessen die das Fenster und der Tag uebergeben werden
    dataType: "json",
    async: false,
  }).success(function(data){jsonData = data});	//bei Erfolg werden die Daten in jsonData gespeichert

  //neuen DataTable fuer die Daten anlegen, in diesem sind alle Daten fuer die Diagramme enthalten
  var data = new google.visualization.DataTable(jsonData);


  //die divs fuer die Diagramme leeren. evtl wurden bereits Diagramme angezeigt
  $("#humidity_chart").html('');
  $("#temperature_chart").html('');
  $("#illu_chart").html('');
  $("#pressure_chart").html('');
  //Standardoptionen fuer die Diagramme festlegen
  var options = {
    //Titel fuer das Diagramm und die vAchse werden erst vor dem Erstellen der Diagramme angegeben
    title: '',
    vAxes: {
      0: {title: ''}
    },
    curveType: 'function', //Kanten im Diagramm sollen abgerundet werden
    explorer: {			// den zoom aktivieren
      axis: 'horizontal',  //nur horizontal zoomen
      keepInBounds: true,	 //Das Diagramm kann nicht ausserhalb des anzeigebereichs verschoben werden
    },
    enableInteractivity : false,	//Interaktivitaet wird deaktiviert
    height: 500		//Hoehe von 500 Pixel festlegen
  };
  // das nIV-Fenster ausgewaehlt wurde
  if(selectwindow == "nIV"){
    //Spalten in denen die Temp- und Humwerte stehen definieren
    var tempCols = [0, 2, 6, 10]; //0: timestamp; 2: c6; 4: a1; 6: a3; 8: a5; 10: a7; 12: a10
    var humCols = [0, 1, 5, 9];  //0: timestamp; 1: c6; 3: a1; 5: a3; 7: a5; 9: a7; 11: a10

    //Jenachdem was ausgewaehlt wurde wird die Ueberschrift anders angezeigt
    if(selectvalue == 3 || selectvalue== 7 ){
      options['title'] = 'nIV (Fuerer): Luftfeuchte der letzten ' + selectvalue + ' Tage';
    }else{
      options['title'] = 'nIV (Fuerer): Luftfeuchte am ' + selectvalue;
    }
    //vAchsenueberschrift
    options['vAxes'][0]['title'] = 'Luftfeuchte in %';
    //Visualisierungsklasse anlegen. Es soll ein LineChart erzeugt werden und in das div humidity_chart hineingezeichnet werden
    var humChart = new google.visualization.LineChart(document.getElementById('humidity_chart'));
    //Es muss eine DataView klasse erzeugt werden mit den Daten aus dem DataTable
    var viewHum = new google.visualization.DataView(data);
    viewHum.setColumns(humCols);				//Hier wird festgelegt welche Spalten angezeigt werden sollen
    humChart.draw(viewHum, options);			//Das Diagramm einzeichen

    //Fuer das andere Diagramm wiederholt sich alles wieder
    if(selectvalue == 3 || selectvalue == 7){
      options['title'] = 'nIV (Fuerer): Temperatur der letzten ' + selectvalue + ' Tage';
    }else{
      options['title'] = 'nIV (Fuerer): Temperatur am ' + selectvalue;
    }
    options['vAxes'][0]['title'] = 'Temperatur in C';
    var tempChart = new google.visualization.LineChart(document.getElementById('temperature_chart'));
    var viewTemp = new google.visualization.DataView(data);
    viewTemp.setColumns(tempCols);
    tempChart.draw(viewTemp, options);

    ///////////////////////////////////////////
    //Wenn ein anderes Fenstergewaehlt wurde
    //Fuer diese Fenster muessen 4 Diagramme erzeugt werden von daher ist der Code etwas laenger
    //aber die im Grunde ist es das gleich wie fuer das nIV-Fenster
  }else if(selectwindow == "sV" || selectwindow == "sVI"){

    var tempCols = [0, 1, 5, 9, 13];
    var illuCols = [0, 2, 6, 10, 14];
    var humCols = [0, 3, 7, 11, 15];
    var pressCols = [0, 4, 8, 12, 16];

    if(selectvalue == 3 || selectvalue == 7){
      if(selectwindow == "sV"){
        options['title'] = 'sV (Schuerstab): Luftfeuchte der letzten ' + selectvalue + ' Tage';
      }else if(selectwindow == "sVI"){
        options['title'] = 'sVI (Behaim): Luftfeuchte der letzten ' + selectvalue + ' Tage';
      }
    }else{
      if(selectwindow == "sV"){
        options['title'] = 'sV (Schuerstab): Luftfeuchte am ' + selectvalue;
      }else if(selectwindow == "sVI"){
        options['title'] = 'sVI (Behaim): Luftfeuchte am ' + selectvalue;
      }
    }
    options['vAxes'][0]['title'] = 'Luftfeuchte in %';
    var humChart = new google.visualization.LineChart(document.getElementById('humidity_chart'));
    var viewHum = new google.visualization.DataView(data);
    viewHum.setColumns(humCols);
    humChart.draw(viewHum, options);

    if(selectvalue == 3 || selectvalue == 7){
      if(selectwindow == "sV"){
        options['title'] = 'sV (Schuerstab): Temperatur der letzten ' + selectvalue + ' Tage';
      }else if(selectwindow == "sVI"){
        options['title'] = 'sVI (Behaim): Temperatur der letzten ' + selectvalue + ' Tage';
      }
    }else{
      if(selectwindow == "sV"){
        options['title'] = 'sV (Schuerstab): Temperatur am ' + selectvalue;
      }else if(selectwindow == "sVI"){
        options['title'] = 'sVI (Behaim): Temperatur am ' + selectvalue;
      }
    }
    options['vAxes'][0]['title'] = 'Temperatur in C';
    var tempChart = new google.visualization.LineChart(document.getElementById('temperature_chart'));
    var viewTemp = new google.visualization.DataView(data);
    viewTemp.setColumns(tempCols);
    tempChart.draw(viewTemp, options);

    if(selectvalue == 3 || selectvalue == 7){
      if(selectwindow == "sV"){
        options['title'] = 'sV (Schuerstab): Beleuchtungsstaerke der letzten ' + selectvalue + ' Tage';
      }else if(selectwindow == "sVI"){
        options['title'] = 'sVI (Behaim): Beleuchtungsstaerke der letzten ' + selectvalue + ' Tage';
      }
    }else{
      if(selectwindow == "sV"){
        options['title'] = 'sV (Schuerstab): Beleuchtungsstaerke am ' + selectvalue;
      }else if(selectwindow == "sVI"){
        options['title'] = 'sVI (Behaim): Beleuchtungsstaerke am ' + selectvalue;
      }
    }
    options['vAxes'][0]['title'] = 'Beleuchtungsstaerke in Lux';
    var illuChart = new google.visualization.LineChart(document.getElementById('illu_chart'));	//which div to populate with this chart
    var viewIllu = new google.visualization.DataView(data);
    viewIllu.setColumns(illuCols);				//set which Columns to visualize, Columns set will be shown
    illuChart.draw(viewIllu, options);			//draw Chart

    if(selectvalue == 3 || selectvalue == 7){
      if(selectwindow == "sV"){
        options['title'] = 'sV (Schuerstab): Luftdruck der letzten ' + selectvalue + ' Tage';
      }else if(selectwindow == "sVI"){
        options['title'] = 'sVI (Behaim): Luftdruck der letzten ' + selectvalue + ' Tage';
      }
    }else{
      if(selectwindow == "sV"){
        options['title'] = 'sV (Schuerstab): Luftdruck am ' + selectvalue;
      }else if(selectwindow == "sVI"){
        options['title'] = 'sVI (Behaim): Luftdruck am ' + selectvalue;
      }
    }
    options['vAxes'][0]['title'] = 'Luftdruck in mbar';
    var pressChart = new google.visualization.LineChart(document.getElementById('pressure_chart'));
    var viewPress = new google.visualization.DataView(data);
    viewPress.setColumns(pressCols);
    pressChart.draw(viewPress, options);
  }
}
