// Portfolio Page Navigation & Scrolling System
document.addEventListener('DOMContentLoaded', function() {
    // Get all buttons with scroll data attributes
    const scrollButtons = document.querySelectorAll('[data-scroll]');
    
    scrollButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetId = this.getAttribute('data-scroll');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Project card navigation
    document.querySelectorAll('.project-card a').forEach((link, index) => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            // Navigate to respective project pages
            const projectNumber = index + 1;
            window.location.href = `project${projectNumber}.html`;
        });
    });

    // Contact Form Modal
    const contactFormOverlay = document.getElementById('contactFormOverlay');
    const openFormBtn = document.getElementById('openFormBtn');
    const closeFormBtn = document.getElementById('closeFormBtn');
    const contactForm = document.getElementById('contactForm');

    if (openFormBtn) {
        openFormBtn.addEventListener('click', function() {
            contactFormOverlay.classList.add('active');
        });
    }

    if (closeFormBtn) {
        closeFormBtn.addEventListener('click', function() {
            contactFormOverlay.classList.remove('active');
        });
    }

    if (contactFormOverlay) {
        contactFormOverlay.addEventListener('click', function(e) {
            if (e.target === contactFormOverlay) {
                contactFormOverlay.classList.remove('active');
            }
        });
    }

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Handle form submission here
            console.log('Form submitted');
            // You can add your email sending logic here
            alert('Thank you for your message! I will get back to you soon.');
            contactForm.reset();
            contactFormOverlay.classList.remove('active');
        });
    }

    // Scroll Animation - Intersection Observer for cards and tech items
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe project cards
    document.querySelectorAll('.project-card').forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        observer.observe(card);
    });

    // Observe tech items
    document.querySelectorAll('.tech-item').forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
        observer.observe(item);
    });

    // Observe about section
    const aboutSection = document.querySelector('.about-section');
    if (aboutSection) {
        observer.observe(aboutSection);
    }
});

