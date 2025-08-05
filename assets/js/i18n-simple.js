// Simplified i18n system
class SimpleI18n {
    constructor() {
        this.currentLanguage = localStorage.getItem('fusiox-language') || 'en';
        this.translations = this.loadTranslations();
        this.init();
    }

    loadTranslations() {
        return {
            en: {
                // Navigation
                'nav.about': 'About',
                'nav.services': 'Services',
                'nav.how-it-works': 'How It Works',
                'nav.for-funds': 'For Funds',
                'nav.insights': 'Insights',
                'nav.faq': 'FAQ',
                'nav.contact': 'Contact',
                'nav.get-started': 'Get Started',
                'nav.brand': 'Fusiox',

                // Services Page
                'services.hero.title': 'Our Services',
                'services.hero.subtitle': 'Comprehensive business incorporation and compliance services tailored to your needs.',
                'services.most-popular': 'Most Popular',
                'services.annual-service': 'Annual service',
                'services.includes': 'Includes:',
                'services.value-added-title': 'Value-added Services',
                'services.company-secretary.title': 'Company Secretary Service',
                'services.company-secretary.description-main': 'Professional company secretary services to ensure your business remains compliant with Hong Kong regulations.',
                'services.features.secretary': 'Dedicated company secretary',
                'services.features.filing': 'Annual return filing',
                'services.features.coordination': 'Board meeting coordination',
                'services.features.monitoring': 'Statutory compliance monitoring',
                'services.features.maintenance': 'Corporate record maintenance',
                'services.features.support': 'Regulatory filing support',
                'services.registered-address.title': 'Registered Address and Mail Receiving',
                'services.registered-address.description-short': 'Professional registered address service with mail handling and forwarding capabilities.',
                'services.audit-tax.title': 'Audit and Tax Filing',
                'services.audit-tax.description-short': 'Comprehensive tax filing support tailored to your needs.',
                'services.audit-tax.price': 'Case-by-case basis',
                'services.bank-account.title': 'Bank Account Opening',
                'services.bank-account.description-short': 'Assistance with corporate bank account setup and relationships.',
                'services.bank-account.price': 'Starting from USD 800',
                'services.ctc.title': 'CTC Certification',
                'services.ctc.description-short': 'Certified True Copy for official document authentication.',
                'services.fund-note.text': 'Interested in fund-related incorporation services?',
                'services.fund-note.link': 'Please contact us directly for details.',

                // Footer
                'footer.company-name': 'Fusiox Corporate Services Limited',
                'footer.company-description': 'Professional corporate services for modern businesses.',
                'footer.services': 'Services',
                'footer.fund-consultation': 'Fund Consultation',
                'footer.corporate-governance': 'Corporate Governance',
                'footer.resources': 'Resources',
                'footer.insights': 'Insights',
                'footer.faq': 'FAQ',
                'footer.how-it-works': 'How It Works',
                'footer.contact': 'Contact',
                'footer.address': 'Room 3903 The Center 99 Queen\'s Road Central Hong Kong',
                'footer.contact-us': 'Contact Us',
                'footer.copyright': '2025 Fusiox Corporate Services Limited. All rights reserved.',

                // Page Titles
                'page.title.services': 'Services - Fusiox'
            },
            'zh-Hant': {
                // Navigation
                'nav.about': '關於我們',
                'nav.services': '服務',
                'nav.how-it-works': '服務流程',
                'nav.for-funds': '基金服務',
                'nav.insights': '洞察分析',
                'nav.faq': '常見問題',
                'nav.contact': '聯絡我們',
                'nav.get-started': '開始',
                'nav.brand': 'Fusiox',

                // Services Page
                'services.hero.title': '我們的服務',
                'services.hero.subtitle': '為您量身定制的全面業務註冊和合規服務。',
                'services.most-popular': '最受歡迎',
                'services.annual-service': '年度服務',
                'services.includes': '包括：',
                'services.value-added-title': '增值服務',
                'services.company-secretary.title': '公司秘書服務',
                'services.company-secretary.description-main': '專業的公司秘書服務，確保您的業務持續符合香港法規。',
                'services.features.secretary': '專屬公司秘書',
                'services.features.filing': '年度申報表填報',
                'services.features.coordination': '董事會會議協調',
                'services.features.monitoring': '法定合規監察',
                'services.features.maintenance': '企業記錄維護',
                'services.features.support': '監管申報支援',
                'services.registered-address.title': '註冊地址及郵件接收',
                'services.registered-address.description-short': '專業的註冊地址服務，提供郵件處理和轉寄功能。',
                'services.audit-tax.title': '審計及稅務申報',
                'services.audit-tax.description-short': '量身定制的全面稅務申報支持。',
                'services.audit-tax.price': '按情況而定',
                'services.bank-account.title': '銀行開戶',
                'services.bank-account.description-short': '協助企業銀行開戶和建立銀行關係。',
                'services.bank-account.price': '起價 USD 800',
                'services.ctc.title': 'CTC 認證',
                'services.ctc.description-short': '認證副本證明服務，用於官方文件認證。',
                'services.fund-note.text': '對基金相關註冊服務感興趣？',
                'services.fund-note.link': '請直接聯繫我們了解詳情。',

                // Footer
                'footer.company-name': '復山企業服務有限公司',
                'footer.company-description': '為現代企業提供專業的企業服務。',
                'footer.services': '服務',
                'footer.fund-consultation': '基金諮詢',
                'footer.corporate-governance': '企業管治',
                'footer.resources': '資源',
                'footer.insights': '洞察分析',
                'footer.faq': '常見問題',
                'footer.how-it-works': '如何運作',
                'footer.contact': '聯絡',
                'footer.address': '香港皇后大道中99號中環廣場3903室',
                'footer.contact-us': '聯絡我們',
                'footer.copyright': '2025 復山企業服務有限公司. 版權所有。',

                // Page Titles
                'page.title.services': '服務 - Fusiox'
            },
            'zh-Hans': {
                // Navigation
                'nav.about': '关于我们',
                'nav.services': '服务',
                'nav.how-it-works': '服务流程',
                'nav.for-funds': '基金服务',
                'nav.insights': '洞察分析',
                'nav.faq': '常见问题',
                'nav.contact': '联系我们',
                'nav.get-started': '开始',
                'nav.brand': 'Fusiox',

                // Services Page
                'services.hero.title': '我们的服务',
                'services.hero.subtitle': '为您量身定制的全面业务注册和合规服务。',
                'services.most-popular': '最受欢迎',
                'services.annual-service': '年度服务',
                'services.includes': '包括：',
                'services.value-added-title': '增值服务',
                'services.company-secretary.title': '公司秘书服务',
                'services.company-secretary.description-main': '专业的公司秘书服务，确保您的业务持续符合香港法规。',
                'services.features.secretary': '专属公司秘书',
                'services.features.filing': '年度申报表填报',
                'services.features.coordination': '董事会会议协调',
                'services.features.monitoring': '法定合规监察',
                'services.features.maintenance': '企业记录维护',
                'services.features.support': '监管申报支援',
                'services.registered-address.title': '注册地址及邮件接收',
                'services.registered-address.description-short': '专业的注册地址服务，提供邮件处理和转寄功能。',
                'services.audit-tax.title': '审计及税务申报',
                'services.audit-tax.description-short': '量身定制的全面税务申报支持。',
                'services.audit-tax.price': '按情况而定',
                'services.bank-account.title': '银行开户',
                'services.bank-account.description-short': '协助企业银行开户和建立银行关系。',
                'services.bank-account.price': '起价 USD 800',
                'services.ctc.title': 'CTC 认证',
                'services.ctc.description-short': '认证副本证明服务，用于官方文件认证。',
                'services.fund-note.text': '对基金相关注册服务感兴趣？',
                'services.fund-note.link': '请直接联系我们了解详情。',

                // Footer
                'footer.company-name': '复山企业服务有限公司',
                'footer.company-description': '为现代企业提供专业的企业服务。',
                'footer.services': '服务',
                'footer.fund-consultation': '基金咨询',
                'footer.corporate-governance': '企业管治',
                'footer.resources': '资源',
                'footer.insights': '洞察分析',
                'footer.faq': '常见问题',
                'footer.how-it-works': '如何运作',
                'footer.contact': '联系',
                'footer.address': '香港皇后大道中99号中环广场3903室',
                'footer.contact-us': '联系我们',
                'footer.copyright': '2025 复山企业服务有限公司. 版权所有。',

                // Page Titles
                'page.title.services': '服务 - Fusiox'
            }
        };
    }

