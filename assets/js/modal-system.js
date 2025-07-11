/**
 * Modal and Lightbox System
 * Features: Image lightbox, content modals, form modals, confirmation dialogs
 */

class ModalSystem {
    constructor() {
        this.modals = new Map();
        this.activeModal = null;
        this.init();
    }

    init() {
        this.createModalContainer();
        this.bindEvents();
        this.setupImageLightbox();
        this.setupVideoLightbox();
        this.createPrebuiltModals();
    }

    createModalContainer() {
        // Create modal overlay container
        const modalContainer = document.createElement('div');
        modalContainer.id = 'modal-container';
        modalContainer.className = 'fixed inset-0 z-50 hidden items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm';
        modalContainer.innerHTML = `
            <div class="modal-content bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-screen overflow-hidden transform transition-all duration-300 scale-95 opacity-0">
                <div class="modal-header flex items-center justify-between p-6 border-b">
                    <h3 class="modal-title text-xl font-semibold text-gray-900"></h3>
                    <button class="modal-close text-gray-400 hover:text-gray-600 transition-colors duration-200">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>
                <div class="modal-body p-6 overflow-y-auto max-h-96"></div>
                <div class="modal-footer hidden p-6 border-t bg-gray-50 flex justify-end space-x-3"></div>
            </div>
        `;
        document.body.appendChild(modalContainer);

        // Create lightbox container
        const lightboxContainer = document.createElement('div');
        lightboxContainer.id = 'lightbox-container';
        lightboxContainer.className = 'fixed inset-0 z-50 hidden items-center justify-center bg-black bg-opacity-90 backdrop-blur-sm';
        lightboxContainer.innerHTML = `
            <div class="lightbox-content relative max-w-screen max-h-screen">
                <button class="lightbox-close absolute top-4 right-4 z-10 text-white hover:text-gray-300 transition-colors duration-200">
                    <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
                <div class="lightbox-nav hidden">
                    <button class="lightbox-prev absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300">
                        <svg class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
                        </svg>
                    </button>
                    <button class="lightbox-next absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300">
                        <svg class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                        </svg>
                    </button>
                </div>
                <div class="lightbox-image-container flex items-center justify-center h-full">
                    <img class="lightbox-image max-w-full max-h-full object-contain" src="" alt="">
                </div>
                <div class="lightbox-caption hidden absolute bottom-4 left-4 right-4 text-white text-center bg-black bg-opacity-50 rounded p-3"></div>
                <div class="lightbox-counter hidden absolute top-4 left-4 text-white bg-black bg-opacity-50 rounded px-3 py-1"></div>
            </div>
        `;
        document.body.appendChild(lightboxContainer);

        // Create notification container
        const notificationContainer = document.createElement('div');
        notificationContainer.id = 'notification-container';
        notificationContainer.className = 'fixed top-4 right-4 z-50 space-y-3';
        document.body.appendChild(notificationContainer);
    }

    createPrebuiltModals() {
        // Confirmation dialog
        this.registerModal('confirm', {
            title: 'Confirm Action',
            body: '<p class="text-gray-600">Are you sure you want to proceed?</p>',
            footer: `
                <button class="btn-cancel px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors duration-200">Cancel</button>
                <button class="btn-confirm px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200">Confirm</button>
            `
        });

        // Contact form modal
        this.registerModal('contact-quick', {
            title: 'Quick Contact',
            body: `
                <form id="quick-contact-form" class="space-y-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Name</label>
                        <input type="text" name="name" required class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input type="email" name="email" required class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Message</label>
                        <textarea name="message" rows="4" required class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"></textarea>
                    </div>
                </form>
            `,
            footer: `
                <button type="button" class="btn-cancel px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors duration-200">Cancel</button>
                <button type="submit" form="quick-contact-form" class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">Send Message</button>
            `
        });

        // Service details modal
        this.registerModal('service-details', {
            title: 'Service Details',
            body: '<div class="service-details-content"></div>',
            footer: `
                <button type="button" class="btn-cancel px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors duration-200">Close</button>
                <button type="button" class="btn-contact px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">Get Quote</button>
            `
        });

        // Video player modal
        this.registerModal('video-player', {
            title: 'Video',
            body: '<div class="video-player-content"></div>',
            size: 'large',
            onClose: () => {
                // Stop video when modal closes
                const videoContainer = document.querySelector('.video-player-content');
                if (videoContainer) {
                    videoContainer.innerHTML = '';
                }
            }
        });
    }

