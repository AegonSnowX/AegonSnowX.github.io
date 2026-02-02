// ================= MODERN PORTFOLIO JS =================
// Premium interactions and animations

document.addEventListener('DOMContentLoaded', function() {
    
    // ================= LOADING SCREEN HELPER =================
    const loadingScreen = document.getElementById('loadingScreen');
    const loadingIcon = document.getElementById('loadingIcon');
    const loadingText = document.getElementById('loadingText');
    const loadingSubtext = document.getElementById('loadingSubtext');
    const loadingProgress = document.getElementById('loadingProgress');
    
    function showLoadingScreen(config) {
        if (!loadingScreen) return;
        
        // Update loading screen content
        if (loadingIcon) loadingIcon.textContent = config.icon || '🎮';
        if (loadingText) loadingText.textContent = config.text || 'Loading...';
        if (loadingSubtext) loadingSubtext.textContent = config.subtext || '';
        
        // Reset and set animation duration
        if (loadingProgress) {
            loadingProgress.style.animation = 'none';
            loadingProgress.offsetHeight; // Trigger reflow
            loadingProgress.style.animation = `loadingProgress ${config.duration || 2}s ease-in-out forwards`;
        }
        
        // Add project-loading class for faster animation if needed
        if (config.isProject) {
            loadingScreen.classList.add('project-loading');
        } else {
            loadingScreen.classList.remove('project-loading');
        }
        
        loadingScreen.classList.add('active');
        
        // Navigate after duration
        setTimeout(() => {
            window.location.href = config.url;
        }, (config.duration || 2) * 1000);
    }
    
    // ================= LANGUAGE DROPDOWN =================
    const langToggle = document.getElementById('langToggle');
    const langDropdown = document.querySelector('.lang-dropdown');
    const langOptions = document.querySelectorAll('.lang-option');
    
    if (langToggle && langDropdown) {
        langToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            langDropdown.classList.toggle('open');
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!langDropdown.contains(e.target)) {
                langDropdown.classList.remove('open');
            }
        });
        
        // Language option selection with loading screen
        langOptions.forEach(option => {
            option.addEventListener('click', () => {
                const targetUrl = option.dataset.url;
                const lang = option.dataset.lang;
                const currentPage = window.location.pathname.split('/').pop() || 'index.html';
                
                // Only redirect if it's a different page
                if (targetUrl && targetUrl !== currentPage) {
                    const isFrench = lang === 'fr';
                    showLoadingScreen({
                        icon: isFrench ? '🥐' : '🍔',
                        text: isFrench ? 'Loading French...' : 'Loading English...',
                        subtext: isFrench ? 'Hold my croissants' : 'Hold my burgers',
                        url: targetUrl,
                        duration: 2,
                        isProject: false
                    });
                }
                
                langDropdown.classList.remove('open');
            });
        });
    }
    
    // ================= PROJECT LOADING SCREEN =================
    const projectLinks = document.querySelectorAll('.project-link');
    
    projectLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetUrl = link.getAttribute('href');
            const projectName = link.dataset.project || 'Project';
            
            showLoadingScreen({
                icon: '🎮',
                text: `Loading ${projectName}...`,
                subtext: 'Preparing the experience',
                url: targetUrl,
                duration: 1,
                isProject: true
            });
        });
    });
    
    // ================= CUSTOM CURSOR =================
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
    
    if (cursorDot && cursorOutline) {
        let mouseX = 0, mouseY = 0;
        let outlineX = 0, outlineY = 0;
        
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            cursorDot.style.left = mouseX + 'px';
            cursorDot.style.top = mouseY + 'px';
        });
        
        // Smooth outline follow
        function animateCursor() {
            outlineX += (mouseX - outlineX) * 0.15;
            outlineY += (mouseY - outlineY) * 0.15;
            
            cursorOutline.style.left = outlineX + 'px';
            cursorOutline.style.top = outlineY + 'px';
            
            requestAnimationFrame(animateCursor);
        }
        animateCursor();
        
        // Cursor hover effects
        const hoverElements = document.querySelectorAll('a, button, .project-card, .tech-item, .social-btn, .social-link-card');
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorOutline.classList.add('hover');
                cursorDot.style.transform = 'scale(2)';
            });
            el.addEventListener('mouseleave', () => {
                cursorOutline.classList.remove('hover');
                cursorDot.style.transform = 'scale(1)';
            });
        });
    }
    
    // ================= NAVBAR SCROLL EFFECT =================
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (navbar) {
            if (currentScroll > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
        
        lastScroll = currentScroll;
    });
    
    // ================= ACTIVE NAV LINK =================
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    function updateActiveNav() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            if (window.pageYOffset >= sectionTop) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveNav);
    
    // ================= SMOOTH SCROLL =================
    const scrollButtons = document.querySelectorAll('[data-scroll], .nav-link');
    
    scrollButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const targetId = this.getAttribute('data-scroll') || this.getAttribute('href');
            if (targetId && targetId.startsWith('#')) {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
    
    // ================= SCROLL ANIMATIONS =================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements
    const animateElements = document.querySelectorAll(
        '.project-card, .tech-item, .about-section, .social-link-card, ' +
        '.spec-card, .feature-item, .section-header'
    );
    
    animateElements.forEach((el, index) => {
        el.style.animationDelay = `${index * 0.1}s`;
        el.style.transitionDelay = `${index * 0.05}s`;
        observer.observe(el);
    });
    
    // ================= MAGNETIC BUTTONS =================
    const magneticButtons = document.querySelectorAll('.magnetic');
    
    magneticButtons.forEach(btn => {
        btn.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            this.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translate(0, 0)';
        });
    });
    
    // ================= TILT EFFECT FOR CARDS =================
    const tiltCards = document.querySelectorAll('.project-card, .social-link-card');
    
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });
    
    // ================= PARALLAX BACKGROUND ORBS =================
    const orbs = document.querySelectorAll('.gradient-orb');
    
    window.addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        orbs.forEach((orb, index) => {
            const speed = (index + 1) * 30;
            orb.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
        });
    });
    
    // ================= TEXT TYPING EFFECT =================
    const typewriterText = document.querySelector('.title-highlight');
    if (typewriterText) {
        const text = typewriterText.textContent;
        typewriterText.textContent = '';
        let i = 0;
        
        function typeWriter() {
            if (i < text.length) {
                typewriterText.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        }
        
        // Start typing after animation delay
        setTimeout(typeWriter, 800);
    }
    
    // ================= RIPPLE EFFECT =================
    document.querySelectorAll('.btn, .btn-flow').forEach(button => {
        button.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const ripple = document.createElement('span');
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.4);
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
                left: ${e.clientX - rect.left}px;
                top: ${e.clientY - rect.top}px;
                width: 20px;
                height: 20px;
                margin-left: -10px;
                margin-top: -10px;
            `;
            
            // Add ripple animation keyframes if not exists
            if (!document.querySelector('#ripple-style')) {
                const style = document.createElement('style');
                style.id = 'ripple-style';
                style.textContent = `
                    @keyframes ripple {
                        to {
                            transform: scale(4);
                            opacity: 0;
                        }
                    }
                `;
                document.head.appendChild(style);
            }
            
            this.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        });
    });
    
    // ================= COUNTER ANIMATION =================
    const counters = document.querySelectorAll('.spec-value');
    
    function animateCounter(el) {
        const text = el.textContent;
        const numbers = text.match(/\d+/);
        
        if (numbers) {
            const target = parseInt(numbers[0]);
            const suffix = text.replace(/\d+/, '');
            let current = 0;
            const increment = target / 30;
            const duration = 1500;
            const stepTime = duration / 30;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    el.textContent = target + suffix;
                    clearInterval(timer);
                } else {
                    el.textContent = Math.floor(current) + suffix;
                }
            }, stepTime);
        }
    }
    
    // Trigger counter on scroll
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => counterObserver.observe(counter));
    
    // ================= GRADIENT TEXT ANIMATION =================
    const gradientTexts = document.querySelectorAll('.gradient-text, .title-highlight');
    gradientTexts.forEach(text => {
        text.style.backgroundSize = '200% 200%';
        text.style.animation = 'gradientShift 5s ease infinite';
    });
    
    // ================= SMOOTH REVEAL FOR SECTIONS =================
    const revealSections = document.querySelectorAll('.project-specifications, .key-features-section, .experience-flow-section');
    revealSections.forEach(section => {
        observer.observe(section);
    });
    
    // ================= LOGO ANIMATION =================
    const logoDot = document.querySelector('.logo-dot');
    if (logoDot) {
        setInterval(() => {
            logoDot.style.transform = 'scale(1.5)';
            setTimeout(() => {
                logoDot.style.transform = 'scale(1)';
            }, 200);
        }, 3000);
    }
    
    // ================= MOBILE MENU (Future Enhancement) =================
    // Add mobile menu toggle functionality here if needed
    
    console.log('Portfolio loaded successfully!');
});

// ================= PRELOADER (Optional) =================
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});
