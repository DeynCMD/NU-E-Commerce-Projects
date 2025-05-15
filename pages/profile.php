<?php
session_start();

// Debugging: Print session data
if (!isset($_SESSION['id_number'])) {
    echo "Session not set! Redirecting to login...";
    header("Refresh:3; url=login.html"); // Redirect after 3 seconds
    exit();
}

// Now fetch user details
require '../backend/config/connection.php';

$id_number = $_SESSION['id_number'];

$query = "SELECT name, email FROM user_table WHERE id_number = ?";
$stmt = $connection->prepare($query);
$stmt->bind_param("s", $id_number);
$stmt->execute();
$stmt->bind_result($name, $email);
$stmt->fetch();
$stmt->close();
?>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Profile</title>

    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>

    <!-- Custom CSS -->
    <link rel="stylesheet" href="../assets/style/profile.css">
</head>
<body>
  <div class="profile-container">
    <nav class="navbar navbar-expand-lg sticky-top">
      <div class="container-fluid">
        <a target="_blank" href="https://www.facebook.com/NUBulldogsExchangeOfficial/">
          <img class="navbar-brand" src="../assets/images/nube.png" alt="NU Bulldogs Exchange">
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav ms-auto me-auto">
            <li class="nav-item" href="dashboard.html#new"><a class="nav-link active" href="dashboard.html#new">New & Featured</a></li>
            <li class="nav-item"><a class="nav-link" href="dashboard.html#uniforms">Uniforms</a></li>
            <li class="nav-item"><a class="nav-link" href="dashboard.html#bags">Bag</a></li>
            <li class="nav-item"><a class="nav-link" href="dashboard.html#accessories">Accessories</a></li>
          </ul>
        </div>
        <a href="#"><img class="cart" src="../assets/images/cart.png" alt="Shopping Cart"></a>
      </div>
    </nav>
    
    <main class="profile-content">
      <h1 class="profile-title">My Profile</h1>
      <section class="profile-details">
        <div class="profile-info-container">
          <div class="profile-info-sections">
            <div class="labels-section">
              <div class="info-labels">
                <h2 class="info-label">Student Number</h2>
                <h2 class="info-label">Name</h2>
                <h2 class="info-label email-label">Email</h2>
              </div>
            </div>
            <div class="inputs-section">
              <div class="info-inputs">
                <p class="info-input"><?php echo htmlspecialchars($id_number); ?></p> 
                <input class="info-input" type="text" id="nameInput" value="<?php echo htmlspecialchars($name); ?>" readonly />
                <button class="edit-button" id="editName">Edit</button>
                <button class="edit-button" id="saveName" style="display: none;">Save</button>

                <input class="info-input" type="email" id="emailInput" value="<?php echo htmlspecialchars($email); ?>" readonly />
                <button class="edit-button" id="editEmail">Edit</button>
                <button class="edit-button" id="saveEmail" style="display: none;">Save</button>
              </div>
            </div>
            <div class="profile-image-section">
              <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/e6f99c9bafa5631cfe6f20364823d9361a17cb2ba9931867d5d2fd51b543abe4" class="profile-image" alt="Profile Picture" />
              <button class="logout-button" onclick="window.location.href='login.html'">Logout</button>
            </div>
          </div>
        </div>
      </section>

      <hr class="divider" />
  
      <footer class="footer">
        <div class="footer-content">
            <div class="footer-section">
              <h2 class="footer-title">Resources</h2>
              <a href="#" class="footer-link">Send Us A Feedback</a>
              <p class="copyright">2025 National University. All rights reserved</p>
            </div>
            <div class="footer-section">
              <h2 class="footer-title">Help</h2>
              <nav class="footer-nav">
                <a href="#" class="footer-link">Get Help</a>
                <a href="#" class="footer-link">Returns</a>
                <a href="#" class="footer-link">Payment Options</a>
                <a href="#" class="footer-link">Contact Us</a>
              </nav>
            </div>
          </div>
          <img src="../assets/images/nulogo.png" class="footer-image" />
      </footer>
    </main>
  </div>

  <script src="Javascripts/profile.js"></script>
</body>
</html>
