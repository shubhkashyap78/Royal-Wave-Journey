// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Form submission handler
document.querySelector('.enquiry-form').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Thank you for your enquiry! We will get back to you soon.');
    this.reset();
});

// Image Slider with Puzzle Animation
let currentSlide = 0;

function startSlider() {
    const slides = document.querySelectorAll('.hero-slider img');
    
    if (slides.length === 0) return;
    
    // Hide all slides initially
    slides.forEach(slide => {
        slide.style.display = 'none';
    });
    
    // Show first slide
    slides[0].style.display = 'block';
    
    // Auto rotate slides with puzzle animation
    setInterval(() => {
        const currentImg = slides[currentSlide];
        const nextSlide = (currentSlide + 1) % slides.length;
        const nextImg = slides[nextSlide];
        
        // Break current image
        currentImg.classList.add('puzzle-out');
        
        setTimeout(() => {
            currentImg.style.display = 'none';
            currentImg.classList.remove('puzzle-out');
            
            // Show and assemble next image
            nextImg.style.display = 'block';
            nextImg.classList.add('puzzle-in');
            
            setTimeout(() => {
                nextImg.classList.remove('puzzle-in');
            }, 800);
            
            currentSlide = nextSlide;
        }, 800);
    }, 4000);
}

// Start when page loads
window.addEventListener('load', startSlider);

// Handle quick form submission
document.querySelector('.quick-form').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Thank you! We will contact you soon.');
    this.reset();
});

// Destination Cards Animation on Scroll
function animateOnScroll() {
    const destinationCards = document.querySelectorAll('.destination-card');
    const destinationSection = document.querySelector('.destinations');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                destinationCards.forEach((card, index) => {
                    setTimeout(() => {
                        card.style.animation = card.classList.contains('slide-right') 
                            ? 'slideInRight 0.8s ease-out forwards'
                            : 'slideInLeft 0.8s ease-out forwards';
                    }, index * 200);
                });
            }
        });
    }, { threshold: 0.3 });
    
    if (destinationSection) {
        observer.observe(destinationSection);
    }
}

// Initialize animations
document.addEventListener('DOMContentLoaded', animateOnScroll);

// Counter Animation
function animateCounters() {
    const counters = document.querySelectorAll('.counter');
    const speed = 200;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = +counter.innerText;
                const increment = target / speed;
                let current = 0;
                
                const updateCounter = () => {
                    if (current < target) {
                        current += increment;
                        counter.innerText = Math.ceil(current);
                        setTimeout(updateCounter, 10);
                    } else {
                        counter.innerText = target;
                    }
                };
                
                updateCounter();
                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => {
        observer.observe(counter);
    });
}

// Initialize counter animation
document.addEventListener('DOMContentLoaded', animateCounters);

// Fleet Carousel Auto Scroll
function initFleetCarousel() {
    const fleetGrid = document.querySelector('.fleet-grid');
    if (!fleetGrid) return;
    
    let scrollAmount = 0;
    const cardWidth = 300; // 280px + 20px gap
    const totalCards = document.querySelectorAll('.fleet-card').length;
    const maxScroll = (totalCards - 1) * cardWidth;
    
    function autoScroll() {
        scrollAmount += cardWidth;
        
        if (scrollAmount > maxScroll) {
            scrollAmount = 0;
        }
        
        fleetGrid.scrollTo({
            left: scrollAmount,
            behavior: 'smooth'
        });
    }
    
    // Auto scroll every 4 seconds
    setInterval(autoScroll, 4000);
    
    // Pause auto scroll on hover
    fleetGrid.addEventListener('mouseenter', () => {
        clearInterval(autoScroll);
    });
}

// Initialize fleet carousel
document.addEventListener('DOMContentLoaded', initFleetCarousel);

// Testimonial Auto Switch
function initTestimonialSlider() {
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const testimonialImages = document.querySelectorAll('.testimonial-image');
    let currentIndex = 0;
    
    function switchTestimonial() {
        // Hide all cards and images
        testimonialCards.forEach(card => card.classList.remove('active'));
        testimonialImages.forEach(image => image.classList.remove('active'));
        
        // Show current card and image
        testimonialCards[currentIndex].classList.add('active');
        testimonialImages[currentIndex].classList.add('active');
        
        // Move to next testimonial
        currentIndex = (currentIndex + 1) % testimonialCards.length;
    }
    
    // Auto switch every 5 seconds
    setInterval(switchTestimonial, 5000);
}

// Initialize testimonial slider
document.addEventListener('DOMContentLoaded', initTestimonialSlider);