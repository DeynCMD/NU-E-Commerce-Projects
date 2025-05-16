<?php
session_start();
require 'connection.php';

$user_id = $_SESSION['user_id'] ?? 0;

$stmt = $conn->prepare("SELECT SUM(quantity) as total FROM cart_items WHERE user_id = ?");
$stmt->bind_param("i", $user_id);
$stmt->execute();
$result = $stmt->get_result()->fetch_assoc();

$count = $result['total'] ?? 0;

echo json_encode(['count' => (int)$count]);