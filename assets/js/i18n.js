// Internationalization (i18n) system for Fusiox Corporate Website
class I18n {
    constructor() {
        this.currentLanguage = this.getStoredLanguage() || 'en';
        this.translations = {};
        this.loadTranslations();
    }

    getStoredLanguage() {
        return localStorage.getItem('fusiox-language');
    }

    setLanguage(language) {
        this.currentLanguage = language;
        localStorage.setItem('fusiox-language', language);
        this.updatePageContent();
        this.updateHTMLLang();
    }

    updateHTMLLang() {
        document.documentElement.lang = this.currentLanguage;
    }

    loadTranslations() {
        this.translations = {
            en: {
                // Navigation
                'nav.about': 'About',
                'nav.services': 'Services',
                'nav.how-it-works': 'How It Works',
                'nav.for-funds': 'For Funds',
                'nav.faq': 'FAQ',
                'nav.contact': 'Contact',
                'nav.get-started': 'Get Started',
                'nav.brand': 'Fusiox',

                // Hero Section
                'hero.title': 'Welcome to Fusiox',
                'hero.subtitle': 'Professional incorporation services that make starting your business simple, fast, and affordable. Get your company registered with expert guidance every step of the way.',
                'hero.start-incorporation': 'Start Your Incorporation',
                'hero.learn-how': 'Learn How',

                // Services Section
                'services.title': 'Our Core Services',
                'services.company-incorporation.title': 'Company Incorporation',
                'services.company-incorporation.description': 'Fast-track your business registration with our streamlined incorporation process.',
                'services.legal-compliance.title': 'Legal Compliance',
                'services.legal-compliance.description': 'Stay compliant with all regulations and legal requirements for your business type.',
                'services.ongoing-support.title': 'Ongoing Support',
                'services.ongoing-support.description': 'Continuous support and guidance to help your business grow and succeed.',
                'services.learn-more': 'Learn More',

                // Why Choose Section
                'why-choose.title': 'Why Choose Fusiox?',
                'why-choose.lightning-fast.title': 'Lightning Fast',
                'why-choose.lightning-fast.description': 'Get your company incorporated in record time with our streamlined process.',
                'why-choose.expert-guidance.title': 'Expert Guidance',
                'why-choose.expert-guidance.description': 'Our experienced team ensures every detail is handled correctly and professionally.',
                'why-choose.affordable-pricing.title': 'Affordable Pricing',
                'why-choose.affordable-pricing.description': 'Competitive rates with transparent pricing and no hidden fees.',

                // CTA Section
                'cta.title': 'Ready to Start Your Business?',
                'cta.subtitle': 'Join thousands of successful entrepreneurs who chose Fusiox for their incorporation needs.',
                'cta.get-started': 'Start Your Incorporation Today',

                // Footer
                'footer.services': 'Services',
                'footer.company': 'Company',
                'footer.resources': 'Resources',
                'footer.contact': 'Contact',
                'footer.hklpf': 'HKLPF Registration',
                'footer.company-secretary': 'Company Secretary Service',
                'footer.registered-address': 'Registered Address and Mail Receiving',
                'footer.audit-tax': 'Audit and Tax Filing',
                'footer.bank-account': 'Bank Account Opening',
                'footer.ctc': 'CTC Certification',
                'footer.about-us': 'About Us',
                'footer.copyright': '2025 Fusiox Corporate Services Limited. All rights reserved.',

                // About Page
                'about.hero.title': 'About Fusiox',
                'about.hero.subtitle': 'Your trusted partner for business incorporation and corporate services in Hong Kong.',

                // Contact Page
                'contact.hero.title': 'Contact Us',
                'contact.hero.subtitle': 'Get in touch with our incorporation experts for personalized assistance.',
                'contact.get-consultation': 'Get Free Consultation',
                'contact.see-how-works': 'See How It Works',

                // FAQ Page
                'faq.hero.title': 'FAQ',
                'faq.hero.subtitle': 'Find answers to the most common questions about business incorporation and our services.',
                'faq.still-questions': 'Still Have Questions?',
                'faq.experts-help': 'Our incorporation experts are here to help you every step of the way.',
                'faq.contact-us': 'Contact Us',

                // Common
                'common.language': 'Language'
            },
            'zh-Hant': {
                // Navigation
                'nav.about': '關於我們',
                'nav.services': '服務',
                'nav.how-it-works': '服務流程',
                'nav.for-funds': '基金服務',
                'nav.faq': '常見問題',
                'nav.contact': '聯絡我們',
                'nav.get-started': '開始',
                'nav.brand': 'Fusiox',

                // Hero Section
                'hero.title': '歡迎來到 Fusiox',
                'hero.subtitle': '專業的公司註冊服務，讓您的創業變得簡單、快速且實惠。在專業指導下，輕鬆完成公司註冊的每一個步驟。',
                'hero.start-incorporation': '開始註冊公司',
                'hero.learn-how': '了解詳情',

                // Services Section
                'services.title': '我們的核心服務',
                'services.company-incorporation.title': '公司註冊',
                'services.company-incorporation.description': '透過我們簡化的註冊流程，快速完成您的業務註冊。',
                'services.legal-compliance.title': '法律合規',
                'services.legal-compliance.description': '確保您的業務類型符合所有法規和法律要求。',
                'services.ongoing-support.title': '持續支援',
                'services.ongoing-support.description': '持續的支援和指導，助您的業務成長和成功。',
                'services.learn-more': '了解更多',

                // Why Choose Section
                'why-choose.title': '為什麼選擇 Fusiox？',
                'why-choose.lightning-fast.title': '閃電般快速',
                'why-choose.lightning-fast.description': '通過我們的簡化流程，在創紀錄的時間內完成公司註冊。',
                'why-choose.expert-guidance.title': '專家指導',
                'why-choose.expert-guidance.description': '我們經驗豐富的團隊確保每個細節都得到正確和專業的處理。',
                'why-choose.affordable-pricing.title': '實惠價格',
                'why-choose.affordable-pricing.description': '具競爭力的價格，透明定價，無隱藏費用。',

                // CTA Section
                'cta.title': '準備開始您的業務？',
                'cta.subtitle': '加入數千名選擇 Fusiox 滿足註冊需求的成功企業家。',
                'cta.get-started': '立即開始註冊',

                // Footer
                'footer.services': '服務',
                'footer.company': '公司',
                'footer.resources': '資源',
                'footer.contact': '聯絡',
                'footer.hklpf': 'HKLPF 註冊',
                'footer.company-secretary': '公司秘書服務',
                'footer.registered-address': '註冊地址及郵件接收',
                'footer.audit-tax': '審計及稅務申報',
                'footer.bank-account': '銀行開戶',
                'footer.ctc': 'CTC 認證',
                'footer.about-us': '關於我們',
                'footer.copyright': '2025 Fusiox Corporate Services Limited. 版權所有。',

                // About Page
                'about.hero.title': '關於 Fusiox',
                'about.hero.subtitle': '您在香港業務註冊和企業服務的可信賴夥伴。',

                // Contact Page
                'contact.hero.title': '聯絡我們',
                'contact.hero.subtitle': '與我們的註冊專家聯繫，獲得個性化協助。',
                'contact.get-consultation': '免費諮詢',
                'contact.see-how-works': '查看服務流程',

                // FAQ Page
                'faq.hero.title': '常見問題',
                'faq.hero.subtitle': '查找關於業務註冊和我們服務的最常見問題答案。',
                'faq.still-questions': '還有疑問？',
                'faq.experts-help': '我們的註冊專家將在每一步為您提供幫助。',
                'faq.contact-us': '聯絡我們',

                // Common
                'common.language': '語言'
            },
            'zh-Hans': {
                // Navigation
                'nav.about': '关于我们',
                'nav.services': '服务',
                'nav.how-it-works': '服务流程',
                'nav.for-funds': '基金服务',
                'nav.faq': '常见问题',
                'nav.contact': '联系我们',
                'nav.get-started': '开始',
                'nav.brand': 'Fusiox',

                // Hero Section
                'hero.title': '欢迎来到 Fusiox',
                'hero.subtitle': '专业的公司注册服务，让您的创业变得简单、快速且实惠。在专业指导下，轻松完成公司注册的每一个步骤。',
                'hero.start-incorporation': '开始注册公司',
                'hero.learn-how': '了解详情',

                // Services Section
                'services.title': '我们的核心服务',
                'services.company-incorporation.title': '公司注册',
                'services.company-incorporation.description': '通过我们简化的注册流程，快速完成您的业务注册。',
                'services.legal-compliance.title': '法律合规',
                'services.legal-compliance.description': '确保您的业务类型符合所有法规和法律要求。',
                'services.ongoing-support.title': '持续支持',
                'services.ongoing-support.description': '持续的支持和指导，助您的业务成长和成功。',
                'services.learn-more': '了解更多',

                // Why Choose Section
                'why-choose.title': '为什么选择 Fusiox？',
                'why-choose.lightning-fast.title': '闪电般快速',
                'why-choose.lightning-fast.description': '通过我们的简化流程，在创纪录的时间内完成公司注册。',
                'why-choose.expert-guidance.title': '专家指导',
                'why-choose.expert-guidance.description': '我们经验丰富的团队确保每个细节都得到正确和专业的处理。',
                'why-choose.affordable-pricing.title': '实惠价格',
                'why-choose.affordable-pricing.description': '具竞争力的价格，透明定价，无隐藏费用。',

                // CTA Section
                'cta.title': '准备开始您的业务？',
                'cta.subtitle': '加入数千名选择 Fusiox 满足注册需求的成功企业家。',
                'cta.get-started': '立即开始注册',

                // Footer
                'footer.services': '服务',
                'footer.company': '公司',
                'footer.resources': '资源',
                'footer.contact': '联系',
                'footer.hklpf': 'HKLPF 注册',
                'footer.company-secretary': '公司秘书服务',
                'footer.registered-address': '注册地址及邮件接收',
                'footer.audit-tax': '审计及税务申报',
                'footer.bank-account': '银行开户',
                'footer.ctc': 'CTC 认证',
                'footer.about-us': '关于我们',
                'footer.copyright': '2025 Fusiox Corporate Services Limited. 版权所有。',

                // About Page
                'about.hero.title': '关于 Fusiox',
                'about.hero.subtitle': '您在香港业务注册和企业服务的可信赖伙伴。',

                // Contact Page
                'contact.hero.title': '联系我们',
                'contact.hero.subtitle': '与我们的注册专家联系，获得个性化协助。',
                'contact.get-consultation': '免费咨询',
                'contact.see-how-works': '查看服务流程',

                // FAQ Page
                'faq.hero.title': '常见问题',
                'faq.hero.subtitle': '查找关于业务注册和我们服务的最常见问题答案。',
                'faq.still-questions': '还有疑问？',
                'faq.experts-help': '我们的注册专家将在每一步为您提供帮助。',
                'faq.contact-us': '联系我们',

                // Common
                'common.language': '语言'
            }
        };
    }

