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
        navbar.classList.remove('scrolled', 'scrolled-top', 'scroll-down', 'scroll-up', 'pulse', 'subtle-glow');
        
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
                
                // Add subtle glow effect occasionally (much less frequent and subtle)
                if (Math.random() < 0.05) {
                    navbar.classList.add('subtle-glow');
                    setTimeout(() => {
                        navbar.classList.remove('subtle-glow');
                    }, 3000);
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
     * Refined animations for navbar elements
     */
    function enhanceNavbarElements() {
        const navLinks = navbar.querySelectorAll('a');
        const brandLogo = navbar.querySelector('.btn-ghost');
        const primaryButton = navbar.querySelector('.btn-primary');
        
        // Add subtle animations to nav links - much more refined
        navLinks.forEach(link => {
            link.addEventListener('mouseenter', function() {
                if (navbar.classList.contains('scrolled')) {
                    // Very subtle scale effect
                    this.style.transform = 'translateY(-1px)';
                }
            });
            
            link.addEventListener('mouseleave', function() {
                this.style.transform = '';
            });
        });
        
        // Brand logo - remove bounce, add subtle hover
        if (brandLogo) {
            brandLogo.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-1px)';
            });
            
            brandLogo.addEventListener('mouseleave', function() {
                this.style.transform = '';
            });
            
            // Remove the bounce click animation completely
            brandLogo.addEventListener('click', function(e) {
                // Just a subtle flash effect
                this.style.transition = 'opacity 0.2s ease';
                this.style.opacity = '0.8';
                setTimeout(() => {
                    this.style.opacity = '';
                    this.style.transition = '';
                }, 200);
            });
        }
        
        // Primary button subtle glow effect
        if (primaryButton) {
            primaryButton.addEventListener('mouseenter', function() {
                if (navbar.classList.contains('scrolled')) {
                    this.style.boxShadow = '0 8px 25px rgba(59, 130, 246, 0.4)';
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
    
    // Remove the bounce keyframes completely as we're not using them anymore
    
})();