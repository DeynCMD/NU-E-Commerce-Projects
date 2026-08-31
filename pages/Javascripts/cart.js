document.addEventListener("DOMContentLoaded", function () {
    loadCartItems();
    updateCartCount();

    // Listen for cross-tab localStorage changes
    window.addEventListener("storage", function (event) {
        if (event.key === "cart") {
            loadCartItems();
            updateCartCount();
        }
    });

    // Listen for custom cart-update event
    window.addEventListener("cart-updated", function () {
        loadCartItems();
        updateCartCount();
    });

    const cartItemsContainer = document.querySelector(".cart-items");
    if (cartItemsContainer) {
        cartItemsContainer.addEventListener("click", function (event) {
            if (event.target.classList.contains("plus-btn")) {
                event.preventDefault();
                updateQuantity(event.target.dataset.index, 1, event.target);
            } else if (event.target.classList.contains("minus-btn")) {
                event.preventDefault();
                updateQuantity(event.target.dataset.index, -1, event.target);
            } else if (event.target.classList.contains("remove-btn")) {
                event.preventDefault();
                removeFromCart(event.target.dataset.index);
            }
        });
    }

    // Global Add to Cart handler using event delegation
    document.addEventListener("click", function (event) {
        const button = event.target.closest(".add-cart-btn, .add-to-cart-btn");
        if (!button) return;
        event.preventDefault();

        let itemName, itemPrice, itemImage, selectedSize = null;
        let card = null;

        // 1. Check for Uniform Card
        card = button.closest(".uniform-card");
        if (card) {
            itemName = card.querySelector("h3")?.textContent?.trim();
            itemPrice = card.querySelector(".uniform-price")?.textContent?.trim();
            itemImage = card.querySelector(".uniform-image")?.src;
            selectedSize = card.querySelector(".size-btn.selected")?.textContent?.trim();

            if (!selectedSize) {
                alert("Please select a size first!");
                return;
            }
        }
        // 2. Check for Bag Card
        else if (card = button.closest(".bag-card")) {
            itemName = card.querySelector("h3")?.textContent?.trim();
            itemPrice = card.querySelector(".price")?.textContent?.trim();
            itemImage = card.querySelector(".bag-image img")?.src;
        }
        // 3. Check for Accessory Card
        else if (card = button.closest(".accessory-card")) {
            itemName = card.querySelector("h3")?.textContent?.trim();
            itemPrice = card.querySelector(".price")?.textContent?.trim();
            itemImage = card.querySelector(".accessory-image img")?.src;
        }
        // 4. Fallback for other product pages (like product.html)
        else {
            // Try to find common patterns
            const productContainer = button.closest(".product-info, .product-details, .product-container");
            if (productContainer) {
                itemName = productContainer.querySelector(".product-title, h1, h2, h3")?.textContent?.trim();
                itemPrice = productContainer.querySelector(".product-price, .price")?.textContent?.trim();
                itemImage = productContainer.querySelector(".product-image img, .product-image")?.src ||
                             productContainer.querySelector("img")?.src;
            }
        }

        if (!itemName || !itemPrice) {
            console.error("Could not extract product details for:", button);
            return;
        }

        // Load existing cart
        let cartItems = JSON.parse(localStorage.getItem("cart")) || [];

        // Find existing item by name and size (case-insensitive)
        const existingItem = cartItems.find(item =>
            item.name.toLowerCase() === itemName.toLowerCase() &&
            (selectedSize === null || item.size === null || item.size.toLowerCase() === selectedSize.toLowerCase())
        );

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cartItems.push({
                name: itemName,
                price: itemPrice,
                image: itemImage,
                size: selectedSize,
                quantity: 1
            });
        }

        // Save to storage
        localStorage.setItem("cart", JSON.stringify(cartItems));

        // Feedback animation
        const originalHTML = button.innerHTML;
        button.innerHTML = '<span class="btn-text">Added!</span> ✓';
        button.style.backgroundColor = "#4CAF50";
        setTimeout(() => {
            button.innerHTML = originalHTML;
            button.style.backgroundColor = "";
        }, 2000);

        // Update UI immediately
        updateCartCount();
        window.dispatchEvent(new Event("cart-updated"));
    });
});

