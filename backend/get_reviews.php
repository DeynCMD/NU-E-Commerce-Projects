<?php
session_start();
require 'config/connection.php';

header('Content-Type: application/json');

if (!$connection) {
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => 'Database connection failed.']);
    exit;
}

// Get the logged-in user's id_number for comparison
$loggedInId = isset($_SESSION['id_number']) ? $_SESSION['id_number'] : null;

// Join reviews with user_table to get the latest username
$query = "
    SELECT r.id, r.id_number, u.name AS username, r.review_text
    FROM reviews r
    JOIN user_table u ON r.id_number = u.id_number
    ORDER BY r.id DESC
";
$result = $connection->query($query);

if ($result) {
    $reviews = [];
    while ($row = $result->fetch_assoc()) {
        // Flag if the review is by the logged-in user
        $row['is_own_review'] = ($loggedInId !== null && $row['id_number'] === $loggedInId);
        $reviews[] = $row;
    }
    echo json_encode($reviews);
} else {
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => 'Failed to fetch reviews.']);
}

$connection->close();
?>
