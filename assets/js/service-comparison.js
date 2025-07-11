/**
 * Interactive Service Comparison Tool
 * Features: Side-by-side comparison, filtering, recommendations
 */

class ServiceComparison {
    constructor() {
        this.services = {};
        this.selectedServices = new Set();
        this.maxComparisons = 3;
        this.comparisonModal = null;
        this.init();
    }

    init() {
        this.setupServiceData();
        this.createComparisonInterface();
        this.bindEvents();
        this.addComparisonButtons();
    }

    setupServiceData() {
        this.services = {
            'hklpf-registration': {
                id: 'hklpf-registration',
                name: 'HKLPF Registration',
                price: 2500,
                currency: 'USD',
                duration: '2-3 weeks',
                category: 'Fund Services',
                popularity: 5,
                features: [
                    'Complete HKLPF registration process',
                    'Legal documentation preparation',
                    'Regulatory compliance guidance',
                    'Partnership agreement drafting',
                    'Filing with Hong Kong authorities',
                    'Certificate of registration',
                    'Ongoing compliance support'
                ],
                benefits: [
                    'Hong Kong tax advantages',
                    'International recognition',
                    'Professional fund structure',
                    'Regulatory protection'
                ],
                suitableFor: ['Investment funds', 'Private equity', 'Venture capital', 'Hedge funds'],
                requirements: [
                    'General Partner entity',
                    'Investment manager license',
                    'Minimum capital commitment',
                    'Professional investors only'
                ],
                timeline: [
                    { step: 'Documentation', duration: '3-5 days' },
                    { step: 'Authority filing', duration: '1-2 weeks' },
                    { step: 'Registration completion', duration: '2-3 days' }
                ]
            },
            'company-secretary': {
                id: 'company-secretary',
                name: 'Company Secretary Service',
                price: 1180,
                currency: 'USD',
                duration: 'Ongoing',
                category: 'Corporate Services',
                popularity: 4,
                features: [
                    'Statutory compliance management',
                    'Board meeting preparation',
                    'Annual return filing',
                    'Corporate record maintenance',
                    'Regulatory correspondence',
                    'Legal notice handling',
                    '24/7 compliance monitoring'
                ],
                benefits: [
                    'Full regulatory compliance',
                    'Professional expertise',
                    'Risk mitigation',
                    'Time savings'
                ],
                suitableFor: ['All Hong Kong companies', 'Listed companies', 'Private companies', 'Subsidiaries'],
                requirements: [
                    'Valid company registration',
                    'Current corporate records',
                    'Director information',
                    'Registered office address'
                ],
                timeline: [
                    { step: 'Service setup', duration: '1-2 days' },
                    { step: 'Record review', duration: '2-3 days' },
                    { step: 'Ongoing service', duration: 'Continuous' }
                ]
            },
            'registered-address': {
                id: 'registered-address',
                name: 'Registered Address & Mail',
                price: 600,
                currency: 'USD',
                duration: 'Annual',
                category: 'Corporate Services',
                popularity: 3,
                features: [
                    'Professional Hong Kong address',
                    'Mail receiving and forwarding',
                    'Government correspondence handling',
                    'Package acceptance',
                    'Digital mail scanning',
                    'Secure mail storage',
                    'Online mail management portal'
                ],
                benefits: [
                    'Professional business presence',
                    'Mail management convenience',
                    'Privacy protection',
                    'Cost-effective solution'
                ],
                suitableFor: ['Remote businesses', 'International companies', 'Small businesses', 'Startups'],
                requirements: [
                    'Company registration',
                    'Service agreement',
                    'Contact information',
                    'Identification documents'
                ],
                timeline: [
                    { step: 'Service activation', duration: '1 day' },
                    { step: 'Address registration', duration: '1-2 days' },
                    { step: 'Mail service begins', duration: 'Immediate' }
                ]
            },
            'audit-tax': {
                id: 'audit-tax',
                name: 'Audit & Tax Filing',
                price: 2800,
                currency: 'USD',
                duration: '2-4 weeks',
                category: 'Compliance',
                popularity: 4,
                features: [
                    'Annual audit services',
                    'Tax return preparation',
                    'Financial statement preparation',
                    'Tax compliance review',
                    'IRD correspondence',
                    'Audit report issuance',
                    'Tax planning advice'
                ],
                benefits: [
                    'Regulatory compliance',
                    'Professional audit opinion',
                    'Tax optimization',
                    'Financial transparency'
                ],
                suitableFor: ['All active companies', 'Listed companies', 'Large businesses', 'SMEs'],
                requirements: [
                    'Complete financial records',
                    'Bank statements',
                    'Supporting documents',
                    'Previous year returns'
                ],
                timeline: [
                    { step: 'Records review', duration: '3-5 days' },
                    { step: 'Audit fieldwork', duration: '1-2 weeks' },
                    { step: 'Report finalization', duration: '3-5 days' }
                ]
            },
            'bank-account': {
                id: 'bank-account',
                name: 'Bank Account Opening',
                price: 1500,
                currency: 'USD',
                duration: '2-6 weeks',
                category: 'Banking',
                popularity: 5,
                features: [
                    'Bank introduction services',
                    'Application preparation',
                    'Document compilation',
                    'Meeting arrangement',
                    'Application follow-up',
                    'Account activation support',
                    'Banking relationship management'
                ],
                benefits: [
                    'Local banking relationship',
                    'Multi-currency accounts',
                    'Online banking access',
                    'Professional banking partner'
                ],
                suitableFor: ['New companies', 'Foreign companies', 'Investment funds', 'Trading companies'],
                requirements: [
                    'Company incorporation documents',
                    'Business plan',
                    'Director identification',
                    'Proof of address'
                ],
                timeline: [
                    { step: 'Documentation prep', duration: '3-5 days' },
                    { step: 'Bank application', duration: '1-4 weeks' },
                    { step: 'Account activation', duration: '1-2 weeks' }
                ]
            },
            'ctc-certification': {
                id: 'ctc-certification',
                name: 'CTC Certification',
                price: 800,
                currency: 'USD',
                duration: '1-2 weeks',
                category: 'Compliance',
                popularity: 3,
                features: [
                    'Beneficial ownership verification',
                    'CTC form preparation',
                    'Supporting documentation',
                    'Compliance review',
                    'Submission handling',
                    'Certificate issuance',
                    'Renewal reminders'
                ],
                benefits: [
                    'Regulatory compliance',
                    'Transparency compliance',
                    'International standards',
                    'Banking requirements'
                ],
                suitableFor: ['Listed companies', 'Financial institutions', 'Regulated entities', 'International businesses'],
                requirements: [
                    'Corporate structure diagram',
                    'Beneficial owner information',
                    'Supporting documents',
                    'Company records'
                ],
                timeline: [
                    { step: 'Information gathering', duration: '2-3 days' },
                    { step: 'Form preparation', duration: '3-5 days' },
                    { step: 'Certification process', duration: '3-7 days' }
                ]
            }
        };
    }