    setupImageLightbox() {
        // Auto-detect images for lightbox
        document.addEventListener('click', (e) => {
            const image = e.target.closest('img[data-lightbox], .lightbox-trigger img');
            if (image) {
                e.preventDefault();
                this.openLightbox(image);
            }
        });

        // Gallery support
        this.setupGalleryNavigation();
    }

    setupVideoLightbox() {
        // Auto-detect video triggers
        document.addEventListener('click', (e) => {
            const videoTrigger = e.target.closest('[data-video], .video-trigger');
            if (videoTrigger) {
                e.preventDefault();
                this.openVideoModal(videoTrigger);
            }
        });
    }

    openVideoModal(trigger) {
        const videoSrc = trigger.getAttribute('data-video');
        const videoType = trigger.getAttribute('data-video-type') || 'url'; // url, youtube, vimeo, file
        const videoTitle = trigger.getAttribute('data-video-title') || 'Video';
        const videoPoster = trigger.getAttribute('data-video-poster');
        
        let videoContent = '';
        
        switch (videoType) {
            case 'youtube':
                videoContent = this.createYouTubeEmbed(videoSrc);
                break;
            case 'vimeo':
                videoContent = this.createVimeoEmbed(videoSrc);
                break;
            case 'file':
                videoContent = this.createVideoElement(videoSrc, videoPoster);
                break;
            default:
                // Auto-detect based on URL
                if (videoSrc.includes('youtube.com') || videoSrc.includes('youtu.be')) {
                    videoContent = this.createYouTubeEmbed(this.extractYouTubeId(videoSrc));
                } else if (videoSrc.includes('vimeo.com')) {
                    videoContent = this.createVimeoEmbed(this.extractVimeoId(videoSrc));
                } else {
                    videoContent = this.createVideoElement(videoSrc, videoPoster);
                }
        }

        this.openModal('video-player', {
            title: videoTitle,
            body: videoContent
        });
    }

    createYouTubeEmbed(videoId) {
        return `
            <div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;">
                <iframe 
                    style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"
                    src="https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&showinfo=0&modestbranding=1" 
                    frameborder="0" 
                    allowfullscreen
                    allow="autoplay; encrypted-media">
                </iframe>
            </div>
        `;
    }

    createVimeoEmbed(videoId) {
        return `
            <div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;">
                <iframe 
                    style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"
                    src="https://player.vimeo.com/video/${videoId}?autoplay=1&color=4F8EF7&title=0&byline=0&portrait=0" 
                    frameborder="0" 
                    allowfullscreen
                    allow="autoplay; encrypted-media">
                </iframe>
            </div>
        `;
    }

    createVideoElement(videoSrc, poster = null) {
        const posterAttr = poster ? `poster="${poster}"` : '';
        return `
            <div style="text-align: center;">
                <video 
                    style="width: 100%; height: auto; max-height: 70vh;"
                    controls 
                    autoplay 
                    ${posterAttr}
                    preload="metadata"
                >
                    <source src="${videoSrc}" type="video/mp4">
                    <source src="${videoSrc.replace('.mp4', '.webm')}" type="video/webm">
                    Your browser does not support the video tag.
                </video>
            </div>
        `;
    }

    extractYouTubeId(url) {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    }

    extractVimeoId(url) {
        const regExp = /(?:vimeo)\.com.*(?:videos|video|channels|)\/([\d]+)/i;
        const match = url.match(regExp);
        return match ? match[1] : null;
    }

    setupGalleryNavigation() {
        const lightboxContainer = document.getElementById('lightbox-container');
        let currentGallery = [];
        let currentIndex = 0;

        // Previous image
        lightboxContainer.querySelector('.lightbox-prev').addEventListener('click', () => {
            if (currentGallery.length > 1) {
                currentIndex = (currentIndex - 1 + currentGallery.length) % currentGallery.length;
                this.showLightboxImage(currentGallery[currentIndex], currentIndex, currentGallery);
            }
        });

        // Next image
        lightboxContainer.querySelector('.lightbox-next').addEventListener('click', () => {
            if (currentGallery.length > 1) {
                currentIndex = (currentIndex + 1) % currentGallery.length;
                this.showLightboxImage(currentGallery[currentIndex], currentIndex, currentGallery);
            }
        });

        // Store gallery reference
        this.currentGallery = currentGallery;
        this.currentIndex = currentIndex;
    }

