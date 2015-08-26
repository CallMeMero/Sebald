<?php
//Skript zum abfragen der Messdaten von der Datenbank
header("Content-Type: text/javascript; charset=utf-8");
// Connect to MySQL
include "connect.php";

// Datenbank festlegen
$db = mysql_select_db( 'Sebald');
//Fehlerabfrage
if ( !$db ) {
  die ( 'Error selecting database \'Sebald\' : ' . mysql_error() );
}
//Werte aus der URL abfragen
$selectwindow = mysql_real_escape_string($_GET['swindow']);
$selectvalue = mysql_real_escape_string($_GET['svalue']);

//MySQL-Query. wenn ein Tagesbereich ausgewaehlt wurde, muessen zuerst alle verfuegbaren Tage abgefragt werden
if($selectvalue == 3 || $selectvalue == 7){
	//Es sollen nur die letzten $selectvalue Tage ausgegeben werden aus der Tagesliste
	$query_days = "SELECT $selectwindow FROM days_recorded WHERE $selectwindow IS NOT NULL ORDER BY $selectwindow DESC LIMIT $selectvalue";
	$result_days = mysql_query( $query_days );	
	
	// All good?
	if ( !$result_days ) {
		// Nope
		$message  = 'Invalid query: ' . mysql_error() . "\n";
		$message .= 'Whole query: ' . $query_days;
		die( $message );
	}	
	//Tage aus der Datenbank abfragen
	$days = array();
	//Tages werden in days gespeichert
	while ( $fetch = mysql_fetch_array( $result_days ) ) {
		$days[] = $fetch[$selectwindow];
	}

	//Query fuer die Daten an den erfragten Tagen
	$i = $selectvalue - 1;
	//Es sollen alle Daten aus der Tabelle $selectwindow abgefragt werden
	//bei denen der Zeitstemple zwischen den erfragten Tagen liegt
	$query = "SELECT * FROM $selectwindow WHERE DATE(timestamp) BETWEEN '$days[$i]' AND '$days[0]'";
	$result = mysql_query( $query );

	// All good?
	if ( !$result ) {
		// Nope
		$message  = 'Invalid query: ' . mysql_error() . "\n";
		$message .= 'Whole query: ' . $query;
		die( $message );
	}
	
}else{
//Sollte ein spezieller Tag ausgewaehlt wurden sein, dann werden direkt die Daten von dem Tag abgefragt
$query = "SELECT * FROM $selectwindow WHERE timestamp LIKE '%$selectvalue%'";
$result = mysql_query( $query );

// All good?
if ( !$result ) {
  // Nope
  $message  = 'Invalid query: ' . mysql_error() . "\n";
  $message .= 'Whole query: ' . $query;
  die( $message );
}
}
//Jetzt sind alle Daten bekannt
//Fuer die Diagramm werden die Bezeichnungen der Sensoren benoetigt, diese gleich den Spaltennamen der Tabelle
//Hier werden die Spaltennamen abgefragt
//Zuerst wird die Anzahl der Spalten benoetigt
$num_fields = mysql_num_fields($result);
//JSON-Daten fuer die Diagramme erzeugen
$sensor = array();
$temp = array();
$temp[] = array('label' => 'timestamp', 'type' => 'datetime');
//Durch alle Spalten interieren und deren Namen speichern
for ($i=2; $i < $num_fields; $i++){ 
	$temp[] = array('label' => mysql_field_name($result, $i), 'type' => 'number');
}
//cols Spalte fuer JSON anlegen
$sensor['cols'] = $temp;
//Messwerte aus der Tabelle laden
$rows = array();
while ( $row = mysql_fetch_array( $result) ) {
	$temp = array();
	//Zeitstempel formatieren
	$date = strptime($row['1'],'%Y-%m-%d %H:%M:%S');
	//Zeitstempel muss Zerobased Monat besitzen daher dieser ganze aufwand
    $temp[] = array('v' => "Date(" . ($date['tm_year'] + 1900) . ", " . $date['tm_mon'] . ", " . $date['tm_mday'] . ", " . $date['tm_hour'] . ", " . $date['tm_min'] . ", " . $date['tm_sec'] . ")");
	//Messwerte laden
	for ($i=2; $i < $num_fields; $i++){ 
		$temp[] = array('v' => $row[$i]);
	}
    $rows[] = array('c' => $temp);
}
//rows Spalte fuer JSON anlegen
$sensor['rows'] = $rows;
//JSON kodieren und ausgeben
$jsonTable = json_encode($sensor);
echo $jsonTable;

// Close the connection
mysql_close($link);

?>
