/**
 * Scroll Progress Indicator and Scroll Enhancements
 * Features: Progress bar, smooth scrolling, back-to-top, scroll animations
 */

class ScrollProgress {
    constructor() {
        this.scrollElements = new Map();
        this.isScrolling = false;
        this.init();
    }

    init() {
        this.createProgressBar();
        this.createBackToTop();
        this.setupSmoothScrolling();
        this.setupScrollAnimations();
        this.bindEvents();
        this.injectProgressStyles();
    }

    injectProgressStyles() {
        const style = document.createElement('style');
        style.textContent = `
            /* Refined Scroll Progress Styles */
            #reading-progress {
                backdrop-filter: blur(8px);
                -webkit-backdrop-filter: blur(8px);
                border-radius: 50%;
                box-shadow: 0 2px 16px rgba(80, 80, 160, 0.13), 0 1.5px 8px rgba(80, 80, 160, 0.08);
                background: none;
            }
            .reading-progress-container {
                width: 68px;
                height: 68px;
                position: relative;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .progress-background {
                background: rgba(255,255,255,0.55);
                box-shadow: 0 2px 8px rgba(80, 80, 160, 0.08) inset, 0 0.5px 2px rgba(80, 80, 160, 0.06);
                border-radius: 50%;
                border: 1.5px solid rgba(120,120,180,0.08);
            }
            .progress-svg {
                filter: drop-shadow(0 2px 8px rgba(102, 126, 234, 0.13));
                transition: filter 0.3s;
                display: block;
                margin: 0 auto;
            }
            .reading-progress-circle {
                stroke-width: 6.5;
                transition: stroke-dashoffset 0.5s cubic-bezier(0.4, 0, 0.2, 1);
                stroke-linecap: round;
                stroke: url(#progressGradient);
            }
            .progress-bg-circle {
                stroke-width: 3.5;
            }
            .reading-progress-text {
                font-size: 1.25rem;
                font-weight: 800;
                fill: #232946;
                text-anchor: middle;
                dominant-baseline: middle;
                filter: drop-shadow(0 1px 2px rgba(0,0,0,0.13));
                paint-order: stroke fill;
                stroke: #fff;
                stroke-width: 0.7px;
                letter-spacing: 0.5px;
                alignment-baseline: middle;
            }
            #reading-progress:hover {
                transform: scale(1.06);
                box-shadow: 0 8px 32px rgba(102, 126, 234, 0.13), 0 2px 8px rgba(0,0,0,0.08);
            }
            #reading-progress:active {
                transform: scale(0.97);
            }
            @media (max-width: 768px) {
                .reading-progress-container { width: 52px; height: 52px; }
                .reading-progress-text { font-size: 0.95rem; }
            }
            
            /* Milestone pulse animation */
            .milestone-pulse {
                animation: milestonePulse 0.6s ease-out;
            }
            
            @keyframes milestonePulse {
                0% { transform: scale(1); }
                50% { transform: scale(1.15); }
                100% { transform: scale(1); }
            }
            
            /* Hover effects */
            #reading-progress:hover .progress-background {
                background: linear-gradient(135deg, 
                    rgba(255, 255, 255, 0.98) 0%, 
                    rgba(239, 246, 255, 0.95) 100%);
                box-shadow: 
                    0 12px 40px rgba(102, 126, 234, 0.2),
                    0 4px 16px rgba(0, 0, 0, 0.1),
                    inset 0 1px 0 rgba(255, 255, 255, 0.9);
            }
            
            #reading-progress:hover .progress-svg {
                filter: drop-shadow(0 4px 16px rgba(102, 126, 234, 0.4));
            }
            
            #reading-progress:hover .reading-progress-circle {
                stroke-width: 3;
                animation: progressGlow 2s ease-in-out infinite;
            }
            
            @keyframes progressGlow {
                0%, 100% { 
                    filter: url(#progressGlow) drop-shadow(0 0 4px rgba(102, 126, 234, 0.5)); 
                }
                50% { 
                    filter: url(#progressGlow) drop-shadow(0 0 8px rgba(102, 126, 234, 0.8)); 
                }
            }
            
            /* Active/click animation */
            #reading-progress:active {
                transform: scale(0.95);
                transition: transform 0.1s ease-out;
            }
            
            /* Responsive adjustments */
            @media (max-width: 768px) {
                .reading-progress-container {
                    width: 56px;
                    height: 56px;
                }
                
                .reading-progress-text {
                    font-size: 0.75rem;
                }
                
                .reading-progress-label {
                    font-size: 0.6rem;
                }
            }
            
            /* Enhanced back to top button */
            #back-to-top {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                box-shadow: 
                    0 4px 16px rgba(102, 126, 234, 0.3),
                    0 2px 8px rgba(0, 0, 0, 0.1);
                backdrop-filter: blur(10px);
                -webkit-backdrop-filter: blur(10px);
                border: 1px solid rgba(255, 255, 255, 0.2);
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            }
            
            #back-to-top:hover {
                background: linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%);
                box-shadow: 
                    0 8px 32px rgba(102, 126, 234, 0.4),
                    0 4px 16px rgba(0, 0, 0, 0.15);
                transform: translateY(-2px);
            }
            
            #back-to-top:active {
                transform: translateY(0) scale(0.95);
            }
        `;
        document.head.appendChild(style);
    }

