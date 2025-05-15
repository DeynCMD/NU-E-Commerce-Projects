document.addEventListener('DOMContentLoaded', function() {
    const track = document.querySelector('.bags-track');
    const cards = track.querySelectorAll('.bag-card');
    const nextButton = document.querySelector('.bags-carousel .next');
    const prevButton = document.querySelector('.bags-carousel .prev');
    const dots = document.querySelectorAll('.carousel-dots .dot');
    
    let currentIndex = 0;
    let isTransitioning = false;

    function getItemsPerView() {
        if (window.innerWidth >= 1200) return 3;
        if (window.innerWidth >= 768) return 2;
        return 1;
    }

    function updateCarousel(index) {
        if (isTransitioning) return;
        isTransitioning = true;

        currentIndex = index;
        const itemWidth = cards[0].offsetWidth;
        const gap = 45;
        const offset = currentIndex * -(itemWidth + gap);
        
        // Update transform
        track.style.transform = `translateX(${offset}px)`;
        
        // Update dots
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentIndex);
            dot.setAttribute('aria-selected', i === currentIndex);
        });

        // Update button states
        const maxIndex = cards.length - getItemsPerView();
        prevButton.disabled = currentIndex <= 0;
        nextButton.disabled = currentIndex >= maxIndex;

        setTimeout(() => {
            isTransitioning = false;
        }, 500);
    }

    // Navigation buttons
    nextButton.addEventListener('click', () => {
        const maxIndex = cards.length - getItemsPerView();
        if (currentIndex < maxIndex) {
            updateCarousel(currentIndex + 1);
        }
    });

    prevButton.addEventListener('click', () => {
        if (currentIndex > 0) {
            updateCarousel(currentIndex - 1);
        }
    });

    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            updateCarousel(index);
        });
    });

    // Quick view functionality
    const quickViewButtons = document.querySelectorAll('.quick-view-btn');
    quickViewButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const card = this.closest('.bag-card');
            const productName = card.querySelector('h3').textContent;
            // Add your quick view modal logic here
            console.log(`Quick view for ${productName}`);
        });
    });

    // Add to cart functionality
    const addToCartButtons = document.querySelectorAll('.bag-card .add-to-cart-btn');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const originalText = this.textContent;
            
            // Disable button during animation
            this.disabled = true;
            
            // Add success animation
            this.textContent = 'Added! ✓';
            this.style.backgroundColor = '#4CAF50';
            
            setTimeout(() => {
                this.textContent = originalText;
                this.style.backgroundColor = '';
                this.disabled = false;
            }, 2000);
        });
    });

    // Handle window resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            currentIndex = 0;
            updateCarousel(0);
        }, 100);
    });

    // Touch support
    let touchStartX = 0;
    let touchEndX = 0;

    track.addEventListener('touchstart', e => {
        touchStartX = e.touches[0].clientX;
    });

    track.addEventListener('touchmove', e => {
        touchEndX = e.touches[0].clientX;
        
        // Prevent default scrolling while swiping
        e.preventDefault();
        
        // Calculate the distance moved
        const diffX = touchStartX - touchEndX;
        const itemWidth = cards[0].offsetWidth;
        const gap = 45;
        
        // Apply a temporary transform during the swipe
        const currentOffset = currentIndex * -(itemWidth + gap);
        const newOffset = currentOffset - diffX;
        track.style.transform = `translateX(${newOffset}px)`;
    });

    track.addEventListener('touchend', e => {
        const diffX = touchStartX - touchEndX;
        const threshold = 50; // Minimum distance to trigger slide
        const maxIndex = cards.length - getItemsPerView();

        if (Math.abs(diffX) > threshold) {
            if (diffX > 0 && currentIndex < maxIndex) {
                // Swiped left - go to next
                updateCarousel(currentIndex + 1);
            } else if (diffX < 0 && currentIndex > 0) {
                // Swiped right - go to previous
                updateCarousel(currentIndex - 1);
            } else {
                // Reset to current position if at the ends
                updateCarousel(currentIndex);
            }
        } else {
            // If the swipe wasn't far enough, reset position
            updateCarousel(currentIndex);
        }

        // Reset touch coordinates
        touchStartX = 0;
        touchEndX = 0;
    });

    // Initialize carousel
    updateCarousel(0);
});