    registerModal(id, config) {
        this.modals.set(id, {
            title: config.title || '',
            body: config.body || '',
            footer: config.footer || '',
            size: config.size || 'medium',
            closable: config.closable !== false,
            onOpen: config.onOpen || null,
            onClose: config.onClose || null
        });
    }

    openModal(id, data = {}) {
        const modal = this.modals.get(id);
        if (!modal) {
            console.warn(`Modal '${id}' not found`);
            return;
        }

        const container = document.getElementById('modal-container');
        const content = container.querySelector('.modal-content');
        const title = container.querySelector('.modal-title');
        const body = container.querySelector('.modal-body');
        const footer = container.querySelector('.modal-footer');

        // Set content
        title.textContent = data.title || modal.title;
        body.innerHTML = data.body || modal.body;
        
        if (modal.footer || data.footer) {
            footer.innerHTML = data.footer || modal.footer;
            footer.classList.remove('hidden');
        } else {
            footer.classList.add('hidden');
        }

        // Apply size
        this.applyModalSize(content, modal.size);

        // Show modal
        container.classList.remove('hidden');
        container.classList.add('flex');
        
        // Animation
        setTimeout(() => {
            content.classList.remove('scale-95', 'opacity-0');
            content.classList.add('scale-100', 'opacity-100');
        }, 10);

        this.activeModal = id;

        // Call onOpen callback
        if (modal.onOpen) {
            modal.onOpen(data);
        }

        // Setup modal-specific events
        this.setupModalEvents(id, modal);

        return container;
    }

    applyModalSize(content, size) {
        content.classList.remove('max-w-sm', 'max-w-md', 'max-w-lg', 'max-w-xl', 'max-w-2xl', 'max-w-4xl', 'max-w-6xl');
        
        switch (size) {
            case 'small':
                content.classList.add('max-w-md');
                break;
            case 'large':
                content.classList.add('max-w-6xl');
                break;
            case 'full':
                content.classList.add('max-w-full', 'h-full');
                break;
            default:
                content.classList.add('max-w-2xl');
        }
    }

