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
    
    // Initialize typing animation
    initTypingAnimation();
    
    // Initialize interactive skills
    initInteractiveSkills();
    
    // Initialize 3D certification cards
    init3DCertifications();
});

// Initialize animations
function initAnimations() {
    // Generate random stars for the wave pattern
    const wavePattern = document.querySelector('.wave-pattern');
    if (wavePattern) {
        wavePattern.innerHTML = generateWavePattern();
    }
    
    // Add entrance animations to sections
    animateSectionsOnScroll();
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

// Store Typed.js instances to prevent reinitializing
let nameTypingInstance = null;
let professionTypingInstance = null;

// Initialize typing animation for the hero section
function initTypingAnimation() {
    // Name typing animation - only initialize once
    if (document.querySelector('.hero-hello') && !nameTypingInstance) {
        // First, ensure the element is empty before initializing
        document.querySelector('.hero-hello span.gradient-text').textContent = '';
        
        nameTypingInstance = new Typed('.hero-hello span.gradient-text', {
            strings: ['Harry'],
            typeSpeed: 400,
            showCursor: false,
            startDelay: 800,
            loop: false,
            smartBackspace: false,
            autoInsertCss: true,
            onComplete: function() {
                document.querySelector('.hand-wave').classList.add('wave');
            }
        });
    }
    
    // Profession typing animation
    if (document.querySelector('#typed-profession') && !professionTypingInstance) {
        professionTypingInstance = new Typed('#typed-profession', {
            strings: [
                'Full Stack Developer',
                'Frontend Engineer',
                'JavaScript Expert',
                'React Developer',
                'UI/UX Enthusiast',
                'Web Developer',
                'Tech Enthusiast',
                'Problem Solver'
            ],
            typeSpeed: 120,
            backSpeed: 80,
            backDelay: 1500,
            startDelay: 1800,
            loop: true,
            smartBackspace: false,
            cursorChar: '|',
            autoInsertCss: true,
            fadeOut: false,
            showCursor: true
        });
    }
}

// Animate elements when they come into view
function animateSectionsOnScroll() {
    const sections = document.querySelectorAll('.section');
    
    sections.forEach(section => {
        // Add the fade-in class to trigger CSS animation
        section.classList.add('fade-in');
    });
    
    const sectionTitles = document.querySelectorAll('.section-title');
    
    sectionTitles.forEach(title => {
        // Add animation classes to titles
        title.classList.add('slide-in-bottom');
    });
    
    // Add element observers to trigger animations when scrolled into view
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all elements with animation classes
    document.querySelectorAll('.fade-in, .slide-in-bottom').forEach(element => {
        observer.observe(element);
    });
}

// Initialize interactive skill icons
function initInteractiveSkills() {
    const skillCards = document.querySelectorAll('.skill-card');
    
    skillCards.forEach(card => {
        // Add 3D tilt effect on hover
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const angleY = (x - centerX) / 10;
            const angleX = (centerY - y) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) scale3d(1.05, 1.05, 1.05)`;
            card.style.boxShadow = `
                0 15px 35px rgba(0, 0, 0, 0.25),
                ${angleY * 0.5}px ${angleX * -0.5}px 30px rgba(121, 40, 202, 0.2)
            `;
        });
        
        // Reset on mouse leave
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
            card.style.boxShadow = '';
        });
    });
    
    // Add hover effects to skill items
    const skillItems = document.querySelectorAll('.skill-item');
    
    skillItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.classList.add('skill-item-active');
            const progressBar = item.querySelector('.skill-progress');
            if (progressBar) {
                progressBar.style.transform = 'scaleX(1.05)';
                progressBar.style.boxShadow = '0 0 15px rgba(121, 40, 202, 0.5)';
            }
        });
        
        item.addEventListener('mouseleave', () => {
            item.classList.remove('skill-item-active');
            const progressBar = item.querySelector('.skill-progress');
            if (progressBar) {
                progressBar.style.transform = '';
                progressBar.style.boxShadow = '';
            }
        });
    });
}

// Initialize 3D rotating certification cards
function init3DCertifications() {
    // Create a container for 3D certifications
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach(item => {
        const content = item.querySelector('.timeline-content');
        if (!content) return;
        
        // Add 3D effect on hover
        content.addEventListener('mousemove', e => {
            const rect = content.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const angleY = (x - centerX) / 14;
            const angleX = (centerY - y) / 14;
            
            content.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) translateZ(10px)`;
            content.style.boxShadow = `
                0 15px 35px rgba(0, 0, 0, 0.3),
                ${angleY * 0.5}px ${angleX * -0.5}px 20px rgba(121, 40, 202, 0.2)
            `;
        });
        
        // Reset on mouse leave
        content.addEventListener('mouseleave', () => {
            content.style.transform = 'translateY(-5px)';
            content.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.3)';
        });
        
        // Special badge
        const badge = document.createElement('div');
        badge.className = 'certification-badge';
        badge.innerHTML = '<i class="fas fa-award"></i>';
        content.appendChild(badge);
    });
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