    createProgressBar() {
        // Create scroll progress bar
        const progressBar = document.createElement('div');
        progressBar.id = 'scroll-progress';
        progressBar.className = 'fixed top-0 left-0 w-full h-1 z-40 bg-gradient-to-r from-blue-500 to-purple-600 transform scale-x-0 origin-left transition-transform duration-150';
        document.body.appendChild(progressBar);

        // Create reading progress indicator
        const readingProgress = document.createElement('div');
        readingProgress.id = 'reading-progress';
        readingProgress.className = 'fixed bottom-4 left-4 z-40 hidden transition-all duration-500 cursor-pointer group';
        readingProgress.innerHTML = `
            <div class="reading-progress-container relative">
                <!-- Background Circle with Glow -->
                <div class="progress-background absolute inset-0 rounded-full bg-gradient-to-br from-white to-blue-50 shadow-2xl border border-blue-100/50 transition-all duration-300 group-hover:shadow-blue-200/50 group-hover:scale-110"></div>
                
                <!-- Progress Circle -->
                <div class="relative w-16 h-16 p-2">
                    <svg class="w-full h-full transform -rotate-90 progress-svg" viewBox="0 0 36 36">
                        <!-- Background Circle -->
                        <circle 
                            class="progress-bg-circle" 
                            cx="18" 
                            cy="18" 
                            r="15.5" 
                            fill="none" 
                            stroke="rgba(59, 130, 246, 0.1)" 
                            stroke-width="2"
                        />
                        
                        <!-- Progress Circle -->
                        <circle 
                            class="reading-progress-circle" 
                            cx="18" 
                            cy="18" 
                            r="15.5" 
                            fill="none" 
                            stroke="url(#progressGradient)" 
                            stroke-width="2.5" 
                            stroke-linecap="round" 
                            stroke-dasharray="97.389, 97.389" 
                            stroke-dashoffset="97.389"
                        />
                        
                        <!-- Gradient Definition -->
                        <defs>
                            <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" style="stop-color:#667eea;stop-opacity:1" />
                                <stop offset="50%" style="stop-color:#764ba2;stop-opacity:1" />
                                <stop offset="100%" style="stop-color:#667eea;stop-opacity:1" />
                            </linearGradient>
                            
                            <filter id="progressGlow">
                                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                                <feMerge> 
                                    <feMergeNode in="coloredBlur"/>
                                    <feMergeNode in="SourceGraphic"/>
                                </feMerge>
                            </filter>
                        </defs>
                    </svg>
                    
                    <!-- Center Content -->
                    <div class="absolute inset-0 flex items-center justify-center">
                        <div class="text-center">
                            <div class="reading-progress-text text-sm font-bold text-gray-700 leading-none transition-all duration-300 group-hover:text-blue-600">0%</div>
                            <div class="reading-progress-label text-xs text-gray-500 mt-1 opacity-0 group-hover:opacity-100 transition-all duration-300">Read</div>
                        </div>
                    </div>
                </div>
                
                <!-- Pulse Animation Ring -->
                <div class="progress-pulse absolute inset-0 rounded-full border-2 border-blue-400/30 opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
            </div>
        `;
        document.body.appendChild(readingProgress);
    }

