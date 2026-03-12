// Mobile Dropdown Handler with Debugging
console.log('Mobile dropdown handler loaded');

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM Content Loaded');
    console.log('Window width:', window.innerWidth);
    
    if (window.innerWidth <= 768) {
        console.log('Mobile view detected');
        
        const dropdowns = document.querySelectorAll('.dropdown');
        console.log('Found dropdowns:', dropdowns.length);
        
        dropdowns.forEach((dropdown, index) => {
            const toggle = dropdown.querySelector('.dropdown-toggle');
            const menu = dropdown.querySelector('.dropdown-menu');
            
            console.log(`Dropdown ${index}:`, {toggle: !!toggle, menu: !!menu});
            
            if (toggle) {
                toggle.style.cursor = 'pointer';
                
                toggle.addEventListener('click', function(e) {
                    console.log('Dropdown toggle clicked');
                    e.preventDefault();
                    e.stopPropagation();
                    
                    // Close all other dropdowns
                    dropdowns.forEach(d => {
                        if (d !== dropdown) {
                            d.classList.remove('active');
                        }
                    });
                    
                    // Toggle current dropdown
                    dropdown.classList.toggle('active');
                    console.log('Dropdown active:', dropdown.classList.contains('active'));
                });
            }
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.dropdown')) {
                dropdowns.forEach(d => {
                    d.classList.remove('active');
                });
            }
        });
    }
});