function loadCartItems() {
    const cartContainer = document.querySelector(".cart-items");
    const emptyCartMessage = document.querySelector(".empty-cart");

    let cartItems = JSON.parse(localStorage.getItem("cart")) || [];

    if (!cartContainer) return;

    cartContainer.innerHTML = `
        <div class="cart-header">
            <div class="header-product">Product</div>
            <div class="header-price">Price</div>
            <div class="header-quantity">Quantity</div>
            <div class="header-subtotal">Subtotal</div>
            <div class="header-actions">Actions</div>
        </div>
    `;

    if (cartItems.length === 0) {
        if (emptyCartMessage) emptyCartMessage.style.display = "block";
        updateTotalPrice(0);
        return;
    } else {
        if (emptyCartMessage) emptyCartMessage.style.display = "none";
    }

    let totalPrice = 0;

    cartItems.forEach((item, index) => {
        const priceValue = parseFloat(item.price.replace("₱", "").replace(/,/g, ""));
        const subtotal = priceValue * item.quantity;
        totalPrice += subtotal;

        cartContainer.innerHTML += `
            <div class="cart-item" data-index="${index}">
                <div class="item-product">
                    <img src="${item.image}" alt="${item.name}" class="item-image">
                    <div class="item-details">
                        <h3 class="item-name">${item.name}</h3>
                        <p class="item-variant">${item.size ? "Size: " + item.size : ""}</p>
                    </div>
                </div>
                <div class="item-price">₱${priceValue.toFixed(2)}</div>
                <div class="item-quantity">
                    <button class="quantity-btn minus-btn" data-index="${index}">-</button>
                    <input type="number" min="1" value="${item.quantity}" class="quantity-input" readonly>
                    <button class="quantity-btn plus-btn" data-index="${index}">+</button>
                </div>
                <div class="item-subtotal">₱${subtotal.toFixed(2)}</div>
                <div class="item-actions">
                    <button class="remove-btn" data-index="${index}">Remove</button>
                </div>
            </div>
        `;
    });

    updateTotalPrice(totalPrice);
}

function updateQuantity(index, change, button) {
    let cartItems = JSON.parse(localStorage.getItem("cart")) || [];

    if (cartItems[index]) {
        cartItems[index].quantity += change;
        if (cartItems[index].quantity < 1) cartItems[index].quantity = 1;

        localStorage.setItem("cart", JSON.stringify(cartItems));

        updateCartCount();
        window.dispatchEvent(new Event("cart-updated"));

        const cartItem = button.closest(".cart-item");
        const quantityInput = cartItem.querySelector(".quantity-input");
        const subtotalElement = cartItem.querySelector(".item-subtotal");

        const priceValue = parseFloat(cartItems[index].price.replace("₱", "").replace(/,/g, ""));
        const newSubtotal = priceValue * cartItems[index].quantity;

        quantityInput.value = cartItems[index].quantity;
        subtotalElement.textContent = `₱${newSubtotal.toFixed(2)}`;

        updateTotalPrice();
    }
}

function removeFromCart(index) {
    let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    cartItems.splice(index, 1);

    localStorage.setItem("cart", JSON.stringify(cartItems));

    updateCartCount();
    window.dispatchEvent(new Event("cart-updated"));

    loadCartItems();
    updateTotalPrice();
}

function updateTotalPrice(total = null) {
    let totalPrice;
    if (total !== null) {
        totalPrice = total;
    } else {
        let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
        totalPrice = cartItems.reduce((total, item) => {
            let priceValue = parseFloat(item.price.replace("₱", "").replace(/,/g, ""));
            return total + priceValue * item.quantity;
        }, 0);
    }

    const summaryRows = document.querySelectorAll(".cart-summary .summary-row span:last-child");
    if (summaryRows.length >= 3) {
        summaryRows[0].textContent = `₱${totalPrice.toFixed(2)}`;  // subtotal
        summaryRows[2].textContent = `₱${totalPrice.toFixed(2)}`;  // total
    }
}

function updateCartCount() {
    let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    let totalCount = cartItems.reduce((count, item) => count + item.quantity, 0);
    const cartCountElement = document.querySelector(".cart-count");
    if (cartCountElement) {
        cartCountElement.textContent = totalCount;
    }
}
