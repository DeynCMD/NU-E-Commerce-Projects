<?php
session_start();

// Check if user is logged in
if (!isset($_SESSION['id_number'])) {
    echo "Session not set! Redirecting to login...";
    header("Refresh:3; url=login.html");
    exit();
}

// DB connection
require '../backend/config/connection.php';

$id_number = $_SESSION['id_number'];

// Fetch user profile info
$query = "SELECT name, email, profile_pic FROM user_table WHERE id_number = ?";
$stmt = $connection->prepare($query);
$stmt->bind_param("s", $id_number);
$stmt->execute();
$stmt->bind_result($name, $email, $profilePic);
$stmt->fetch();
$stmt->close();

$profilePic = $profilePic ? "../uploads/$profilePic" : "../assets/images/default.png";
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

<!-- Navbar -->
    <nav class="navbar navbar-expand-lg fixed-top">
      <div class="container-fluid">
          <a class="navbar-brand" href="dashboard.html">
              <img src="../assets/images/bulldogs-exhange-logo.png" alt="Bulldogs Exchange Logo" class="logo-img">Bulldogs Exchange</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
              <ul class="navbar-nav">
                  <li class="nav-item">
                      <a class="nav-link" href="dashboard.html#new">New & Featured</a>
                  </li>
                  <li class="nav-item">
                      <a class="nav-link" href="dashboard.html#uniforms">Uniforms</a>
                  </li>
                  <li class="nav-item">
                      <a class="nav-link" href="dashboard.html#bags">Bags</a>
                  </li>
                  <li class="nav-item">
                      <a class="nav-link" href="dashboard.html#accessories">Accessories</a>
                  </li>
              </ul>
              <div class="nav-actions">
                  <div class="search-wrapper">
                      <button id="searchToggle" class="nav-icon-btn" type="button">
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                              <circle cx="11" cy="11" r="8"></circle>
                              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                          </svg>
                      </button>
                      <div id="searchBar" class="search-bar">
                          <form class="d-flex search-form" role="search">
                              <input class="form-control" type="search" placeholder="Search..." aria-label="Search">
                              <button class="search-btn" type="submit" aria-label="Search">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                      <circle cx="11" cy="11" r="8"></circle>
                                      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                                  </svg>
                              </button>
                          </form>
                      </div>
                  </div>
                  
                  <a href="#">
                      <button class="nav-icon-btn" type="button" aria-label="Shopping Cart">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                              <circle cx="9" cy="21" r="1"></circle>
                              <circle cx="20" cy="21" r="1"></circle>
                              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                          </svg>
                          <span class="cart-count">1</span>
                      </button>
                  </a>
                  
                  <div class="profile-dropdown">
                    <a href="profile.php" class="nav-icon-btn">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                            <circle cx="12" cy="7" r="4"></circle>
                        </svg>
                    </a>            
                      <div id="profileMenu" class="profile-menu">
                          <a href="profile.html" class="profile-item">View Profile</a>
                          <a href="https://www.facebook.com/NUBulldogsExchangeOfficial/" target="_blank" class="profile-item">FB Page</a>
                          <a href="new-login.html" class="profile-item">Logout</a>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    </nav> 
  <div class="profile-container">
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
              <img src="<?php echo $profilePic ?? 'default.png'; ?>" class="profile-image" alt="Profile Picture" />
              <form class="uploadForm" action="../backend/upload_profile_pic.php" method="POST" enctype="multipart/form-data">
                <input type="file" name="profile_image" id="fileInput" accept="image/*" required hidden>
                <label for="fileInput" class="custom-file-btn">Choose File</label>
                <button type="submit" class="upload-btn">Upload</button>
              </form>
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
