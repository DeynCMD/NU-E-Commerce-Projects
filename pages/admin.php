<?php
// admin_register.php
require '../backend/config/connection.php';

$message = "";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $id_number = $_POST['id_number'];
    $branch = $_POST['branch'];
    $user_type = $_POST['user_type'];

    // Check if ID already exists
    $check = $connection->prepare("SELECT id_number FROM user_table WHERE id_number = ?");
    $check->bind_param("s", $id_number);
    $check->execute();
    $check->store_result();

    if ($check->num_rows > 0) {
        $message = "❌ Student with ID $id_number already exists.";
    } else {
        $insert = $connection->prepare("INSERT INTO user_table (id_number, branch, user_type) VALUES (?, ?, ?)");
        $insert->bind_param("sss", $id_number, $branch, $user_type);

        if ($insert->execute()) {
            $message = "✅ Student registered successfully!";
        } else {
            $message = "❌ Error: " . $insert->error;
        }

        $insert->close();
    }

    $check->close();
    $connection->close();
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Admin: Register Student</title>
</head>
<body>
  <h2>Admin: Register New Student</h2>

  <?php if ($message): ?>
    <p><strong><?= $message ?></strong></p>
  <?php endif; ?>

  <form method="POST" action="">
    <label>ID Number:</label><br>
    <input type="text" name="id_number" required><br><br>

    <label>Branch:</label><br>
    <select id="branch" name="branch" required>
            <option value="laguna">Laguna</option>
            <option value="manila">Manila</option>
            <option value="fairview">Fairview</option>
            <option value="clark">Clark</option>
            <option value="baliwag">Baliwag</option>
            <option value="nazareth">Nazareth School</option>
            <option value="moa">Mall of Asia</option>
            <option value="dasmariñas">Dasmariñas</option>
            <option value="lipa">Lipa</option>
            <option value="eastortigas">East Ortigas</option>
            <option value="bacolod">Bacolod</option>
          </select><br><br>

    <label>User Type:</label><br>
    <select name="user_type" required>
      <option value="student">Student</option>
      <option value="admin">Admin</option>
    </select><br><br>

    <button type="submit">Register Student</button>
  </form>
</body>
</html>
