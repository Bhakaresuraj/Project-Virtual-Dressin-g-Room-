document.addEventListener('DOMContentLoaded', function() {
    // Add smooth scrolling for all links
    const links = document.querySelectorAll('a[href^="#"]');
    
    for (const link of links) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }
    
    // Catalog button in header functionality
    const headerCatalogButton = document.getElementById('header-catalog-btn');
    if (headerCatalogButton) {
        headerCatalogButton.addEventListener('click', function() {
            window.location.href = 'catalog.html'; // Redirect to catalog page
        });
    }
    
    // Footer link functionality
    const aboutLink = document.getElementById('about-link');
    const contactLink = document.getElementById('contact-link');
    const privacyLink = document.getElementById('privacy-link');
    const termsLink = document.getElementById('terms-link');
    
    if (aboutLink) {
        aboutLink.addEventListener('click', function(e) {
            e.preventDefault();
            alert('About Us page coming soon!');
        });
    }
    
    if (contactLink) {
        contactLink.addEventListener('click', function(e) {
            e.preventDefault();
            alert('Contact page coming soon!');
        });
    }
    
    if (privacyLink) {
        privacyLink.addEventListener('click', function(e) {
            e.preventDefault();
            alert('Privacy Policy page coming soon!');
        });
    }
    
    if (termsLink) {
        termsLink.addEventListener('click', function(e) {
            e.preventDefault();
            alert('Terms of Service page coming soon!');
        });
    }
    
    // Animated entrance for benefit cards
    const benefitCards = document.querySelectorAll('.benefit-card');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    benefitCards.forEach(card => {
        card.style.opacity = 0;
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(card);
    });
    
    // Add a simple GIF/image switch for the demo section
    const demoImage = document.getElementById('demo-gif');
    if (demoImage) {
        // In a real implementation, you would replace these with actual image URLs
        const staticImage = 'https://placehold.co/800x450';
        const gifImage = 'https://placehold.co/800x450'; // This would be a GIF in reality
        
        demoImage.addEventListener('mouseenter', function() {
            this.src = gifImage;
        });
        
        demoImage.addEventListener('mouseleave', function() {
            this.src = staticImage;
        });
    }
    
    // Mobile menu toggle (for smaller screens)
    const createMobileMenu = function() {
        if (window.innerWidth <= 768) {
            const nav = document.querySelector('nav');
            if (!nav.classList.contains('mobile-ready')) {
                const menuToggle = document.createElement('div');
                menuToggle.className = 'menu-toggle';
                menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
                
                const navUl = nav.querySelector('ul');
                navUl.style.display = 'none';
                
                menuToggle.addEventListener('click', function() {
                    if (navUl.style.display === 'none') {
                        navUl.style.display = 'flex';
                        navUl.style.flexDirection = 'column';
                        menuToggle.innerHTML = '<i class="fas fa-times"></i>';
                    } else {
                        navUl.style.display = 'none';
                        menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
                    }
                });
                
                nav.insertBefore(menuToggle, navUl);
                nav.classList.add('mobile-ready');
            }
        } else {
            const nav = document.querySelector('nav');
            if (nav.classList.contains('mobile-ready')) {
                const menuToggle = nav.querySelector('.menu-toggle');
                if (menuToggle) {
                    menuToggle.remove();
                }
                
                const navUl = nav.querySelector('ul');
                navUl.style.display = 'flex';
                navUl.style.flexDirection = '';
                
                nav.classList.remove('mobile-ready');
            }
        }
    };
    
    // Call initially and on window resize
    createMobileMenu();
    window.addEventListener('resize', createMobileMenu);
}); 