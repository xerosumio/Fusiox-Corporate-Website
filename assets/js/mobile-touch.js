/**
 * Mobile Touch Enhancements
 * Features: Touch gestures, swipe navigation, pull-to-refresh, touch feedback, mobile optimizations
 */

class MobileTouchEnhancements {
    constructor() {
        this.isMobile = this.detectMobile();
        this.touchStartX = 0;
        this.touchStartY = 0;
        this.touchEndX = 0;
        this.touchEndY = 0;
        this.isScrolling = false;
        this.init();
    }

    init() {
        if (!this.isMobile) return;
        
        this.setupTouchFeedback();
        this.setupSwipeGestures();
        this.setupPullToRefresh();
        this.setupTouchNavigation();
        this.setupMobileOptimizations();
        this.bindEvents();
    }

    detectMobile() {
        const userAgent = navigator.userAgent || navigator.vendor || window.opera;
        const isMobileDevice = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
        const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        const isSmallScreen = window.innerWidth <= 768;
        
        return isMobileDevice || (isTouchDevice && isSmallScreen);
    }

    setupTouchFeedback() {
        // Add haptic feedback for supported devices
        this.addHapticFeedback();
        
        // Add visual touch feedback
        this.addTouchRipple();
        
        // Improve button interactions
        this.enhanceButtonTouches();
    }

    addHapticFeedback() {
        if ('vibrate' in navigator) {
            // Light haptic feedback for buttons
            document.addEventListener('touchstart', (e) => {
                if (e.target.matches('.btn, button, .card, [role="button"]')) {
                    navigator.vibrate(10); // Very light vibration
                }
            });

            // Medium haptic feedback for form submissions
            document.addEventListener('submit', () => {
                navigator.vibrate([20, 10, 20]);
            });
        }
    }

    addTouchRipple() {
        const style = document.createElement('style');
        style.textContent = `
            .touch-ripple {
                position: relative;
                overflow: hidden;
                transform: translate3d(0, 0, 0);
            }
            
            .touch-ripple::before {
                content: '';
                position: absolute;
                top: 50%;
                left: 50%;
                width: 0;
                height: 0;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.3);
                transform: translate(-50%, -50%);
                transition: width 0.6s, height 0.6s;
                pointer-events: none;
            }
            
            .touch-ripple.ripple-active::before {
                width: 300px;
                height: 300px;
            }
            
            .touch-active {
                transform: scale(0.98);
                transition: transform 0.1s ease-out;
            }
            
            .mobile-touch-highlight {
                background-color: rgba(0, 0, 0, 0.1) !important;
                transition: background-color 0.15s ease-out;
            }
        `;
        document.head.appendChild(style);

        // Add ripple effect to buttons
        document.addEventListener('touchstart', (e) => {
            const element = e.target.closest('.btn, button, .card');
            if (element && !element.classList.contains('no-ripple')) {
                element.classList.add('touch-ripple', 'ripple-active', 'touch-active');
                
                setTimeout(() => {
                    element.classList.remove('ripple-active', 'touch-active');
                }, 600);
            }
        });
    }

    enhanceButtonTouches() {
        // Improve touch target sizes
        const style = document.createElement('style');
        style.textContent = `
            @media (max-width: 768px) {
                .btn, button, [role="button"] {
                    min-height: 44px !important;
                    min-width: 44px !important;
                    padding: 12px 16px !important;
                    touch-action: manipulation;
                }
                
                .btn-sm {
                    min-height: 36px !important;
                    padding: 8px 12px !important;
                }
                
                /* Improve form controls */
                input, textarea, select {
                    min-height: 44px !important;
                    font-size: 16px !important; /* Prevent zoom on iOS */
                    touch-action: manipulation;
                }
                
                /* Improve navigation */
                .navbar a, .menu a {
                    min-height: 44px !important;
                    display: flex !important;
                    align-items: center !important;
                    padding: 12px 16px !important;
                }
                
                /* Improve cards */
                .card {
                    margin-bottom: 16px !important;
                    touch-action: manipulation;
                }
                
                /* Improve tabs */
                .tab {
                    min-height: 44px !important;
                    padding: 12px 16px !important;
                }
            }
        `;
        document.head.appendChild(style);
    }

    setupSwipeGestures() {
        // Swipe navigation for galleries and carousels
        this.setupImageSwipe();
        this.setupTabSwipe();
        this.setupModalSwipe();
    }

