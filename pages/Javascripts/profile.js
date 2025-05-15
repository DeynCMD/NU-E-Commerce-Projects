document.addEventListener("DOMContentLoaded", function () {
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
            .then(response => response.text())
            .then(data => {
                console.log(data);
                input.setAttribute("readonly", true);
                editBtn.style.display = "inline";
                saveBtn.style.display = "none";
            })
            .catch(error => console.error("Error:", error));
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

    document.getElementById("profileBtn").addEventListener("click", function() {
        window.location.href = "profile.php";
    });
});
