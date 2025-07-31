/**
 * Simple Sticky Header - NO ANIMATIONS
 * Just handles background changes on scroll
 */

(function() {
    'use strict';
    
    // Get the navbar element
    const navbar = document.querySelector('.navbar');
    
    if (!navbar) {
        console.warn('Navbar element not found');
        return;
    }
    
    // Force navbar to always be visible immediately
    navbar.style.position = 'fixed';
    navbar.style.top = '0';
    navbar.style.transform = 'translateY(0)';
    navbar.style.opacity = '1';
    navbar.style.visibility = 'visible';
    navbar.style.zIndex = '1000';
    
    let scrollThreshold = 30;
    let ticking = false;
    
    /**
     * Simple update - only change background, never hide
     */
    function updateNavbar() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Force visible at all times
        navbar.style.transform = 'translateY(0)';
        navbar.style.opacity = '1';
        navbar.style.visibility = 'visible';
        
        // Only change classes for background styling
        if (scrollTop <= scrollThreshold) {
            navbar.classList.remove('scrolled');
            navbar.classList.add('scrolled-top');
        } else {
            navbar.classList.remove('scrolled-top');
            navbar.classList.add('scrolled');
        }
        
        ticking = false;
    }
    
    /**
     * Throttled scroll handler
     */
    function handleScroll() {
        if (!ticking) {
            requestAnimationFrame(updateNavbar);
            ticking = true;
        }
    }
    
    // Add scroll listener
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Initial call
    updateNavbar();
    
    console.log('Simple sticky header initialized - navbar will always be visible');
    
})();