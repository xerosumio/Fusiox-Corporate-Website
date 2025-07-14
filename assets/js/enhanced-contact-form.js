/**
 * Enhanced Contact Form with Advanced Interactions
 * Features: Real-time validation, progress indicators, auto-save, animations
 */

class EnhancedContactForm {
    constructor() {
        this.form = null;
        this.formData = {
            name: '',
            email: '',
            countryCode: '+852',
            phone: '',
            businessName: '',
            service: '',
            message: '',
            urgency: 'normal'
        };
        this.validationRules = this.setupValidationRules();
        this.errors = {};
        this.isSubmitting = false;
        this.autoSaveKey = 'fusiox-contact-form-draft';
        this.characterLimits = {
            name: 100,
            businessName: 150,
            message: 1000
        };
        this.init();
    }

    init() {
        this.form = document.getElementById('enhanced-contact-form');
        if (!this.form) {
            console.warn('Enhanced contact form not found');
            return;
        }

        this.setupFormElements();
        this.loadAutoSavedData();
        this.bindEvents();
        this.initializeProgress();
        this.setupSmartSuggestions();
        this.setupCharacterCounters();
        this.setupRealTimeValidation();
    }

    setupValidationRules() {
        return {
            name: {
                required: true,
                minLength: 2,
                maxLength: 100,
                pattern: /^[a-zA-Z\s\-'\.]+$/,
                message: 'Please enter a valid name (letters, spaces, hyphens, apostrophes only)'
            },
            email: {
                required: true,
                pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Please enter a valid email address'
            },
            phone: {
                required: false,
                validateFunction: this.validatePhoneNumber.bind(this)
            },
            businessName: {
                required: false,
                maxLength: 150,
                pattern: /^[a-zA-Z0-9\s\-'\.&,()]+$/,
                message: 'Business name contains invalid characters'
            },
            service: {
                required: false
            },
            message: {
                required: true,
                minLength: 20,
                maxLength: 1000,
                message: 'Please provide more details (at least 20 characters)'
            }
        };
    }

    setupFormElements() {
        // Create form structure if it doesn't exist
        if (!this.form.querySelector('.form-progress')) {
            this.injectEnhancedFormStructure();
        }
    }

    injectEnhancedFormStructure() {
        // Simplified form structure - no complex progress indicator
        const progressHTML = `
            <div class="form-progress mb-6" style="display: none;">
                <!-- Progress indicator hidden for cleaner look -->
            </div>
        `;

        // Insert simplified progress indicator (hidden)
        this.form.insertAdjacentHTML('afterbegin', progressHTML);
    }

    loadAutoSavedData() {
        try {
            const savedData = localStorage.getItem(this.autoSaveKey);
            if (savedData) {
                const parsedData = JSON.parse(savedData);
                this.formData = { ...this.formData, ...parsedData };
                this.populateForm();
                this.showAutoSaveNotification();
            }
        } catch (error) {
            console.warn('Failed to load auto-saved data:', error);
        }
    }

    showAutoSaveNotification() {
        const notification = document.createElement('div');
        notification.className = 'alert alert-info mb-4 auto-save-notification';
        notification.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current shrink-0 w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <span>We've restored your previous form data.</span>
            <button class="btn btn-sm btn-ghost ml-2" onclick="this.parentElement.remove()">Dismiss</button>
        `;
        this.form.insertBefore(notification, this.form.firstChild);

        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 5000);
    }

    populateForm() {
        Object.keys(this.formData).forEach(key => {
            const element = this.form.querySelector(`[name="${key}"]`);
            if (element && this.formData[key]) {
                element.value = this.formData[key];
                this.triggerInputEvent(element);
            }
        });
    }

    bindEvents() {
        // Form field events
        this.form.addEventListener('input', this.handleInput.bind(this));
        this.form.addEventListener('blur', this.handleBlur.bind(this), true);
        this.form.addEventListener('focus', this.handleFocus.bind(this), true);
        this.form.addEventListener('submit', this.handleSubmit.bind(this));

        // Auto-save every 2 seconds when typing
        this.form.addEventListener('input', this.debounce(this.autoSave.bind(this), 2000));

        // Urgency toggle
        const urgencyToggle = this.form.querySelector('[name="urgency"]');
        if (urgencyToggle) {
            urgencyToggle.addEventListener('change', this.handleUrgencyChange.bind(this));
        }

        // Service suggestion selection
        document.addEventListener('click', this.handleServiceSuggestionClick.bind(this));
    }

    handleInput(event) {
        const field = event.target;
        const fieldName = field.name;
        
        if (!fieldName) return;

        // Update form data
        this.formData[fieldName] = field.value;

        // Real-time validation
        this.validateField(fieldName, field.value);

        // Update progress
        this.updateProgress();

        // Update character counter
        this.updateCharacterCounter(fieldName, field.value);

        // Handle service suggestions
        if (fieldName === 'service-input') {
            this.showServiceSuggestions(field.value);
        }
    }

    handleBlur(event) {
        const field = event.target;
        const fieldName = field.name;
        
        if (!fieldName) return;

        // Validate field on blur
        this.validateField(fieldName, field.value);
        this.showFieldValidation(fieldName, field);
    }

    handleFocus(event) {
        const field = event.target;
        this.animateFieldFocus(field);
    }

    validateField(fieldName, value) {
        const rule = this.validationRules[fieldName];
        if (!rule) return true;

        let isValid = true;
        let errorMessage = '';

        // Required validation
        if (rule.required && (!value || value.trim() === '')) {
            isValid = false;
            errorMessage = `${this.getFieldLabel(fieldName)} is required`;
        }

        // Length validation
        if (isValid && rule.minLength && value.length < rule.minLength) {
            isValid = false;
            errorMessage = `${this.getFieldLabel(fieldName)} must be at least ${rule.minLength} characters`;
        }

        if (isValid && rule.maxLength && value.length > rule.maxLength) {
            isValid = false;
            errorMessage = `${this.getFieldLabel(fieldName)} must be no more than ${rule.maxLength} characters`;
        }

        // Pattern validation
        if (isValid && rule.pattern && value && !rule.pattern.test(value)) {
            isValid = false;
            errorMessage = rule.message || `${this.getFieldLabel(fieldName)} format is invalid`;
        }

        // Custom validation function
        if (isValid && rule.validateFunction) {
            const customValidation = rule.validateFunction(value);
            if (!customValidation.isValid) {
                isValid = false;
                errorMessage = customValidation.message;
            }
        }

        // Update errors object
        if (isValid) {
            delete this.errors[fieldName];
        } else {
            this.errors[fieldName] = errorMessage;
        }

        return isValid;
    }

    validatePhoneNumber(phone) {
        if (!phone || phone.trim() === '') {
            return { isValid: true }; // Phone is optional
        }

        const countryCode = this.formData.countryCode || '+852';
        const cleanPhone = phone.replace(/\D/g, '');

        const validationRules = {
            '+852': { length: 8, name: 'Hong Kong' },
            '+86': { length: 11, name: 'China' },
            '+1': { length: 10, name: 'USA' },
            '+44': { minLength: 10, maxLength: 11, name: 'UK' },
            '+65': { length: 8, name: 'Singapore' },
            '+60': { minLength: 9, maxLength: 10, name: 'Malaysia' }
        };

        const rule = validationRules[countryCode];
        if (!rule) {
            return { isValid: true };
        }

        if (rule.length && cleanPhone.length !== rule.length) {
            return {
                isValid: false,
                message: `Please enter a valid ${rule.name} phone number (${rule.length} digits)`
            };
        }

        if (rule.minLength && rule.maxLength) {
            if (cleanPhone.length < rule.minLength || cleanPhone.length > rule.maxLength) {
                return {
                    isValid: false,
                    message: `Please enter a valid ${rule.name} phone number (${rule.minLength}-${rule.maxLength} digits)`
                };
            }
        }

        return { isValid: true };
    }

    showFieldValidation(fieldName, field) {
        const fieldContainer = field.closest('.form-control') || field.closest('.field-container');
        if (!fieldContainer) return;

        // Remove existing validation
        const existingError = fieldContainer.querySelector('.field-error');
        const existingSuccess = fieldContainer.querySelector('.field-success');
        if (existingError) existingError.remove();
        if (existingSuccess) existingSuccess.remove();

        // Add validation styling
        field.classList.remove('input-error', 'input-success');

        if (this.errors[fieldName]) {
            // Show error
            field.classList.add('input-error');
            const errorElement = document.createElement('div');
            errorElement.className = 'field-error text-error text-sm mt-1 flex items-center';
            errorElement.innerHTML = `
                <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path>
                </svg>
                ${this.errors[fieldName]}
            `;
            fieldContainer.appendChild(errorElement);
        } else if (field.value && field.value.trim() !== '') {
            // Show success for non-empty valid fields
            field.classList.add('input-success');
            const successElement = document.createElement('div');
            successElement.className = 'field-success text-success text-sm mt-1 flex items-center';
            successElement.innerHTML = `
                <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                </svg>
                Looks good!
            `;
            fieldContainer.appendChild(successElement);
        }
    }

    animateFieldFocus(field) {
        // Add focus animation
        field.closest('.form-control')?.classList.add('field-focused');
        
        // Remove focus class when field loses focus
        const removeFocus = () => {
            field.closest('.form-control')?.classList.remove('field-focused');
            field.removeEventListener('blur', removeFocus);
        };
        field.addEventListener('blur', removeFocus);
    }

    updateProgress() {
        // Simplified progress update - no complex animations
        const totalFields = Object.keys(this.validationRules).length;
        const completedFields = this.getCompletedFieldsCount();
        const progressPercentage = (completedFields / totalFields) * 100;

        // Progress bars are hidden, so no need to update them
        // Just update basic step indicators if needed
        this.updateStepIndicators(progressPercentage);
    }

    getCompletedFieldsCount() {
        let completed = 0;
        Object.keys(this.validationRules).forEach(fieldName => {
            const value = this.formData[fieldName];
            if (value && value.trim() !== '' && !this.errors[fieldName]) {
                completed++;
            }
        });
        return completed;
    }

    updateStepIndicators(progressPercentage) {
        const steps = this.form.querySelectorAll('.step');
        steps.forEach((step, index) => {
            const stepProgress = ((index + 1) / steps.length) * 100;
            if (progressPercentage >= stepProgress - 20) {
                step.classList.add('completed');
            } else {
                step.classList.remove('completed');
            }
        });
    }

    setupCharacterCounters() {
        Object.keys(this.characterLimits).forEach(fieldName => {
            const field = this.form.querySelector(`[name="${fieldName}"]`);
            if (field) {
                this.addCharacterCounter(field, fieldName);
            }
        });
    }

    addCharacterCounter(field, fieldName) {
        const limit = this.characterLimits[fieldName];
        const fieldContainer = field.closest('.form-control');
        
        const counter = document.createElement('div');
        counter.className = 'character-counter text-xs text-gray-500 mt-1 text-right';
        counter.innerHTML = `<span class="current">0</span>/<span class="limit">${limit}</span>`;
        
        fieldContainer.appendChild(counter);
    }

    updateCharacterCounter(fieldName, value) {
        if (!this.characterLimits[fieldName]) return;

        const field = this.form.querySelector(`[name="${fieldName}"]`);
        const counter = field?.closest('.form-control')?.querySelector('.character-counter .current');
        
        if (counter) {
            const length = value.length;
            const limit = this.characterLimits[fieldName];
            counter.textContent = length;
            
            // Update color based on usage
            const percentage = (length / limit) * 100;
            const counterContainer = counter.closest('.character-counter');
            
            counterContainer.classList.remove('text-warning', 'text-error');
            if (percentage > 90) {
                counterContainer.classList.add('text-error');
            } else if (percentage > 75) {
                counterContainer.classList.add('text-warning');
            }
        }
    }

    setupSmartSuggestions() {
        const serviceField = this.form.querySelector('[name="service"]');
        if (!serviceField) return;

        // Convert select to input with suggestions
        const serviceInput = document.createElement('input');
        serviceInput.type = 'text';
        serviceInput.name = 'service-input';
        serviceInput.className = serviceField.className;
        serviceInput.placeholder = 'Start typing to see service suggestions...';
        
        const suggestionsContainer = document.createElement('div');
        suggestionsContainer.className = 'service-suggestions absolute bg-white border border-gray-300 rounded-md shadow-lg z-10 w-full hidden';
        
        // Replace select with input
        const fieldContainer = serviceField.closest('.form-control');
        serviceField.style.display = 'none';
        fieldContainer.appendChild(serviceInput);
        fieldContainer.style.position = 'relative';
        fieldContainer.appendChild(suggestionsContainer);

        this.serviceInput = serviceInput;
        this.serviceSuggestions = suggestionsContainer;
    }

    showServiceSuggestions(query) {
        const services = [
            'HKLPF Registration',
            'Company Secretary Service',
            'Registered Address and Mail Receiving',
            'Audit and Tax Filing',
            'Bank Account Opening',
            'CTC Certification',
            'Company Incorporation',
            'Legal Compliance Consultation',
            'Tax Planning Services',
            'Corporate Restructuring',
            'Trademark Registration',
            'Other'
        ];

        const filteredServices = services.filter(service => 
            service.toLowerCase().includes(query.toLowerCase())
        );

        if (query.length > 0 && filteredServices.length > 0) {
            this.serviceSuggestions.innerHTML = filteredServices
                .map(service => `
                    <div class="suggestion-item p-2 hover:bg-gray-100 cursor-pointer" data-service="${service}">
                        ${this.highlightMatch(service, query)}
                    </div>
                `).join('');
            this.serviceSuggestions.classList.remove('hidden');
        } else {
            this.serviceSuggestions.classList.add('hidden');
        }
    }

    highlightMatch(text, query) {
        const regex = new RegExp(`(${query})`, 'gi');
        return text.replace(regex, '<strong>$1</strong>');
    }

    handleServiceSuggestionClick(event) {
        if (event.target.classList.contains('suggestion-item')) {
            const service = event.target.getAttribute('data-service');
            this.serviceInput.value = service;
            this.formData.service = service;
            this.serviceSuggestions.classList.add('hidden');
            
            // Update hidden select for form submission
            const hiddenSelect = this.form.querySelector('[name="service"]');
            if (hiddenSelect) {
                hiddenSelect.value = service;
            }
        }
    }

    autoSave() {
        try {
            localStorage.setItem(this.autoSaveKey, JSON.stringify(this.formData));
        } catch (error) {
            console.warn('Failed to auto-save form data:', error);
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        
        if (this.isSubmitting) return;

        // Validate all fields
        let isFormValid = true;
        Object.keys(this.validationRules).forEach(fieldName => {
            const isValid = this.validateField(fieldName, this.formData[fieldName] || '');
            if (!isValid) isFormValid = false;
        });

        // Show all validation errors
        Object.keys(this.formData).forEach(fieldName => {
            const field = this.form.querySelector(`[name="${fieldName}"]`);
            if (field) {
                this.showFieldValidation(fieldName, field);
            }
        });

        if (!isFormValid) {
            this.showFormErrors();
            return;
        }

        this.submitForm();
    }

    showFormErrors() {
        const errorCount = Object.keys(this.errors).length;
        const errorAlert = document.createElement('div');
        errorAlert.className = 'alert alert-error mb-4 form-errors';
        errorAlert.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Please fix ${errorCount} error${errorCount !== 1 ? 's' : ''} before submitting.</span>
        `;

        // Remove existing error alert
        const existingAlert = this.form.querySelector('.form-errors');
        if (existingAlert) existingAlert.remove();

        this.form.insertBefore(errorAlert, this.form.firstChild);

        // Scroll to first error
        const firstErrorField = this.form.querySelector('.input-error');
        if (firstErrorField) {
            firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
            firstErrorField.focus();
        }

        // Remove error alert after 10 seconds
        setTimeout(() => {
            if (errorAlert.parentElement) {
                errorAlert.remove();
            }
        }, 10000);
    }

    async submitForm() {
        this.isSubmitting = true;
        this.showSubmittingState();

        try {
            // Simulate form submission (replace with actual implementation)
            await this.simulateFormSubmission();
            
            this.showSuccessState();
            this.clearAutoSavedData();
            this.resetForm();
        } catch (error) {
            this.showErrorState(error.message);
        } finally {
            this.isSubmitting = false;
        }
    }

    async simulateFormSubmission() {
        // Replace this with actual form submission logic
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Simulate random success/failure for demo
                if (Math.random() > 0.1) {
                    resolve();
                } else {
                    reject(new Error('Network error occurred. Please try again.'));
                }
            }, 2000);
        });
    }

    showSubmittingState() {
        const submitButton = this.form.querySelector('[type="submit"]');
        if (submitButton) {
            submitButton.disabled = true;
            submitButton.innerHTML = `
                <span class="loading loading-spinner loading-sm"></span>
                Sending Message...
            `;
        }
    }

    showSuccessState() {
        const successAlert = document.createElement('div');
        successAlert.className = 'alert alert-success mb-4 form-success';
        successAlert.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
                <div class="font-bold">Message sent successfully!</div>
                <div class="text-sm">We'll get back to you within 24 hours.</div>
            </div>
        `;

        this.form.insertBefore(successAlert, this.form.firstChild);
        successAlert.scrollIntoView({ behavior: 'smooth' });
    }

    showErrorState(message) {
        const errorAlert = document.createElement('div');
        errorAlert.className = 'alert alert-error mb-4 form-submission-error';
        errorAlert.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
                <div class="font-bold">Failed to send message</div>
                <div class="text-sm">${message}</div>
            </div>
        `;

        this.form.insertBefore(errorAlert, this.form.firstChild);
        this.resetSubmitButton();
    }

    resetSubmitButton() {
        const submitButton = this.form.querySelector('[type="submit"]');
        if (submitButton) {
            submitButton.disabled = false;
            submitButton.innerHTML = 'Send Message';
        }
    }

    resetForm() {
        this.formData = {
            name: '',
            email: '',
            countryCode: '+852',
            phone: '',
            businessName: '',
            service: '',
            message: '',
            urgency: 'normal'
        };
        this.errors = {};
        
        // Reset form fields
        this.form.reset();
        
        // Reset validation states
        this.form.querySelectorAll('.input-error, .input-success').forEach(field => {
            field.classList.remove('input-error', 'input-success');
        });
        
        // Remove validation messages
        this.form.querySelectorAll('.field-error, .field-success').forEach(msg => {
            msg.remove();
        });
        
        // Reset progress
        this.updateProgress();
        
        // Reset character counters
        this.form.querySelectorAll('.character-counter .current').forEach(counter => {
            counter.textContent = '0';
        });

        this.resetSubmitButton();
    }

    clearAutoSavedData() {
        try {
            localStorage.removeItem(this.autoSaveKey);
        } catch (error) {
            console.warn('Failed to clear auto-saved data:', error);
        }
    }

    initializeProgress() {
        this.updateProgress();
    }

    setupRealTimeValidation() {
        // Initialize validation display for all fields
        Object.keys(this.validationRules).forEach(fieldName => {
            const field = this.form.querySelector(`[name="${fieldName}"]`);
            if (field) {
                this.validateField(fieldName, field.value || '');
            }
        });
    }

    getFieldLabel(fieldName) {
        const labelMap = {
            name: 'Name',
            email: 'Email',
            phone: 'Phone',
            businessName: 'Business Name',
            service: 'Service',
            message: 'Message'
        };
        return labelMap[fieldName] || fieldName;
    }

    triggerInputEvent(element) {
        const event = new Event('input', { bubbles: true });
        element.dispatchEvent(event);
    }

    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Handle urgency changes
    handleUrgencyChange(event) {
        this.formData.urgency = event.target.value;
        
        // Show urgency indicator
        const urgencyIndicator = this.form.querySelector('.urgency-indicator');
        if (urgencyIndicator) {
            urgencyIndicator.textContent = event.target.value === 'urgent' 
                ? 'We\'ll prioritize your request' 
                : 'Standard response time applies';
        }
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new EnhancedContactForm();
});

// Export for external use
window.EnhancedContactForm = EnhancedContactForm; 