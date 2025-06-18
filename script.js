// Combined School Website JavaScript

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
});

// Initialize all website functionality
function initializeWebsite() {
    initMobileMenu();
    initSmoothScrolling();
    initFormHandling();
    initAnimations();
    initCityStateDropdown();
    initScrollEffects();
}

// Mobile Menu Functionality
function initMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            mobileToggle.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });
        
        // Close menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                mobileToggle.classList.remove('active');
                document.body.classList.remove('menu-open');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
                navMenu.classList.remove('active');
                mobileToggle.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        });
    }
}

// Smooth Scrolling for Navigation Links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Form Handling
function initFormHandling() {
    initAdmissionForm();
    initContactForm();
}

// Admission Form
function initAdmissionForm() {
    const admissionForm = document.getElementById('admissionForm');
    
    if (admissionForm) {
        admissionForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateAdmissionForm()) {
                submitAdmissionForm();
            }
        });
    }
}

// Contact Form
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateContactForm()) {
                submitContactForm();
            }
        });
    }
}

// Validate Admission Form
function validateAdmissionForm() {
    const form = document.getElementById('admissionForm');
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            showFieldError(field, 'This field is required');
            isValid = false;
        } else {
            clearFieldError(field);
        }
    });
    
    // Email validation
    const email = form.querySelector('[name="email"]');
    if (email && email.value && !isValidEmail(email.value)) {
        showFieldError(email, 'Please enter a valid email address');
        isValid = false;
    }
    
    // Phone validation
    const phone = form.querySelector('[name="phone"]');
    if (phone && phone.value && !isValidPhone(phone.value)) {
        showFieldError(phone, 'Please enter a valid phone number');
        isValid = false;
    }
    
    return isValid;
}

// Validate Contact Form
function validateContactForm() {
    const form = document.getElementById('contactForm');
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            showFieldError(field, 'This field is required');
            isValid = false;
        } else {
            clearFieldError(field);
        }
    });
    
    // Email validation
    const email = form.querySelector('[name="email"]');
    if (email && email.value && !isValidEmail(email.value)) {
        showFieldError(email, 'Please enter a valid email address');
        isValid = false;
    }
    
    return isValid;
}

// Submit Admission Form
function submitAdmissionForm() {
    const form = document.getElementById('admissionForm');
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    // Show loading state
    submitBtn.innerHTML = '<span class="loading"></span> Submitting...';
    submitBtn.disabled = true;
    
    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        // Show success message
        showSuccessMessage(form, 'Thank you! Your admission application has been submitted successfully. We will contact you soon.');
        
        // Reset form
        form.reset();
    }, 2000);
}

// Submit Contact Form
function submitContactForm() {
    const form = document.getElementById('contactForm');
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    // Show loading state
    submitBtn.innerHTML = '<span class="loading"></span> Sending...';
    submitBtn.disabled = true;
    
    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        // Show success message
        showSuccessMessage(form, 'Thank you! Your message has been sent successfully. We will get back to you soon.');
        
        // Reset form
        form.reset();
    }, 2000);
}

// City-State Dropdown Functionality
function initCityStateDropdown() {
    const stateSelect = document.getElementById('state');
    const citySelect = document.getElementById('city');
    
    const cityData = {
        'delhi': ['New Delhi', 'Dwarka', 'Rohini', 'Janakpuri', 'Lajpat Nagar'],
        'maharashtra': ['Mumbai', 'Pune', 'Nagpur', 'Nashik', 'Aurangabad'],
        'karnataka': ['Bangalore', 'Mysore', 'Hubli', 'Mangalore', 'Belgaum'],
        'gujarat': ['Ahmedabad', 'Surat', 'Vadodara', 'Rajkot', 'Bhavnagar'],
        'rajasthan': ['Jaipur', 'Jodhpur', 'Udaipur', 'Kota', 'Ajmer'],
        'uttar-pradesh': ['Lucknow', 'Kanpur', 'Ghaziabad', 'Agra', 'Varanasi'],
        'west-bengal': ['Kolkata', 'Howrah', 'Durgapur', 'Asansol', 'Siliguri'],
        'tamil-nadu': ['Chennai', 'Coimbatore', 'Madurai', 'Tiruchirappalli', 'Salem'],
        'telangana': ['Hyderabad', 'Warangal', 'Nizamabad', 'Karimnagar', 'Khammam'],
        'punjab': ['Chandigarh', 'Ludhiana', 'Amritsar', 'Jalandhar', 'Patiala']
    };
    
    if (stateSelect && citySelect) {
        stateSelect.addEventListener('change', function() {
            const selectedState = this.value;
            
            // Clear city options
            citySelect.innerHTML = '<option value="">Select City</option>';
            
            if (selectedState && cityData[selectedState]) {
                cityData[selectedState].forEach(city => {
                    const option = document.createElement('option');
                    option.value = city.toLowerCase().replace(/\s+/g, '-');
                    option.textContent = city;
                    citySelect.appendChild(option);
                });
            }
        });
    }
}

