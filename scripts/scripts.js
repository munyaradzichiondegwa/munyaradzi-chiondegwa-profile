document.addEventListener('DOMContentLoaded', function() {

    // --- Hamburger Menu Logic ---
    const hamburger = document.querySelector('.hamburger-menu');
    const navMenu = document.getElementById('main-nav');
    const navLinks = navMenu.querySelectorAll('a');

    // Toggle menu on hamburger click
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('is-active');
        navMenu.classList.toggle('nav-active');
        
        // Update ARIA attribute for accessibility
        const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
        hamburger.setAttribute('aria-expanded', !isExpanded);
    });

    // Close menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('nav-active')) {
                hamburger.classList.remove('is-active');
                navMenu.classList.remove('nav-active');
                hamburger.setAttribute('aria-expanded', 'false');
            }
        });
    });

    // --- Hero Section Slideshow ---
    const slideshowText = [
        "Full-Stack Developer",
        "Accounting & Taxation Services",
        "Consulting & Advisory",
        "Bridging Gaps with Technology"
    ];
    
    let currentSlide = 0;
    const slideElement = document.querySelector('.hero-title-slide');

    function updateSlide() {
        slideElement.textContent = slideshowText[currentSlide];
        currentSlide = (currentSlide + 1) % slideshowText.length;
    }

    updateSlide();
    setInterval(updateSlide, 5000); // Change slide every 5 seconds

    // --- Footer Date and Time ---
    const dateTimeElement = document.getElementById('datetime');

    function updateTime() {
        const now = new Date();
        const options = { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        };
        dateTimeElement.textContent = now.toLocaleString(undefined, options);
    }

    updateTime();
    setInterval(updateTime, 1000); // Update time every second

});