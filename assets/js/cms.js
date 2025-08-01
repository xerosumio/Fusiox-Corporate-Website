/**
 * Fusiox CMS JavaScript
 * Content Management System for Insights Posts
 */

function cmsApp() {
    return {
        // Authentication
        isLoggedIn: false,
        loginForm: {
            email: '',
            password: ''
        },
        loginError: false,
        loginErrorMessage: '',
        isLoading: false,

        // Navigation
        currentFilter: 'all',
        currentSection: 'posts', // Add section navigation

        // Languages
        languages: [
            { code: 'en', name: 'English' },
            { code: 'zh-Hant', name: 'Traditional Chinese' },
            { code: 'zh-Hans', name: 'Simplified Chinese' }
        ],

        // Posts data
        posts: [],
        originalPosts: [],

        // FAQ data
        faqs: [],
        originalFaqs: [],

        // Post modal
        showPostModal: false,
        editingPost: null,
        currentLang: 'en',
        postForm: {
            id: '',
            category: '',
            createdDate: '',
            image: '',
            translations: {
                en: {
                    title: '',
                    body: ''
                },
                'zh-Hant': {
                    title: '',
                    body: ''
                },
                'zh-Hans': {
                    title: '',
                    body: ''
                }
            }
        },

        // Delete modal
        showDeleteModal: false,
        postToDelete: null,

        // FAQ modal
        showFaqModal: false,
        editingFaqId: null,
        currentFaqLang: 'en',
        faqForm: {
            id: '',
            category: '',
            sequence: 1,
            createdDate: '',
            translations: {
                en: {
                    question: '',
                    answer: ''
                },
                'zh-Hant': {
                    question: '',
                    answer: ''
                },
                'zh-Hans': {
                    question: '',
                    answer: ''
                }
            }
        },
        
        // Translation modal
        showTranslateModal: false,
        isTranslating: false,
        translationProgress: 0,
        translateOptions: {
            toEnglish: false,
            toTraditional: false,
            toSimplified: false
        },

        // Initialization
        async init() {
            this.checkLoginStatus();
            if (this.isLoggedIn) {
                await this.loadPosts();
                await this.loadFaqs();
            }
        },

        get filteredPosts() {
            if (this.currentFilter === 'all') {
                return this.posts;
            }
            return this.posts.filter(post => post.category === this.currentFilter);
        },

        // Authentication methods
        checkLoginStatus() {
            const loginStatus = localStorage.getItem('cmsLoggedIn');
            this.isLoggedIn = loginStatus === 'true';
        },

        async login() {
            this.isLoading = true;
            this.loginError = false;

            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Check credentials
            if (this.loginForm.email === 'seven@fusiox.ai' && this.loginForm.password === 'Fusiox888!') {
                this.isLoggedIn = true;
                localStorage.setItem('cmsLoggedIn', 'true');
                await this.loadPosts();
                await this.loadFaqs();
                // No need to set currentView since we removed dashboard
            } else {
                this.loginError = true;
                this.loginErrorMessage = 'Invalid email or password';
            }

            this.isLoading = false;
        },

        logout() {
            this.isLoggedIn = false;
            localStorage.removeItem('cmsLoggedIn');
            this.loginForm = { email: '', password: '' };
            this.posts = [];
        },

        // Data loading
        async loadPosts() {
            try {
                // First check if we have data in localStorage
                const storedData = localStorage.getItem('cmsPostsBackup');
                if (storedData) {
                    const data = JSON.parse(storedData);
                    this.posts = data.posts || [];
                    this.originalPosts = JSON.parse(JSON.stringify(this.posts)); // Deep copy
                    console.log('Posts loaded from localStorage:', this.posts.length);
                    return;
                }

                // If no localStorage data, load from JSON file
                const response = await fetch('./data/insights.json');
                if (!response.ok) throw new Error('Failed to load posts');
                const data = await response.json();
                this.posts = data.posts || [];
                this.originalPosts = JSON.parse(JSON.stringify(this.posts)); // Deep copy
                
                // Save to localStorage for future use and to connect with insights.html
                localStorage.setItem('cmsPostsBackup', JSON.stringify({ posts: this.posts }));
                localStorage.setItem('insights_posts', JSON.stringify(this.posts));
                
                console.log('Posts loaded from JSON and saved to localStorage:', this.posts.length);
            } catch (error) {
                console.error('Error loading posts:', error);
                this.posts = [];
            }
        },

                // Post management
        openAddPostModal() {
            this.editingPost = null;
            this.resetPostForm();
            this.currentLang = 'en';
            this.showPostModal = true;
            
            // Initialize editor after modal animation completes
            setTimeout(() => {
                this.initQuillEditor();
            }, 400);
        },

        editPost(post) {
            this.editingPost = post;
            this.postForm = JSON.parse(JSON.stringify(post)); // Deep copy
            this.currentLang = 'en';
            this.showPostModal = true;
            
            // Initialize editor with existing content after modal animation completes
            setTimeout(() => {
                this.initQuillEditor();
            }, 400);
        },

        closePostModal() {
            // Save any pending content
            this.saveCurrentEditorContent();
            
            // Properly destroy editor instance
            if (this.quillEditor) {
                try {
                    // Remove event listeners
                    this.quillEditor.off('text-change');
                    // Destroy the editor
                    this.quillEditor = null;
                } catch (e) {
                    console.log('Error cleaning up editor:', e);
                }
            }
            
            // Clear and reset container completely
            const container = document.getElementById('quill-editor-container');
            if (container) {
                container.innerHTML = '';
                // Force remove any lingering Quill elements
                const existingToolbars = container.querySelectorAll('.ql-toolbar');
                const existingContainers = container.querySelectorAll('.ql-container');
                existingToolbars.forEach(toolbar => toolbar.remove());
                existingContainers.forEach(cont => cont.remove());
            }
            
            // Close modal
            this.showPostModal = false;
            this.editingPost = null;
            this.resetPostForm();
        },

        resetPostForm() {
            this.postForm = {
                id: '',
                category: '',
                createdDate: new Date().toISOString().split('T')[0],
                lastEdited: null,
                image: '',
                translations: {
                    en: {
                        title: '',
                        body: ''
                    },
                    'zh-Hant': {
                        title: '',
                        body: ''
                    },
                    'zh-Hans': {
                        title: '',
                        body: ''
                    }
                }
            };
        },

        // Generate ID from title
        generateId(title) {
            return title
                .toLowerCase()
                .replace(/[^a-z0-9\s-]/g, '')
                .replace(/\s+/g, '-')
                .replace(/-+/g, '-')
                .trim();
        },

        updateId() {
            if (!this.editingPost && this.postForm.translations.en.title) {
                this.postForm.id = this.generateId(this.postForm.translations.en.title);
            }
        },

        // Quill Editor Management
        quillEditor: null,
        
        initQuillEditor() {
            // Ensure we have a clean state first
            if (this.quillEditor) {
                try {
                    this.quillEditor.off('text-change');
                    this.quillEditor = null;
                } catch (e) {
                    console.log('Editor cleanup error:', e);
                }
            }
            
            const container = document.getElementById('quill-editor-container');
            if (container) {
                // Completely clear the container and any existing Quill elements
                container.innerHTML = '';
                
                // Remove any stray Quill elements that might exist
                document.querySelectorAll('.ql-toolbar, .ql-container').forEach(el => {
                    if (!el.closest('#quill-editor-container')) {
                        el.remove();
                    }
                });
            }
            
            // Wait for DOM to be ready and modal to be fully visible
            setTimeout(() => {
                const container = document.getElementById('quill-editor-container');
                if (!container) {
                    console.log('Container not found, retrying...');
                    setTimeout(() => this.initQuillEditor(), 100);
                    return;
                }
                
                // Double check the container is completely empty
                if (container.querySelector('.ql-toolbar') || container.querySelector('.ql-container')) {
                    console.log('Container not clean, clearing again...');
                    container.innerHTML = '';
                }
                
                try {
                    // Create new Quill editor
                    this.quillEditor = new Quill(container, {
                        theme: 'snow',
                        placeholder: 'Write your post content here...',
                        modules: {
                            toolbar: [
                                [{ 'header': [2, 3, false] }],
                                ['bold', 'italic', 'underline'],
                                [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                                ['blockquote', 'code-block'],
                                ['link'],
                                ['clean']
                            ]
                        }
                    });
                    
                    // Load content for current language
                    this.loadEditorContent();
                    
                    // Listen for content changes
                    this.quillEditor.on('text-change', () => {
                        this.saveCurrentEditorContent();
                    });
                    
                    console.log('Quill editor initialized successfully');
                } catch (error) {
                    console.error('Error initializing Quill editor:', error);
                    // If initialization fails, clear everything and try once more
                    if (container) {
                        container.innerHTML = '';
                        setTimeout(() => {
                            try {
                                this.quillEditor = new Quill(container, {
                                    theme: 'snow',
                                    placeholder: 'Write your post content here...',
                                    modules: {
                                        toolbar: [
                                            [{ 'header': [2, 3, false] }],
                                            ['bold', 'italic', 'underline'],
                                            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                                            ['blockquote', 'code-block'],
                                            ['link'],
                                            ['clean']
                                        ]
                                    }
                                });
                                this.loadEditorContent();
                                this.quillEditor.on('text-change', () => {
                                    this.saveCurrentEditorContent();
                                });
                                console.log('Quill editor initialized on retry');
                            } catch (retryError) {
                                console.error('Failed to initialize Quill editor even on retry:', retryError);
                            }
                        }, 200);
                    }
                }
            }, 300);
        },
        
        loadEditorContent() {
            if (!this.quillEditor) return;
            
            const content = this.postForm.translations[this.currentLang]?.body || '';
            if (content) {
                this.quillEditor.root.innerHTML = content;
            } else {
                this.quillEditor.setText('');
            }
        },
        
        saveCurrentEditorContent() {
            if (!this.quillEditor) return;
            
            this.postForm.translations[this.currentLang].body = this.quillEditor.root.innerHTML;
        },
        
        switchLanguageTab(lang) {
            // Don't do anything if switching to the same language
            if (this.currentLang === lang) return;
            
            // Save current content
            this.saveCurrentEditorContent();
            
            // Switch language
            this.currentLang = lang;
            
            // Load new content
            setTimeout(() => {
                this.loadEditorContent();
            }, 50);
        },

        async savePost() {
            this.isLoading = true;

            try {
                // Save current editor content before processing
                this.saveCurrentEditorContent();

                // Generate ID automatically if not editing
                if (!this.editingPost) {
                    if (!this.postForm.translations.en.title) {
                        throw new Error('English title is required');
                    }
                    this.postForm.id = this.generateId(this.postForm.translations.en.title);
                }

                // Validate required fields
                if (!this.postForm.category || !this.postForm.translations.en.title) {
                    throw new Error('Please fill in all required fields');
                }

                // Add lastEdited timestamp
                this.postForm.lastEdited = new Date().toISOString();

                if (this.editingPost) {
                    // Update existing post
                    const index = this.posts.findIndex(p => p.id === this.editingPost.id);
                    if (index !== -1) {
                        this.posts[index] = JSON.parse(JSON.stringify(this.postForm));
                    }
                } else {
                    // Add new post
                    this.posts.push(JSON.parse(JSON.stringify(this.postForm)));
                }

                // Save to localStorage (simulating backend save)
                await this.savePosts();
                
                this.closePostModal();
                this.showSuccessMessage(this.editingPost ? 'Post updated successfully!' : 'Post created successfully!');
            } catch (error) {
                console.error('Error saving post:', error);
                this.showErrorMessage('Failed to save post: ' + error.message);
            }

            this.isLoading = false;
        },

        confirmDeletePost(post) {
            this.postToDelete = post;
            this.showDeleteModal = true;
        },

        async deletePost() {
            if (this.postToDelete) {
                this.posts = this.posts.filter(p => p.id !== this.postToDelete.id);
                await this.savePosts();
                this.showDeleteModal = false;
                this.postToDelete = null;
                this.showSuccessMessage('Post deleted successfully!');
            }
        },

        // Content section management
        // Utility methods
        async savePosts() {
            // In a real application, this would save to a backend API
            // For now, we'll simulate saving by storing in localStorage
            const data = { posts: this.posts };
            
            // Save with both keys for compatibility
            localStorage.setItem('cmsPostsBackup', JSON.stringify(data));
            localStorage.setItem('insights_posts', JSON.stringify(this.posts));
            
            // Here you would typically send to your backend:
            // await fetch('/api/insights', { method: 'POST', body: JSON.stringify(data) });
            
            console.log('Posts saved to localStorage (both backup and live data)');
            
            // Show success notification if available
            this.showNotification('Changes saved successfully! Insights page will reflect updates.', 'success');
        },

        showNotification(message, type = 'info') {
            // Simple notification system - you could enhance this with a toast library
            console.log(`[${type.toUpperCase()}] ${message}`);
            
            // Optional: Create a temporary alert (you can replace this with a better notification system)
            const notification = document.createElement('div');
            notification.className = `alert alert-${type === 'success' ? 'success' : 'info'} fixed top-4 right-4 w-auto z-50`;
            notification.innerHTML = `<span>${message}</span>`;
            document.body.appendChild(notification);
            
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 3000);
        },

        formatDate(dateString) {
            return new Date(dateString).toLocaleDateString();
        },

        formatDateTime(dateTimeString) {
            return new Date(dateTimeString).toLocaleString();
        },

        // ================================
        // FAQ Management Methods
        // ================================

        async loadFaqs() {
            try {
                // First try to load from localStorage (CMS data)
                const storedData = localStorage.getItem('cmsFaqsBackup');
                if (storedData) {
                    const data = JSON.parse(storedData);
                    this.faqs = data.faqs || [];
                    this.originalFaqs = JSON.parse(JSON.stringify(this.faqs)); // Deep copy
                    console.log('FAQs loaded from localStorage:', this.faqs.length);
                    return;
                }

                // If no localStorage data, create empty FAQ array
                this.faqs = [];
                this.originalFaqs = [];
                
                // Save empty array to localStorage
                localStorage.setItem('cmsFaqsBackup', JSON.stringify({ faqs: this.faqs }));
                localStorage.setItem('faq_data', JSON.stringify(this.faqs));
                
                console.log('FAQs initialized as empty array');
            } catch (error) {
                console.error('Error loading FAQs:', error);
                this.faqs = [];
            }
        },

        get sortedFaqs() {
            return [...this.faqs].sort((a, b) => {
                // First sort by sequence
                if (a.sequence !== b.sequence) {
                    return a.sequence - b.sequence;
                }
                // Then by creation date
                return new Date(a.createdDate) - new Date(b.createdDate);
            });
        },

        openAddFaqModal() {
            this.editingFaqId = null;
            this.resetFaqForm();
            this.currentFaqLang = 'en';
            this.showFaqModal = true;
        },

        editFaq(faq) {
            this.editingFaqId = faq.id;
            this.faqForm = JSON.parse(JSON.stringify(faq)); // Deep copy
            this.currentFaqLang = 'en';
            this.showFaqModal = true;
        },

        resetFaqForm() {
            this.faqForm = {
                id: '',
                category: '',
                sequence: this.getNextSequence(),
                createdDate: new Date().toISOString(),
                translations: {
                    en: { question: '', answer: '' },
                    'zh-Hant': { question: '', answer: '' },
                    'zh-Hans': { question: '', answer: '' }
                }
            };
        },

        getNextSequence() {
            if (this.faqs.length === 0) return 1;
            return Math.max(...this.faqs.map(faq => faq.sequence || 0)) + 1;
        },

        async saveFaq() {
            try {
                // Validate required fields
                if (!this.faqForm.category) {
                    this.showErrorMessage('Please select a category');
                    return;
                }

                if (!this.faqForm.translations.en.question) {
                    this.showErrorMessage('Please enter a question in English');
                    return;
                }

                if (!this.faqForm.translations.en.answer) {
                    this.showErrorMessage('Please enter an answer in English');
                    return;
                }

                // Set timestamps
                if (!this.editingFaqId) {
                    this.faqForm.id = 'faq_' + Date.now();
                    this.faqForm.createdDate = new Date().toISOString();
                }

                // Ensure sequence is a number
                this.faqForm.sequence = parseInt(this.faqForm.sequence) || 1;

                if (this.editingFaqId) {
                    // Update existing FAQ
                    const index = this.faqs.findIndex(faq => faq.id === this.editingFaqId);
                    if (index !== -1) {
                        this.faqs[index] = { ...this.faqForm };
                    }
                } else {
                    // Add new FAQ
                    this.faqs.push({ ...this.faqForm });
                }

                // Save to localStorage
                localStorage.setItem('cmsFaqsBackup', JSON.stringify({ faqs: this.faqs }));
                localStorage.setItem('faq_data', JSON.stringify(this.faqs));

                this.closeFaqModal();
                this.showSuccessMessage(this.editingFaqId ? 'FAQ updated successfully!' : 'FAQ created successfully!');
            } catch (error) {
                console.error('Error saving FAQ:', error);
                this.showErrorMessage('Failed to save FAQ. Please try again.');
            }
        },

        async deleteFaq(faqId) {
            if (!confirm('Are you sure you want to delete this FAQ?')) {
                return;
            }

            try {
                this.faqs = this.faqs.filter(faq => faq.id !== faqId);
                
                // Save to localStorage
                localStorage.setItem('cmsFaqsBackup', JSON.stringify({ faqs: this.faqs }));
                localStorage.setItem('faq_data', JSON.stringify(this.faqs));

                this.showSuccessMessage('FAQ deleted successfully!');
            } catch (error) {
                console.error('Error deleting FAQ:', error);
                this.showErrorMessage('Failed to delete FAQ. Please try again.');
            }
        },

        closeFaqModal() {
            this.showFaqModal = false;
            this.editingFaqId = null;
            this.resetFaqForm();
        },

        getFaqTitle(faq) {
            return faq.translations?.en?.question || 'Untitled FAQ';
        },

        getFaqExcerpt(faq) {
            const answer = faq.translations?.en?.answer || '';
            return answer.length > 100 ? answer.substring(0, 100) + '...' : answer;
        },

        getCurrentFaqLanguage() {
            return this.languages.find(lang => lang.code === this.currentFaqLang) || this.languages[0];
        },

        showSuccessMessage(message) {
            // You could implement a toast notification system here
            console.log('Success:', message);
            alert(message); // Simple alert for now
        },

        showErrorMessage(message) {
            // You could implement a toast notification system here
            console.error('Error:', message);
            alert(message); // Simple alert for now
        },

        // Image handling functions
        handleImageUpload(event) {
            const file = event.target.files[0];
            if (file) {
                this.processImageFile(file);
            }
        },

        handleImageDrop(event) {
            event.currentTarget.classList.remove('dragover');
            const files = event.dataTransfer.files;
            if (files.length > 0) {
                this.processImageFile(files[0]);
            }
        },

        processImageFile(file) {
            // Validate file type
            const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
            if (!validTypes.includes(file.type)) {
                this.showErrorMessage('Please select a valid image file (PNG, JPG, or JPEG)');
                return;
            }

            // Validate file size (5MB limit)
            const maxSize = 5 * 1024 * 1024; // 5MB in bytes
            if (file.size > maxSize) {
                this.showErrorMessage('File size must be less than 5MB');
                return;
            }

            // Show loading state
            this.showSuccessMessage('Processing image...');

            // Create a FileReader to convert file to data URL
            const reader = new FileReader();
            reader.onload = (e) => {
                this.postForm.image = e.target.result;
                this.showSuccessMessage('Image uploaded successfully!');
            };
            reader.onerror = () => {
                this.showErrorMessage('Error reading file. Please try again.');
            };
            reader.readAsDataURL(file);
        },

        removeImage() {
            this.postForm.image = '';
            // Clear the file input
            if (this.$refs.imageInput) {
                this.$refs.imageInput.value = '';
            }
            this.showSuccessMessage('Image removed');
        },

        // Translation functions
        openTranslateModal() {
            // Reset translation options
            this.translateOptions = {
                toEnglish: false,
                toTraditional: false,
                toSimplified: false
            };
            
            // Pre-select target languages based on current language
            const targets = this.getAvailableTargets();
            targets.forEach(target => {
                this.translateOptions[target.key] = true;
            });
            
            this.showTranslateModal = true;
        },

        canTranslate() {
            const currentContent = this.postForm.translations[this.currentLang];
            return currentContent && currentContent.title && currentContent.body;
        },

        getTranslationHint() {
            switch (this.currentLang) {
                case 'en':
                    return 'Fill English content, then translate to Traditional & Simplified Chinese';
                case 'zh-Hant':
                    return 'Fill Traditional Chinese content, then translate to English & Simplified Chinese';
                case 'zh-Hans':
                    return 'Fill Simplified Chinese content, then translate to English & Traditional Chinese';
                default:
                    return 'Fill content in current language, then translate to other languages';
            }
        },

        getTranslationDirection() {
            switch (this.currentLang) {
                case 'en':
                    return {
                        title: 'Translate from English',
                        description: 'Your English content will be translated to Traditional Chinese and Simplified Chinese using AI.'
                    };
                case 'zh-Hant':
                    return {
                        title: 'Translate from Traditional Chinese',
                        description: 'Your Traditional Chinese content will be translated to English and Simplified Chinese using AI.'
                    };
                case 'zh-Hans':
                    return {
                        title: 'Translate from Simplified Chinese',
                        description: 'Your Simplified Chinese content will be translated to English and Traditional Chinese using AI.'
                    };
                default:
                    return {
                        title: 'Translation',
                        description: 'AI-powered translation between English and Chinese languages.'
                    };
            }
        },

        getSourceLanguageName() {
            switch (this.currentLang) {
                case 'en': return 'English';
                case 'zh-Hant': return 'Traditional Chinese';
                case 'zh-Hans': return 'Simplified Chinese';
                default: return 'Current Language';
            }
        },

        getAvailableTargets() {
            switch (this.currentLang) {
                case 'en':
                    return [
                        { code: 'zh-Hant', key: 'toTraditional', name: 'Traditional Chinese (繁體中文)' },
                        { code: 'zh-Hans', key: 'toSimplified', name: 'Simplified Chinese (简体中文)' }
                    ];
                case 'zh-Hant':
                    return [
                        { code: 'en', key: 'toEnglish', name: 'English' },
                        { code: 'zh-Hans', key: 'toSimplified', name: 'Simplified Chinese (简体中文)' }
                    ];
                case 'zh-Hans':
                    return [
                        { code: 'en', key: 'toEnglish', name: 'English' },
                        { code: 'zh-Hant', key: 'toTraditional', name: 'Traditional Chinese (繁體中文)' }
                    ];
                default:
                    return [];
            }
        },

        canStartTranslation() {
            const currentContent = this.postForm.translations[this.currentLang];
            if (!currentContent || !currentContent.title || !currentContent.body) {
                return false;
            }
            
            // Check if at least one target language is selected
            return this.translateOptions.toEnglish || 
                   this.translateOptions.toTraditional || 
                   this.translateOptions.toSimplified;
        },

        closeTranslateModal() {
            this.showTranslateModal = false;
            this.translationProgress = 0;
            this.isTranslating = false;
            // Reset translation options
            this.translateOptions = {
                toEnglish: false,
                toTraditional: false,
                toSimplified: false
            };
        },

        hasExistingTranslations() {
            const targets = this.getAvailableTargets();
            return targets.some(target => {
                if (!this.translateOptions[target.key]) return false;
                const content = this.postForm.translations[target.code];
                return content && (content.title || content.body);
            });
        },

        async startTranslation() {
            const currentContent = this.postForm.translations[this.currentLang];
            if (!currentContent.title || !currentContent.body) {
                this.showErrorMessage(`Please fill in both title and body for ${this.getSourceLanguageName()} before translating.`);
                return;
            }

            if (!this.canStartTranslation()) {
                this.showErrorMessage('Please select at least one target language.');
                return;
            }

            this.isTranslating = true;
            this.translationProgress = 0;

            try {
                const sourceTitle = currentContent.title;
                const sourceBody = currentContent.body;
                let completed = 0;
                
                // Count total tasks
                let totalTasks = 0;
                if (this.translateOptions.toEnglish) totalTasks += 2;
                if (this.translateOptions.toTraditional) totalTasks += 2;
                if (this.translateOptions.toSimplified) totalTasks += 2;

                // Translate to English
                if (this.translateOptions.toEnglish) {
                    this.showSuccessMessage('Translating to English...');
                    
                    const englishTitle = await this.translateText(sourceTitle, 'en', this.currentLang);
                    this.postForm.translations['en'].title = englishTitle;
                    completed++;
                    this.translationProgress = (completed / totalTasks) * 100;

                    const englishBody = await this.translateText(sourceBody, 'en', this.currentLang);
                    this.postForm.translations['en'].body = englishBody;
                    completed++;
                    this.translationProgress = (completed / totalTasks) * 100;
                }

                // Translate to Traditional Chinese
                if (this.translateOptions.toTraditional) {
                    this.showSuccessMessage('Translating to Traditional Chinese...');
                    
                    const traditionalTitle = await this.translateText(sourceTitle, 'zh-Hant', this.currentLang);
                    this.postForm.translations['zh-Hant'].title = traditionalTitle;
                    completed++;
                    this.translationProgress = (completed / totalTasks) * 100;

                    const traditionalBody = await this.translateText(sourceBody, 'zh-Hant', this.currentLang);
                    this.postForm.translations['zh-Hant'].body = traditionalBody;
                    completed++;
                    this.translationProgress = (completed / totalTasks) * 100;
                }

                // Translate to Simplified Chinese
                if (this.translateOptions.toSimplified) {
                    this.showSuccessMessage('Translating to Simplified Chinese...');
                    
                    const simplifiedTitle = await this.translateText(sourceTitle, 'zh-Hans', this.currentLang);
                    this.postForm.translations['zh-Hans'].title = simplifiedTitle;
                    completed++;
                    this.translationProgress = (completed / totalTasks) * 100;

                    const simplifiedBody = await this.translateText(sourceBody, 'zh-Hans', this.currentLang);
                    this.postForm.translations['zh-Hans'].body = simplifiedBody;
                    completed++;
                    this.translationProgress = (completed / totalTasks) * 100;
                }

                this.showSuccessMessage('Translation completed successfully!');
                
                // Close modal after a short delay
                setTimeout(() => {
                    this.closeTranslateModal();
                }, 1500);

            } catch (error) {
                console.error('Translation error:', error);
                this.showErrorMessage('Translation failed. Please try again or translate manually.');
                this.isTranslating = false;
            }
        },

        async translateText(text, targetLang, sourceLang) {
            // Clean HTML tags for translation but preserve structure info
            const cleanText = text.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
            const hasHtml = text !== cleanText;
            
            try {
                // Using Ollama with Qwen2.5 Translator model
                console.log(`Translating from ${sourceLang} to ${targetLang}: ${cleanText.substring(0, 50)}...`);
                
                // Language name mappings
                const languageNames = {
                    'en': 'English',
                    'zh-Hant': 'Traditional Chinese',
                    'zh-Hans': 'Simplified Chinese'
                };
                
                const sourceLanguage = languageNames[sourceLang] || sourceLang;
                const targetLanguage = languageNames[targetLang] || targetLang;
                
                // Construct prompt for the Qwen2.5 translator model
                const prompt = `Translate the following ${sourceLanguage} text to ${targetLanguage}. Provide only the translation without any explanations or additional text.

${sourceLanguage} text: ${cleanText}

${targetLanguage} translation:`;

                const response = await fetch('http://localhost:11434/api/generate', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        model: 'lauchacarro/qwen2.5-translator:latest',
                        prompt: prompt,
                        stream: false,
                        options: {
                            temperature: 0.1, // Low temperature for consistent translations
                            top_p: 0.9,
                            max_tokens: 1000
                        }
                    })
                });

                if (!response.ok) {
                    throw new Error(`Ollama API error: ${response.status} ${response.statusText}`);
                }

                const data = await response.json();
                
                if (data.response) {
                    let translatedText = data.response.trim();
                    
                    // Clean up any extra formatting the model might add
                    translatedText = translatedText.replace(/^["']|["']$/g, ''); // Remove quotes
                    translatedText = translatedText.replace(/^\s*Translation:\s*/i, ''); // Remove "Translation:" prefix
                    translatedText = translatedText.replace(/^\s*Answer:\s*/i, ''); // Remove "Answer:" prefix
                    
                    // If original text had HTML structure, try to preserve it
                    if (hasHtml && translatedText) {
                        if (text.includes('<p>')) {
                            translatedText = `<p>${translatedText}</p>`;
                        }
                        if (text.includes('<h3>')) {
                            translatedText = `<h3>${translatedText}</h3>`;
                        }
                        if (text.includes('<ul>') || text.includes('<li>')) {
                            // For lists, preserve the structure better
                            if (text.includes('<li>')) {
                                const items = translatedText.split(/[.。]/).filter(item => item.trim());
                                if (items.length > 1) {
                                    translatedText = '<ul>' + items.map(item => `<li>${item.trim()}</li>`).join('') + '</ul>';
                                } else {
                                    translatedText = `<ul><li>${translatedText}</li></ul>`;
                                }
                            }
                        }
                    }
                    
                    return translatedText;
                } else {
                    throw new Error('No translation response from Ollama');
                }
                
            } catch (error) {
                console.error('Ollama translation error:', error);
                
                // Enhanced fallback with better error messaging
                if (error.message.includes('fetch')) {
                    this.showErrorMessage('Ollama is not running. Please start Ollama and ensure the qwen2.5-translator model is available.');
                } else {
                    this.showErrorMessage(`Translation failed: ${error.message}`);
                }
                
                // Fallback to high-quality manual translations for common business terms
                const businessTranslations = {
                    'Company Secretary Best Practices for Hong Kong Corporations': {
                        'zh-Hant': '香港公司秘書最佳實務指南',
                        'zh-Hans': '香港公司秘书最佳实务指南'
                    },
                    'Fund Governance and Regulatory Compliance': {
                        'zh-Hant': '基金管治與監管合規',
                        'zh-Hans': '基金管治与监管合规'
                    },
                    'Annual Filing Requirements Update': {
                        'zh-Hant': '年度申報要求更新',
                        'zh-Hans': '年度申报要求更新'
                    },
                    'Digital Transformation in Corporate Services': {
                        'zh-Hant': '企業服務數位轉型',
                        'zh-Hans': '企业服务数字转型'
                    },
                    'ESG Fund Investment Strategies': {
                        'zh-Hant': 'ESG基金投資策略',
                        'zh-Hans': 'ESG基金投资策略'
                    },
                    'Regulatory Updates for Fund Management': {
                        'zh-Hant': '基金管理監管更新',
                        'zh-Hans': '基金管理监管更新'
                    },
                    'Corporate Governance Best Practices': {
                        'zh-Hant': '企業管治最佳實務',
                        'zh-Hans': '企业管治最佳实务'
                    }
                };

                // Check for exact matches first
                if (businessTranslations[cleanText] && businessTranslations[cleanText][targetLang]) {
                    return businessTranslations[cleanText][targetLang];
                }

                // Fallback indication
                const langIndicator = targetLang === 'zh-Hant' ? '[需要翻譯]' : '[需要翻译]';
                return `${langIndicator} ${cleanText}`;
            }
        },

        delay(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }
    };
}

// Initialize Alpine.js when the page loads
document.addEventListener('alpine:init', () => {
    console.log('CMS Alpine.js initialized');
});

// Global utility functions
window.cmsUtils = {
    downloadBackup() {
        const backup = localStorage.getItem('cmsPostsBackup');
        if (backup) {
            const blob = new Blob([backup], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `insights-backup-${new Date().toISOString().split('T')[0]}.json`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }
    },

    uploadBackup(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const data = JSON.parse(e.target.result);
                    // Save with both keys for compatibility
                    localStorage.setItem('cmsPostsBackup', JSON.stringify(data));
                    localStorage.setItem('insights_posts', JSON.stringify(data.posts || data));
                    resolve(data);
                } catch (error) {
                    reject(error);
                }
            };
            reader.onerror = reject;
            reader.readAsText(file);
        });
    }
};

console.log('CMS JavaScript loaded successfully');
