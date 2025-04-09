document.addEventListener('DOMContentLoaded', function () {
    // Preloader
    const preloader = document.querySelector('.preloader');
    window.addEventListener('load', function () {
        preloader.classList.add('fade-out');
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    });

    // Mobile Navigation
    const hamburger = document.querySelector('.hamburger');
    const navList = document.querySelector('.nav-list');
    const navLinks = document.querySelectorAll('.nav-link');

    hamburger.addEventListener('click', function () {
        this.classList.toggle('active');
        navList.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            hamburger.classList.remove('active');
            navList.classList.remove('active');
        });
    });

    // Sticky Header
    const header = document.querySelector('.header');
    window.addEventListener('scroll', function () {
        header.classList.toggle('scrolled', window.scrollY > 100);
    });

    // Active Link on Scroll
    const sections = document.querySelectorAll('section');
    window.addEventListener('scroll', function () {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (pageYOffset >= sectionTop - 300) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Back to Top Button
    const backToTopBtn = document.querySelector('.back-to-top');
    window.addEventListener('scroll', function () {
        backToTopBtn.classList.toggle('active', window.scrollY > 500);
    });

    // Portfolio Filter
    const filterBtns = document.querySelectorAll('.filter-btn');

    const portfolioData = [
        { id: 1, title: 'Ancient Yoga Website', category: 'web', image: 'ancient yoga.png', link: 'https://www.svayogashala.com/' },
        { id: 2, title: 'E-commerce Website', category: 'web', image: 'image copy 2.png', link: 'https://bharatsolo.github.io/E-Commerce/' },
        // { id: 3, title: 'Therapy Clinic Site', category: 'design', image: 'image copy.png', link: 'https://example.com/dashboard' },
        // { id: 4, title: 'Social Media App', category: 'app', image: 'images/portfolio4.jpg', link: 'https://example.com/social-app' },
        // { id: 5, title: 'Marketing Website', category: 'web', image: 'image.png', link: '' },
        // { id: 6, title: 'Brand Identity', category: 'design', image: 'wildYoda Website.jpg', link: 'https://example.com/brand-identity' }
    ];

    const portfolioGrid = document.querySelector('.portfolio-grid');
    portfolioGrid.innerHTML = '';

    portfolioData.forEach(item => {
        const portfolioItem = document.createElement('div');
        portfolioItem.className = `portfolio-item ${item.category}`;
        portfolioItem.innerHTML = `
            <a href="${item.link}" target="_blank">
                <img src="${item.image}" alt="${item.title}" class="portfolio-img">
                <div class="portfolio-overlay">
                    <h4 class="portfolio-title">${item.title}</h4>
                    <p class="portfolio-category">${item.category.toUpperCase()}</p>
                </div>
            </a>
        `;
        portfolioGrid.appendChild(portfolioItem);
    });

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            filterBtns.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            const filterValue = this.getAttribute('data-filter');
            const portfolioItems = document.querySelectorAll('.portfolio-item');

            portfolioItems.forEach(item => {
                if (filterValue === 'all' || item.classList.contains(filterValue)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // Scroll Reveal Animations
    ScrollReveal().reveal('.hero-content, .hero-image', {
        delay: 200,
        origin: 'bottom',
        distance: '50px',
        duration: 1000,
        easing: 'ease',
        reset: true
    });

    ScrollReveal().reveal('.service-card', {
        delay: 200,
        origin: 'bottom',
        distance: '50px',
        interval: 200,
        duration: 1000,
        easing: 'ease',
        reset: true
    });

    ScrollReveal().reveal('.section-header, .about-content, .about-image', {
        delay: 200,
        origin: 'bottom',
        distance: '50px',
        duration: 1000,
        easing: 'ease',
        reset: true
    });

    // GSAP Animations
    gsap.from('.logo', {
        duration: 1,
        y: -50,
        opacity: 0,
        delay: 0.5
    });

    gsap.from('.nav-list li', {
        duration: 1,
        y: -50,
        opacity: 0,
        delay: 0.8,
        stagger: 0.2
    });

// Form Submission with Flip Animation
const contactForm = document.querySelector('.contact-form');
const formCard = document.querySelector('.form-card');

contactForm.addEventListener('submit', async function (e) {
    e.preventDefault();

    const formData = new FormData(contactForm);

    try {
        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: formData
        });

        const result = await response.json();

        if (result.success) {
            formCard.classList.add('flipped'); // 🎉 Flip the card to show thank-you
            contactForm.reset(); // Optional: reset after flipping
        } else {
            alert("Oops! Something went wrong. Please try again.");
        }
    } catch (error) {
        console.error("Form submission error:", error);
        alert("An error occurred. Please check your connection and try again.");
    }
});
    
    });
    

