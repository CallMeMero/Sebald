<?php
//Skript um die Tageslist von der Datenbank abzufragen
header("Content-Type: text/javascript; charset=utf-8");
// Connect to MySQL
include "connect.php";



// Datenbank festlegen
$db = mysql_select_db( 'Sebald');
//Fehlerabfrage
if ( !$db ) {
  die ( 'Error selecting database \'Sebald\' : ' . mysql_error() );
}
//Wert aus der URL abfragen
$selectwindow = mysql_real_escape_string($_GET['swindow']);
//MySQL_Query durchfuehren
//Es sollen nur Werte aus der Spalte $selectwindow von der days_recorded ausgegeben werden
//wenn der Eintrag nicht NULL ist und die Ausgabe soll in absteigender Reihenfolge erfolgen
$query = "SELECT $selectwindow FROM days_recorded WHERE $selectwindow IS NOT NULL ORDER BY $selectwindow DESC";
$result = mysql_query( $query );

// All good?
if ( !$result ) {
  // Nope
  $message  = 'Invalid query: ' . mysql_error() . "\n";
  $message .= 'Whole query: ' . $query;
  die( $message );
}
//Daten aus der Datenbank abfragen
$rows = array();
//Die Daten werden in das Array rows geschrieben
while ( $row = mysql_fetch_array( $result ) ) {
	$rows[] = array( 'Day' => $row[$selectwindow]);
}
//rows wird als JSON kodiert und ausgegeben
$jsonList = json_encode($rows);
echo $jsonList;

// Verbindung schließen
mysql_close();
?>