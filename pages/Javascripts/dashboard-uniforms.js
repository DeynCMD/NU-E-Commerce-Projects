// dashboard-uniforms.js

document.addEventListener('DOMContentLoaded', function() {
    // Size selector functionality
    const sizeBtns = document.querySelectorAll('.size-btn');
    
    sizeBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove selected class from all buttons in this size selector
            const parentSelector = this.closest('.size-selector');
            parentSelector.querySelectorAll('.size-btn').forEach(b => {
                b.classList.remove('selected');
            });
            
            // Add selected class to clicked button
            this.classList.add('selected');
        });
    });

    // Add to cart animation
    const addCartBtns = document.querySelectorAll('.add-cart-btn');
    
    addCartBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Check if size is selected
            const sizeSelector = this.closest('.uniform-overlay').querySelector('.size-selector');
            const selectedSize = sizeSelector.querySelector('.size-btn.selected');
            
            if (!selectedSize) {
                alert('Please select a size first!');
                return;
            }
            
            // Add success animation
            this.classList.add('added');
            this.style.backgroundColor = '#4CAF50';
            this.innerHTML = '<span class="btn-text">Added!</span> ✓';
            
            setTimeout(() => {
                this.classList.remove('added');
                this.innerHTML = '<span class="btn-text">Add to Cart</span><span class="btn-icon">🛒</span>';
            }, 2000);
            
            // Here you would typically add the item to cart functionality
        });
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const addToCartButtons = document.querySelectorAll(".add-cart-btn");

    addToCartButtons.forEach(button => {
        button.addEventListener("click", function () {
            const uniformCard = this.closest(".uniform-card");
            const itemName = uniformCard.querySelector("h3").textContent;
            const itemPrice = uniformCard.querySelector(".uniform-price").textContent;
            const itemImage = uniformCard.querySelector(".uniform-image").src;
            const selectedSize = uniformCard.querySelector(".size-btn.active")?.textContent || "M"; // Default size M

            let cartItems = JSON.parse(localStorage.getItem("cart")) || [];

            const existingItem = cartItems.find(item => item.name === itemName && item.size === selectedSize);

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

            localStorage.setItem("cart", JSON.stringify(cartItems));

            alert("Item added to cart!");

            // ✅ **Manually trigger the storage event for instant updates**
            window.dispatchEvent(new Event("storage"));
        });
    });

    // Handle size selection
    document.querySelectorAll(".size-btn").forEach(button => {
        button.addEventListener("click", function () {
            this.parentElement.querySelectorAll(".size-btn").forEach(btn => btn.classList.remove("active"));
            this.classList.add("active");
        });
    });
});
