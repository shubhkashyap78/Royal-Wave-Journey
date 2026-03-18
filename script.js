// Hamburger Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    document.querySelectorAll('.nav-links a, .nav-links button').forEach(link => {
        link.addEventListener('click', (e) => {
            // Keep the mobile menu open when toggling dropdowns
            if (e.currentTarget.classList.contains('dropdown-toggle')) {
                return;
            }
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });
}

// Dropdown Menu Functionality - MOBILE ONLY
document.addEventListener('DOMContentLoaded', () => {
    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(dropdown => {
        const toggle = dropdown.querySelector('.dropdown-toggle');
        
        if (toggle) {
            toggle.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                // Close other dropdowns
                dropdowns.forEach(d => {
                    if (d !== dropdown) {
                        d.classList.remove('active');
                    }
                });
                
                // Toggle current
                dropdown.classList.toggle('active');
            });
        }
    });
    
    // Close on outside click
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.dropdown')) {
            dropdowns.forEach(d => {
                d.classList.remove('active');
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
        this.intervalTime = 4000;
        this.interval = null;
        
        if (this.slider && this.images.length > 0) {
            this.init();
        }
    }
    
    init() {
        this.images.forEach((img, index) => {
            img.style.opacity = index === 0 ? '1' : '0';
            img.style.zIndex = index === 0 ? '1' : '0';
        });
        
        this.startAutoSlide();
        
        this.slider.addEventListener('mouseenter', () => this.stopAutoSlide());
        this.slider.addEventListener('mouseleave', () => this.startAutoSlide());
    }
    
    showImage(index) {
        const currentImg = this.images[this.currentIndex];
        const nextImg = this.images[index];
        
        currentImg.style.opacity = '0';
        currentImg.style.zIndex = '0';
        
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

document.addEventListener('DOMContentLoaded', () => {
    new HeroCarousel();
    new CounterAnimation();
    initWhatsAppChat();
    initScrollToTop();
});

function initScrollToTop() {
    let scrollBtn = document.getElementById('scrollToTopBtn');
    if (!scrollBtn) {
        scrollBtn = document.createElement('div');
        scrollBtn.id = 'scrollToTopBtn';
        scrollBtn.className = 'scroll-to-top';
        scrollBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
        scrollBtn.title = 'Back to Top';
        document.body.appendChild(scrollBtn);
    }
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollBtn.classList.add('show');
        } else {
            scrollBtn.classList.remove('show');
        }
    });
    
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

function initWhatsAppChat() {
    const chatBtn = document.getElementById('whatsappChatBtn');
    const chatBox = document.getElementById('whatsappChatBox');
    const closeBtn = document.getElementById('chatCloseBtn');
    const sendBtn = document.getElementById('sendChatBtn');
    const chatInput = document.getElementById('chatInput');
    const quickReplies = document.querySelectorAll('.quick-reply');
    
    if (chatBtn) {
        chatBtn.addEventListener('click', () => {
            chatBox.classList.toggle('active');
        });
    }
    
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            chatBox.classList.remove('active');
        });
    }
    
    function sendToWhatsApp(message) {
        const phoneNumber = '+919434263688';
        const encodedMessage = encodeURIComponent(`Hello! ${message}`);
        const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
        window.open(whatsappURL, '_blank');
        chatBox.classList.remove('active');
    }
    
    quickReplies.forEach(reply => {
        reply.addEventListener('click', () => {
            const message = reply.getAttribute('data-message');
            sendToWhatsApp(message);
        });
    });
    
    if (sendBtn) {
        sendBtn.addEventListener('click', () => {
            const message = chatInput.value.trim();
            if (message) {
                sendToWhatsApp(message);
                chatInput.value = '';
            }
        });
    }
    
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
    
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.whatsapp-chat-widget')) {
            chatBox.classList.remove('active');
        }
    });
}

// Smooth Scrolling for Navigation Links (excluding dropdown toggles)
document.querySelectorAll('a[href^="#"]:not(.dropdown-toggle)').forEach(anchor => {
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
        if (topNav) {
            topNav.classList.add('hidden');
        }
    } else {
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
            const duration = 2000;
            const increment = target / (duration / 16);
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

// Package Category Tabs
document.querySelectorAll('.pkg-tab').forEach(function(tab) {
    tab.addEventListener('click', function() {
        document.querySelectorAll('.pkg-tab').forEach(function(t) { t.classList.remove('active'); });
        document.querySelectorAll('.pkg-panel').forEach(function(p) { p.classList.remove('active'); });
        tab.classList.add('active');
        var panel = document.getElementById('tab-' + tab.getAttribute('data-tab'));
        if (panel) panel.classList.add('active');
    });
});