// Scroll Effects
function initScrollEffects() {
    window.addEventListener('scroll', function() {
        handleHeaderScroll();
        handleScrollAnimations();
    });
}

// Header Scroll Effect
function handleHeaderScroll() {
    const header = document.querySelector('.header');
    const scrollTop = window.pageYOffset;
    
    if (scrollTop > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}

// Scroll Animations
function handleScrollAnimations() {
    const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
    
    animatedElements.forEach(element => {
        if (isElementInViewport(element)) {
            element.classList.add('visible');
        }
    });
}

// Initialize Animations
function initAnimations() {
    // Add animation classes to elements
    const sections = document.querySelectorAll('section');
    sections.forEach((section, index) => {
        const elements = section.querySelectorAll('h2, h3, p, .card, .program-card, .step');
        elements.forEach((element, elementIndex) => {
            if (index % 2 === 0) {
                element.classList.add('fade-in');
            } else {
                element.classList.add(elementIndex % 2 === 0 ? 'slide-in-left' : 'slide-in-right');
            }
        });
    });
    
    // Trigger initial animation check
    handleScrollAnimations();
}

// Utility Functions
function isElementInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
}

function showFieldError(field, message) {
    clearFieldError(field);
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.textContent = message;
    errorDiv.style.color = '#dc3545';
    errorDiv.style.fontSize = '0.875rem';
    errorDiv.style.marginTop = '5px';
    
    field.style.borderColor = '#dc3545';
    field.parentNode.appendChild(errorDiv);
}

function clearFieldError(field) {
    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
    field.style.borderColor = '#e9ecef';
}

function showSuccessMessage(form, message) {
    // Remove existing messages
    const existingMessage = form.querySelector('.success-message, .error-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.textContent = message;
    successDiv.style.display = 'block';
    
    form.appendChild(successDiv);
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
        successDiv.style.display = 'none';
    }, 5000);
}

function showErrorMessage(form, message) {
    // Remove existing messages
    const existingMessage = form.querySelector('.success-message, .error-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    errorDiv.style.display = 'block';
    
    form.appendChild(errorDiv);
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
        errorDiv.style.display = 'none';
    }, 5000);
}

// Additional Mobile Menu Styles (to be added to CSS)
const mobileMenuStyles = `
@media (max-width: 768px) {
    .nav-menu {
        position: fixed;
        top: 100%;
        left: 0;
        right: 0;
        background: white;
        flex-direction: column;
        padding: 20px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        transform: translateY(-100%);
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 999;
    }
    
    .nav-menu.active {
        transform: translateY(0);
        opacity: 1;
        visibility: visible;
    }
    
    .nav-menu li {
        margin: 10px 0;
    }
    
    .mobile-menu-toggle.active span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }
    
    .mobile-menu-toggle.active span:nth-child(2) {
        opacity: 0;
    }
    
    .mobile-menu-toggle.active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -6px);
    }
    
    body.menu-open {
        overflow: hidden;
    }
    
    .header.scrolled {
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(10px);
    }
}
`;

// Add mobile menu styles to the page
const styleSheet = document.createElement('style');
styleSheet.textContent = mobileMenuStyles;
document.head.appendChild(styleSheet);

// Intersection Observer for better performance
if ('IntersectionObserver' in window) {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all animated elements
    document.addEventListener('DOMContentLoaded', () => {
        const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
        animatedElements.forEach(element => {
            observer.observe(element);
        });
    });
}

// Lazy Loading for Images
function initLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// Initialize lazy loading
document.addEventListener('DOMContentLoaded', initLazyLoading);

// Preloader (optional)
function initPreloader() {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 300);
        });
    }
}

// Back to Top Button
function initBackToTop() {
    const backToTopBtn = document.createElement('button');
    backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: var(--primary-blue);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        font-size: 1.2rem;
    `;
    
    document.body.appendChild(backToTopBtn);
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.style.opacity = '1';
            backToTopBtn.style.visibility = 'visible';
        } else {
            backToTopBtn.style.opacity = '0';
            backToTopBtn.style.visibility = 'hidden';
        }
    });
    
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Initialize back to top button
document.addEventListener('DOMContentLoaded', initBackToTop);

// Console welcome message
console.log('%c🎓 Welcome to Bachpan Global & Academic Heights Website!', 'color: #0056b3; font-size: 16px; font-weight: bold;');
console.log('%cComplete educational journey from preschool to high school.', 'color: #666; font-size: 14px;');

