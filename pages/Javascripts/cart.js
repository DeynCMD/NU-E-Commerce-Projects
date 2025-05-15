document.addEventListener("DOMContentLoaded", function () {
    loadCartItems();

    
    window.addEventListener("storage", function (event) {
        if (event.key === "cart") {
            loadCartItems();
        }
    });

    
    document.querySelector(".cart-items").addEventListener("click", function (event) {
        if (event.target.classList.contains("plus-btn")) {
            updateQuantity(event.target.dataset.index, 1, event.target);
        } else if (event.target.classList.contains("minus-btn")) {
            updateQuantity(event.target.dataset.index, -1, event.target);
        } else if (event.target.classList.contains("remove-btn")) {
            removeFromCart(event.target.dataset.index);
        }
    });
});

function loadCartItems() {
    const cartContainer = document.querySelector(".cart-items");
    const cartSummary = document.querySelector(".cart-summary");
    const emptyCartMessage = document.querySelector(".empty-cart");

    let cartItems = JSON.parse(localStorage.getItem("cart")) || [];

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
        emptyCartMessage.style.display = "block";
        cartSummary.style.display = "none";
        return;
    } else {
        emptyCartMessage.style.display = "none";
        cartSummary.style.display = "block";
    }

    let totalPrice = 0;

    cartItems.forEach((item, index) => {
        const priceValue = parseFloat(item.price.replace("₱", "").replace(",", ""));
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

    document.querySelector(".summary-row.total-row span:last-child").textContent = `₱${totalPrice.toFixed(2)}`;
}

function updateQuantity(index, change, button) {
    let cartItems = JSON.parse(localStorage.getItem("cart")) || [];

    if (cartItems[index]) {
        cartItems[index].quantity += change;
        if (cartItems[index].quantity < 1) cartItems[index].quantity = 1;

        
        localStorage.setItem("cart", JSON.stringify(cartItems));

        
        const cartItem = button.closest(".cart-item");
        const quantityInput = cartItem.querySelector(".quantity-input");
        const subtotalElement = cartItem.querySelector(".item-subtotal");

        const priceValue = parseFloat(cartItems[index].price.replace("₱", "").replace(",", ""));
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


    document.querySelector(`.cart-item[data-index="${index}"]`).remove();


    updateTotalPrice();


    if (cartItems.length === 0) {
        loadCartItems();
    }
}

function updateTotalPrice() {
    let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    let totalPrice = cartItems.reduce((total, item) => {
        let priceValue = parseFloat(item.price.replace("₱", "").replace(",", ""));
        return total + priceValue * item.quantity;
    }, 0);

    document.querySelector(".summary-row.total-row span:last-child").textContent = `₱${totalPrice.toFixed(2)}`;
}
