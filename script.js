// Hamburger Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });
}

// Dropdown Menu Functionality
document.addEventListener('DOMContentLoaded', () => {
    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(dropdown => {
        const toggle = dropdown.querySelector('.dropdown-toggle');
        
        // Desktop hover functionality is handled by CSS
        // Mobile click functionality
        if (toggle) {
            toggle.addEventListener('click', (e) => {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    dropdown.classList.toggle('active');
                    
                    // Close other dropdowns
                    dropdowns.forEach(otherDropdown => {
                        if (otherDropdown !== dropdown) {
                            otherDropdown.classList.remove('active');
                        }
                    });
                }
            });
        }
    });
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.dropdown')) {
            dropdowns.forEach(dropdown => {
                dropdown.classList.remove('active');
            });
        }
    });
});

// Hero Image Carousel
class HeroCarousel {
    constructor() {
        this.slider = document.querySelector('.hero-slider');
        this.images = document.querySelectorAll('.hero-slider img');
        this.currentIndex = 0;
        this.intervalTime = 4000; // 4 seconds
        this.interval = null;
        
        if (this.slider && this.images.length > 0) {
            this.init();
        }
    }
    
    init() {
        // Hide all images initially
        this.images.forEach((img, index) => {
            img.style.opacity = index === 0 ? '1' : '0';
            img.style.zIndex = index === 0 ? '1' : '0';
        });
        
        // Start auto-slide
        this.startAutoSlide();
        
        // Pause on hover
        this.slider.addEventListener('mouseenter', () => this.stopAutoSlide());
        this.slider.addEventListener('mouseleave', () => this.startAutoSlide());
    }
    
    showImage(index) {
        const currentImg = this.images[this.currentIndex];
        const nextImg = this.images[index];
        
        // Fade out current image
        currentImg.style.opacity = '0';
        currentImg.style.zIndex = '0';
        
        // Fade in next image
        nextImg.style.opacity = '1';
        nextImg.style.zIndex = '1';
        
        this.currentIndex = index;
    }
    
    nextImage() {
        const nextIndex = (this.currentIndex + 1) % this.images.length;
        this.showImage(nextIndex);
    }
    
    startAutoSlide() {
        this.interval = setInterval(() => {
            this.nextImage();
        }, this.intervalTime);
    }
    
    stopAutoSlide() {
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }
    }
}

// Initialize carousel and counter when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new HeroCarousel();
    new CounterAnimation();
    initWhatsAppChat();
    initScrollToTop();
});

// Scroll to Top Functionality
function initScrollToTop() {
    // Create scroll to top button if it doesn't exist
    let scrollBtn = document.getElementById('scrollToTopBtn');
    if (!scrollBtn) {
        scrollBtn = document.createElement('div');
        scrollBtn.id = 'scrollToTopBtn';
        scrollBtn.className = 'scroll-to-top';
        scrollBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
        scrollBtn.title = 'Back to Top';
        document.body.appendChild(scrollBtn);
    }
    
    // Show/hide scroll button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollBtn.classList.add('show');
        } else {
            scrollBtn.classList.remove('show');
        }
    });
    
    // Scroll to top when clicked
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// WhatsApp Chat Widget Functionality
function initWhatsAppChat() {
    const chatBtn = document.getElementById('whatsappChatBtn');
    const chatBox = document.getElementById('whatsappChatBox');
    const closeBtn = document.getElementById('chatCloseBtn');
    const sendBtn = document.getElementById('sendChatBtn');
    const chatInput = document.getElementById('chatInput');
    const quickReplies = document.querySelectorAll('.quick-reply');
    
    // Toggle chat box
    if (chatBtn) {
        chatBtn.addEventListener('click', () => {
            chatBox.classList.toggle('active');
        });
    }
    
    // Close chat box
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            chatBox.classList.remove('active');
        });
    }
    
    // Send message to WhatsApp
    function sendToWhatsApp(message) {
        const phoneNumber = '+919242178600'; // Your WhatsApp number
        const encodedMessage = encodeURIComponent(`Hello! ${message}`);
        const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
        window.open(whatsappURL, '_blank');
        chatBox.classList.remove('active');
    }
    
    // Handle quick replies
    quickReplies.forEach(reply => {
        reply.addEventListener('click', () => {
            const message = reply.getAttribute('data-message');
            sendToWhatsApp(message);
        });
    });
    
    // Handle send button
    if (sendBtn) {
        sendBtn.addEventListener('click', () => {
            const message = chatInput.value.trim();
            if (message) {
                sendToWhatsApp(message);
                chatInput.value = '';
            }
        });
    }
    
    // Handle enter key
    if (chatInput) {
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const message = chatInput.value.trim();
                if (message) {
                    sendToWhatsApp(message);
                    chatInput.value = '';
                }
            }
        });
    }
    
    // Close chat when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.whatsapp-chat-widget')) {
            chatBox.classList.remove('active');
        }
    });
}

// Form Submission Handler - Now handled by EmailJS in index.html

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Hide Top Navigation on Scroll
let lastScrollTop = 0;
const topNav = document.querySelector('.top-nav');

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 50) {
        // Scrolling down - hide top nav
        if (topNav) {
            topNav.classList.add('hidden');
        }
    } else {
        // At top - show top nav
        if (topNav) {
            topNav.classList.remove('hidden');
        }
    }
    
    lastScrollTop = scrollTop;
});

// Counter Animation
class CounterAnimation {
    constructor() {
        this.counters = document.querySelectorAll('.counter');
        this.hasAnimated = false;
        this.init();
    }
    
    init() {
        if (this.counters.length > 0) {
            this.observeCounters();
        }
    }
    
    observeCounters() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.hasAnimated) {
                    this.startCounting();
                    this.hasAnimated = true;
                }
            });
        }, { threshold: 0.5 });
        
        const clientCountSection = document.querySelector('.client-count');
        if (clientCountSection) {
            observer.observe(clientCountSection);
        }
    }
    
    startCounting() {
        this.counters.forEach(counter => {
            const target = parseInt(counter.textContent);
            const duration = 2000; // 2 seconds
            const increment = target / (duration / 16); // 60fps
            let current = 0;
            
            counter.textContent = '0';
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    counter.textContent = target;
                    clearInterval(timer);
                } else {
                    counter.textContent = Math.floor(current);
                }
            }, 16);
        });
    }
}