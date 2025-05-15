document.addEventListener('DOMContentLoaded', function() {
    const track = document.querySelector('.accessories-carousel .carousel-track');
    const nextButton = document.querySelector('.accessories-carousel .next');
    const prevButton = document.querySelector('.accessories-carousel .prev');
    const cards = track.querySelectorAll('.accessory-card');
    let currentIndex = 0;
    let isTransitioning = false;

    function getItemsPerView() {
        if (window.innerWidth >= 1200) return 3;
        if (window.innerWidth >= 768) return 2;
        return 1;
    }

    function updateCarousel() {
        if (isTransitioning) return;
        isTransitioning = true;

        const itemWidth = cards[0].offsetWidth;
        const gap = 45;
        const offset = currentIndex * -(itemWidth + gap);
        
        track.style.transform = `translateX(${offset}px)`;
        
        // Enable/disable buttons based on position
        const maxIndex = cards.length - getItemsPerView();
        prevButton.disabled = currentIndex <= 0;
        nextButton.disabled = currentIndex >= maxIndex;

        setTimeout(() => {
            isTransitioning = false;
        }, 500); // Match transition duration
    }

    function handleNext() {
        if (isTransitioning) return;
        const maxIndex = cards.length - getItemsPerView();
        currentIndex = currentIndex >= maxIndex ? 0 : currentIndex + 1;
        updateCarousel();
    }

    function handlePrev() {
        if (isTransitioning) return;
        const maxIndex = cards.length - getItemsPerView();
        currentIndex = currentIndex <= 0 ? maxIndex : currentIndex - 1;
        updateCarousel();
    }

    nextButton.addEventListener('click', handleNext);
    prevButton.addEventListener('click', handlePrev);

    // Add keyboard navigation
    track.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') handlePrev();
        if (e.key === 'ArrowRight') handleNext();
    });

    // Add to cart functionality
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const originalText = this.textContent;
            const originalPadding = this.style.padding;
            
            // Disable button during animation
            this.disabled = true;
            
            // Add success animation
            this.textContent = 'Added! ✓';
            this.style.backgroundColor = '#4CAF50';
            this.style.padding = '18px 36px';
            
            setTimeout(() => {
                this.textContent = originalText;
                this.style.backgroundColor = '';
                this.style.padding = originalPadding;
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
            updateCarousel();
        }, 100);
    });

    // Initialize carousel
    updateCarousel();
});