    translate(key) {
        const translation = this.translations[this.currentLanguage]?.[key];
        return translation || this.translations['en'][key] || key;
    }

    updatePageContent() {
        // Update all elements with data-i18n attribute
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = this.translate(key);
            
            if (element.tagName === 'INPUT' && element.type === 'submit') {
                element.value = translation;
            } else if (element.hasAttribute('placeholder')) {
                element.placeholder = translation;
            } else {
                element.textContent = translation;
            }
        });

        // Update elements with data-i18n-placeholder attribute
        const placeholderElements = document.querySelectorAll('[data-i18n-placeholder]');
        placeholderElements.forEach(element => {
            const key = element.getAttribute('data-i18n-placeholder');
            element.placeholder = this.translate(key);
        });

        // Update elements with data-i18n-title attribute
        const titleElements = document.querySelectorAll('[data-i18n-title]');
        titleElements.forEach(element => {
            const key = element.getAttribute('data-i18n-title');
            element.title = this.translate(key);
        });
    }

    getSupportedLanguages() {
        return [
            { code: 'en', name: 'English', nativeName: 'English' },
            { code: 'zh-Hant', name: 'Traditional Chinese', nativeName: '繁體中文' },
            { code: 'zh-Hans', name: 'Simplified Chinese', nativeName: '简体中文' }
        ];
    }
}

// Global i18n instance
window.i18n = new I18n();

// Alpine.js data for language switching
document.addEventListener('alpine:init', () => {
    Alpine.data('languageSelector', () => ({
        currentLanguage: window.i18n.currentLanguage,
        isOpen: false,
        languages: window.i18n.getSupportedLanguages(),

        get currentLanguageObj() {
            return this.languages.find(lang => lang.code === this.currentLanguage) || this.languages[0];
        },

        changeLanguage(languageCode) {
            this.currentLanguage = languageCode;
            window.i18n.setLanguage(languageCode);
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

// Initialize translations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.i18n.updatePageContent();
    window.i18n.updateHTMLLang();
});