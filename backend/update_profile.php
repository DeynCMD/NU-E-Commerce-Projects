<?php
session_start();
require 'config/connection.php';

header('Content-Type: text/plain'); // Optional: tell client it's plain text

if (!isset($_SESSION['id_number']) || !isset($_POST['field']) || !isset($_POST['value'])) {
    http_response_code(400);
    die("Invalid request.");
}

$id_number = $_SESSION['id_number'];
$field = $_POST['field'];
$value = trim($_POST['value']);

// Whitelist allowed fields
$allowedFields = ['name', 'email'];
if (!in_array($field, $allowedFields)) {
    http_response_code(400);
    die("Invalid field.");
}

// Use a secure approach with hardcoded fields to avoid SQL injection
if ($field === 'name') {
    $query = "UPDATE user_table SET name = ? WHERE id_number = ?";
} elseif ($field === 'email') {
    $query = "UPDATE user_table SET email = ? WHERE id_number = ?";
} else {
    http_response_code(400);
    die("Invalid update target.");
}

$stmt = $connection->prepare($query);
if (!$stmt) {
    http_response_code(500);
    die("Failed to prepare statement.");
}

$stmt->bind_param("ss", $value, $id_number);

if ($stmt->execute()) {
    echo "Success";
} else {
    http_response_code(500);
    echo "Error updating record.";
}

$stmt->close();
$connection->close();
?>
