<?php
session_start();
require 'config/connection.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['loginForm'])) {
    $id_number = trim($_POST['id_number'] ?? '');
    $password = trim($_POST['password'] ?? '');
    $user_type = trim($_POST['user_type'] ?? ''); // Optional: fallback default: 'student'

    // ✅ Assume default user_type if not provided (REMOVE if you require it strictly)
    if (empty($user_type)) {
        $user_type = 'student'; // or 'staff' — depends on your context
    }

    if (empty($id_number) || empty($password)) {
        die("⚠️ Error: ID number and password are required.");
    }

    // Step 1: Check if user exists
    $stmt = $connection->prepare("SELECT password FROM user_table WHERE id_number = ? AND user_type = ?");
    if (!$stmt) {
        die("❌ Prepare failed: " . $connection->error);
    }

    $stmt->bind_param("ss", $id_number, $user_type);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows === 0) {
        $stmt->close();
        $connection->close();
        die("❌ Error: User not found.");
    }

    $stmt->bind_result($hashed_password);
    $stmt->fetch();
    $stmt->close();

    // Step 2: First-time login (no password yet)
    if (empty($hashed_password)) {
        $new_hashed = password_hash($password, PASSWORD_DEFAULT);
        $update = $connection->prepare("UPDATE user_table SET password = ? WHERE id_number = ? AND user_type = ?");
        if (!$update) {
            die("❌ Update prepare failed: " . $connection->error);
        }

        $update->bind_param("sss", $new_hashed, $id_number, $user_type);
        if ($update->execute()) {
            $_SESSION['id_number'] = $id_number;
            $_SESSION['user_type'] = $user_type;

            $update->close();
            $connection->close();

            header("Location: " . ($user_type === 'admin' ? "../pages/admin.php" : "../pages/dashboard.html"));
            exit();
        } else {
            $update->close();
            $connection->close();
            die("❌ Error: Could not save password.");
        }

    } else {
        // Step 3: Returning user
        if (password_verify($password, $hashed_password)) {
            $_SESSION['id_number'] = $id_number;
            $_SESSION['user_type'] = $user_type;

            $connection->close();

            header("Location: " . ($user_type === 'admin' ? "../pages/admin.php" : "../pages/dashboard.html"));
            exit();
        } else {
            $connection->close();
            die("❌ Incorrect password.");
        }
    }
}

$connection->close();
?>