    setupModalEvents(id, modal) {
        const container = document.getElementById('modal-container');
        
        // Handle specific modal behaviors
        if (id === 'contact-quick') {
            const form = container.querySelector('#quick-contact-form');
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleQuickContact(form);
            });
        }

        if (id === 'service-details') {
            const contactBtn = container.querySelector('.btn-contact');
            if (contactBtn) {
                contactBtn.addEventListener('click', () => {
                    this.closeModal();
                    this.openModal('contact-quick');
                });
            }
        }
    }

    closeModal() {
        const container = document.getElementById('modal-container');
        const content = container.querySelector('.modal-content');
        
        if (!this.activeModal) return;

        // Animation
        content.classList.remove('scale-100', 'opacity-100');
        content.classList.add('scale-95', 'opacity-0');

        setTimeout(() => {
            container.classList.add('hidden');
            container.classList.remove('flex');
            
            // Call onClose callback
            const modal = this.modals.get(this.activeModal);
            if (modal && modal.onClose) {
                modal.onClose();
            }
            
            this.activeModal = null;
        }, 300);
    }

    openLightbox(image, gallery = null) {
        const container = document.getElementById('lightbox-container');
        const imageElement = container.querySelector('.lightbox-image');
        const caption = container.querySelector('.lightbox-caption');
        const counter = container.querySelector('.lightbox-counter');
        const nav = container.querySelector('.lightbox-nav');

        // Determine gallery
        if (!gallery) {
            const galleryName = image.getAttribute('data-gallery');
            if (galleryName) {
                gallery = Array.from(document.querySelectorAll(`img[data-gallery="${galleryName}"]`));
            } else {
                gallery = [image];
            }
        }

        const currentIndex = gallery.indexOf(image);
        this.currentGallery = gallery;
        this.currentIndex = currentIndex;

        this.showLightboxImage(image, currentIndex, gallery);

        // Show/hide navigation
        if (gallery.length > 1) {
            nav.classList.remove('hidden');
            counter.classList.remove('hidden');
        } else {
            nav.classList.add('hidden');
            counter.classList.add('hidden');
        }

        // Show lightbox
        container.classList.remove('hidden');
        container.classList.add('flex');
    }

    showLightboxImage(image, index, gallery) {
        const container = document.getElementById('lightbox-container');
        const imageElement = container.querySelector('.lightbox-image');
        const caption = container.querySelector('.lightbox-caption');
        const counter = container.querySelector('.lightbox-counter');

        // Set image
        imageElement.src = image.getAttribute('data-lightbox-src') || image.src;
        imageElement.alt = image.alt;

        // Set caption
        const captionText = image.getAttribute('data-caption') || image.alt;
        if (captionText) {
            caption.textContent = captionText;
            caption.classList.remove('hidden');
        } else {
            caption.classList.add('hidden');
        }

        // Set counter
        if (gallery.length > 1) {
            counter.textContent = `${index + 1} of ${gallery.length}`;
        }
    }

    closeLightbox() {
        const container = document.getElementById('lightbox-container');
        container.classList.add('hidden');
        container.classList.remove('flex');
    }

    showConfirm(message, onConfirm, onCancel = null) {
        return new Promise((resolve) => {
            this.openModal('confirm', {
                body: `<p class="text-gray-600">${message}</p>`
            });

            const container = document.getElementById('modal-container');
            const confirmBtn = container.querySelector('.btn-confirm');
            const cancelBtn = container.querySelector('.btn-cancel');

            confirmBtn.onclick = () => {
                this.closeModal();
                if (onConfirm) onConfirm();
                resolve(true);
            };

            cancelBtn.onclick = () => {
                this.closeModal();
                if (onCancel) onCancel();
                resolve(false);
            };
        });
    }

    showNotification(message, type = 'info', duration = 5000) {
        const container = document.getElementById('notification-container');
        const notification = document.createElement('div');
        
        const colors = {
            success: 'bg-green-500',
            error: 'bg-red-500',
            warning: 'bg-yellow-500',
            info: 'bg-blue-500'
        };

        notification.className = `notification ${colors[type]} text-white px-6 py-3 rounded-lg shadow-lg transform translate-x-full transition-transform duration-300 flex items-center space-x-3`;
        notification.innerHTML = `
            <div class="flex-1">${message}</div>
            <button class="text-white hover:text-gray-200" onclick="this.parentElement.remove()">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
            </button>
        `;

        container.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Auto remove
        if (duration > 0) {
            setTimeout(() => {
                notification.style.transform = 'translateX(100%)';
                setTimeout(() => {
                    if (notification.parentNode) {
                        notification.parentNode.removeChild(notification);
                    }
                }, 300);
            }, duration);
        }

        return notification;
    }

    handleQuickContact(form) {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);

        // Show loading
        if (window.LoadingAnimations) {
            window.LoadingAnimations.showLoading('Sending message...', 'Please wait while we process your request');
        }

        // Simulate form submission
        setTimeout(() => {
            if (window.LoadingAnimations) {
                window.LoadingAnimations.hideLoading();
            }
            
            this.closeModal();
            this.showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
            
            // Reset form
            form.reset();
        }, 2000);
    }

    bindEvents() {
        // Close modal on overlay click
        document.addEventListener('click', (e) => {
            if (e.target.id === 'modal-container') {
                this.closeModal();
            }
            if (e.target.id === 'lightbox-container') {
                this.closeLightbox();
            }
        });

        // Close modal on close button click
        document.addEventListener('click', (e) => {
            if (e.target.matches('.modal-close, .lightbox-close')) {
                if (e.target.matches('.modal-close')) {
                    this.closeModal();
                } else {
                    this.closeLightbox();
                }
            }
        });

        // Cancel buttons
        document.addEventListener('click', (e) => {
            if (e.target.matches('.btn-cancel')) {
                this.closeModal();
            }
        });

        // Keyboard events
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                if (this.activeModal) {
                    this.closeModal();
                } else if (!document.getElementById('lightbox-container').classList.contains('hidden')) {
                    this.closeLightbox();
                }
            }

            // Lightbox navigation
            if (!document.getElementById('lightbox-container').classList.contains('hidden')) {
                if (e.key === 'ArrowLeft') {
                    document.querySelector('.lightbox-prev').click();
                } else if (e.key === 'ArrowRight') {
                    document.querySelector('.lightbox-next').click();
                }
            }
        });

        // Modal triggers
        document.addEventListener('click', (e) => {
            const trigger = e.target.closest('[data-modal]');
            if (trigger) {
                e.preventDefault();
                const modalId = trigger.getAttribute('data-modal');
                const modalData = JSON.parse(trigger.getAttribute('data-modal-data') || '{}');
                this.openModal(modalId, modalData);
            }
        });
    }

    // Public API
    static getInstance() {
        if (!ModalSystem.instance) {
            ModalSystem.instance = new ModalSystem();
        }
        return ModalSystem.instance;
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.ModalSystem = ModalSystem.getInstance();
});

// Export for module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ModalSystem;
} 