<?php
session_start();
require 'config/connection.php';

header('Content-Type: application/json');

if (!isset($_SESSION['id_number'])) {
    http_response_code(403);
    echo json_encode(['status' => 'error', 'message' => 'Not logged in']);
    exit;
}

$loggedInUserId = $_SESSION['id_number'];
$reviewId = $_POST['review_id'] ?? null;

if (!$reviewId) {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'Missing review ID']);
    exit;
}

// Verify review belongs to logged-in user before deleting
$stmt = $connection->prepare("SELECT id_number FROM reviews WHERE id = ?");
$stmt->bind_param("i", $reviewId);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 0) {
    http_response_code(404);
    echo json_encode(['status' => 'error', 'message' => 'Review not found']);
    exit;
}

$row = $result->fetch_assoc();

if ($row['id_number'] !== $loggedInUserId) {
    http_response_code(403);
    echo json_encode(['status' => 'error', 'message' => 'Not authorized to delete this review']);
    exit;
}

$stmt->close();

// Delete review
$delete = $connection->prepare("DELETE FROM reviews WHERE id = ?");
$delete->bind_param("i", $reviewId);

if ($delete->execute()) {
    echo json_encode(['status' => 'success', 'message' => 'Review deleted']);
} else {
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => 'Failed to delete review']);
}

$delete->close();
$connection->close();
?>
