document.addEventListener("DOMContentLoaded", function () {
  // Edit and Save handlers here (if you still want them)
  function enableEditing(input, editBtn, saveBtn) {
    editBtn.addEventListener("click", function () {
      input.removeAttribute("readonly");
      input.focus();
      editBtn.style.display = "none";
      saveBtn.style.display = "inline";
    });

    saveBtn.addEventListener("click", function () {
      let newValue = input.value;
      let field = input.id === "nameInput" ? "name" : "email";

      fetch("../backend/update_profile.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `field=${field}&value=${encodeURIComponent(newValue)}`,
      })
        .then((response) => response.text())
        .then((data) => {
          console.log(data);
          input.setAttribute("readonly", true);
          editBtn.style.display = "inline";
          saveBtn.style.display = "none";
        })
        .catch((error) => console.error("Error:", error));
    });
  }

  enableEditing(
    document.getElementById("nameInput"),
    document.getElementById("editName"),
    document.getElementById("saveName")
  );

  enableEditing(
    document.getElementById("emailInput"),
    document.getElementById("editEmail"),
    document.getElementById("saveEmail")
  );

  // Upload profile picture handler
  const uploadForm = document.querySelector(".uploadForm");
  const fileInput = document.getElementById("fileInput");

  uploadForm.addEventListener("submit", function (e) {
    e.preventDefault();

    if (!fileInput.files.length) {
      alert("Please choose a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("profile_image", fileInput.files[0]);

    fetch("../backend/upload_profile_pic.php", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.text())
      .then(() => {
        // Reload page to update profile picture
        window.location.reload();
      })
      .catch((error) => {
        console.error("Upload error:", error);
        alert("An error occurred during upload.");
      });
  });
});
