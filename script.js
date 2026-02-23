// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');
const navRight = document.querySelector('.nav-right');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        // Create mobile menu overlay if it doesn't exist
        let mobileMenu = document.querySelector('.mobile-menu');

        if (!mobileMenu) {
            mobileMenu = document.createElement('div');
            mobileMenu.className = 'mobile-menu';
            mobileMenu.innerHTML = `
                <div class="mobile-menu-content">
                    <button class="mobile-menu-close">&times;</button>
                    <div class="mobile-nav-links">
                        <a href="#servicii">Servicii</a>
                        <a href="#despre">Despre Noi</a>
                        <a href="#recenzii">Recenzii</a>
                        <a href="#contact">Contact</a>
                    </div>
                    <div class="mobile-nav-right">
                        <div class="location">
                            <span>Ploiești, România</span>
                        </div>
                        <a href="#programare" class="btn-nav">Programează-te</a>
                    </div>
                </div>
            `;
            document.body.appendChild(mobileMenu);

            // Add styles for mobile menu
            const style = document.createElement('style');
            style.textContent = `
                .mobile-menu {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: var(--color-dark);
                    z-index: 2000;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    opacity: 0;
                    visibility: hidden;
                    transition: all 0.3s;
                }
                .mobile-menu.active {
                    opacity: 1;
                    visibility: visible;
                }
                .mobile-menu-content {
                    text-align: center;
                    padding: 40px;
                }
                .mobile-menu-close {
                    position: absolute;
                    top: 20px;
                    right: 20px;
                    background: none;
                    border: none;
                    color: white;
                    font-size: 40px;
                    cursor: pointer;
                }
                .mobile-nav-links {
                    display: flex;
                    flex-direction: column;
                    gap: 24px;
                    margin-bottom: 40px;
                }
                .mobile-nav-links a {
                    color: white;
                    text-decoration: none;
                    font-size: 24px;
                    font-weight: 500;
                }
                .mobile-nav-right {
                    display: flex;
                    flex-direction: column;
                    gap: 16px;
                    align-items: center;
                }
                .mobile-nav-right .location {
                    color: white;
                    opacity: 0.7;
                }
            `;
            document.head.appendChild(style);

            // Close button functionality
            const closeBtn = mobileMenu.querySelector('.mobile-menu-close');
            closeBtn.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
            });

            // Close menu when clicking on links
            const mobileLinks = mobileMenu.querySelectorAll('a');
            mobileLinks.forEach(link => {
                link.addEventListener('click', () => {
                    mobileMenu.classList.remove('active');
                });
            });
        }

        mobileMenu.classList.add('active');
    });
}

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Form Submission Handler - Hero Form
const bookingForm = document.getElementById('bookingForm');
if (bookingForm) {
    bookingForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const formData = {
            name: document.getElementById('name').value,
            phone: document.getElementById('phone').value,
            email: document.getElementById('email').value,
            service: document.getElementById('service').value,
            message: document.getElementById('message').value
        };

        // Show success message
        showNotification('Programarea a fost trimisă cu succes! Vă contactăm în curând.', 'success');

        // Reset form
        bookingForm.reset();

        // Log form data (replace with actual API call)
        console.log('Form submitted:', formData);
    });
}

// Form Submission Handler - Booking Section Form
const bookingForm2 = document.getElementById('bookingForm2');
if (bookingForm2) {
    bookingForm2.addEventListener('submit', function (e) {
        e.preventDefault();

        showNotification('Programarea a fost trimisă cu succes! Vă contactăm în curând.', 'success');
        bookingForm2.reset();
    });
}

