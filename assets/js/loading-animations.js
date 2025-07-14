/**
 * Loading States and Animations System
 * Features: Page loading, form submissions, content transitions, skeleton loaders
 */

class LoadingAnimations {
    constructor() {
        this.loadingStates = new Map();
        this.init();
    }

    init() {
        this.createLoadingOverlay();
        this.createSkeletonLoader();
        
        // Only show page loading animation on homepage
        if (this.isHomepage()) {
            this.setupPageLoadAnimation();
        }
        
        this.enhanceFormSubmissions();
        this.setupContentTransitions();
        this.bindEvents();
    }

    isHomepage() {
        const path = window.location.pathname;
        return path === '/' || path === '/index.html' || path.endsWith('/index.html') || path === '';
    }

    createLoadingOverlay() {
        // Enhanced global loading overlay
        const overlay = document.createElement('div');
        overlay.id = 'global-loading-overlay';
        overlay.className = 'fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center hidden backdrop-blur-sm';
        overlay.innerHTML = `
            <div class="global-loading-card bg-white rounded-3xl p-8 max-w-md w-full mx-4 text-center shadow-2xl relative overflow-hidden">
                <div class="loading-shimmer"></div>
                <div class="relative z-10">
                    <div class="loading-icon-container mb-6">
                        <div class="loading-rings">
                            <div class="ring ring-1"></div>
                            <div class="ring ring-2"></div>
                            <div class="ring ring-3"></div>
                        </div>
                        <div class="loading-center-icon">
                            <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                            </svg>
                        </div>
                    </div>
                    
                    <div class="loading-text text-xl font-bold text-gray-800 mb-2">Processing...</div>
                    <div class="loading-subtext text-sm text-gray-600 mb-4">Please wait while we handle your request</div>
                    
                    <div class="loading-progress hidden">
                        <div class="progress-container mb-3">
                            <div class="w-full bg-gray-200 rounded-full h-3 relative overflow-hidden">
                                <div class="progress-bar bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-500 relative" style="width: 0%">
                                    <div class="progress-shine"></div>
                                </div>
                            </div>
                        </div>
                        <div class="text-sm font-semibold text-gray-700">
                            <span class="progress-text">0%</span> Complete
                        </div>
                    </div>
                    
                    <div class="loading-dots-modern mt-4">
                        <div class="dot"></div>
                        <div class="dot"></div>
                        <div class="dot"></div>
                        <div class="dot"></div>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(overlay);
    }

    createSkeletonLoader() {
        // Inject skeleton loader CSS
        const style = document.createElement('style');
        style.textContent = `
            .skeleton {
                background: linear-gradient(90deg, #f0f0f0 25%, transparent 37%, #f0f0f0 63%);
                background-size: 400% 100%;
                animation: shimmer 1.5s ease-in-out infinite;
            }
            
            @keyframes shimmer {
                0% { background-position: 100% 0; }
                100% { background-position: -100% 0; }
            }
            
            .skeleton-text { height: 1rem; background-color: #e2e2e2; border-radius: 4px; }
            .skeleton-title { height: 1.5rem; background-color: #e2e2e2; border-radius: 4px; }
            .skeleton-avatar { width: 3rem; height: 3rem; background-color: #e2e2e2; border-radius: 50%; }
            .skeleton-image { width: 100%; height: 12rem; background-color: #e2e2e2; border-radius: 8px; }
            
            .fade-in { animation: fadeIn 0.6s ease-in-out; }
            .slide-up { animation: slideUp 0.6s ease-out; }
            .scale-in { animation: scaleIn 0.4s ease-out; }
            
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            
            @keyframes slideUp {
                from { transform: translateY(30px); opacity: 0; }
                to { transform: translateY(0); opacity: 1; }
            }
            
            @keyframes scaleIn {
                from { transform: scale(0.9); opacity: 0; }
                to { transform: scale(1); opacity: 1; }
            }
            
            .page-loading {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
                z-index: 9999;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: opacity 0.6s ease-out;
                overflow: hidden;
            }
            
            .page-loading::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: 
                    radial-gradient(circle at 30% 20%, rgba(79,142,247,0.03) 0%, transparent 50%),
                    radial-gradient(circle at 70% 80%, rgba(79,142,247,0.02) 0%, transparent 50%);
                animation: backgroundFloat 8s ease-in-out infinite;
            }
            
            @keyframes backgroundFloat {
                0%, 100% { transform: translateY(0px); }
                50% { transform: translateY(-10px); }
            }
            
            .page-loading.fade-out {
                opacity: 0;
                pointer-events: none;
            }
            
            .loading-content {
                text-align: center;
                position: relative;
                z-index: 10;
                max-width: 320px;
                padding: 0;
                background: transparent;
                animation: contentSlideIn 0.8s ease-out;
            }
            
            @keyframes contentSlideIn {
                from { 
                    opacity: 0; 
                    transform: translateY(20px); 
                }
                to { 
                    opacity: 1; 
                    transform: translateY(0); 
                }
            }
            
            .loading-brand {
                margin-bottom: 1.5rem;
            }
            
            .brand-icon {
                margin-bottom: 1rem;
                perspective: 1000px;
            }
            
            .simple-logo {
                width: 64px;
                height: 64px;
                margin: 0 auto;
                background: linear-gradient(135deg, #4F8EF7 0%, #667eea 100%);
                border-radius: 12px;
                display: flex;
                align-items: center;
                justify-content: center;
                animation: logoFloat 2s ease-in-out infinite;
                box-shadow: 0 8px 25px rgba(79, 142, 247, 0.25);
                position: relative;
                overflow: hidden;
            }
            
            .simple-logo::before {
                content: 'F';
                font-size: 1.75rem;
                font-weight: 700;
                color: white;
                font-family: 'Inter', sans-serif;
                z-index: 2;
                position: relative;
            }
            
            .simple-logo::after {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.2) 50%, transparent 70%);
                animation: logoShine 3s ease-in-out infinite;
            }
            
            @keyframes logoFloat {
                0%, 100% { 
                    transform: translateY(0px); 
                    box-shadow: 0 8px 25px rgba(79, 142, 247, 0.25);
                }
                50% { 
                    transform: translateY(-6px); 
                    box-shadow: 0 12px 35px rgba(79, 142, 247, 0.3);
                }
            }
            
            @keyframes logoShine {
                0% { transform: translateX(-100%) rotate(45deg); }
                100% { transform: translateX(100%) rotate(45deg); }
            }
            
            .loading-logo {
                font-size: 1.5rem;
                font-weight: 600;
                margin-bottom: 0.25rem;
                color: #1e293b;
                font-family: 'Inter', sans-serif;
                animation: fadeInUp 0.8s ease-out 0.3s both;
                letter-spacing: -0.025em;
                line-height: 1.2;
            }
            
            .loading-tagline {
                font-size: 0.875rem;
                color: #64748b;
                font-weight: 400;
                font-family: 'Inter', sans-serif;
                margin-bottom: 1.5rem;
                animation: fadeInUp 0.8s ease-out 0.5s both;
            }
            
            @keyframes bounceIn {
                0% {
                    opacity: 0;
                    transform: scale(0.3);
                }
                50% {
                    opacity: 1;
                    transform: scale(1.1);
                }
                70% {
                    transform: scale(0.9);
                }
                100% {
                    opacity: 1;
                    transform: scale(1);
                }
            }
            
            @keyframes fadeInUp {
                from { 
                    opacity: 0; 
                    transform: translateY(10px); 
                }
                to { 
                    opacity: 1; 
                    transform: translateY(0); 
                }
            }
            
            .progress-section {
                margin-top: 1rem;
                animation: fadeInUp 0.8s ease-out 0.7s both;
            }
            
            @keyframes slideInFromBottom {
                from { 
                    opacity: 0; 
                    transform: translateY(20px); 
                }
                to { 
                    opacity: 1; 
                    transform: translateY(0); 
                }
            }
            
            .progress-bar-container {
                width: 100%;
                height: 3px;
                background: #e2e8f0;
                border-radius: 2px;
                overflow: hidden;
                margin-bottom: 0.75rem;
                position: relative;
            }
            
            .progress-bar-fill {
                height: 100%;
                background: linear-gradient(90deg, #4F8EF7 0%, #667eea 100%);
                border-radius: 2px;
                transition: width 0.4s ease;
                position: relative;
            }
            
            .progress-bar-fill::after {
                content: '';
                position: absolute;
                top: 0;
                left: -100%;
                width: 100%;
                height: 100%;
                background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
                animation: progressShine 2s ease-in-out infinite;
            }
            
            @keyframes progressShine {
                0% { left: -100%; }
                100% { left: 100%; }
            }
            
            .progress-text {
                font-size: 0.875rem;
                color: #1e293b;
                font-weight: 500;
                font-family: 'Inter', sans-serif;
                margin-bottom: 0.25rem;
            }
            
            .progress-status {
                font-size: 0.75rem;
                color: #64748b;
                font-family: 'Inter', sans-serif;
                animation: fadeIn 0.3s ease-in-out;
            }
            
            .loading-steps {
                display: flex;
                justify-content: center;
                align-items: center;
                gap: 0.75rem;
                margin-top: 1rem;
                animation: fadeInUp 0.8s ease-out 0.9s both;
            }
            
            @keyframes stepsSlideIn {
                from { 
                    opacity: 0; 
                    transform: translateY(10px); 
                }
                to { 
                    opacity: 1; 
                    transform: translateY(0); 
                }
            }
            
            .step-icon {
                width: 8px;
                height: 8px;
                border-radius: 50%;
                background: #cbd5e1;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 0;
                transition: all 0.3s ease;
                position: relative;
                overflow: hidden;
            }
            
            .step-icon::before {
                content: '';
                position: absolute;
                top: 50%;
                left: 50%;
                width: 0;
                height: 0;
                background: rgba(79, 142, 247, 0.3);
                border-radius: 50%;
                transition: all 0.3s ease;
                transform: translate(-50%, -50%);
            }
            
            .step-icon.active {
                background: #4F8EF7;
                transform: scale(1.25);
            }
            
            .step-icon.active::before {
                width: 100%;
                height: 100%;
                animation: ripple 1s ease-out infinite;
            }
            
            @keyframes ripple {
                0% { width: 0; height: 0; opacity: 1; }
                100% { width: 100%; height: 100%; opacity: 0; }
            }
            
            .step-icon.completed {
                background: #10b981;
                transform: scale(1.1);
            }
            
            .step-icon.completed::after {
                content: '';
                position: absolute;
                width: 4px;
                height: 2px;
                border-left: 1px solid white;
                border-bottom: 1px solid white;
                transform: rotate(-45deg);
                top: 2px;
                left: 2px;
            }
            
            @keyframes completedBounce {
                0% { transform: scale(1); }
                50% { transform: scale(1.2); }
                100% { transform: scale(1.1); }
            }
            
            @keyframes checkmarkPop {
                0% { transform: scale(0) rotate(-180deg); opacity: 0; }
                100% { transform: scale(1) rotate(0deg); opacity: 1; }
            }
            
            @keyframes stepPulse {
                0%, 100% { box-shadow: 0 0 0 0 rgba(79, 142, 247, 0.7); }
                50% { box-shadow: 0 0 0 4px rgba(79, 142, 247, 0.2); }
            }
            
            .loading-dots {
                display: none;
            }
            
            @keyframes dotsSlideIn {
                from { 
                    opacity: 0; 
                    transform: translateY(10px); 
                }
                to { 
                    opacity: 1; 
                    transform: translateY(0); 
                }
            }
            
            .loading-dot {
                width: 6px;
                height: 6px;
                border-radius: 50%;
                background: #cbd5e1;
                animation: dotBounce 1.6s ease-in-out infinite;
            }
            
            .loading-dot:nth-child(1) { animation-delay: 0s; }
            .loading-dot:nth-child(2) { animation-delay: 0.2s; }
            .loading-dot:nth-child(3) { animation-delay: 0.4s; }
            .loading-dot:nth-child(4) { animation-delay: 0.6s; }
            
            @keyframes dotBounce {
                0%, 80%, 100% { 
                    transform: scale(1); 
                    opacity: 0.6; 
                }
                40% { 
                    transform: scale(1.2); 
                    opacity: 1; 
                }
            }
            
            .content-skeleton {
                padding: 1rem;
                border-radius: 8px;
                background: white;
                box-shadow: 0 2px 8px rgba(0,0,0,0.1);
                margin-bottom: 1rem;
            }
            
            /* Enhanced Global Loading Overlay Styles */
            .global-loading-card {
                animation: cardSlideIn 0.5s ease-out;
                border: 1px solid rgba(79,142,247,0.1);
            }
            
            @keyframes cardSlideIn {
                from { 
                    opacity: 0; 
                    transform: translateY(30px) scale(0.95); 
                }
                to { 
                    opacity: 1; 
                    transform: translateY(0) scale(1); 
                }
            }
            
            .loading-shimmer {
                position: absolute;
                top: 0;
                left: -100%;
                width: 100%;
                height: 100%;
                background: linear-gradient(90deg, transparent, rgba(79,142,247,0.1), transparent);
                animation: shimmerMove 2s infinite;
            }
            
            @keyframes shimmerMove {
                0% { left: -100%; }
                100% { left: 100%; }
            }
            
            .loading-icon-container {
                position: relative;
                display: inline-block;
            }
            
            .loading-rings {
                position: relative;
                width: 80px;
                height: 80px;
                margin: 0 auto;
            }
            
            .ring {
                position: absolute;
                border: 3px solid transparent;
                border-radius: 50%;
                animation: ringRotate 2s linear infinite;
            }
            
            .ring-1 {
                width: 80px;
                height: 80px;
                border-top-color: #4F8EF7;
                animation-duration: 2s;
            }
            
            .ring-2 {
                width: 60px;
                height: 60px;
                top: 10px;
                left: 10px;
                border-right-color: #667eea;
                animation-duration: 1.5s;
                animation-direction: reverse;
            }
            
            .ring-3 {
                width: 40px;
                height: 40px;
                top: 20px;
                left: 20px;
                border-bottom-color: #80d4ff;
                animation-duration: 1s;
            }
            
            @keyframes ringRotate {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
            
            .loading-center-icon {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                animation: iconFloat 3s ease-in-out infinite;
            }
            
            @keyframes iconFloat {
                0%, 100% { transform: translate(-50%, -50%) scale(1); }
                50% { transform: translate(-50%, -50%) scale(1.1); }
            }
            
            .progress-container {
                position: relative;
            }
            
            .progress-bar {
                position: relative;
                overflow: hidden;
            }
            
            .progress-shine {
                position: absolute;
                top: 0;
                left: -100%;
                width: 100%;
                height: 100%;
                background: linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent);
                animation: progressShineMove 2s infinite;
            }
            
            @keyframes progressShineMove {
                0% { left: -100%; }
                100% { left: 100%; }
            }
            
            .loading-dots-modern {
                display: flex;
                justify-content: center;
                gap: 8px;
            }
            
            .loading-dots-modern .dot {
                width: 8px;
                height: 8px;
                border-radius: 50%;
                background: linear-gradient(135deg, #4F8EF7, #667eea);
                animation: dotWave 1.5s ease-in-out infinite;
            }
            
            .loading-dots-modern .dot:nth-child(1) { animation-delay: 0s; }
            .loading-dots-modern .dot:nth-child(2) { animation-delay: 0.2s; }
            .loading-dots-modern .dot:nth-child(3) { animation-delay: 0.4s; }
            .loading-dots-modern .dot:nth-child(4) { animation-delay: 0.6s; }
            
            @keyframes dotWave {
                0%, 60%, 100% { 
                    transform: scale(1); 
                    opacity: 0.5; 
                }
                30% { 
                    transform: scale(1.3); 
                    opacity: 1; 
                }
            }
            .cityscape-bg {
                position: absolute;
                top: 0; left: 0; right: 0; bottom: 0;
                background: url('assets/images/hk-cityscape.jpg') center center/cover no-repeat;
                opacity: 0;
                pointer-events: none;
                z-index: 2;
                transition: opacity 1.2s cubic-bezier(0.4,0,0.2,1);
            }
            .page-loading .cityscape-bg.show {
                opacity: 1;
            }
        `;
        document.head.appendChild(style);
    }

    setupPageLoadAnimation() {
        // Show enhanced page loading animation
        const pageLoader = document.createElement('div');
        pageLoader.className = 'page-loading';
        pageLoader.innerHTML = `
            <div class="loading-content">
                <div class="loading-brand">
                    <div class="brand-icon">
                        <div class="simple-logo"></div>
                    </div>
                    <div class="loading-logo">Fusiox</div>
                    <div class="loading-tagline">Professional Corporate Services</div>
                </div>
                
                <div class="progress-section">
                    <div class="progress-bar-container">
                        <div class="progress-bar-fill"></div>
                    </div>
                    <div class="progress-text">Loading</div>
                    <div class="progress-status">Please wait...</div>
                </div>
                
                <div class="loading-steps">
                    <div class="step-icon active" data-step="1"></div>
                    <div class="step-icon" data-step="2"></div>
                    <div class="step-icon" data-step="3"></div>
                    <div class="step-icon" data-step="4"></div>
                </div>
            </div>
        `;
        document.body.appendChild(pageLoader);

        // Simulate loading progress with steps
        this.simulateLoadingProgress(pageLoader);

        // Complete loading after animation
        setTimeout(() => {
            this.completeLoading(pageLoader);
        }, 2500);
    }

    simulateLoadingProgress(pageLoader) {
        const progressFill = pageLoader.querySelector('.progress-bar-fill');
        const progressText = pageLoader.querySelector('.progress-text');
        const progressStatus = pageLoader.querySelector('.progress-status');
        const steps = pageLoader.querySelectorAll('.step-icon');
        
        let progress = 0;
        let currentStep = 0;
        
        const statuses = [
            "Initializing...",
            "Loading resources...",
            "Preparing interface...",
            "Almost ready...",
            "Complete!"
        ];
        
        const progressInterval = setInterval(() => {
            progress += Math.random() * 20 + 10; // Random increment between 10-30%
            
            if (progress > 100) progress = 100;
            
            // Update progress bar
            progressFill.style.width = `${progress}%`;
            
            // Update status text
            const statusIndex = Math.floor((progress / 100) * statuses.length);
            if (statusIndex < statuses.length) {
                progressStatus.textContent = statuses[statusIndex];
            }
            
            // Update steps
            const stepIndex = Math.floor((progress / 100) * steps.length);
            if (stepIndex !== currentStep && stepIndex < steps.length) {
                if (currentStep < steps.length) {
                    steps[currentStep].classList.remove('active');
                    steps[currentStep].classList.add('completed');
                }
                if (stepIndex < steps.length) {
                    steps[stepIndex].classList.add('active');
                }
                currentStep = stepIndex;
            }
            
            if (progress >= 100) {
                clearInterval(progressInterval);
                progressStatus.textContent = "Ready!";
                progressText.textContent = "Welcome";
                steps.forEach(step => {
                    step.classList.remove('active');
                    step.classList.add('completed');
                });
            }
        }, 200);
    }

    completeLoading(pageLoader) {
        // Wait a moment after 100% to show completion
        setTimeout(() => {
            pageLoader.classList.add('fade-out');
            setTimeout(() => {
                if (pageLoader.parentNode) {
                    pageLoader.parentNode.removeChild(pageLoader);
                }
                this.animatePageContent();
            }, 600);
        }, 600); // Show completed state briefly
    }

    animatePageContent() {
        // Animate page content on load
        const elements = document.querySelectorAll('.hero, .card, .navbar, section, .btn');
        elements.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                element.style.transition = 'all 0.6s ease-out';
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }

    enhanceFormSubmissions() {
        // Enhanced form submission with loading states
        document.addEventListener('submit', (e) => {
            const form = e.target;
            if (form.tagName !== 'FORM') return;

            const submitBtn = form.querySelector('button[type="submit"], input[type="submit"]');
            if (!submitBtn) return;

            // Store original button content
            const originalContent = submitBtn.innerHTML;
            const originalClasses = submitBtn.className;

            // Add enhanced loading state
            submitBtn.innerHTML = `
                <div class="flex items-center justify-center">
                    <div class="btn-loading-spinner">
                        <div class="spinner-ring"></div>
                        <div class="spinner-ring"></div>
                        <div class="spinner-ring"></div>
                    </div>
                    <span class="ml-3">Processing...</span>
                </div>
            `;
            
            // Add button loading styles
            if (!document.querySelector('#btn-loading-styles')) {
                const btnStyle = document.createElement('style');
                btnStyle.id = 'btn-loading-styles';
                btnStyle.textContent = `
                    .btn-loading-spinner {
                        position: relative;
                        width: 20px;
                        height: 20px;
                    }
                    
                    .spinner-ring {
                        position: absolute;
                        width: 20px;
                        height: 20px;
                        border: 2px solid transparent;
                        border-radius: 50%;
                        animation: spinnerRotate 1.5s linear infinite;
                    }
                    
                    .spinner-ring:nth-child(1) {
                        border-top-color: currentColor;
                        animation-duration: 1.5s;
                    }
                    
                    .spinner-ring:nth-child(2) {
                        border-right-color: currentColor;
                        animation-duration: 1.2s;
                        animation-direction: reverse;
                        opacity: 0.7;
                    }
                    
                    .spinner-ring:nth-child(3) {
                        border-bottom-color: currentColor;
                        animation-duration: 0.9s;
                        opacity: 0.4;
                    }
                    
                    @keyframes spinnerRotate {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                `;
                document.head.appendChild(btnStyle);
            }
            submitBtn.disabled = true;
            submitBtn.className = originalClasses + ' cursor-not-allowed opacity-75';

            // Simulate form processing (replace with actual form handling)
            setTimeout(() => {
                // Reset button state
                submitBtn.innerHTML = originalContent;
                submitBtn.disabled = false;
                submitBtn.className = originalClasses;
                
                // Show success animation
                this.showSuccessMessage(form);
            }, 2000);
        });
    }

    showSuccessMessage(form) {
        const successDiv = document.createElement('div');
        successDiv.className = 'fixed top-4 right-4 z-50 transform translate-x-full transition-all duration-500';
        successDiv.innerHTML = `
            <div class="success-notification bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-4 rounded-2xl shadow-2xl border border-green-400/20">
                <div class="flex items-center">
                    <div class="success-icon-container mr-3">
                        <div class="success-circle">
                            <svg class="w-5 h-5 success-checkmark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path>
                            </svg>
                        </div>
                    </div>
                    <div class="success-content">
                        <div class="font-semibold text-lg">Success!</div>
                        <div class="text-sm opacity-90">Form submitted successfully</div>
                    </div>
                </div>
                <div class="success-sparkles">
                    <div class="sparkle sparkle-1">
                        <div class="success-dot"></div>
                    </div>
                    <div class="sparkle sparkle-2">
                        <div class="success-dot"></div>
                    </div>
                    <div class="sparkle sparkle-3">
                        <div class="success-dot"></div>
                    </div>
                </div>
            </div>
        `;
        
        // Add success animation styles
        if (!document.querySelector('#success-styles')) {
            const successStyle = document.createElement('style');
            successStyle.id = 'success-styles';
            successStyle.textContent = `
                .success-notification {
                    position: relative;
                    overflow: hidden;
                }
                
                .success-notification::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: -100%;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
                    animation: successShine 2s ease-out;
                }
                
                @keyframes successShine {
                    0% { left: -100%; }
                    100% { left: 100%; }
                }
                
                .success-icon-container {
                    position: relative;
                }
                
                .success-circle {
                    width: 32px;
                    height: 32px;
                    border: 2px solid currentColor;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    animation: successCirclePop 0.6s ease-out;
                }
                
                @keyframes successCirclePop {
                    0% { 
                        transform: scale(0) rotate(-180deg); 
                        opacity: 0; 
                    }
                    50% { 
                        transform: scale(1.2) rotate(-90deg); 
                    }
                    100% { 
                        transform: scale(1) rotate(0deg); 
                        opacity: 1; 
                    }
                }
                
                .success-checkmark {
                    animation: checkmarkDraw 0.8s ease-out 0.3s both;
                }
                
                @keyframes checkmarkDraw {
                    0% { 
                        stroke-dasharray: 20;
                        stroke-dashoffset: 20;
                        opacity: 0;
                    }
                    100% { 
                        stroke-dasharray: 20;
                        stroke-dashoffset: 0;
                        opacity: 1;
                    }
                }
                
                .success-content {
                    animation: contentSlideIn 0.5s ease-out 0.4s both;
                }
                
                @keyframes contentSlideIn {
                    from { 
                        opacity: 0; 
                        transform: translateX(20px); 
                    }
                    to { 
                        opacity: 1; 
                        transform: translateX(0); 
                    }
                }
                
                .success-sparkles {
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    pointer-events: none;
                }
                
                .sparkle {
                    position: absolute;
                    font-size: 12px;
                    animation: sparkleFloat 3s ease-out infinite;
                }
                
                .success-dot {
                    width: 6px;
                    height: 6px;
                    background: linear-gradient(135deg, rgba(255,255,255,0.9), rgba(255,255,255,0.6));
                    border-radius: 50%;
                    box-shadow: 0 0 8px rgba(255,255,255,0.4);
                }
                
                .sparkle-1 {
                    top: 10%;
                    left: 20%;
                    animation-delay: 0.5s;
                }
                
                .sparkle-2 {
                    top: 60%;
                    right: 15%;
                    animation-delay: 1s;
                    animation-duration: 2.5s;
                }
                
                .sparkle-3 {
                    bottom: 20%;
                    left: 60%;
                    animation-delay: 1.5s;
                    animation-duration: 2s;
                }
                
                @keyframes sparkleFloat {
                    0% { 
                        opacity: 0; 
                        transform: translateY(0) scale(0.5); 
                    }
                    20% { 
                        opacity: 1; 
                        transform: translateY(-10px) scale(1); 
                    }
                    80% { 
                        opacity: 1; 
                        transform: translateY(-20px) scale(1); 
                    }
                    100% { 
                        opacity: 0; 
                        transform: translateY(-30px) scale(0.5); 
                    }
                }
            `;
            document.head.appendChild(successStyle);
        }
        
        document.body.appendChild(successDiv);

        // Animate in with bounce effect
        setTimeout(() => {
            successDiv.style.transform = 'translateX(0) scale(1)';
            successDiv.style.animation = 'successBounceIn 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        }, 100);

        // Add bounce animation
        const bounceStyle = document.createElement('style');
        bounceStyle.textContent = `
            @keyframes successBounceIn {
                0% { transform: translateX(100%) scale(0.8); }
                60% { transform: translateX(-10px) scale(1.05); }
                100% { transform: translateX(0) scale(1); }
            }
        `;
        document.head.appendChild(bounceStyle);

        // Animate out and remove
        setTimeout(() => {
            successDiv.style.transform = 'translateX(100%) scale(0.9)';
            successDiv.style.opacity = '0';
            setTimeout(() => {
                if (successDiv.parentNode) {
                    successDiv.parentNode.removeChild(successDiv);
                }
                bounceStyle.remove();
            }, 500);
        }, 4000);
    }

    setupContentTransitions() {
        // Smooth transitions for dynamic content
        this.observeContentChanges();
        this.setupIntersectionObserver();
    }

    observeContentChanges() {
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                mutation.addedNodes.forEach((node) => {
                    if (node.nodeType === Node.ELEMENT_NODE && node.matches('.card, .collapse, .tab-content, .search-result')) {
                        this.animateElement(node, 'fadeIn');
                    }
                });
            });
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    setupIntersectionObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                    this.animateElement(entry.target, 'slideUp');
                    entry.target.classList.add('animated');
                }
            });
        }, { threshold: 0.1 });

        // Observe all animatable elements
        document.querySelectorAll('.card, .collapse, section > div, .hero').forEach((el) => {
            observer.observe(el);
        });
    }

    animateElement(element, animationType = 'fadeIn') {
        element.classList.add(animationType);
        
        // Remove animation class after completion
        setTimeout(() => {
            element.classList.remove(animationType);
        }, 600);
    }

    showLoading(text = 'Loading...', subtext = 'Please wait', showProgress = false) {
        const overlay = document.getElementById('global-loading-overlay');
        const textEl = overlay.querySelector('.loading-text');
        const subtextEl = overlay.querySelector('.loading-subtext');
        const progressEl = overlay.querySelector('.loading-progress');

        textEl.textContent = text;
        subtextEl.textContent = subtext;
        
        if (showProgress) {
            progressEl.classList.remove('hidden');
            this.updateProgress(0);
        } else {
            progressEl.classList.add('hidden');
        }

        overlay.classList.remove('hidden');
        return overlay;
    }

    hideLoading() {
        const overlay = document.getElementById('global-loading-overlay');
        overlay.classList.add('hidden');
    }

    updateProgress(percentage) {
        const progressBar = document.querySelector('.loading-progress .progress-bar');
        const progressText = document.querySelector('.progress-text');
        
        if (progressBar && progressText) {
            progressBar.style.width = `${percentage}%`;
            progressText.textContent = `${Math.round(percentage)}%`;
            
            // Add completion animation when reaching 100%
            if (percentage >= 100) {
                progressBar.style.background = 'linear-gradient(90deg, #4ade80, #22c55e)';
                setTimeout(() => {
                    progressBar.parentElement.style.transform = 'scale(1.05)';
                    setTimeout(() => {
                        progressBar.parentElement.style.transform = 'scale(1)';
                    }, 200);
                }, 100);
            }
        }
    }

    createSkeleton(container, type = 'card') {
        const skeletonTemplates = {
            card: `
                <div class="content-skeleton skeleton">
                    <div class="skeleton-title skeleton mb-3"></div>
                    <div class="skeleton-text skeleton mb-2" style="width: 90%;"></div>
                    <div class="skeleton-text skeleton mb-2" style="width: 75%;"></div>
                    <div class="skeleton-text skeleton" style="width: 85%;"></div>
                </div>
            `,
            list: `
                <div class="content-skeleton skeleton">
                    <div class="flex items-center mb-3">
                        <div class="skeleton-avatar skeleton mr-3"></div>
                        <div class="flex-1">
                            <div class="skeleton-text skeleton mb-1" style="width: 60%;"></div>
                            <div class="skeleton-text skeleton" style="width: 40%;"></div>
                        </div>
                    </div>
                </div>
            `,
            image: `
                <div class="content-skeleton skeleton">
                    <div class="skeleton-image skeleton mb-3"></div>
                    <div class="skeleton-title skeleton mb-2"></div>
                    <div class="skeleton-text skeleton" style="width: 70%;"></div>
                </div>
            `
        };

        container.innerHTML = skeletonTemplates[type] || skeletonTemplates.card;
    }

    loadContentWithSkeleton(container, loadFunction, skeletonType = 'card') {
        // Show skeleton
        this.createSkeleton(container, skeletonType);
        
        // Load actual content
        return loadFunction().then((content) => {
            // Add fade transition
            container.style.opacity = '0';
            setTimeout(() => {
                container.innerHTML = content;
                container.style.transition = 'opacity 0.3s ease-in-out';
                container.style.opacity = '1';
            }, 100);
        });
    }

    bindEvents() {
        // Add loading animations to buttons
        document.addEventListener('click', (e) => {
            if (e.target.matches('.btn:not(.no-loading)')) {
                this.animateButton(e.target);
            }
        });

        // Add hover animations to cards
        document.addEventListener('mouseenter', (e) => {
            if (e.target.matches('.card')) {
                e.target.style.transform = 'translateY(-5px) scale(1.02)';
                e.target.style.transition = 'transform 0.3s ease-out';
            }
        }, true);

        document.addEventListener('mouseleave', (e) => {
            if (e.target.matches('.card')) {
                e.target.style.transform = 'translateY(0) scale(1)';
            }
        }, true);
    }

    animateButton(button) {
        button.style.transform = 'scale(0.95)';
        button.style.transition = 'transform 0.1s ease-out';
        
        setTimeout(() => {
            button.style.transform = 'scale(1)';
        }, 100);
    }

    // Public API for other components
    static getInstance() {
        if (!LoadingAnimations.instance) {
            LoadingAnimations.instance = new LoadingAnimations();
        }
        return LoadingAnimations.instance;
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.LoadingAnimations = LoadingAnimations.getInstance();
});

// Export for module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = LoadingAnimations;
} 