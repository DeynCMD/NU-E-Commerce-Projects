// dashboard-products.js

document.addEventListener('DOMContentLoaded', function() {
    const track = document.querySelector('.carousel-track');
    const slides = Array.from(track.children);
    const nextButton = document.querySelector('.carousel-nav.next');
    const prevButton = document.querySelector('.carousel-nav.prev');
    const progressBar = document.querySelector('.progress-bar');
    
    let currentIndex = 0;
    
    // Function to get the number of slides to show based on viewport width
    function getSlidesPerView() {
        if (window.innerWidth >= 1200) return 3;
        if (window.innerWidth >= 768) return 2;
        return 1;
    }
    
    // Function to update the carousel position
    function updateCarousel() {
        const slideWidth = slides[0].getBoundingClientRect().width;
        const gap = 32; // gap between slides
        const offset = currentIndex * -(slideWidth + gap);
        track.style.transform = `translateX(${offset}px)`;
        
        // Update progress bar
        const slidesPerView = getSlidesPerView();
        const maxIndex = slides.length - slidesPerView;
        const progress = (currentIndex / maxIndex) * 100;
        progressBar.style.transform = `translateX(${progress}%)`;
    }
    
    // Next button click handler
    nextButton.addEventListener('click', () => {
        const slidesPerView = getSlidesPerView();
        const maxIndex = slides.length - slidesPerView;
        
        if (currentIndex >= maxIndex) {
            currentIndex = 0; // Loop back to start
        } else {
            currentIndex++;
        }
        
        updateCarousel();
    });
    
    // Previous button click handler
    prevButton.addEventListener('click', () => {
        const slidesPerView = getSlidesPerView();
        const maxIndex = slides.length - slidesPerView;
        
        if (currentIndex <= 0) {
            currentIndex = maxIndex; // Loop to end
        } else {
            currentIndex--;
        }
        
        updateCarousel();
    });
    
    // Auto-play functionality
    let autoPlayInterval = setInterval(() => {
        nextButton.click();
    }, 5000);
    
    // Pause auto-play on hover
    track.addEventListener('mouseenter', () => {
        clearInterval(autoPlayInterval);
    });
    
    track.addEventListener('mouseleave', () => {
        autoPlayInterval = setInterval(() => {
            nextButton.click();
        }, 5000);
    });
    
    // Handle window resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            updateCarousel();
        }, 100);
    });
    
    // Initialize carousel
    updateCarousel();
});