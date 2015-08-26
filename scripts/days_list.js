// Mit dieser Funktion wird die Tagesliste gefuellt
function populate_list(selectwindow){
  $("#sensor_days").html("<select id=days></select>"); //Es muss das neue Dropdownmenue erzeugt werden
  $.ajax({ //Die Tagesliste wird von der Datenbank abgefragt und in data gespeichert
    type: "GET",
    url: "../chart/day_list.php?swindow=" + selectwindow, //Das gewaehlte Fenster wird uebergeben
    dataType: "json",
    success: function(data) { //Bei Erfolg wird das Menue gefuellt
      //In days werden die einzelnen Optionen fuer das Dropdownmenue gespeichert
      var days = '<option>Bitte w&auml;hlen sie einen Tag aus.</option>';
      days += '<option value="3">Die letzten drei Tage</option>';
      days += '<option value="7">Die letzten sieben Tage</option>';
      //Mit dieser Funktion wird durch das Array data iteriert und fuer jeden Eintrag wird eine neue Option erzeugt
      $.each(data,function(index,item){
        days += "<option>" + item.Day + "</option>";
      });
      //Alle Optionen werden in das Dropdownmenue geschrieben
      $("#days").html(days);
    }
  });
}
//Diese Funktion wird geladen wenn die Seite fertig geladen ist
// Es wird ueberwacht welche Option in den Dropdownmenues gewaehlt wurde
$(document).ready(function(){
  var selectvalue = "";
  var selectwindow = $("#windows").val();
  //Das Fenstermenue wird ueberwacht. Wenn etwas neues ausgewaehlt wurde wird der Wert der Option zurueckgegeben
  $("#windows").change(function(i){
    selectwindow = $(this).val();
    if(selectwindow != ""){
      //populate_list mit dem entsprechenden Wert aufrufen
      populate_list(selectwindow);
      //Die Tagesliste wird ueberwacht und der ausgewaehlte Wert wird zurueckgegeben
      $("#days").change(function(e){
        selectvalue = $(this).val();
        if(selectvalue == ""){
          $("#days").html('<option>Bitte w&auml;hlen sie einen Tag aus.</option>');
        }else{
          //wenn ein Wert ausgewaehlt wurde wird drawChart mit dem Fenster und dem Tag aufgerufen
          drawChart(selectvalue, selectwindow);
        }
      });
    }
  });
});
