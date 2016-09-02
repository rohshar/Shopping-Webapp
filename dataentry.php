<?php

    //Connect to database 
    $host = "mysql1.000webhost.com"; //"localhost";
    $user = "a9309195_root"; //"root";
    $pass = "password1";//"xzerkerx";
    $databaseName = "a9309195_shop";//"shopping";
    $tableName = "LoginInfo";

    $con = mysql_connect($host,$user,$pass);
    $dbs = mysql_select_db($databaseName, $con);

    //Retrieve input from jQuery
    $fname = $_POST['personname'];
    $id = $_POST['personid'];

    //Store input in database
    $sql = "INSERT INTO LoginInfo (name, password)
    VALUES ('$fname', $id)";

    mysql_query($sql);

    //Return data
    $result = mysql_query("SELECT * FROM $tableName");
    $array = mysql_fetch_row($result);

    echo json_encode($array);

?>