    createComparisonInterface() {
        const modalHTML = `
            <div id="service-comparison-modal" class="fixed inset-0 bg-black bg-opacity-50 z-50 hidden">
                <div class="flex items-center justify-center min-h-screen px-4">
                    <div class="bg-white rounded-2xl shadow-2xl w-full max-w-7xl max-h-[90vh] overflow-hidden">
                        <div class="comparison-header p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50">
                            <div class="flex items-center justify-between">
                                <div>
                                    <h2 class="text-2xl font-bold text-gray-900">Service Comparison</h2>
                                    <p class="text-gray-600 mt-1">Compare our services side by side</p>
                                </div>
                                <button id="comparison-close-btn" class="text-gray-400 hover:text-gray-600 p-2">
                                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                                    </svg>
                                </button>
                            </div>
                            
                            <div class="mt-4">
                                <div class="flex flex-wrap gap-2" id="selected-services-tags">
                                    <!-- Selected services will be shown here -->
                                </div>
                                
                                <div class="mt-4">
                                    <label class="block text-sm font-medium text-gray-700 mb-2">Add services to compare:</label>
                                    <div class="flex flex-wrap gap-2" id="available-services">
                                        <!-- Available services will be shown here -->
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="comparison-content overflow-auto" style="max-height: calc(90vh - 200px);">
                            <div id="comparison-table" class="p-6">
                                <!-- Comparison table will be generated here -->
                            </div>
                        </div>
                        
                        <div class="comparison-footer p-6 border-t border-gray-200 bg-gray-50">
                            <div class="flex justify-between items-center">
                                <div class="text-sm text-gray-600">
                                    Select up to ${this.maxComparisons} services to compare
                                </div>
                                <div class="flex space-x-3">
                                    <button id="clear-comparison" class="btn btn-ghost">Clear All</button>
                                    <button id="get-quote-btn" class="btn btn-primary" disabled>Get Quote for Selected</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', modalHTML);
        this.comparisonModal = document.getElementById('service-comparison-modal');
    }

    addComparisonButtons() {
        // Add comparison buttons to service cards
        const serviceCards = document.querySelectorAll('.service-card, .card');
        serviceCards.forEach(card => {
            // Try to identify service from the card content
            const titleElement = card.querySelector('.card-title, h2, h3');
            if (!titleElement) return;
            
            const title = titleElement.textContent.trim();
            const serviceId = this.findServiceIdByTitle(title);
            
            if (serviceId) {
                this.addComparisonButtonToCard(card, serviceId);
            }
        });

        // Add "Compare Services" button to services page
        this.addGlobalComparisonButton();
    }

    findServiceIdByTitle(title) {
        for (const [id, service] of Object.entries(this.services)) {
            if (title.includes(service.name) || service.name.includes(title)) {
                return id;
            }
        }
        return null;
    }

    addComparisonButtonToCard(card, serviceId) {
        const actionsContainer = card.querySelector('.card-actions');
        if (actionsContainer) {
            const compareBtn = document.createElement('button');
            compareBtn.className = 'btn btn-outline btn-sm compare-service-btn';
            compareBtn.dataset.serviceId = serviceId;
            compareBtn.innerHTML = `
                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                </svg>
                Compare
            `;
            actionsContainer.appendChild(compareBtn);
        }
    }

    addGlobalComparisonButton() {
        // Add to main services section if it exists
        const servicesSection = document.querySelector('.services-section, .py-16');
        if (servicesSection) {
            const compareAllBtn = document.createElement('div');
            compareAllBtn.className = 'text-center mt-8';
            compareAllBtn.innerHTML = `
                <button id="open-comparison-tool" class="btn btn-primary btn-lg">
                    <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                    </svg>
                    Compare All Services
                </button>
            `;
            servicesSection.appendChild(compareAllBtn);
        }
    }

    bindEvents() {
        // Open comparison modal
        document.addEventListener('click', (e) => {
            if (e.target.closest('.compare-service-btn')) {
                const serviceId = e.target.closest('.compare-service-btn').dataset.serviceId;
                this.addServiceToComparison(serviceId);
                this.openComparison();
            }
            
            if (e.target.closest('#open-comparison-tool')) {
                this.openComparison();
            }
        });

        // Close modal
        document.getElementById('comparison-close-btn').addEventListener('click', () => {
            this.closeComparison();
        });

        // Modal overlay click
        this.comparisonModal.addEventListener('click', (e) => {
            if (e.target.id === 'service-comparison-modal') {
                this.closeComparison();
            }
        });

        // Available services selection
        document.addEventListener('click', (e) => {
            if (e.target.closest('.available-service-btn')) {
                const serviceId = e.target.closest('.available-service-btn').dataset.serviceId;
                this.addServiceToComparison(serviceId);
            }
        });

        // Remove service from comparison
        document.addEventListener('click', (e) => {
            if (e.target.closest('.remove-service-btn')) {
                const serviceId = e.target.closest('.remove-service-btn').dataset.serviceId;
                this.removeServiceFromComparison(serviceId);
            }
        });

        // Clear all
        document.getElementById('clear-comparison').addEventListener('click', () => {
            this.clearComparison();
        });

        // Get quote
        document.getElementById('get-quote-btn').addEventListener('click', () => {
            this.getQuoteForSelected();
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isComparisonOpen()) {
                this.closeComparison();
            }
        });
    }

    openComparison() {
        this.comparisonModal.classList.remove('hidden');
        this.comparisonModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        
        this.updateAvailableServices();
        this.updateSelectedServicesTags();
        this.generateComparisonTable();
    }

    closeComparison() {
        this.comparisonModal.classList.add('hidden');
        this.comparisonModal.style.display = 'none';
        document.body.style.overflow = '';
    }

    isComparisonOpen() {
        return !this.comparisonModal.classList.contains('hidden');
    }

    addServiceToComparison(serviceId) {
        if (this.selectedServices.size >= this.maxComparisons) {
            this.showNotification('You can compare up to ' + this.maxComparisons + ' services at once', 'warning');
            return;
        }
        
        if (this.selectedServices.has(serviceId)) {
            return; // Already selected
        }
        
        this.selectedServices.add(serviceId);
        this.updateAvailableServices();
        this.updateSelectedServicesTags();
        this.generateComparisonTable();
        this.updateGetQuoteButton();
    }

    removeServiceFromComparison(serviceId) {
        this.selectedServices.delete(serviceId);
        this.updateAvailableServices();
        this.updateSelectedServicesTags();
        this.generateComparisonTable();
        this.updateGetQuoteButton();
    }

    clearComparison() {
        this.selectedServices.clear();
        this.updateAvailableServices();
        this.updateSelectedServicesTags();
        this.generateComparisonTable();
        this.updateGetQuoteButton();
    }

    updateAvailableServices() {
        const container = document.getElementById('available-services');
        let html = '';
        
        Object.keys(this.services).forEach(serviceId => {
            if (!this.selectedServices.has(serviceId)) {
                const service = this.services[serviceId];
                html += `
                    <button class="available-service-btn px-3 py-2 bg-blue-100 text-blue-800 rounded-lg hover:bg-blue-200 transition-colors text-sm" data-service-id="${serviceId}">
                        <span>+ ${service.name}</span>
                    </button>
                `;
            }
        });
        
        if (html === '') {
            html = '<p class="text-gray-500 text-sm">All services selected</p>';
        }
        
        container.innerHTML = html;
    }

    updateSelectedServicesTags() {
        const container = document.getElementById('selected-services-tags');
        let html = '';
        
        this.selectedServices.forEach(serviceId => {
            const service = this.services[serviceId];
            html += `
                <div class="selected-service-tag flex items-center bg-green-100 text-green-800 px-3 py-2 rounded-lg">
                    <span class="text-sm font-medium">${service.name}</span>
                    <button class="remove-service-btn ml-2 text-green-600 hover:text-green-800" data-service-id="${serviceId}">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>
            `;
        });
        
        if (html === '') {
            html = '<p class="text-gray-500 text-sm">No services selected for comparison</p>';
        }
        
        container.innerHTML = html;
    }

    generateComparisonTable() {
        const container = document.getElementById('comparison-table');
        
        if (this.selectedServices.size === 0) {
            container.innerHTML = `
                <div class="text-center py-12">
                    <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                    </svg>
                    <h3 class="mt-2 text-sm font-medium text-gray-900">No services to compare</h3>
                    <p class="mt-1 text-sm text-gray-500">Select services above to start comparing</p>
                </div>
            `;
            return;
        }
        
        const selectedServicesArray = Array.from(this.selectedServices).map(id => this.services[id]);
        
        let html = `
            <div class="overflow-x-auto">
                <table class="w-full">
                    <thead>
                        <tr class="border-b-2 border-gray-200">
                            <th class="text-left py-4 px-3 font-medium text-gray-700 w-40">Feature</th>
        `;
        
        selectedServicesArray.forEach(service => {
            html += `
                <th class="text-center py-4 px-3 min-w-64">
                    <div class="space-y-2">
                        <h3 class="font-bold text-lg text-gray-900">${service.name}</h3>
                        <div class="text-2xl font-bold text-blue-600">${service.currency} $${service.price.toLocaleString()}</div>
                        <div class="text-sm text-gray-500">${service.duration}</div>
                        <div class="inline-block px-2 py-1 bg-gray-100 rounded text-xs text-gray-600">${service.category}</div>
                    </div>
                </th>
            `;
        });
        
        html += `
                        </tr>
                    </thead>
                    <tbody>
        `;
        
        // Features comparison
        html += this.generateComparisonSection('Features', 'features', selectedServicesArray);
        html += this.generateComparisonSection('Benefits', 'benefits', selectedServicesArray);
        html += this.generateComparisonSection('Suitable For', 'suitableFor', selectedServicesArray);
        html += this.generateComparisonSection('Requirements', 'requirements', selectedServicesArray);
        html += this.generateTimelineComparison(selectedServicesArray);
        
        html += `
                    </tbody>
                </table>
            </div>
        `;
        
        container.innerHTML = html;
    }

    generateComparisonSection(title, property, services) {
        let html = `
            <tr class="border-b border-gray-100">
                <td class="py-4 px-3 font-medium text-gray-700 bg-gray-50 align-top">${title}</td>
        `;
        
        services.forEach(service => {
            const items = service[property] || [];
            html += `
                <td class="py-4 px-3 align-top">
                    <ul class="space-y-1">
            `;
            
            items.forEach(item => {
                html += `
                    <li class="flex items-start text-sm text-gray-600">
                        <svg class="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                        </svg>
                        ${item}
                    </li>
                `;
            });
            
            html += `
                    </ul>
                </td>
            `;
        });
        
        html += '</tr>';
        return html;
    }

    generateTimelineComparison(services) {
        let html = `
            <tr class="border-b border-gray-100">
                <td class="py-4 px-3 font-medium text-gray-700 bg-gray-50 align-top">Timeline</td>
        `;
        
        services.forEach(service => {
            const timeline = service.timeline || [];
            html += `
                <td class="py-4 px-3 align-top">
                    <div class="space-y-2">
            `;
            
            timeline.forEach((step, index) => {
                html += `
                    <div class="flex items-center text-sm">
                        <div class="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-medium mr-3">
                            ${index + 1}
                        </div>
                        <div class="flex-1">
                            <div class="font-medium text-gray-900">${step.step}</div>
                            <div class="text-gray-500">${step.duration}</div>
                        </div>
                    </div>
                `;
            });
            
            html += `
                    </div>
                </td>
            `;
        });
        
        html += '</tr>';
        return html;
    }

    updateGetQuoteButton() {
        const button = document.getElementById('get-quote-btn');
        if (this.selectedServices.size > 0) {
            button.disabled = false;
            button.textContent = `Get Quote for ${this.selectedServices.size} Service${this.selectedServices.size !== 1 ? 's' : ''}`;
        } else {
            button.disabled = true;
            button.textContent = 'Get Quote for Selected';
        }
    }

    getQuoteForSelected() {
        if (this.selectedServices.size === 0) return;
        
        const selectedServices = Array.from(this.selectedServices).map(id => this.services[id]);
        const totalPrice = selectedServices.reduce((sum, service) => sum + service.price, 0);
        
        // Create quote summary
        const quoteData = {
            services: selectedServices.map(service => ({
                name: service.name,
                price: service.price,
                currency: service.currency
            })),
            totalPrice,
            timestamp: new Date().toISOString()
        };
        
        // You could send this to a contact form or save it
        this.showQuoteSummary(quoteData);
    }

    showQuoteSummary(quoteData) {
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black bg-opacity-50 z-60 flex items-center justify-center p-4';
        modal.innerHTML = `
            <div class="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
                <div class="text-center mb-6">
                    <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                        <svg class="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                    </div>
                    <h3 class="text-lg font-medium text-gray-900">Quote Summary</h3>
                </div>
                
                <div class="space-y-3 mb-6">
                    ${quoteData.services.map(service => `
                        <div class="flex justify-between items-center">
                            <span class="text-sm text-gray-600">${service.name}</span>
                            <span class="font-medium">${service.currency} $${service.price.toLocaleString()}</span>
                        </div>
                    `).join('')}
                    <div class="border-t pt-3">
                        <div class="flex justify-between items-center">
                            <span class="font-medium text-gray-900">Total</span>
                            <span class="text-lg font-bold text-blue-600">USD $${quoteData.totalPrice.toLocaleString()}</span>
                        </div>
                    </div>
                </div>
                
                <div class="flex space-x-3">
                    <button class="flex-1 btn btn-outline" onclick="this.closest('.fixed').remove()">Close</button>
                    <button class="flex-1 btn btn-primary" onclick="window.location.href='contact.html'">Get Quote</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Auto-remove after 30 seconds
        setTimeout(() => {
            if (modal.parentElement) {
                modal.remove();
            }
        }, 30000);
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `fixed top-4 right-4 z-70 p-4 rounded-lg shadow-lg transform transition-all duration-300 translate-x-full`;
        
        const colors = {
            info: 'bg-blue-500 text-white',
            success: 'bg-green-500 text-white',
            warning: 'bg-yellow-500 text-white',
            error: 'bg-red-500 text-white'
        };
        
        notification.className += ` ${colors[type]}`;
        notification.innerHTML = `
            <div class="flex items-center">
                <span>${message}</span>
                <button class="ml-4 text-white hover:text-gray-200" onclick="this.parentElement.parentElement.remove()">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        requestAnimationFrame(() => {
            notification.classList.remove('translate-x-full');
        });
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (notification.parentElement) {
                notification.classList.add('translate-x-full');
                setTimeout(() => notification.remove(), 300);
            }
        }, 5000);
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new ServiceComparison();
});

// Export for external use
window.ServiceComparison = ServiceComparison; 