// Notification System
function showNotification(message, type = 'success') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <span class="notification-message">${message}</span>
        <button class="notification-close">&times;</button>
    `;

    // Add styles
    const style = document.createElement('style');
    style.textContent = `
        .notification {
            position: fixed;
            top: 100px;
            right: 20px;
            background: var(--color-dark);
            color: white;
            padding: 16px 24px;
            border-radius: 12px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.2);
            z-index: 3000;
            display: flex;
            align-items: center;
            gap: 16px;
            max-width: 400px;
            animation: slideIn 0.3s ease;
        }
        .notification-success {
            background: #10b981;
        }
        .notification-error {
            background: #ef4444;
        }
        .notification-message {
            font-size: 14px;
            font-weight: 500;
        }
        .notification-close {
            background: none;
            border: none;
            color: white;
            font-size: 20px;
            cursor: pointer;
            opacity: 0.7;
            transition: opacity 0.3s;
        }
        .notification-close:hover {
            opacity: 1;
        }
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
        .notification.hiding {
            animation: slideOut 0.3s ease forwards;
        }
    `;
    document.head.appendChild(style);

    document.body.appendChild(notification);

    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        hideNotification(notification);
    });

    // Auto hide after 5 seconds
    setTimeout(() => {
        hideNotification(notification);
    }, 5000);
}

function hideNotification(notification) {
    notification.classList.add('hiding');
    setTimeout(() => {
        notification.remove();
    }, 300);
}

// Navbar Scroll Effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
    } else {
        navbar.style.boxShadow = 'none';
    }

    lastScroll = currentScroll;
});

// Intersection Observer for Fade-in Animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-visible');
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.deal-card, .service-card, .testimonial-card, .team-card, .benefits-list li').forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
});

// Add fade-in styles
const fadeStyle = document.createElement('style');
fadeStyle.textContent = `
    .fade-in {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    .fade-in-visible {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(fadeStyle);

// Deal Cards Expand Functionality - Scroll to booking section
document.querySelectorAll('.btn-expand').forEach(btn => {
    btn.addEventListener('click', function () {
        const target = document.querySelector('#programare');
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Services Row Next Button Slider
const servicesRow = document.querySelector('.services-row');
const servicesPrevBtn = document.querySelector('.services-prev-btn');
const servicesNextBtn = document.querySelector('.services-next-btn');
const servicesRowWrapper = document.querySelector('.services-row-wrapper');

if (servicesRow && servicesPrevBtn && servicesNextBtn && servicesRowWrapper) {
    const getVisibleCards = () => {
        if (window.innerWidth <= 768) return 1;
        if (window.innerWidth <= 1024) return 2;
        return 4;
    };

    let currentIndex = 0;

    const updateServicesSlider = () => {
        const cards = servicesRow.querySelectorAll('.service-card');
        const visibleCards = getVisibleCards();
        const maxIndex = Math.max(0, cards.length - visibleCards);
        const gap = 16;
        const cardWidth = cards[0] ? cards[0].offsetWidth : 0;

        if (currentIndex > maxIndex) {
            currentIndex = 0;
        }

        servicesRow.style.transform = `translateX(-${currentIndex * (cardWidth + gap)}px)`;
        const singlePage = cards.length <= visibleCards;
        servicesPrevBtn.disabled = singlePage;
        servicesNextBtn.disabled = singlePage;
    };

    const goToNext = () => {
        const cards = servicesRow.querySelectorAll('.service-card');
        const visibleCards = getVisibleCards();
        const maxIndex = Math.max(0, cards.length - visibleCards);

        if (maxIndex === 0) return;

        currentIndex = currentIndex >= maxIndex ? 0 : currentIndex + 1;
        updateServicesSlider();
    };

    const goToPrev = () => {
        const cards = servicesRow.querySelectorAll('.service-card');
        const visibleCards = getVisibleCards();
        const maxIndex = Math.max(0, cards.length - visibleCards);

        if (maxIndex === 0) return;

        currentIndex = currentIndex <= 0 ? maxIndex : currentIndex - 1;
        updateServicesSlider();
    };

    servicesNextBtn.addEventListener('click', () => {
        goToNext();
    });

    servicesPrevBtn.addEventListener('click', () => {
        goToPrev();
    });

    let autoplayTimer = setInterval(goToNext, 3500);

    const restartAutoplay = () => {
        clearInterval(autoplayTimer);
        autoplayTimer = setInterval(goToNext, 3500);
    };

    servicesNextBtn.addEventListener('click', restartAutoplay);
    servicesPrevBtn.addEventListener('click', restartAutoplay);

    servicesRowWrapper.addEventListener('mouseenter', () => {
        clearInterval(autoplayTimer);
    });

    servicesRowWrapper.addEventListener('mouseleave', () => {
        restartAutoplay();
    });

    window.addEventListener('resize', updateServicesSlider);
    updateServicesSlider();
}

// Team Row Slider
const teamRow = document.querySelector('.team-row');
const teamPrevBtn = document.querySelector('.team-prev-btn');
const teamNextBtn = document.querySelector('.team-next-btn');
const teamRowWrapper = document.querySelector('.team-row-wrapper');

if (teamRow && teamPrevBtn && teamNextBtn && teamRowWrapper) {
    const getVisibleTeamCards = () => {
        if (window.innerWidth <= 768) return 1;
        if (window.innerWidth <= 1024) return 2;
        return 4;
    };

    let currentTeamIndex = 0;

    const updateTeamSlider = () => {
        const cards = teamRow.querySelectorAll('.team-card');
        const visibleCards = getVisibleTeamCards();
        const maxIndex = Math.max(0, cards.length - visibleCards);
        const gap = 24;
        const cardWidth = cards[0] ? cards[0].offsetWidth : 0;

        if (currentTeamIndex > maxIndex) {
            currentTeamIndex = 0;
        }

        teamRow.style.transform = `translateX(-${currentTeamIndex * (cardWidth + gap)}px)`;
        const singlePage = cards.length <= visibleCards;
        teamPrevBtn.disabled = singlePage;
        teamNextBtn.disabled = singlePage;
    };

    const goToNextTeam = () => {
        const cards = teamRow.querySelectorAll('.team-card');
        const visibleCards = getVisibleTeamCards();
        const maxIndex = Math.max(0, cards.length - visibleCards);

        if (maxIndex === 0) return;

        currentTeamIndex = currentTeamIndex >= maxIndex ? 0 : currentTeamIndex + 1;
        updateTeamSlider();
    };

    const goToPrevTeam = () => {
        const cards = teamRow.querySelectorAll('.team-card');
        const visibleCards = getVisibleTeamCards();
        const maxIndex = Math.max(0, cards.length - visibleCards);

        if (maxIndex === 0) return;

        currentTeamIndex = currentTeamIndex <= 0 ? maxIndex : currentTeamIndex - 1;
        updateTeamSlider();
    };

    teamNextBtn.addEventListener('click', () => {
        goToNextTeam();
    });

    teamPrevBtn.addEventListener('click', () => {
        goToPrevTeam();
    });

    let teamAutoplayTimer = setInterval(goToNextTeam, 4000);

    const restartTeamAutoplay = () => {
        clearInterval(teamAutoplayTimer);
        teamAutoplayTimer = setInterval(goToNextTeam, 4000);
    };

    teamNextBtn.addEventListener('click', restartTeamAutoplay);
    teamPrevBtn.addEventListener('click', restartTeamAutoplay);

    teamRowWrapper.addEventListener('mouseenter', () => {
        clearInterval(teamAutoplayTimer);
    });

    teamRowWrapper.addEventListener('mouseleave', () => {
        restartTeamAutoplay();
    });

    window.addEventListener('resize', updateTeamSlider);
    updateTeamSlider();
}

// Service Cards Click Handler
document.querySelectorAll('.service-card').forEach(card => {
    card.style.cursor = 'pointer';
    card.addEventListener('click', function () {
        // Scroll to booking section
        const target = document.querySelector('#programare');
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Input Focus Effects
document.querySelectorAll('input, select, textarea').forEach(input => {
    input.addEventListener('focus', function () {
        this.parentElement.classList.add('focused');
    });

    input.addEventListener('blur', function () {
        this.parentElement.classList.remove('focused');
    });
});

// Add focus styles
const focusStyle = document.createElement('style');
focusStyle.textContent = `
    .form-group.focused input,
    .form-group.focused select,
    .form-group.focused textarea {
        border-color: var(--color-blue) !important;
        box-shadow: 0 0 0 3px rgba(44, 133, 175, 0.1);
    }
`;
document.head.appendChild(focusStyle);

// Phone Number Validation
document.querySelectorAll('input[type="tel"]').forEach(input => {
    input.addEventListener('input', function (e) {
        // Allow only numbers, spaces, and common phone characters
        let value = e.target.value.replace(/[^0-9+\-\s()]/g, '');
        e.target.value = value;
    });
});

// Set minimum date for date inputs to today
document.querySelectorAll('input[type="date"]').forEach(input => {
    const today = new Date().toISOString().split('T')[0];
    input.setAttribute('min', today);
});

// Lazy Loading for Images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img').forEach(img => {
        imageObserver.observe(img);
    });
}

// Performance: Preload critical resources
const preloadLinks = [
    'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap'
];

preloadLinks.forEach(href => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'style';
    link.href = href;
    document.head.appendChild(link);
});

console.log('VidaDental website initialized successfully!');
