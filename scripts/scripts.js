document.addEventListener('DOMContentLoaded', function() {
    // Hamburger Menu Toggle
    const hamburger = document.querySelector('.hamburger-menu');
    const nav = document.querySelector('#main-nav');
    if (hamburger && nav) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            nav.classList.toggle('active');
            const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
            hamburger.setAttribute('aria-expanded', !isExpanded);
        });
    }

    // Close menu when a link is clicked
    document.querySelectorAll('#main-nav a').forEach(link => {
        link.addEventListener('click', () => {
            if (hamburger && nav) {
                hamburger.classList.remove('active');
                nav.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
            }
        });
    });

    // Hero Section Title Slideshow
    const titles = [
        "Full-Stack Developer",
        "Accounting Professional",
        "MBA Graduate",
        "Technology Enthusiast"
    ];
    let currentTitleIndex = 0;
    const titleElement = document.querySelector('.hero-title-slide');
    
    function updateTitle() {
        if (titleElement) {
            titleElement.textContent = titles[currentTitleIndex];
            currentTitleIndex = (currentTitleIndex + 1) % titles.length;
        }
    }
    
    if (titleElement) {
        setInterval(updateTitle, 3000); // Change title every 3 seconds
        updateTitle(); // Initial call
    }

    // Footer Date & Time
    const datetimeElement = document.getElementById('datetime');
    function updateTime() {
        if (datetimeElement) {
            const now = new Date();
            datetimeElement.textContent = `Last updated: ${now.toLocaleDateString()} ${now.toLocaleTimeString()}`;
        }
    }
    if (datetimeElement) {
        updateTime(); // Set initial time
    }
    
    // --- ADVANCED CONTACT FORM LOGIC ---
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');
    
    if (contactForm) {
        // Helper function to show error message
        const showError = (input, message) => {
            const formGroup = input.parentElement;
            const errorDiv = formGroup.querySelector('.error-message');
            input.classList.add('invalid');
            errorDiv.textContent = message;
        };

        // Helper function to clear error message
        const clearError = (input) => {
            const formGroup = input.parentElement;
            const errorDiv = formGroup.querySelector('.error-message');
            input.classList.remove('invalid');
            errorDiv.textContent = '';
        };

        // Real-time validation
        contactForm.querySelectorAll('input, textarea').forEach(input => {
            input.addEventListener('input', () => clearError(input));
        });

        const validateForm = () => {
            let isValid = true;
            const fullName = contactForm.querySelector('#fullName');
            const email = contactForm.querySelector('#email');
            const message = contactForm.querySelector('#message');
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (fullName.value.trim() === '') {
                showError(fullName, 'Full name is required.');
                isValid = false;
            } else {
                clearError(fullName);
            }

            if (email.value.trim() === '') {
                showError(email, 'Email is required.');
                isValid = false;
            } else if (!emailRegex.test(email.value.trim())) {
                showError(email, 'Please enter a valid email address.');
                isValid = false;
            } else {
                clearError(email);
            }

            if (message.value.trim() === '') {
                showError(message, 'Message cannot be empty.');
                isValid = false;
            } else {
                clearError(message);
            }

            return isValid;
        };

        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            if (!validateForm()) {
                formStatus.textContent = 'Please correct the errors above.';
                formStatus.style.color = 'var(--error-color)';
                return;
            }

            const formData = new FormData(contactForm);
            formStatus.textContent = 'Sending...';
            formStatus.style.color = 'var(--text-color)';

            try {
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    formStatus.textContent = 'Thank you for your message! I will get back to you soon.';
                    formStatus.style.color = 'green';
                    contactForm.reset();
                } else {
                    const data = await response.json();
                    if (Object.hasOwn(data, 'errors')) {
                        // Handle specific Formspree errors if any
                        const errorMsg = data["errors"].map(error => error["message"]).join(", ");
                        throw new Error(errorMsg);
                    } else {
                        throw new Error('Oops! There was a problem submitting your form.');
                    }
                }
            } catch (error) {
                formStatus.textContent = error.message || 'An error occurred. Please try again later.';
                formStatus.style.color = 'var(--error-color)';
            }
        });
    }
});

