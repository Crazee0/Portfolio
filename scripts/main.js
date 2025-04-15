// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Initialize animations
    initAnimations();
    
    // Initialize scrolling effects
    initScrollEffects();
    
    // Initialize skill bars animation
    initSkillBars();
    
    // Initialize smooth scrolling for navigation
    initSmoothScrolling();
    
    // Initialize form validation
    initFormValidation();
});

// Initialize animations
function initAnimations() {
    // Generate random stars for the wave pattern
    const wavePattern = document.querySelector('.wave-pattern');
    if (wavePattern) {
        wavePattern.innerHTML = generateWavePattern();
    }
}

// Generate SVG wave pattern
function generateWavePattern() {
    return `
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stop-color="#7928ca" stop-opacity="0.3" />
                <stop offset="100%" stop-color="#ff0080" stop-opacity="0.3" />
            </linearGradient>
        </defs>
        <path d="M0 50 Q 200 120, 400 50 T 800 50 T 1200 50 T 1600 50 T 2000 50 T 2400 50 V 200 H 0 Z" fill="url(#gradient)" opacity="0.6">
            <animate attributeName="d" 
                values="M0 50 Q 200 120, 400 50 T 800 50 T 1200 50 T 1600 50 T 2000 50 T 2400 50 V 200 H 0 Z;
                        M0 50 Q 200 15, 400 50 T 800 50 T 1200 50 T 1600 50 T 2000 50 T 2400 50 V 200 H 0 Z;
                        M0 50 Q 200 120, 400 50 T 800 50 T 1200 50 T 1600 50 T 2000 50 T 2400 50 V 200 H 0 Z" 
                dur="15s" 
                repeatCount="indefinite" />
        </path>
        <path d="M0 80 Q 200 20, 400 80 T 800 80 T 1200 80 T 1600 80 T 2000 80 T 2400 80 V 200 H 0 Z" fill="url(#gradient)" opacity="0.4">
            <animate attributeName="d" 
                values="M0 80 Q 200 20, 400 80 T 800 80 T 1200 80 T 1600 80 T 2000 80 T 2400 80 V 200 H 0 Z;
                        M0 80 Q 200 150, 400 80 T 800 80 T 1200 80 T 1600 80 T 2000 80 T 2400 80 V 200 H 0 Z;
                        M0 80 Q 200 20, 400 80 T 800 80 T 1200 80 T 1600 80 T 2000 80 T 2400 80 V 200 H 0 Z" 
                dur="20s" 
                repeatCount="indefinite" />
        </path>
    </svg>
    `;
}

// Initialize scroll effects
function initScrollEffects() {
    const header = document.querySelector('header');
    const sections = document.querySelectorAll('.section');
    const indicatorDots = document.querySelectorAll('.indicator-dot');
    
    // Update active section on scroll
    window.addEventListener('scroll', function() {
        // Add shadow to header when scrolled
        if (window.scrollY > 10) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Update active section indicator
        let currentSectionIndex = 0;
        sections.forEach((section, index) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (window.scrollY >= (sectionTop - sectionHeight / 3)) {
                currentSectionIndex = index;
            }
        });
        
        // Update active indicator dot
        indicatorDots.forEach((dot, index) => {
            if (index === currentSectionIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    });
    
    // Scroll to section when indicator dot is clicked
    indicatorDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            window.scrollTo({
                top: sections[index].offsetTop,
                behavior: 'smooth'
            });
        });
    });
    
    // Trigger scroll event to initialize states
    window.dispatchEvent(new Event('scroll'));
    
    // Add hover effect to timeline items
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.querySelector('.timeline-content').style.transform = 'translateY(-5px)';
            item.querySelector('.timeline-content').style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.3)';
        });
        
        item.addEventListener('mouseleave', () => {
            item.querySelector('.timeline-content').style.transform = 'translateY(0)';
            item.querySelector('.timeline-content').style.boxShadow = '0 8px 30px rgba(0, 0, 0, 0.2)';
        });
    });
}

// Initialize skill bars animation
function initSkillBars() {
    const skillProgressBars = document.querySelectorAll('.skill-progress');
    
    // Set initial width to 0
    skillProgressBars.forEach(bar => {
        bar.style.width = '0';
    });
    
    // Animate skill bars when they come into view
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const targetWidth = entry.target.getAttribute('data-width') || entry.target.style.width;
                setTimeout(() => {
                    entry.target.style.width = targetWidth;
                }, 200);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    skillProgressBars.forEach(bar => {
        observer.observe(bar);
    });
}

// Initialize smooth scrolling for navigation links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Initialize form validation
function initFormValidation() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form fields
            const nameField = document.getElementById('name');
            const emailField = document.getElementById('email');
            const messageField = document.getElementById('message');
            
            // Simple validation
            let isValid = true;
            
            if (!nameField.value.trim()) {
                highlightField(nameField, true);
                isValid = false;
            } else {
                highlightField(nameField, false);
            }
            
            if (!emailField.value.trim() || !isValidEmail(emailField.value)) {
                highlightField(emailField, true);
                isValid = false;
            } else {
                highlightField(emailField, false);
            }
            
            if (!messageField.value.trim()) {
                highlightField(messageField, true);
                isValid = false;
            } else {
                highlightField(messageField, false);
            }
            
            // If form is valid, submit (you would typically use AJAX here)
            if (isValid) {
                // For demonstration purposes, just show an alert
                alert('Message sent successfully! (This is a demo)');
                contactForm.reset();
            }
        });
    }
}

// Helper function to validate email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Helper function to highlight invalid fields
function highlightField(field, isError) {
    if (isError) {
        field.style.borderColor = 'var(--secondary-color)';
        field.style.boxShadow = '0 0 0 2px rgba(255, 0, 128, 0.2)';
    } else {
        field.style.borderColor = 'rgba(255, 255, 255, 0.1)';
        field.style.boxShadow = 'none';
    }
} 