document.addEventListener("DOMContentLoaded", function () {
    const container = document.querySelector("body"); // Or a more specific container wrapping your product cards

    // Handle size button selection with event delegation
    container.addEventListener("click", function (event) {
        const sizeBtn = event.target.closest(".size-btn");
        if (sizeBtn) {
            const parent = sizeBtn.closest(".size-selector");
            if (!parent) return;
            parent.querySelectorAll(".size-btn").forEach(btn => btn.classList.remove("selected"));
            sizeBtn.classList.add("selected");
        }
    });
});
