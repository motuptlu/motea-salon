// ============================================
// MOTEA Hair Salon - JavaScript
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    
    // === LOADING SCREEN ===
    const loadingScreen = document.getElementById('loading-screen');
    
    setTimeout(() => {
        if (loadingScreen) {
            loadingScreen.classList.add('hidden');
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 800);
        }
    }, 3500);
    
    // === NAVIGATION SCROLL ===
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // === MOBILE MENU ===
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenuBtn.classList.toggle('active');
            mobileMenu.classList.toggle('active');
        });
        
        // Close menu when link clicked
        const mobileLinks = mobileMenu.querySelectorAll('.mobile-link');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuBtn.classList.remove('active');
                mobileMenu.classList.remove('active');
            });
        });
        
        // Close menu on outside click
        document.addEventListener('click', (e) => {
            if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                mobileMenuBtn.classList.remove('active');
                mobileMenu.classList.remove('active');
            }
        });
    }
    
    // === FLIP WORDS ANIMATION ===
    const flipWords = document.querySelectorAll('.flip-word');
    
    if (flipWords.length > 0) {
        let currentIndex = 0;
        
        setInterval(() => {
            flipWords[currentIndex].classList.remove('active');
            currentIndex = (currentIndex + 1) % flipWords.length;
            flipWords[currentIndex].classList.add('active');
        }, 3000);
    }
    
    // === GSAP ANIMATIONS ===
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
        
        // Reveal Text
        gsap.utils.toArray('.reveal-text').forEach((elem, index) => {
            const delay = elem.dataset.delay || 0;
            gsap.from(elem, {
                scrollTrigger: {
                    trigger: elem,
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                },
                opacity: 0,
                y: 50,
                duration: 1,
                delay: delay,
                ease: "power3.out"
            });
        });
        
        // Reveal Images
        gsap.utils.toArray('.reveal-image').forEach((elem, index) => {
            const delay = elem.dataset.delay || 0;
            gsap.from(elem, {
                scrollTrigger: {
                    trigger: elem,
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                },
                opacity: 0,
                scale: 0.95,
                duration: 1,
                delay: delay,
                ease: "power3.out"
            });
        });
        
        // Reveal Cards
        gsap.utils.toArray('.reveal-card').forEach((elem, index) => {
            const delay = elem.dataset.delay || 0;
            gsap.from(elem, {
                scrollTrigger: {
                    trigger: elem,
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                },
                opacity: 0,
                y: 50,
                duration: 0.8,
                delay: delay,
                ease: "power2.out"
            });
        });
        
        // Reveal Services
        gsap.utils.toArray('.reveal-service').forEach((elem, index) => {
            gsap.from(elem, {
                scrollTrigger: {
                    trigger: elem,
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                },
                opacity: 0,
                x: index % 2 === 0 ? -50 : 50,
                duration: 1,
                ease: "power3.out"
            });
        });
        
        // Hero Logo Animation
        const heroLogo = document.querySelector('.hero-logo');
        if (heroLogo) {
            gsap.from(heroLogo, {
                scale: 0.5,
                rotateY: -180,
                opacity: 0,
                duration: 1.5,
                delay: 3.5,
                ease: "back.out(1.7)"
            });
        }
        
        // Parallax Effect
        gsap.utils.toArray('.service-image-wrapper img').forEach((img) => {
            gsap.to(img, {
                scrollTrigger: {
                    trigger: img,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1
                },
                y: -50,
                ease: "none"
            });
        });
    }
    
    // === CONTACT FORM ===
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');
            
            // WhatsApp message format
            const whatsappMessage = `
🎨 *MOTEA Contact Form*

👤 *Name:* ${name}
📧 *Email:* ${email}
💬 *Message:* ${message}
            `.trim();
            
            const whatsappUrl = `https://wa.me/35796250400?text=${encodeURIComponent(whatsappMessage)}`;
            
            // Show success message
            if (formMessage) {
                formMessage.style.display = 'block';
                formMessage.className = 'form-message success';
                formMessage.textContent = 'Opening WhatsApp...';
                
                setTimeout(() => {
                    window.open(whatsappUrl, '_blank');
                    contactForm.reset();
                    
                    setTimeout(() => {
                        formMessage.style.display = 'none';
                    }, 3000);
                }, 500);
            }
        });
    }
    
    // === SMOOTH SCROLL ===
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href !== '') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
    
    // === LAZY LOAD IMAGES ===
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
    
    // === ACTIVE NAV LINK ===
    const navLinks = document.querySelectorAll('.nav-link');
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });
    
    // === PERFORMANCE: Remove unused animations on mobile ===
    if (window.innerWidth < 768) {
        document.querySelectorAll('.floating-icon').forEach(icon => {
            icon.style.display = 'none';
        });
    }
    
    // === CONSOLE SIGNATURE ===
    console.log('%c🎨 MOTEA Hair Salon', 'color: #D4AF37; font-size: 24px; font-weight: bold;');
    console.log('%cA Creative Space for Hair, Beauty & Art since 1937', 'color: #fff; font-size: 12px;');
    console.log('%c✨ Website by Premium Design Studio', 'color: #D4AF37; font-size: 10px;');
});

// === WHATSAPP BUTTON TRACKING ===
document.addEventListener('click', function(e) {
    if (e.target.closest('.whatsapp-btn')) {
        console.log('WhatsApp button clicked');
        // Add analytics tracking here if needed
    }
});
