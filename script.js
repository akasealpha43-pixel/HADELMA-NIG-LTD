/**
 * HADELMA NIG LTD - Client-Side Interactive Engine
 * Pure ES6+ Vanilla JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Preloader ---
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.classList.add('hidden');
        }, 500);
    });

    // --- 2. Custom Cursor (Desktop Only) ---
    const cursor = document.getElementById('cursor');
    const follower = document.getElementById('cursor-follower');
    
    if (window.innerWidth > 1024 && cursor && follower) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = `${e.clientX}px`;
            cursor.style.top = `${e.clientY}px`;
            
            setTimeout(() => {
                follower.style.left = `${e.clientX}px`;
                follower.style.top = `${e.clientY}px`;
            }, 50);
        });
    }

    // --- 3. Sticky Navbar & Scroll Progress ---
    const navbar = document.getElementById('navbar');
    const backToTopBtn = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        if (window.scrollY > 400) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }

        // Parallaxe Hero
        const heroBg = document.getElementById('hero-bg');
        if (heroBg && window.scrollY < window.innerHeight) {
            heroBg.style.transform = `translateY(${window.scrollY * 0.35}px)`;
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // --- 4. Mobile Menu Toggle ---
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('open');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('open');
        });
    });

    // --- 5. Dark Mode Toggle ---
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = themeToggleBtn.querySelector('i');

    themeToggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        if (document.body.classList.contains('dark-mode')) {
            themeIcon.className = 'fa-solid fa-sun';
        } else {
            themeIcon.className = 'fa-solid fa-moon';
        }
    });

    // --- 6. Intersection Observer (Scroll Animations & Counters) ---
    const observerOptions = { threshold: 0.15 };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right').forEach(el => {
        revealObserver.observe(el);
    });

    // Stats Counter Animation
    const counters = document.querySelectorAll('.counter');
    let counted = false;

    const statsSection = document.getElementById('stats-counter');
    if (statsSection) {
        const statsObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !counted) {
                counters.forEach(counter => {
                    const target = +counter.getAttribute('data-target');
                    const duration = 2000;
                    const step = Math.ceil(target / (duration / 16));

                    let current = 0;
                    const updateCounter = () => {
                        current += step;
                        if (current >= target) {
                            counter.innerText = target + '+';
                        } else {
                            counter.innerText = current;
                            requestAnimationFrame(updateCounter);
                        }
                    };
                    updateCounter();
                });
                counted = true;
            }
        }, { threshold: 0.5 });

        statsObserver.observe(statsSection);
    }

    // --- 7. Search & Filter Products ---
    const searchInput = document.getElementById('product-search');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');

    function filterProducts() {
        const searchTerm = searchInput.value.toLowerCase();
        const activeFilter = document.querySelector('.filter-btn.active').getAttribute('data-filter');

        productCards.forEach(card => {
            const category = card.getAttribute('data-category');
            const name = card.getAttribute('data-name').toLowerCase();

            const matchesCategory = (activeFilter === 'all' || category === activeFilter);
            const matchesSearch = name.includes(searchTerm);

            if (matchesCategory && matchesSearch) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    searchInput.addEventListener('input', filterProducts);

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            filterProducts();
        });
    });

    // --- 8. Lightbox Gallery ---
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.getElementById('lightbox-close');

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const src = item.getAttribute('data-src');
            lightboxImg.src = src;
            lightbox.classList.add('active');
        });
    });

    lightboxClose.addEventListener('click', () => lightbox.classList.remove('active'));
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) lightbox.classList.remove('active');
    });

    // --- 9. Testimonial Slider ---
    const testimonials = document.querySelectorAll('.testimonial-card');
    const prevBtn = document.getElementById('prev-testi');
    const nextBtn = document.getElementById('next-testi');
    const dotsContainer = document.getElementById('slider-dots');
    let currentIndex = 0;

    // Generate Dots
    testimonials.forEach((_, idx) => {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        if (idx === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(idx));
        dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.slider-dots .dot');

    function goToSlide(index) {
        testimonials[currentIndex].classList.remove('active');
        dots[currentIndex].classList.remove('active');
        currentIndex = (index + testimonials.length) % testimonials.length;
        testimonials[currentIndex].classList.add('active');
        dots[currentIndex].classList.add('active');
    }

    nextBtn.addEventListener('click', () => goToSlide(currentIndex + 1));
    prevBtn.addEventListener('click', () => goToSlide(currentIndex - 1));

    // Auto Play
    setInterval(() => goToSlide(currentIndex + 1), 6000);

    // --- 10. FAQ Accordion ---
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(q => {
        q.addEventListener('click', () => {
            const item = q.parentElement;
            item.classList.toggle('active');
        });
    });

    // --- 11. Form Validation ---
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let isValid = true;

            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const message = document.getElementById('message');
            const feedback = document.getElementById('form-feedback');

            // Simple validation reset
            document.querySelectorAll('.form-group').forEach(g => g.classList.remove('error'));

            if (!name.value.trim()) {
                name.parentElement.classList.add('error');
                isValid = false;
            }

            if (!email.value.trim() || !email.value.includes('@')) {
                email.parentElement.classList.add('error');
                isValid = false;
            }

            if (!message.value.trim()) {
                message.parentElement.classList.add('error');
                isValid = false;
            }

            if (isValid) {
                feedback.innerHTML = `<span style="color: #2d6a4f; font-weight: 600;">✓ Thank you! Your inquiry has been sent successfully. Our trade team will respond within 24 hours.</span>`;
                contactForm.reset();
            }
        });
    }

});