    setupImageSwipe() {
        let galleryImages = [];
        let currentImageIndex = 0;

        document.addEventListener('touchstart', (e) => {
            const image = e.target.closest('img[data-lightbox], .lightbox-trigger img');
            if (image) {
                this.touchStartX = e.touches[0].clientX;
                this.touchStartY = e.touches[0].clientY;
            }
        });

        document.addEventListener('touchend', (e) => {
            const image = e.target.closest('img[data-lightbox], .lightbox-trigger img');
            if (image) {
                this.touchEndX = e.changedTouches[0].clientX;
                this.touchEndY = e.changedTouches[0].clientY;
                this.handleImageSwipe();
            }
        });
    }

    setupTabSwipe() {
        let tabContainer = null;

        document.addEventListener('touchstart', (e) => {
            const tabs = e.target.closest('.tabs');
            if (tabs) {
                tabContainer = tabs;
                this.touchStartX = e.touches[0].clientX;
                this.touchStartY = e.touches[0].clientY;
            }
        });

        document.addEventListener('touchend', (e) => {
            if (tabContainer) {
                this.touchEndX = e.changedTouches[0].clientX;
                this.touchEndY = e.changedTouches[0].clientY;
                this.handleTabSwipe(tabContainer);
                tabContainer = null;
            }
        });
    }

    setupModalSwipe() {
        document.addEventListener('touchstart', (e) => {
            const modal = e.target.closest('#modal-container .modal-content');
            if (modal) {
                this.touchStartY = e.touches[0].clientY;
            }
        });

        document.addEventListener('touchend', (e) => {
            const modal = e.target.closest('#modal-container .modal-content');
            if (modal) {
                this.touchEndY = e.changedTouches[0].clientY;
                this.handleModalSwipe();
            }
        });
    }

    setupPullToRefresh() {
        let startY = 0;
        let currentY = 0;
        let pullDistance = 0;
        let isRefreshing = false;
        const threshold = 80;

        // Create pull to refresh indicator
        const pullIndicator = document.createElement('div');
        pullIndicator.id = 'pull-to-refresh';
        pullIndicator.className = 'fixed top-0 left-1/2 transform -translate-x-1/2 -translate-y-full bg-blue-500 text-white px-4 py-2 rounded-b-lg shadow-lg z-50 transition-transform duration-300';
        pullIndicator.innerHTML = `
            <div class="flex items-center space-x-2">
                <svg class="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                </svg>
                <span>Pull to refresh</span>
            </div>
        `;
        document.body.appendChild(pullIndicator);

        document.addEventListener('touchstart', (e) => {
            if (window.pageYOffset === 0) {
                startY = e.touches[0].clientY;
            }
        });

        document.addEventListener('touchmove', (e) => {
            if (window.pageYOffset === 0 && !isRefreshing) {
                currentY = e.touches[0].clientY;
                pullDistance = currentY - startY;

                if (pullDistance > 0 && pullDistance < threshold * 2) {
                    e.preventDefault();
                    const progress = Math.min(pullDistance / threshold, 1);
                    pullIndicator.style.transform = `translateX(-50%) translateY(${-100 + (progress * 100)}%)`;
                    
                    if (pullDistance > threshold) {
                        pullIndicator.querySelector('span').textContent = 'Release to refresh';
                        pullIndicator.classList.add('bg-green-500');
                        pullIndicator.classList.remove('bg-blue-500');
                    } else {
                        pullIndicator.querySelector('span').textContent = 'Pull to refresh';
                        pullIndicator.classList.add('bg-blue-500');
                        pullIndicator.classList.remove('bg-green-500');
                    }
                }
            }
        });

        document.addEventListener('touchend', (e) => {
            if (pullDistance > threshold && !isRefreshing) {
                isRefreshing = true;
                pullIndicator.querySelector('span').textContent = 'Refreshing...';
                pullIndicator.style.transform = 'translateX(-50%) translateY(0)';
                
                // Simulate refresh
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            } else {
                pullIndicator.style.transform = 'translateX(-50%) translateY(-100%)';
            }
            pullDistance = 0;
        });
    }

    setupTouchNavigation() {
        // Improve mobile navigation
        this.enhanceMobileMenu();
        this.addTouchScrolling();
        this.setupEdgeSwipe();
    }

