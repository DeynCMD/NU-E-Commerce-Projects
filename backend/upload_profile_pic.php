<?php
session_start();
require '../backend/config/connection.php';

if (!isset($_SESSION['id_number'])) {
    die("Unauthorized access.");
}

$id_number = $_SESSION['id_number'];

if (isset($_FILES['profile_image'])) {
    $image = $_FILES['profile_image'];
    $imageName = time() . "_" . basename($image['name']);
    $targetDir = "../uploads/";
    $targetFile = $targetDir . $imageName;

    if (!is_dir($targetDir)) {
        mkdir($targetDir, 0777, true);
    }

    if (move_uploaded_file($image['tmp_name'], $targetFile)) {
        $stmt = $connection->prepare("UPDATE user_table SET profile_pic = ? WHERE id_number = ?");
        $stmt->bind_param("ss", $imageName, $id_number);
        $stmt->execute();
        $stmt->close();
        header("Location: ../pages/profile.php"); // redirect back to profile
    } else {
        echo "Image upload failed.";
    }
}
?>
s