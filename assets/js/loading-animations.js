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
                background: 
                    linear-gradient(135deg, rgba(30,60,114,0.85) 0%, rgba(42,82,152,0.8) 50%, rgba(79,142,247,0.75) 100%),
                    url('assets/images/hk-flag-building.jpg');
                background-size: cover;
                background-position: center;
                background-attachment: fixed;
                z-index: 9999;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: opacity 0.8s ease-out;
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
                    radial-gradient(circle at 30% 20%, rgba(255,255,255,0.1) 0%, transparent 50%),
                    radial-gradient(circle at 70% 80%, rgba(255,255,255,0.05) 0%, transparent 50%);
                animation: backgroundFloat 10s ease-in-out infinite;
            }
            
            .page-loading::after {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: 
                    url('assets/images/hk-cityscape.jpg');
                background-size: cover;
                background-position: center;
                opacity: 0;
                animation: backgroundTransition 8s ease-in-out infinite;
            }
            
            @keyframes backgroundFloat {
                0%, 100% { transform: translateY(0px); }
                50% { transform: translateY(-20px); }
            }
            
            @keyframes backgroundTransition {
                0%, 30% { opacity: 0; }
                50%, 70% { opacity: 0.3; }
                100% { opacity: 0; }
            }
            
            .page-loading.fade-out {
                opacity: 0;
                pointer-events: none;
                transform: scale(1.05);
            }
            
            .loading-content {
                text-align: center;
                position: relative;
                z-index: 10;
                max-width: 500px;
                padding: 2rem;
                background: rgba(255,255,255,0.1);
                backdrop-filter: blur(15px);
                border-radius: 20px;
                border: 1px solid rgba(255,255,255,0.2);
                box-shadow: 0 20px 40px rgba(0,0,0,0.3);
                animation: contentSlideIn 1s ease-out;
            }
            
            @keyframes contentSlideIn {
                from { 
                    opacity: 0; 
                    transform: translateY(50px) scale(0.9); 
                }
                to { 
                    opacity: 1; 
                    transform: translateY(0) scale(1); 
                }
            }
            
            .loading-brand {
                margin-bottom: 2rem;
            }
            
            .brand-icon {
                margin-bottom: 1rem;
                perspective: 1000px;
            }
            
            .simple-logo {
                width: 100px;
                height: 100px;
                margin: 0 auto;
                background: linear-gradient(135deg, #4F8EF7 0%, #667eea 100%);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                animation: logoFloat 3s ease-in-out infinite;
                box-shadow: 
                    0 15px 40px rgba(79, 142, 247, 0.4),
                    0 0 0 0 rgba(79, 142, 247, 0.3);
                position: relative;
                overflow: hidden;
            }
            
            .simple-logo::before {
                content: 'F';
                font-size: 2.5rem;
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
                background: linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.3) 50%, transparent 70%);
                animation: logoShine 2s ease-in-out infinite;
            }
            
            @keyframes logoFloat {
                0%, 100% { 
                    transform: translateY(0px) scale(1); 
                    box-shadow: 
                        0 15px 40px rgba(79, 142, 247, 0.4),
                        0 0 0 0 rgba(79, 142, 247, 0.3);
                }
                50% { 
                    transform: translateY(-15px) scale(1.1); 
                    box-shadow: 
                        0 25px 50px rgba(79, 142, 247, 0.5),
                        0 0 0 20px rgba(79, 142, 247, 0.1);
                }
            }
            
            @keyframes logoShine {
                0% { transform: translateX(-100%) rotate(45deg); }
                100% { transform: translateX(100%) rotate(45deg); }
            }
            
            .loading-logo {
                font-size: 1.8rem;
                font-weight: 700;
                margin-bottom: 0.5rem;
                color: white;
                font-family: 'Inter', sans-serif;
                animation: bounceIn 1s ease-out 0.5s both;
                letter-spacing: 0.5px;
                text-shadow: 0 2px 10px rgba(0,0,0,0.3);
                line-height: 1.2;
            }
            
            .loading-tagline {
                font-size: 0.9rem;
                color: rgba(255,255,255,0.9);
                font-weight: 400;
                font-family: 'Inter', sans-serif;
                margin-bottom: 2rem;
                animation: fadeInUp 1s ease-out 0.8s both;
                text-shadow: 0 1px 5px rgba(0,0,0,0.3);
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
                    transform: translateY(20px); 
                }
                to { 
                    opacity: 1; 
                    transform: translateY(0); 
                }
            }
            
            .progress-section {
                margin-top: 1.5rem;
                animation: slideInFromBottom 1s ease-out 1s both;
            }
            
            @keyframes slideInFromBottom {
                from { 
                    opacity: 0; 
                    transform: translateY(30px); 
                }
                to { 
                    opacity: 1; 
                    transform: translateY(0); 
                }
            }
            
            .progress-bar-container {
                width: 100%;
                height: 8px;
                background: rgba(255,255,255,0.2);
                border-radius: 4px;
                overflow: hidden;
                margin-bottom: 1rem;
                position: relative;
                box-shadow: inset 0 2px 4px rgba(0,0,0,0.2);
            }
            
            .progress-bar-fill {
                height: 100%;
                background: linear-gradient(90deg, #4F8EF7 0%, #667eea 50%, #80d4ff 100%);
                border-radius: 4px;
                transition: width 0.3s ease;
                position: relative;
                box-shadow: 0 0 10px rgba(79, 142, 247, 0.5);
            }
            
            .progress-bar-fill::after {
                content: '';
                position: absolute;
                top: 0;
                left: -100%;
                width: 100%;
                height: 100%;
                background: linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent);
                animation: progressShine 2s ease-in-out infinite;
            }
            
            @keyframes progressShine {
                0% { left: -100%; }
                100% { left: 100%; }
            }
            
            .progress-text {
                font-size: 1.1rem;
                color: white;
                font-weight: 600;
                font-family: 'Inter', sans-serif;
                margin-bottom: 0.5rem;
                text-shadow: 0 1px 3px rgba(0,0,0,0.3);
            }
            
            .progress-status {
                font-size: 0.9rem;
                color: rgba(255,255,255,0.8);
                font-family: 'Inter', sans-serif;
                animation: fadeIn 0.3s ease-in-out;
                text-shadow: 0 1px 3px rgba(0,0,0,0.3);
            }
            
            .loading-steps {
                display: flex;
                justify-content: center;
                align-items: center;
                gap: 1.5rem;
                margin-top: 1.5rem;
                animation: stepsSlideIn 1s ease-out 1.2s both;
            }
            
            @keyframes stepsSlideIn {
                from { 
                    opacity: 0; 
                    transform: translateY(20px); 
                }
                to { 
                    opacity: 1; 
                    transform: translateY(0); 
                }
            }
            
            .step-icon {
                width: 50px;
                height: 50px;
                border-radius: 50%;
                background: rgba(255,255,255,0.1);
                backdrop-filter: blur(10px);
                border: 2px solid rgba(255,255,255,0.2);
                display: flex;
                align-items: center;
                justify-content: center;
                color: rgba(255,255,255,0.6);
                font-size: 0.8rem;
                font-weight: 600;
                transition: all 0.4s ease;
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
                transition: all 0.4s ease;
                transform: translate(-50%, -50%);
            }
            
            .step-icon.active {
                background: rgba(79, 142, 247, 0.9);
                border-color: rgba(79, 142, 247, 0.8);
                color: white;
                transform: scale(1.2);
                animation: stepPulse 2s ease-in-out infinite;
                box-shadow: 0 0 20px rgba(79, 142, 247, 0.6);
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
                background: rgba(16, 185, 129, 0.9);
                border-color: rgba(16, 185, 129, 0.8);
                color: white;
                transform: scale(1.1);
                animation: completedBounce 0.6s ease-out;
                box-shadow: 0 0 15px rgba(16, 185, 129, 0.5);
            }
            
            .step-icon.completed::after {
                content: '✓';
                position: absolute;
                font-size: 1.2rem;
                font-weight: bold;
                animation: checkmarkPop 0.5s ease-out;
            }
            
            @keyframes completedBounce {
                0% { transform: scale(1); }
                50% { transform: scale(1.3); }
                100% { transform: scale(1.1); }
            }
            
            @keyframes checkmarkPop {
                0% { transform: scale(0) rotate(-180deg); opacity: 0; }
                100% { transform: scale(1) rotate(0deg); opacity: 1; }
            }
            
            @keyframes stepPulse {
                0%, 100% { box-shadow: 0 0 20px rgba(79, 142, 247, 0.6); }
                50% { box-shadow: 0 0 30px rgba(79, 142, 247, 0.8); }
            }
            
            .loading-dots {
                display: flex;
                justify-content: center;
                gap: 0.5rem;
                margin-top: 1.5rem;
                animation: dotsSlideIn 1s ease-out 1.4s both;
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
                width: 10px;
                height: 10px;
                border-radius: 50%;
                background: rgba(255,255,255,0.8);
                animation: dotBounce 1.6s ease-in-out infinite;
                box-shadow: 0 0 10px rgba(255,255,255,0.3);
            }
            
            .loading-dot:nth-child(1) { animation-delay: 0s; }
            .loading-dot:nth-child(2) { animation-delay: 0.2s; }
            .loading-dot:nth-child(3) { animation-delay: 0.4s; }
            .loading-dot:nth-child(4) { animation-delay: 0.6s; }
            
            @keyframes dotBounce {
                0%, 80%, 100% { 
                    transform: scale(0.8); 
                    opacity: 0.5; 
                }
                40% { 
                    transform: scale(1.3); 
                    opacity: 1; 
                    box-shadow: 0 0 15px rgba(255,255,255,0.5);
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
            <div class="cityscape-bg"></div>
            <div class="loading-content">
                <div class="loading-brand">
                    <div class="brand-icon">
                        <div class="simple-logo"></div>
                    </div>
                    <div class="loading-logo">Fusiox Corporate Services Limited</div>
                    <div class="loading-tagline">Professional Corporate Services in Hong Kong</div>
                </div>
                
                <div class="progress-section">
                    <div class="progress-bar-container">
                        <div class="progress-bar-fill"></div>
                    </div>
                    <div class="progress-text">0%</div>
                    <div class="progress-status">Complete</div>
                </div>
                
                <div class="loading-steps">
                    <div class="step-icon active" data-step="1">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                        </svg>
                    </div>
                    <div class="step-icon" data-step="2">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                        </svg>
                    </div>
                    <div class="step-icon" data-step="3">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                    </div>
                </div>
                
                <div class="loading-dots">
                    <div class="loading-dot"></div>
                    <div class="loading-dot"></div>
                    <div class="loading-dot"></div>
                    <div class="loading-dot"></div>
                </div>
            </div>
        `;
        document.body.appendChild(pageLoader);

        // Simulate loading progress with steps
        this.simulateLoadingProgress(pageLoader);

        // Multi-stage splash: flag, then cityscape, then fade out
        const cityscapeDiv = pageLoader.querySelector('.cityscape-bg');
        setTimeout(() => {
            cityscapeDiv.classList.add('show');
            setTimeout(() => {
                this.completeLoading(pageLoader);
            }, 1500);
        }, 1500);
    }

    simulateLoadingProgress(pageLoader) {
        const progressFill = pageLoader.querySelector('.progress-bar-fill');
        const progressText = pageLoader.querySelector('.progress-text');
        const progressStatus = pageLoader.querySelector('.progress-status');
        const steps = pageLoader.querySelectorAll('.step-icon');
        
        let progress = 0;
        let currentStep = 0;
        
        const statuses = [
            "Connecting to Hong Kong services...",
            "Loading corporate solutions...",
            "Preparing professional interface...",
            "Setting up client portal...",
            "Finalizing your experience..."
        ];
        
        const progressInterval = setInterval(() => {
            progress += Math.random() * 15 + 5; // Random increment between 5-20%
            
            if (progress > 100) progress = 100;
            
            // Update progress bar
            progressFill.style.width = `${progress}%`;
            progressText.textContent = `${Math.round(progress)}%`;
            progressStatus.textContent = `${Math.round(progress)}% Complete`;
            
            // Update status text
            const statusIndex = Math.floor((progress / 100) * statuses.length);
            if (statusIndex < statuses.length) {
                // No direct status text update in HTML, rely on progress status
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
                progressStatus.textContent = "Welcome to Hong Kong's Premier Corporate Services!";
                steps.forEach(step => {
                    step.classList.remove('active');
                    step.classList.add('completed');
                });
            }
        }, 150);
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
            }, 800);
        }, 1200); // Show completed state briefly
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