    enhanceMobileMenu() {
        const style = document.createElement('style');
        style.textContent = `
            @media (max-width: 768px) {
                .dropdown-content {
                    max-height: 70vh !important;
                    overflow-y: auto !important;
                    -webkit-overflow-scrolling: touch !important;
                }
                
                .mobile-menu-backdrop {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(0, 0, 0, 0.5);
                    z-index: 49;
                    opacity: 0;
                    visibility: hidden;
                    transition: all 0.3s ease;
                }
                
                .mobile-menu-backdrop.active {
                    opacity: 1;
                    visibility: visible;
                }
                
                .navbar .dropdown:focus-within .mobile-menu-backdrop {
                    opacity: 1;
                    visibility: visible;
                }
            }
        `;
        document.head.appendChild(style);

        // Add backdrop for mobile menus
        document.addEventListener('click', (e) => {
            if (e.target.matches('.dropdown [role="button"]')) {
                const dropdown = e.target.closest('.dropdown');
                if (dropdown && window.innerWidth <= 768) {
                    const backdrop = document.createElement('div');
                    backdrop.className = 'mobile-menu-backdrop';
                    document.body.appendChild(backdrop);
                    
                    setTimeout(() => backdrop.classList.add('active'), 10);
                    
                    backdrop.addEventListener('click', () => {
                        dropdown.blur();
                        backdrop.remove();
                    });
                }
            }
        });
    }

    addTouchScrolling() {
        // Improve touch scrolling for containers
        document.querySelectorAll('.overflow-auto, .overflow-y-auto, .overflow-x-auto').forEach(container => {
            container.style.webkitOverflowScrolling = 'touch';
            container.style.overscrollBehavior = 'contain';
        });
    }

    setupEdgeSwipe() {
        let edgeThreshold = 20;
        
        document.addEventListener('touchstart', (e) => {
            const touch = e.touches[0];
            
            // Left edge swipe for navigation
            if (touch.clientX < edgeThreshold) {
                this.touchStartX = touch.clientX;
                this.touchStartY = touch.clientY;
            }
            
            // Right edge swipe for back
            if (touch.clientX > window.innerWidth - edgeThreshold) {
                this.touchStartX = touch.clientX;
                this.touchStartY = touch.clientY;
            }
        });

        document.addEventListener('touchend', (e) => {
            const touch = e.changedTouches[0];
            this.touchEndX = touch.clientX;
            this.touchEndY = touch.clientY;
            
            this.handleEdgeSwipe();
        });
    }

    setupMobileOptimizations() {
        // Prevent zoom on double tap
        let lastTouchEnd = 0;
        document.addEventListener('touchend', (e) => {
            const now = (new Date()).getTime();
            if (now - lastTouchEnd <= 300) {
                e.preventDefault();
            }
            lastTouchEnd = now;
        }, false);

        // Optimize viewport for mobile
        this.optimizeViewport();
        
        // Add mobile-specific styles
        this.addMobileStyles();
        
        // Improve form experience
        this.improveMobileForms();
    }

    optimizeViewport() {
        let viewport = document.querySelector("meta[name=viewport]");
        if (!viewport) {
            viewport = document.createElement('meta');
            viewport.name = 'viewport';
            document.head.appendChild(viewport);
        }
        viewport.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover';
    }

    addMobileStyles() {
        const style = document.createElement('style');
        style.textContent = `
            @media (max-width: 768px) {
                /* Improve readability */
                body {
                    font-size: 16px !important;
                    line-height: 1.6 !important;
                }
                
                /* Better spacing */
                .container {
                    padding-left: 16px !important;
                    padding-right: 16px !important;
                }
                
                /* Improve hero sections */
                .hero {
                    min-height: 60vh !important;
                    padding: 2rem 1rem !important;
                }
                
                /* Better cards */
                .card {
                    border-radius: 12px !important;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1) !important;
                }
                
                /* Improve modals */
                .modal-content {
                    margin: 1rem !important;
                    max-height: 90vh !important;
                    border-radius: 16px !important;
                }
                
                /* Better forms */
                .form-control {
                    border-radius: 8px !important;
                    border: 2px solid #e2e8f0 !important;
                }
                
                .form-control:focus {
                    border-color: #3b82f6 !important;
                    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1) !important;
                }
                
                /* Improve tables */
                .table-responsive {
                    border-radius: 8px !important;
                    overflow: hidden !important;
                }
                
                /* Better animations */
                * {
                    -webkit-tap-highlight-color: rgba(0, 0, 0, 0) !important;
                }
                
                /* Improve scroll performance */
                * {
                    -webkit-transform: translateZ(0) !important;
                    transform: translateZ(0) !important;
                }
            }
            
            /* Safe area support for notched devices */
            @supports (padding-top: constant(safe-area-inset-top)) {
                .navbar {
                    padding-top: constant(safe-area-inset-top) !important;
                }
            }
            
            @supports (padding-top: env(safe-area-inset-top)) {
                .navbar {
                    padding-top: env(safe-area-inset-top) !important;
                }
            }
        `;
        document.head.appendChild(style);
    }

