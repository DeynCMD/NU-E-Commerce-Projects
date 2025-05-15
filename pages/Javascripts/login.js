// login.js

document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
  
    const branch = document.getElementById('branch').value;
    const userType = document.getElementById('user_type').value;
  
    sessionStorage.setItem('branch', branch);
    sessionStorage.setItem('user_type', userType);

    if (userType === 'student') {
      window.location.href = 'login_student.html';
    } else if (userType === 'staff') {
      window.location.href = 'login_staff.html';
    }

    function profile() {
      window.location.href = "profile.html";
  }
  });
  