    init() {
        console.log('SimpleI18n initialized with language:', this.currentLanguage);
        this.updatePageContent();
        this.updateHTMLLang();
    }

    setLanguage(language) {
        console.log('SimpleI18n: setting language to', language);
        this.currentLanguage = language;
        localStorage.setItem('fusiox-language', language);
        this.updatePageContent();
        this.updateHTMLLang();
        
        // Dispatch custom event for Alpine.js components
        window.dispatchEvent(new CustomEvent('fusiox-language-changed', {
            detail: { language: language }
        }));
    }

    translate(key) {
        const translation = this.translations[this.currentLanguage]?.[key];
        const fallback = this.translations['en'][key];
        const result = translation || fallback || key;
        console.log(`Translating "${key}" to "${result}"`);
        return result;
    }

    updatePageContent() {
        console.log('SimpleI18n updatePageContent called');
        const elements = document.querySelectorAll('[data-i18n]');
        console.log(`Found ${elements.length} elements with data-i18n`);
        
        elements.forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = this.translate(key);
            element.textContent = translation;
        });
    }

    updateHTMLLang() {
        document.documentElement.lang = this.currentLanguage;
    }

    getSupportedLanguages() {
        return [
            { code: 'en', name: 'English', nativeName: 'English' },
            { code: 'zh-Hant', name: 'Traditional Chinese', nativeName: '繁體中文' },
            { code: 'zh-Hans', name: 'Simplified Chinese', nativeName: '简体中文' }
        ];
    }
}

