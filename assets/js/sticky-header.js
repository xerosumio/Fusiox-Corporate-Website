/**
 * Sticky Header with Scroll Animations
 * Handles scroll detection and applies appropriate classes for animations
 */

(function() {
    'use strict';
    
    let lastScrollTop = 0;
    let scrollThreshold = 50;
    let ticking = false;
    
    // Get the navbar element
    const navbar = document.querySelector('.navbar');
    
    if (!navbar) {
        console.warn('Navbar element not found');
        return;
    }
    
    // Initialize navbar state
    navbar.classList.add('scrolled-top');
    
    /**
     * Update navbar classes based on scroll position and direction
     */
    function updateNavbar() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollDirection = scrollTop > lastScrollTop ? 'down' : 'up';
        
        // Remove all scroll-related classes first
        navbar.classList.remove('scrolled', 'scrolled-top', 'scroll-down', 'scroll-up', 'pulse');
        
        if (scrollTop <= scrollThreshold) {
            // At the top of the page
            navbar.classList.add('scrolled-top');
        } else {
            // Scrolled down from top
            navbar.classList.add('scrolled');
            
            // Add scroll direction classes for animations
            if (scrollDirection === 'down' && scrollTop > lastScrollTop + 10) {
                // Only hide if scrolling down significantly
                navbar.classList.add('scroll-down');
            } else if (scrollDirection === 'up') {
                // Show on any upward scroll
                navbar.classList.add('scroll-up');
                
                // Add pulse animation occasionally
                if (Math.random() < 0.3) {
                    navbar.classList.add('pulse');
                    setTimeout(() => {
                        navbar.classList.remove('pulse');
                    }, 2000);
                }
            }
        }
        
        lastScrollTop = scrollTop;
        ticking = false;
    }
    
    /**
     * Request animation frame for smooth performance
     */
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateNavbar);
            ticking = true;
        }
    }
    
    /**
     * Handle scroll events with throttling
     */
    function handleScroll() {
        requestTick();
    }
    
    /**
     * Handle scroll events on mobile devices
     */
    function handleTouchScroll() {
        requestTick();
    }
    
    /**
     * Initialize event listeners
     */
    function init() {
        // Passive event listeners for better performance
        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('touchmove', handleTouchScroll, { passive: true });
        
        // Handle page load
        window.addEventListener('load', updateNavbar);
        
        // Handle window resize
        window.addEventListener('resize', function() {
            requestTick();
        }, { passive: true });
        
        // Initial call
        updateNavbar();
        
        console.log('Sticky header initialized successfully');
    }
    
    /**
     * Enhanced animations for navbar elements
     */
    function enhanceNavbarElements() {
        const navLinks = navbar.querySelectorAll('a');
        const brandLogo = navbar.querySelector('.btn-ghost');
        const primaryButton = navbar.querySelector('.btn-primary');
        
        // Add subtle animations to nav links
        navLinks.forEach(link => {
            link.addEventListener('mouseenter', function() {
                if (navbar.classList.contains('scrolled')) {
                    this.style.transform = 'scale(1.05) translateY(-2px)';
                    this.style.textShadow = '0 2px 4px rgba(255, 107, 107, 0.3)';
                }
            });
            
            link.addEventListener('mouseleave', function() {
                this.style.transform = '';
                this.style.textShadow = '';
            });
        });
        
        // Brand logo special animation
        if (brandLogo) {
            brandLogo.addEventListener('click', function(e) {
                // Add a bounce effect when logo is clicked
                this.style.animation = 'none';
                setTimeout(() => {
                    this.style.animation = 'bounce 0.6s ease-in-out';
                }, 10);
                
                setTimeout(() => {
                    this.style.animation = '';
                }, 600);
            });
        }
        
        // Primary button glow effect
        if (primaryButton) {
            primaryButton.addEventListener('mouseenter', function() {
                if (navbar.classList.contains('scrolled')) {
                    this.style.boxShadow = '0 8px 30px rgba(59, 130, 246, 0.4)';
                }
            });
            
            primaryButton.addEventListener('mouseleave', function() {
                this.style.boxShadow = '';
            });
        }
    }
    
    /**
     * Add smooth scroll behavior to internal links
     */
    function addSmoothScrolling() {
        const internalLinks = navbar.querySelectorAll('a[href^="#"]');
        
        internalLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    e.preventDefault();
                    const offsetTop = targetElement.offsetTop - navbar.offsetHeight - 20;
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            init();
            enhanceNavbarElements();
            addSmoothScrolling();
        });
    } else {
        init();
        enhanceNavbarElements();
        addSmoothScrolling();
    }
    
    // Add bounce keyframes if not already present
    if (!document.querySelector('#bounce-keyframes')) {
        const style = document.createElement('style');
        style.id = 'bounce-keyframes';
        style.textContent = `
            @keyframes bounce {
                0%, 20%, 53%, 80%, 100% {
                    transform: translate3d(0,0,0);
                }
                40%, 43% {
                    transform: translate3d(0,-15px,0);
                }
                70% {
                    transform: translate3d(0,-7px,0);
                }
                90% {
                    transform: translate3d(0,-2px,0);
                }
            }
        `;
        document.head.appendChild(style);
    }
    
})();