<?php
    require "constants.php";
    $connection = mysqli_connect(DB_HOST, DB_USER, DB_PASS, DB_NAME, 3306); 

    if(!$connection){
        die("Could not connect".$connection->connect_error);
    }
?> 