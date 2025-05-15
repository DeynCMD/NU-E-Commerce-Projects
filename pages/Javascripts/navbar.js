// Final fixed JavaScript for navbar functionality to prevent random closing
document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const searchToggle = document.getElementById('searchToggle');
    const searchBar = document.getElementById('searchBar');
    const searchInput = searchBar.querySelector('input');
    
    const profileBtn = document.getElementById('profileBtn');
    const profileMenu = document.getElementById('profileMenu');
    
    // Track if the user is actively interacting with dropdowns
    let isSearchActive = false;
    let isProfileActive = false;
    
    // Toggle search bar
    searchToggle.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        // Toggle search state
        isSearchActive = !isSearchActive;
        
        if (isSearchActive) {
            searchBar.classList.add('active');
            profileMenu.classList.remove('active');
            isProfileActive = false;
            
            // Focus input after animation starts
            setTimeout(() => {
                searchInput.focus();
            }, 100);
        } else {
            searchBar.classList.remove('active');
        }
    });
    
    // Prevent search form clicks from bubbling
    searchBar.addEventListener('mousedown', function(e) {
        e.stopPropagation();
    });
    
    // Keep search active when typing or interacting with the form
    searchInput.addEventListener('focus', function() {
        isSearchActive = true;
    });
    
    // Toggle profile menu
    profileBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        // Toggle profile state
        isProfileActive = !isProfileActive;
        
        if (isProfileActive) {
            profileMenu.classList.add('active');
            searchBar.classList.remove('active');
            isSearchActive = false;
        } else {
            profileMenu.classList.remove('active');
        }
    });
    
    // Prevent profile menu clicks from bubbling
    profileMenu.addEventListener('mousedown', function(e) {
        e.stopPropagation();
    });
    
    // Close dropdowns only when explicitly clicking outside
    document.addEventListener('mousedown', function(e) {
        // Only close if click was outside both dropdown elements AND their toggle buttons
        const isClickInsideSearch = searchBar.contains(e.target) || searchToggle.contains(e.target);
        const isClickInsideProfile = profileMenu.contains(e.target) || profileBtn.contains(e.target);
        
        if (!isClickInsideSearch && isSearchActive) {
            searchBar.classList.remove('active');
            isSearchActive = false;
        }
        
        if (!isClickInsideProfile && isProfileActive) {
            profileMenu.classList.remove('active');
            isProfileActive = false;
        }
    });
    
    // Handle escape key to close dropdowns
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            searchBar.classList.remove('active');
            profileMenu.classList.remove('active');
            isSearchActive = false;
            isProfileActive = false;
        }
    });
    
    // Prevent form submission (optional - remove if you want the form to work normally)
    const searchForm = searchBar.querySelector('form');
    searchForm.addEventListener('submit', function(e) {
        e.preventDefault();
        // Add your search functionality here
        console.log('Search for:', searchInput.value);
    });
});