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

    // Handle Add to Cart button clicks with event delegation
    container.addEventListener("click", function (event) {
        const button = event.target.closest(".add-cart-btn");
        if (!button) return;

        const uniformCard = button.closest(".uniform-card");
        if (!uniformCard) return;

        const itemNameRaw = uniformCard.querySelector("h3")?.textContent || "";
        const itemPrice = uniformCard.querySelector(".uniform-price")?.textContent || "";
        const itemImage = uniformCard.querySelector(".uniform-image")?.src || "";
        const selectedSizeRaw = uniformCard.querySelector(".size-btn.selected")?.textContent;

        if (!selectedSizeRaw) {
            alert("Please select a size first!");
            return;
        }

        // Animate button feedback
        button.classList.add("added");
        button.style.backgroundColor = "#4CAF50";
        button.innerHTML = '<span class="btn-text">Added!</span> ✓';

        setTimeout(() => {
            button.classList.remove("added");
            button.innerHTML = '<span class="btn-text">Add to Cart</span><span class="btn-icon">🛒</span>';
            button.style.backgroundColor = "";
        }, 2000);

        // Normalize strings for comparison (trim & lowercase)
        const itemName = itemNameRaw.trim().toLowerCase();
        const selectedSize = selectedSizeRaw.trim().toLowerCase();

        // Load existing cart or create new
        let cartItems = JSON.parse(localStorage.getItem("cart")) || [];

        // Find existing item with same name and size (case insensitive)
        const existingItem = cartItems.find(item =>
            item.name.trim().toLowerCase() === itemName &&
            item.size.trim().toLowerCase() === selectedSize
        );

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cartItems.push({
                name: itemNameRaw.trim(), // keep original casing for display
                price: itemPrice.trim(),
                image: itemImage,
                size: selectedSizeRaw.trim(), // original casing for display
                quantity: 1
            });
        }

        // Save updated cart back to localStorage
        localStorage.setItem("cart", JSON.stringify(cartItems));

        // Update cart count immediately on page
        updateCartCount();

        // Fire a custom event to let other parts of the app know cart changed
        window.dispatchEvent(new Event("cart-updated"));

        // Optional alert for user feedback
        alert("Item added to cart!");
    });

    // Initial cart count update on page load
    updateCartCount();
});

// Function to update the cart item count badge
function updateCartCount() {
    let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    let totalCount = cartItems.reduce((count, item) => count + item.quantity, 0);
    const cartCountElement = document.querySelector(".cart-count");
    if (cartCountElement) {
        cartCountElement.textContent = totalCount;
    }
}

// Optional: If you want your cart page or other scripts to update live, add a listener like this somewhere:
// window.addEventListener("cart-updated", () => {
//     updateCartCount();
//     // and/or reload cart items display
// });