// Initialize the simple i18n system
window.i18n = new SimpleI18n();

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOMContentLoaded - SimpleI18n');
    if (window.i18n) {
        window.i18n.updatePageContent();
    }
});

// Also initialize immediately if DOM is already loaded
if (document.readyState === 'complete' || document.readyState === 'interactive') {
    console.log('DOM already loaded - SimpleI18n');
    if (window.i18n) {
        window.i18n.updatePageContent();
    }
}

// Alpine.js integration for language switching
document.addEventListener('alpine:init', () => {
    Alpine.data('languageSelector', () => ({
        currentLanguage: 'en',
        isOpen: false,
        languages: [
            { code: 'en', name: 'English', nativeName: 'English' },
            { code: 'zh-Hant', name: 'Traditional Chinese', nativeName: '繁體中文' },
            { code: 'zh-Hans', name: 'Simplified Chinese', nativeName: '简体中文' }
        ],

        init() {
            // Initialize with i18n if available
            if (window.i18n) {
                this.currentLanguage = window.i18n.currentLanguage;
                this.languages = window.i18n.getSupportedLanguages();
            }
            
            // Listen for language changes from other sources
            window.addEventListener('fusiox-language-changed', (event) => {
                this.currentLanguage = event.detail.language;
            });
        },

        get currentLanguageObj() {
            return this.languages.find(lang => lang.code === this.currentLanguage) || this.languages[0];
        },

        changeLanguage(languageCode) {
            console.log('Alpine.js languageSelector: changing language to', languageCode);
            this.currentLanguage = languageCode;
            if (window.i18n) {
                window.i18n.setLanguage(languageCode);
            }
            this.isOpen = false;
        },

        toggleDropdown() {
            this.isOpen = !this.isOpen;
        },

        closeDropdown() {
            this.isOpen = false;
        }
    }));
}); 