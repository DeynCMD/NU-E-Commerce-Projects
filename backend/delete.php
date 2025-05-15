<?php
    require_once "config/connection.php";

    $id = $_GET['id'];

    $deleteQuery = "DELETE FROM student_table WHERE id='$id'";
    $result = mysqli_query($connection, $deleteQuery);

    if($result){
        header("location: ../index.php");
    }
?>