    createBackToTop() {
        const backToTop = document.createElement('button');
        backToTop.id = 'back-to-top';
        backToTop.className = 'fixed bottom-4 right-4 bg-blue-600 text-white p-3 rounded-full shadow-lg z-40 opacity-0 transform translate-y-4 transition-all duration-300 hover:bg-blue-700 hover:scale-110';
        backToTop.innerHTML = `
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
            </svg>
        `;
        backToTop.setAttribute('aria-label', 'Back to top');
        document.body.appendChild(backToTop);

        // Add click handler
        backToTop.addEventListener('click', () => {
            this.scrollToTop();
        });
    }

    setupSmoothScrolling() {
        // Enhanced smooth scrolling for anchor links
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a[href^="#"]');
            if (link && link.getAttribute('href') !== '#') {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const target = document.getElementById(targetId);
                if (target) {
                    this.scrollToElement(target, {
                        behavior: 'smooth',
                        offset: 80, // Account for sticky header
                        duration: 800
                    });
                }
            }
        });

        // Smooth scrolling for programmatic scrolling
        this.originalScrollTo = window.scrollTo;
        window.scrollTo = (options) => {
            if (typeof options === 'object' && options.behavior === 'smooth') {
                this.smoothScrollTo(options.top || 0, options.left || 0, 800);
            } else {
                this.originalScrollTo.call(window, options);
            }
        };
    }

    setupScrollAnimations() {
        // Create intersection observer for scroll animations
        this.observeScrollElements();
        this.setupParallaxElements();
    }

    observeScrollElements() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    const animationType = element.getAttribute('data-scroll-animation') || 'fadeInUp';
                    this.animateElement(element, animationType);
                    observer.unobserve(element);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '-50px 0px'
        });

        // Observe elements with scroll animations
        document.querySelectorAll('[data-scroll-animation], .scroll-animate').forEach((el) => {
            observer.observe(el);
            // Hide elements initially
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
        });
    }

    setupParallaxElements() {
        // Setup parallax scrolling
        this.parallaxElements = document.querySelectorAll('[data-parallax]');
        if (this.parallaxElements.length > 0) {
            this.updateParallax();
        }
    }

    updateParallax() {
        const scrollY = window.pageYOffset;
        
        this.parallaxElements.forEach((element) => {
            const speed = parseFloat(element.getAttribute('data-parallax')) || 0.5;
            const yPos = -(scrollY * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    }

    animateElement(element, animationType) {
        const animations = {
            fadeIn: {
                opacity: '1',
                transform: 'none'
            },
            fadeInUp: {
                opacity: '1',
                transform: 'translateY(0)'
            },
            fadeInDown: {
                opacity: '1',
                transform: 'translateY(0)'
            },
            fadeInLeft: {
                opacity: '1',
                transform: 'translateX(0)'
            },
            fadeInRight: {
                opacity: '1',
                transform: 'translateX(0)'
            },
            scaleIn: {
                opacity: '1',
                transform: 'scale(1)'
            },
            rotateIn: {
                opacity: '1',
                transform: 'rotate(0deg)'
            }
        };

        // Set initial state for specific animations
        const initialStates = {
            fadeInDown: { transform: 'translateY(-30px)' },
            fadeInLeft: { transform: 'translateX(-30px)' },
            fadeInRight: { transform: 'translateX(30px)' },
            scaleIn: { transform: 'scale(0.8)' },
            rotateIn: { transform: 'rotate(-10deg)' }
        };

        if (initialStates[animationType]) {
            Object.assign(element.style, initialStates[animationType]);
        }

        // Apply animation
        element.style.transition = 'all 0.8s cubic-bezier(0.165, 0.84, 0.44, 1)';
        
        // Trigger animation
        requestAnimationFrame(() => {
            Object.assign(element.style, animations[animationType] || animations.fadeInUp);
        });
    }

    updateProgress() {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;

        // Update progress bar
        const progressBar = document.getElementById('scroll-progress');
        if (progressBar) {
            progressBar.style.transform = `scaleX(${scrolled / 100})`;
        }

        // Update reading progress circle
        const readingProgress = document.getElementById('reading-progress');
        const progressCircle = document.querySelector('.reading-progress-circle');
        const progressText = document.querySelector('.reading-progress-text');
        
        if (readingProgress && progressCircle && progressText) {
            const circumference = 97.389; // 2 * Math.PI * 15.5
            const offset = circumference - (scrolled / 100) * circumference;
            
            // Smooth progress animation
            progressCircle.style.transition = 'stroke-dashoffset 0.3s ease-out';
            progressCircle.style.strokeDashoffset = offset;
            
            // Animate number
            let lastValue = parseInt(progressText.textContent) || 0;
            let newValue = Math.round(scrolled);
            if (lastValue !== newValue) {
                let frame = 0;
                const frames = 8;
                const diff = newValue - lastValue;
                const animateNum = () => {
                    frame++;
                    progressText.textContent = `${Math.round(lastValue + (diff * (frame / frames)))}%`;
                    if (frame < frames) requestAnimationFrame(animateNum);
                    else progressText.textContent = `${newValue}%`;
                };
                animateNum();
            }
            
            // Add pulse effect
            progressCircle.classList.add('progress-pulse');
            setTimeout(() => progressCircle.classList.remove('progress-pulse'), 1200);
            
            // Add glow effect based on progress
            const progressSvg = document.querySelector('.progress-svg');
            if (progressSvg) {
                const glowIntensity = Math.min(scrolled / 100, 1);
                progressSvg.style.filter = `drop-shadow(0 0 ${glowIntensity * 8}px rgba(102, 126, 234, ${glowIntensity * 0.5}))`;
            }
            
            // Add pulse animation at milestones
            if (scrolled > 0 && scrolled % 25 === 0) {
                readingProgress.classList.add('milestone-pulse');
                setTimeout(() => {
                    readingProgress.classList.remove('milestone-pulse');
                }, 600);
            }
            
            // Show/hide reading progress with scale animation
            if (scrolled > 5) {
                readingProgress.classList.remove('hidden');
                readingProgress.style.opacity = '1';
                readingProgress.style.transform = 'translateY(0) scale(1)';
            } else {
                readingProgress.style.opacity = '0';
                readingProgress.style.transform = 'translateY(20px) scale(0.8)';
                setTimeout(() => {
                    if (scrolled <= 5) {
                        readingProgress.classList.add('hidden');
                    }
                }, 300);
            }
        }

        // Update back to top button
        const backToTop = document.getElementById('back-to-top');
        if (backToTop) {
            if (winScroll > 300) {
                backToTop.style.opacity = '1';
                backToTop.style.transform = 'translateY(0)';
            } else {
                backToTop.style.opacity = '0';
                backToTop.style.transform = 'translateY(16px)';
            }
        }

        // Update parallax elements
        if (this.parallaxElements && this.parallaxElements.length > 0) {
            this.updateParallax();
        }
    }

    scrollToElement(element, options = {}) {
        const rect = element.getBoundingClientRect();
        const offset = options.offset || 0;
        const targetPosition = window.pageYOffset + rect.top - offset;
        
        this.smoothScrollTo(targetPosition, 0, options.duration || 600);
    }

    scrollToTop() {
        this.smoothScrollTo(0, 0, 800);
    }

    smoothScrollTo(targetY, targetX = 0, duration = 600) {
        const startY = window.pageYOffset;
        const startX = window.pageXOffset;
        const distanceY = targetY - startY;
        const distanceX = targetX - startX;
        const startTime = new Date().getTime();

        // Easing function
        const easeInOutQuart = (time, from, distance, duration) => {
            if ((time /= duration / 2) < 1) {
                return distance / 2 * time * time * time * time + from;
            }
            return -distance / 2 * ((time -= 2) * time * time * time - 2) + from;
        };

        const timer = setInterval(() => {
            const time = new Date().getTime() - startTime;
            const newY = easeInOutQuart(time, startY, distanceY, duration);
            const newX = easeInOutQuart(time, startX, distanceX, duration);
            
            if (time >= duration) {
                clearInterval(timer);
                window.scrollTo(targetX, targetY);
            } else {
                window.scrollTo(newX, newY);
            }
        }, 1000 / 60); // 60 FPS
    }

    addScrollSpy() {
        // Add scroll spy for navigation
        const sections = document.querySelectorAll('section[id], div[id]');
        const navLinks = document.querySelectorAll('nav a[href^="#"]');
        
        if (sections.length === 0 || navLinks.length === 0) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                const id = entry.target.getAttribute('id');
                const navLink = document.querySelector(`nav a[href="#${id}"]`);
                
                if (entry.isIntersecting && navLink) {
                    // Remove active class from all nav links
                    navLinks.forEach(link => link.classList.remove('active'));
                    // Add active class to current nav link
                    navLink.classList.add('active');
                }
            });
        }, {
            threshold: 0.3,
            rootMargin: '-20% 0px -70% 0px'
        });

        sections.forEach(section => observer.observe(section));
    }

    addSectionIndicator() {
        // Add visual section indicator
        const sections = Array.from(document.querySelectorAll('section[id], div[id]'));
        if (sections.length < 2) return;

        const indicator = document.createElement('div');
        indicator.id = 'section-indicator';
        indicator.className = 'fixed right-4 top-1/2 transform -translate-y-1/2 z-40 space-y-3';
        
        sections.forEach((section, index) => {
            const dot = document.createElement('button');
            dot.className = 'w-3 h-3 rounded-full bg-gray-300 hover:bg-gray-400 transition-colors duration-200';
            dot.setAttribute('data-section', section.id);
            dot.setAttribute('aria-label', `Go to section ${index + 1}`);
            
            dot.addEventListener('click', () => {
                this.scrollToElement(section);
            });
            
            indicator.appendChild(dot);
        });

        document.body.appendChild(indicator);

        // Update indicator on scroll
        const updateIndicator = () => {
            const scrollPosition = window.pageYOffset + window.innerHeight / 2;
            
            sections.forEach((section, index) => {
                const sectionTop = section.offsetTop;
                const sectionBottom = sectionTop + section.offsetHeight;
                const dot = indicator.children[index];
                
                if (scrollPosition >= sectionTop && scrollPosition <= sectionBottom) {
                    dot.classList.remove('bg-gray-300');
                    dot.classList.add('bg-blue-600', 'scale-125');
                } else {
                    dot.classList.remove('bg-blue-600', 'scale-125');
                    dot.classList.add('bg-gray-300');
                }
            });
        };

        window.addEventListener('scroll', updateIndicator);
        updateIndicator(); // Initial call
    }

    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    bindEvents() {
        // Throttled scroll event
        const throttledScroll = this.throttle(() => {
            this.updateProgress();
        }, 16); // ~60 FPS

        window.addEventListener('scroll', throttledScroll);

        // Initialize scroll spy and section indicator
        document.addEventListener('DOMContentLoaded', () => {
            this.addScrollSpy();
            this.addSectionIndicator();
        });

        // Handle reading progress click
        document.addEventListener('click', (e) => {
            if (e.target.closest('#reading-progress')) {
                this.scrollToTop();
            }
        });

        // Add scroll-based class to body
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 100) {
                document.body.classList.add('scrolled');
            } else {
                document.body.classList.remove('scrolled');
            }
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Home' && e.ctrlKey) {
                e.preventDefault();
                this.scrollToTop();
            }
            if (e.key === 'End' && e.ctrlKey) {
                e.preventDefault();
                this.smoothScrollTo(document.documentElement.scrollHeight);
            }
        });
    }

    // Public API methods
    scrollTo(target, options = {}) {
        if (typeof target === 'string') {
            const element = document.querySelector(target);
            if (element) {
                this.scrollToElement(element, options);
            }
        } else if (typeof target === 'number') {
            this.smoothScrollTo(target, 0, options.duration || 600);
        } else if (target instanceof Element) {
            this.scrollToElement(target, options);
        }
    }

    hideProgress() {
        const progressBar = document.getElementById('scroll-progress');
        if (progressBar) {
            progressBar.style.display = 'none';
        }
    }

    showProgress() {
        const progressBar = document.getElementById('scroll-progress');
        if (progressBar) {
            progressBar.style.display = 'block';
        }
    }

    // Static instance method
    static getInstance() {
        if (!ScrollProgress.instance) {
            ScrollProgress.instance = new ScrollProgress();
        }
        return ScrollProgress.instance;
    }
}

// Auto-initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.ScrollProgress = ScrollProgress.getInstance();
});

// Export for module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ScrollProgress;
} 