    improveMobileForms() {
        // Auto-focus first form field on mobile (with delay)
        document.addEventListener('DOMContentLoaded', () => {
            const firstInput = document.querySelector('form input:not([type="hidden"]), form textarea, form select');
            if (firstInput && this.isMobile) {
                // Delay to avoid keyboard issues
                setTimeout(() => {
                    firstInput.focus();
                }, 500);
            }
        });

        // Improve form validation display
        document.addEventListener('invalid', (e) => {
            e.target.style.borderColor = '#ef4444';
            e.target.style.boxShadow = '0 0 0 3px rgba(239, 68, 68, 0.1)';
        }, true);

        document.addEventListener('input', (e) => {
            if (e.target.checkValidity()) {
                e.target.style.borderColor = '#10b981';
                e.target.style.boxShadow = '0 0 0 3px rgba(16, 185, 129, 0.1)';
            } else {
                e.target.style.borderColor = '#e2e8f0';
                e.target.style.boxShadow = 'none';
            }
        });
    }

    handleImageSwipe() {
        const deltaX = this.touchEndX - this.touchStartX;
        const deltaY = this.touchEndY - this.touchStartY;
        const minSwipeDistance = 50;

        if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > minSwipeDistance) {
            if (deltaX > 0) {
                // Swipe right - previous image
                const prevBtn = document.querySelector('.lightbox-prev');
                if (prevBtn) prevBtn.click();
            } else {
                // Swipe left - next image
                const nextBtn = document.querySelector('.lightbox-next');
                if (nextBtn) nextBtn.click();
            }
        }
    }

    handleTabSwipe(tabContainer) {
        const deltaX = this.touchEndX - this.touchStartX;
        const minSwipeDistance = 80;

        if (Math.abs(deltaX) > minSwipeDistance) {
            const tabs = Array.from(tabContainer.querySelectorAll('.tab'));
            const activeTab = tabContainer.querySelector('.tab-active');
            const currentIndex = tabs.indexOf(activeTab);

            if (deltaX > 0 && currentIndex > 0) {
                // Swipe right - previous tab
                tabs[currentIndex - 1].click();
            } else if (deltaX < 0 && currentIndex < tabs.length - 1) {
                // Swipe left - next tab
                tabs[currentIndex + 1].click();
            }
        }
    }

    handleModalSwipe() {
        const deltaY = this.touchEndY - this.touchStartY;
        const minSwipeDistance = 100;

        if (deltaY > minSwipeDistance) {
            // Swipe down - close modal
            if (window.ModalSystem) {
                window.ModalSystem.closeModal();
            }
        }
    }

    handleEdgeSwipe() {
        const deltaX = this.touchEndX - this.touchStartX;
        const deltaY = this.touchEndY - this.touchStartY;
        const minSwipeDistance = 100;

        // Only handle horizontal swipes
        if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > minSwipeDistance) {
            if (this.touchStartX < 20 && deltaX > 0) {
                // Left edge swipe right - open menu
                const menuToggle = document.querySelector('.navbar .dropdown [role="button"]');
                if (menuToggle) menuToggle.click();
            } else if (this.touchStartX > window.innerWidth - 20 && deltaX < 0) {
                // Right edge swipe left - go back
                if (window.history.length > 1) {
                    window.history.back();
                }
            }
        }
    }

    bindEvents() {
        // Prevent context menu on long press for better UX
        document.addEventListener('contextmenu', (e) => {
            if (this.isMobile && e.target.matches('.btn, button, .card, [role="button"]')) {
                e.preventDefault();
            }
        });

        // Improve scroll performance
        document.addEventListener('touchstart', () => {
            document.body.classList.add('touch-scrolling');
        });

        document.addEventListener('touchend', () => {
            setTimeout(() => {
                document.body.classList.remove('touch-scrolling');
            }, 100);
        });

        // Handle orientation change
        window.addEventListener('orientationchange', () => {
            setTimeout(() => {
                window.scrollTo(0, 1); // Hide address bar
            }, 500);
        });

        // Optimize performance during scrolling
        let scrollTimer;
        window.addEventListener('scroll', () => {
            document.body.classList.add('scrolling');
            clearTimeout(scrollTimer);
            scrollTimer = setTimeout(() => {
                document.body.classList.remove('scrolling');
            }, 100);
        });
    }

    // Public API methods
    enableTouch() {
        this.isMobile = true;
        this.init();
    }

    disableTouch() {
        this.isMobile = false;
        // Remove mobile-specific event listeners
    }

    static getInstance() {
        if (!MobileTouchEnhancements.instance) {
            MobileTouchEnhancements.instance = new MobileTouchEnhancements();
        }
        return MobileTouchEnhancements.instance;
    }
}

// Auto-initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.MobileTouchEnhancements = MobileTouchEnhancements.getInstance();
});

// Export for module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MobileTouchEnhancements;
} 