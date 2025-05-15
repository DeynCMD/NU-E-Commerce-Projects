<?php
require 'config/connection.php';

$id_number = "2023-120346";  // Static for now, can be dynamic
$password = "admin";  // Plain password for debug
$hashed_password = password_hash($password, PASSWORD_DEFAULT);  // Hash the password
$branch = "manila";  // Default branch
$user_type = "admin";  // Admin user type

// Debug: Print hashed password
echo "Generated Password Hash: " . $hashed_password . "<br>";

// Check if user already exists
$check = $connection->prepare("SELECT id_number FROM user_table WHERE id_number = ?");
$check->bind_param("s", $id_number);
$check->execute();
$check->store_result();

if ($check->num_rows > 0) {
    echo "Admin already exists.";
} else {
    // Insert admin with hashed password
    $stmt = $connection->prepare("INSERT INTO user_table (id_number, password, branch, user_type) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("ssss", $id_number, $hashed_password, $branch, $user_type);

    if ($stmt->execute()) {
        echo "✅ Admin user inserted successfully!";
    } else {
        echo "❌ Error: " . $stmt->error;
    }

    $stmt->close();
}

$check->close();
$connection->close();
?>
