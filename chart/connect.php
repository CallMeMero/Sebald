<?php
//Mit MySQL verbinden
$link = mysql_connect( 'localhost', 'root', 'Sebald_2013' );
// Fehlerabfrage
if ( !$link ) {
  die( 'Could not connect: ' . mysql_error() );
}
?>