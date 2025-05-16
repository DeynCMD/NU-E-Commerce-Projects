<?php
session_start();
require 'config/connection.php';

header('Content-Type: application/json');

if (!isset($_SESSION['id_number']) || !isset($_POST['review'])) {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'Not logged in or missing review.']);
    exit;
}

$id_number = $_SESSION['id_number'];
$review = trim($_POST['review']);

// Empty review check
if ($review === '') {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'Review is empty.']);
    exit;
}

// Step 1: Fetch user's name from user_table
$query = "SELECT name FROM user_table WHERE id_number = ?";
$stmt = $connection->prepare($query);
$stmt->bind_param("s", $id_number);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 0) {
    http_response_code(404);
    echo json_encode(['status' => 'error', 'message' => 'User not found.']);
    exit;
}

$row = $result->fetch_assoc();
$username = $row['name'];
$stmt->close();

// Step 2: Insert into reviews table
$insert = $connection->prepare("INSERT INTO reviews (id_number, username, review_text) VALUES (?, ?, ?)");
$insert->bind_param("sss", $id_number, $username, $review);

if ($insert->execute()) {
    echo json_encode(['status' => 'success', 'message' => 'Review submitted.']);
} else {
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => 'Failed to submit review.']);
}

$insert->close();
$connection->close();
?>
