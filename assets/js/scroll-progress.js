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
            /* Enhanced Scroll Progress Styles */
            #reading-progress {
                backdrop-filter: blur(12px);
                -webkit-backdrop-filter: blur(12px);
                border-radius: 50%;
                box-shadow: 
                    0 8px 32px rgba(79, 142, 247, 0.25),
                    0 4px 16px rgba(79, 142, 247, 0.15),
                    0 2px 8px rgba(0, 0, 0, 0.1);
                background: none;
                animation: breathe 4s ease-in-out infinite;
            }
            
            @keyframes breathe {
                0%, 100% { 
                    transform: scale(1);
                    box-shadow: 
                        0 8px 32px rgba(79, 142, 247, 0.25),
                        0 4px 16px rgba(79, 142, 247, 0.15),
                        0 2px 8px rgba(0, 0, 0, 0.1);
                }
                50% { 
                    transform: scale(1.02);
                    box-shadow: 
                        0 12px 48px rgba(79, 142, 247, 0.35),
                        0 6px 24px rgba(79, 142, 247, 0.25),
                        0 3px 12px rgba(0, 0, 0, 0.15);
                }
            }
            
            .reading-progress-container {
                width: 72px;
                height: 72px;
                position: relative;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            
            .progress-background {
                background: linear-gradient(135deg, 
                    rgba(255, 255, 255, 0.95) 0%, 
                    rgba(249, 250, 251, 0.9) 50%,
                    rgba(243, 244, 246, 0.85) 100%);
                box-shadow: 
                    0 4px 16px rgba(79, 142, 247, 0.1) inset,
                    0 2px 8px rgba(0, 0, 0, 0.05) inset,
                    0 1px 3px rgba(255, 255, 255, 0.8) inset;
                border-radius: 50%;
                border: 2px solid rgba(79, 142, 247, 0.15);
                transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
            }
            
            .progress-svg {
                filter: drop-shadow(0 4px 12px rgba(79, 142, 247, 0.2));
                transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
                display: block;
                margin: 0 auto;
            }
            
            .reading-progress-circle {
                stroke-width: 3;
                transition: all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
                stroke-linecap: round;
                stroke: url(#progressGradient);
                animation: rotate 20s linear infinite;
            }
            
            @keyframes rotate {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
            }
            
            .progress-bg-circle {
                stroke-width: 2;
                stroke: rgba(79, 142, 247, 0.1);
                transition: all 0.3s ease;
            }
            
            .reading-progress-text {
                font-size: 1.1rem;
                font-weight: 700;
                fill: #1f2937;
                text-anchor: middle;
                dominant-baseline: middle;
                filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1));
                paint-order: stroke fill;
                stroke: rgba(255, 255, 255, 0.8);
                stroke-width: 0.5px;
                letter-spacing: 0.3px;
                alignment-baseline: middle;
                transition: all 0.3s ease;
            }
            
            #reading-progress:hover {
                transform: scale(1.1);
                box-shadow: 
                    0 16px 64px rgba(79, 142, 247, 0.4),
                    0 8px 32px rgba(79, 142, 247, 0.25),
                    0 4px 16px rgba(0, 0, 0, 0.15);
                animation: none;
            }
            
            #reading-progress:active {
                transform: scale(0.95);
                transition: transform 0.1s ease-out;
            }
            
            @media (max-width: 768px) {
                .reading-progress-container { width: 60px; height: 60px; }
                .reading-progress-text { font-size: 0.9rem; }
            }
            
            /* Enhanced Milestone pulse animation */
            .milestone-pulse {
                animation: milestonePulse 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55);
            }
            
            @keyframes milestonePulse {
                0% { 
                    transform: scale(1);
                    box-shadow: 
                        0 8px 32px rgba(79, 142, 247, 0.25),
                        0 4px 16px rgba(79, 142, 247, 0.15);
                }
                30% { 
                    transform: scale(1.2);
                    box-shadow: 
                        0 16px 64px rgba(79, 142, 247, 0.4),
                        0 8px 32px rgba(79, 142, 247, 0.25),
                        0 0 0 8px rgba(79, 142, 247, 0.1);
                }
                60% { 
                    transform: scale(1.1);
                    box-shadow: 
                        0 12px 48px rgba(79, 142, 247, 0.35),
                        0 6px 24px rgba(79, 142, 247, 0.2),
                        0 0 0 4px rgba(79, 142, 247, 0.05);
                }
                100% { 
                    transform: scale(1);
                    box-shadow: 
                        0 8px 32px rgba(79, 142, 247, 0.25),
                        0 4px 16px rgba(79, 142, 247, 0.15);
                }
            }
            
            /* Enhanced Hover effects */
            #reading-progress:hover .progress-background {
                background: linear-gradient(135deg, 
                    rgba(255, 255, 255, 1) 0%, 
                    rgba(248, 250, 252, 0.98) 50%,
                    rgba(241, 245, 249, 0.95) 100%);
                box-shadow: 
                    0 20px 60px rgba(79, 142, 247, 0.3),
                    0 8px 32px rgba(79, 142, 247, 0.2),
                    0 4px 16px rgba(0, 0, 0, 0.1),
                    inset 0 2px 4px rgba(255, 255, 255, 0.9),
                    inset 0 -1px 2px rgba(79, 142, 247, 0.1);
                border-color: rgba(79, 142, 247, 0.3);
            }
            
            #reading-progress:hover .progress-svg {
                filter: drop-shadow(0 8px 24px rgba(79, 142, 247, 0.4));
                transform: scale(1.05);
            }
            
            #reading-progress:hover .reading-progress-circle {
                stroke-width: 3.5;
                animation: progressGlow 1.5s ease-in-out infinite;
            }
            
            #reading-progress:hover .progress-bg-circle {
                stroke: rgba(79, 142, 247, 0.2);
                stroke-width: 2.5;
            }
            
            #reading-progress:hover .reading-progress-text {
                fill: #4F8EF7;
                font-size: 1.15rem;
                filter: drop-shadow(0 3px 6px rgba(79, 142, 247, 0.3));
            }
            
            @keyframes progressGlow {
                0%, 100% { 
                    filter: drop-shadow(0 0 8px rgba(79, 142, 247, 0.6)); 
                    stroke-width: 3.5;
                }
                50% { 
                    filter: drop-shadow(0 0 16px rgba(79, 142, 247, 0.8)); 
                    stroke-width: 4;
                }
            }
            
            /* Enhanced Active/click animation */
            #reading-progress:active {
                transform: scale(0.93);
                transition: transform 0.15s cubic-bezier(0.68, -0.55, 0.265, 1.55);
            }
            
            #reading-progress:active .progress-background {
                background: linear-gradient(135deg, 
                    rgba(79, 142, 247, 0.1) 0%, 
                    rgba(59, 124, 232, 0.05) 100%);
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
                background: linear-gradient(135deg, #4F8EF7 0%, #3b7ce8 50%, #2563eb 100%);
                box-shadow: 
                    0 8px 32px rgba(79, 142, 247, 0.4),
                    0 4px 16px rgba(0, 0, 0, 0.1),
                    inset 0 1px 0 rgba(255, 255, 255, 0.2);
                backdrop-filter: blur(10px);
                -webkit-backdrop-filter: blur(10px);
                border: 1px solid rgba(255, 255, 255, 0.1);
                transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
                position: relative;
                overflow: hidden;
            }
            
            #back-to-top::before {
                content: '';
                position: absolute;
                top: 0;
                left: -100%;
                width: 100%;
                height: 100%;
                background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
                transition: left 0.5s;
            }
            
            #back-to-top:hover {
                background: linear-gradient(135deg, #3b7ce8 0%, #2563eb 50%, #1d4ed8 100%);
                box-shadow: 
                    0 16px 64px rgba(79, 142, 247, 0.5),
                    0 8px 32px rgba(79, 142, 247, 0.3),
                    0 4px 16px rgba(0, 0, 0, 0.2);
                transform: translateY(-4px) scale(1.05);
            }
            
            #back-to-top:hover::before {
                left: 100%;
            }
            
            #back-to-top:active {
                transform: translateY(0) scale(0.95);
                transition: transform 0.1s ease-out;
            }
        `;
        document.head.appendChild(style);
    }

    createProgressBar() {
        // Create scroll progress bar with enhanced styling
        const progressBar = document.createElement('div');
        progressBar.id = 'scroll-progress';
        progressBar.className = 'fixed top-0 left-0 w-full h-1 z-40 transform scale-x-0 origin-left transition-transform duration-150';
        progressBar.style.background = 'linear-gradient(90deg, #4F8EF7 0%, #3b7ce8 50%, #2563eb 100%)';
        progressBar.style.boxShadow = '0 2px 8px rgba(79, 142, 247, 0.3)';
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
                                <stop offset="0%" style="stop-color:#4F8EF7;stop-opacity:1" />
                                <stop offset="25%" style="stop-color:#3b7ce8;stop-opacity:1" />
                                <stop offset="50%" style="stop-color:#2563eb;stop-opacity:1" />
                                <stop offset="75%" style="stop-color:#1d4ed8;stop-opacity:1" />
                                <stop offset="100%" style="stop-color:#4F8EF7;stop-opacity:1" />
                            </linearGradient>
                            
                            <linearGradient id="progressGradientActive" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" style="stop-color:#ff6b6b;stop-opacity:1" />
                                <stop offset="50%" style="stop-color:#4F8EF7;stop-opacity:1" />
                                <stop offset="100%" style="stop-color:#ff6b6b;stop-opacity:1" />
                            </linearGradient>
                            
                            <filter id="progressGlow">
                                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                                <feMerge> 
                                    <feMergeNode in="coloredBlur"/>
                                    <feMergeNode in="SourceGraphic"/>
                                </feMerge>
                            </filter>
                            
                            <filter id="progressShadow">
                                <feDropShadow dx="0" dy="4" stdDeviation="8" flood-color="rgba(79, 142, 247, 0.3)"/>
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

    celebrateCompletion() {
        const readingProgress = document.getElementById('reading-progress');
        if (!readingProgress) return;
        
        // Create celebration animation
        readingProgress.style.animation = 'celebrateComplete 1.5s ease-in-out';
        
        // Add celebration styles if not already present
        if (!document.querySelector('#celebration-styles')) {
            const celebrationStyles = document.createElement('style');
            celebrationStyles.id = 'celebration-styles';
            celebrationStyles.textContent = `
                @keyframes celebrateComplete {
                    0% { 
                        transform: scale(1); 
                        filter: hue-rotate(0deg);
                    }
                    25% { 
                        transform: scale(1.3) rotate(10deg); 
                        filter: hue-rotate(90deg);
                    }
                    50% { 
                        transform: scale(1.2) rotate(-5deg); 
                        filter: hue-rotate(180deg);
                    }
                    75% { 
                        transform: scale(1.25) rotate(5deg); 
                        filter: hue-rotate(270deg);
                    }
                    100% { 
                        transform: scale(1); 
                        filter: hue-rotate(360deg);
                    }
                }
            `;
            document.head.appendChild(celebrationStyles);
        }
        
        // Reset animation after completion
        setTimeout(() => {
            readingProgress.style.animation = '';
        }, 1500);
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
            
            // Add pulse effect with dynamic intensity
            const pulseDuration = Math.max(800, 1200 - (scrolled * 4)); // Faster pulse as progress increases
            progressCircle.classList.add('progress-pulse');
            setTimeout(() => progressCircle.classList.remove('progress-pulse'), pulseDuration);
            
            // Add dynamic glow effect based on progress
            const progressSvg = document.querySelector('.progress-svg');
            if (progressSvg) {
                const glowIntensity = Math.min(scrolled / 100, 1);
                const glowColor = scrolled > 75 ? 'rgba(255, 107, 107, 0.6)' : 'rgba(79, 142, 247, 0.4)';
                progressSvg.style.filter = `drop-shadow(0 0 ${glowIntensity * 12}px ${glowColor})`;
            }
            
            // Dynamic gradient based on progress
            if (scrolled > 75) {
                progressCircle.style.stroke = 'url(#progressGradientActive)';
            } else {
                progressCircle.style.stroke = 'url(#progressGradient)';
            }
            
            // Enhanced milestone animation at key points
            const milestones = [25, 50, 75, 100];
            if (milestones.includes(Math.round(scrolled))) {
                readingProgress.classList.add('milestone-pulse');
                setTimeout(() => {
                    readingProgress.classList.remove('milestone-pulse');
                }, 800);
                
                // Add celebration effect at 100%
                if (scrolled >= 100) {
                    this.celebrateCompletion();
                }
            }
            
            // Enhanced show/hide reading progress with smooth entrance animation
            if (scrolled > 5) {
                readingProgress.classList.remove('hidden');
                readingProgress.style.opacity = '1';
                readingProgress.style.transform = 'translateY(0) scale(1)';
                readingProgress.style.animation = 'slideInFromBottom 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
                
                // Add entrance animation styles if not present
                if (!document.querySelector('#entrance-styles')) {
                    const entranceStyles = document.createElement('style');
                    entranceStyles.id = 'entrance-styles';
                    entranceStyles.textContent = `
                        @keyframes slideInFromBottom {
                            0% {
                                opacity: 0;
                                transform: translateY(30px) scale(0.8) rotate(-10deg);
                            }
                            60% {
                                opacity: 1;
                                transform: translateY(-5px) scale(1.05) rotate(2deg);
                            }
                            100% {
                                opacity: 1;
                                transform: translateY(0) scale(1) rotate(0deg);
                            }
                        }
                        
                        @keyframes slideOutToBottom {
                            0% {
                                opacity: 1;
                                transform: translateY(0) scale(1) rotate(0deg);
                            }
                            100% {
                                opacity: 0;
                                transform: translateY(30px) scale(0.8) rotate(10deg);
                            }
                        }
                    `;
                    document.head.appendChild(entranceStyles);
                }
            } else {
                readingProgress.style.opacity = '0';
                readingProgress.style.animation = 'slideOutToBottom 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
                setTimeout(() => {
                    if (scrolled <= 5) {
                        readingProgress.classList.add('hidden');
                    }
                }, 400);
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