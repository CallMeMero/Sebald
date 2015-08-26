$(document).ready(function () {	//nur laden wenn die Seite fertig geladen ist
  $("div.SNbox").css({"opacity":"0"});	//anfangs die Deckkraft auf 0 setzen
  var i = 0;
  $(".sensorimage").click(function () { //Diese Funktion reagiert wenn auf das div behaimimage geklickt wurde
    if (i == 1) {	//wenn die Daten schon angezeigt werden, dann die Daten ausblenden ansonsten einblenden
      i = 0;
      $("div.SNbox").fadeTo("slow",0);
    }else {
      i = 1;
      $("div.SNbox").fadeTo("slow",1);
    }
  })
})
