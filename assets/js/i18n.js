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
                'nav.insights': 'Insights',
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
                'about.hero.subtitle': 'Empowering entrepreneurs to launch with confidence, through expert guidance and seamless incorporation services.',
                'about.mission.title': 'Our Mission',
                'about.mission.description': 'To simplify the complex process of business incorporation, making it accessible and affordable for entrepreneurs worldwide. We believe every great idea deserves a strong foundation.',
                'about.vision.title': 'Our Vision',
                'about.vision.description': 'To be the leading platform for business formation, known for our innovation, reliability, and commitment to client success.',
                'about.why-choose.title': 'Why Choose Us?',
                'about.why-choose.experience.title': 'Experience',
                'about.why-choose.experience.description': 'Years of expertise in business formation and regulatory compliance.',
                'about.why-choose.speed.title': 'Speed',
                'about.why-choose.speed.description': 'Fast-track incorporation with our streamlined digital processes.',
                'about.why-choose.support.title': 'Support',
                'about.why-choose.support.description': 'Your partner at every step, with expert advice and ongoing support.',

                // Contact Page
                'contact.hero.title': 'Contact Us',
                'contact.hero.subtitle': 'Get in touch with our incorporation experts for personalized assistance.',
                'contact.get-consultation': 'Get Free Consultation',
                'contact.see-how-works': 'See How It Works',

                // How It Works Page
                'how-it-works.hero.title': 'How It Works',
                'how-it-works.hero.subtitle': 'Simple, straightforward process to get your business incorporated quickly and efficiently.',

                // FAQ Page
                'faq.hero.title': 'FAQ',
                'faq.hero.subtitle': 'Find answers to the most common questions about Hong Kong company incorporation and our corporate services.',
                'faq.still-questions': 'Still Have Questions?',
                'faq.experts-help': 'Our incorporation experts are here to help you every step of the way.',
                'faq.contact-us': 'Contact Us',

                // Funds Page
                'funds.hero.title': 'For Investment Funds',
                'funds.hero.subtitle': 'Specialized incorporation and compliance services for private equity funds, venture capital funds, hedge funds, and other investment vehicles. We understand the complex regulatory requirements and help you establish compliant fund structures.',
                'funds.schedule-consultation': 'Schedule Consultation',
                'funds.our-services': 'Our Services',
                'funds.comprehensive-services.title': 'Comprehensive Fund Services',

                // About Page - Values Section
                'about.values.title': 'Our Values',
                'about.values.reliability.title': 'Reliability',
                'about.values.reliability.description': 'Count on us to handle your business setup with care and precision.',
                'about.values.efficiency.title': 'Efficiency', 
                'about.values.efficiency.description': 'We simplify the process to save you time, so you can focus on growing.',
                'about.values.support.title': 'Support',
                'about.values.support.description': 'Your partner at every step, with expert advice and ongoing support.',
                'about.values.value.title': 'Value',
                'about.values.value.description': 'Transparent, competitive pricing without compromising on service.',

                // Services Page
                'services.hero.title': 'Our Services',
                'services.hero.subtitle': 'Comprehensive business incorporation and compliance services tailored to your needs.',
                'services.basic-services.title': 'Basic Services',
                'services.value-added-services.title': 'Value-added Services',
                'services.hklpf.title': 'HKLPF Registration',
                'services.hklpf.description': 'Professional Hong Kong Limited Partnership Fund registration services for investment vehicles and fund structures.',
                'services.company-secretary.title': 'Company Secretary Service',
                'services.company-secretary.description': 'Professional company secretary services to ensure your business remains compliant with Hong Kong regulations.',
                'services.expand.more': 'Learn More',
                'services.expand.less': 'Less Info',

                // How It Works Page
                'how-it-works.process.title': 'Our Simple 4-Step Process',
                'how-it-works.step.data-collection': 'Data Collection',
                'how-it-works.step.auto-fill': 'Auto-Fill & Preparation',
                'how-it-works.step.review': 'Review & Approval',
                'how-it-works.step.submission': 'Submission & Completion',
                'how-it-works.data-collection.description': 'We gather all necessary information about your business through our simple online questionnaire.',
                'how-it-works.data-collection.what-we-collect': 'What we collect:',
                'how-it-works.data-collection.business-name': '• Business name preferences',
                'how-it-works.data-collection.business-structure': '• Business structure type',
                'how-it-works.data-collection.owner-info': '• Owner/member information',
                'how-it-works.data-collection.registered-agent': '• Registered agent details',
                'how-it-works.data-collection.state': '• State of incorporation',
                'how-it-works.auto-fill.description': 'Our system automatically prepares all required documents and forms based on your information.',
                'how-it-works.auto-fill.we-prepare': 'We prepare:',
                'how-it-works.auto-fill.articles': '• Articles of Incorporation/Organization',
                'how-it-works.auto-fill.operating-agreements': '• Operating agreements',
                'how-it-works.auto-fill.ein': '• EIN application',
                'how-it-works.auto-fill.state-forms': '• State-specific forms',
                'how-it-works.auto-fill.resolutions': '• Corporate resolutions',
                'how-it-works.review.description': 'Review all documents for accuracy and approve them before we proceed with filing.',
                'how-it-works.review.you-can': 'You can:',
                'how-it-works.review.review-online': '• Review all documents online',
                'how-it-works.review.request-modifications': '• Request modifications',
                'how-it-works.review.ask-questions': '• Ask questions to our experts',
                'how-it-works.review.approve-documents': '• Approve final documents',
                'how-it-works.review.track-progress': '• Track progress in real-time',
                'how-it-works.submission.description': 'We file all documents with the appropriate state agencies and deliver your completed package.',
                'how-it-works.submission.you-receive': 'You receive:',
                'how-it-works.submission.certified-documents': '• Certified filing documents',
                'how-it-works.submission.ein-confirmation': '• EIN confirmation',
                'how-it-works.submission.corporate-kit': '• Corporate kit (if applicable)',
                'how-it-works.submission.digital-copies': '• Digital copies of all documents',
                'how-it-works.submission.support-info': '• Ongoing support information',
                'how-it-works.timeline.title': 'Typical Timeline',
                'how-it-works.timeline.day1': 'Day 1',
                'how-it-works.timeline.day1.description': 'Complete questionnaire and document preparation',
                'how-it-works.timeline.day2-3': 'Day 2-3',
                'how-it-works.timeline.day2-3.description': 'Review, approve, and file documents with the state',
                'how-it-works.timeline.day5-7': 'Day 5-7',
                'how-it-works.timeline.day5-7.description': 'Receive approved documents and complete business package',
                'how-it-works.different.title': 'What Makes Us Different',
                'how-it-works.different.lightning-fast.title': 'Lightning Fast',
                'how-it-works.different.lightning-fast.description': 'Most incorporations completed within 5-7 business days, with expedited options available.',
                'how-it-works.different.expert-review.title': 'Expert Review',
                'how-it-works.different.expert-review.description': 'Every document is reviewed by legal experts to ensure accuracy and compliance.',
                'how-it-works.different.ongoing-support.title': 'Ongoing Support',
                'how-it-works.different.ongoing-support.description': 'Continued support and guidance even after your incorporation is complete.',
                'how-it-works.different.guarantee.title': '100% Guarantee',
                'how-it-works.different.guarantee.description': 'We guarantee your incorporation will be accepted or we\'ll refund your money.',
                'how-it-works.different.transparent-pricing.title': 'Transparent Pricing',
                'how-it-works.different.transparent-pricing.description': 'No hidden fees or surprise charges. Everything is clearly outlined upfront.',
                'how-it-works.different.all-in-one.title': 'All-in-One Platform',
                'how-it-works.different.all-in-one.description': 'Everything you need in one place - no jumping between different services or providers.',
                'how-it-works.cta.title': 'Ready to Get Started?',
                'how-it-works.cta.description': 'Begin your incorporation journey today with our simple 4-step process.',
                'how-it-works.cta.button': 'Start Your Incorporation',

                // Contact Form
                'contact.form.full-name': 'Full Name *',
                'contact.form.email': 'Email Address *',
                'contact.form.phone': 'Phone Number',
                'contact.form.business-name': 'Business Name',
                'contact.form.service-interest': 'Service Interest',
                'contact.form.message': 'Message *',
                'contact.form.placeholder.full-name': 'Your full name',
                'contact.form.placeholder.email': 'your.email@example.com',
                'contact.form.placeholder.phone': 'Enter phone number',
                'contact.form.placeholder.business-name': 'Your business name (if you have one)',
                'contact.form.placeholder.message': 'Tell us about your business and how we can help...',
                'contact.form.title': 'Get Free Consultation',

                // FAQ Page
                'faq.sections.general': 'General Questions',
                'faq.sections.pricing': 'Pricing & Services',

                // FAQ Content - General Questions
                'faq.general.q1.title': 'What is a Hong Kong company incorporation?',
                'faq.general.q1.answer': 'Hong Kong company incorporation is the legal process of establishing a private limited company in Hong Kong. It creates a separate legal entity that can enter contracts, own property, and conduct business. Hong Kong companies enjoy limited liability protection, making it an attractive jurisdiction for international business due to its simple tax system, strategic location, and business-friendly environment.',
                'faq.general.q2.title': 'Who can incorporate a company in Hong Kong?',
                'faq.general.q2.answer': 'Any person aged 18 or above can incorporate a Hong Kong company, regardless of nationality or residency. There are no restrictions on foreign ownership. However, every Hong Kong company must have at least one director who is a natural person (not a corporate entity), and at least 50% of the directors must be ordinarily resident in Hong Kong, or the company must have a Hong Kong resident representative.',
                'faq.general.q3.title': 'What are the advantages of incorporating in Hong Kong?',
                'faq.general.q3.answer': 'Hong Kong offers numerous advantages: simple and low tax system (16.5% corporate tax rate), strategic gateway to China and Asia, excellent international banking facilities, strong legal system based on English common law, minimal government interference, free flow of capital, established financial infrastructure, and international recognition. Hong Kong also has extensive double taxation agreements with many countries.',
                'faq.general.q4.title': 'What is the minimum share capital required?',
                'faq.general.q4.answer': 'There is no minimum paid-up share capital requirement for Hong Kong companies. The standard authorized share capital is HK$10,000 divided into 10,000 shares of HK$1 each, but companies typically issue only one share to each shareholder initially. You can issue additional shares as needed for business operations or investment purposes.',

                // FAQ Content - Incorporation Process
                'faq.incorporation.title': 'Incorporation Process',
                'faq.incorporation.q1.title': 'What documents are required for Hong Kong company incorporation?',
                'faq.incorporation.q1.answer': 'The required documents include: Incorporation Form (Form NNC1), Articles of Association, copy of identity documents for all directors and shareholders, proof of registered address in Hong Kong, and consent to act forms from directors and company secretary. If directors are not Hong Kong residents, additional documentation may be required including address proof and professional references.',
                'faq.incorporation.q2.title': 'How long does it take to incorporate a Hong Kong company?',
                'faq.incorporation.q2.answer': 'Standard incorporation typically takes 4-6 working days from the date the Companies Registry receives all required documents. Same-day incorporation is available for an additional fee if documents are submitted before 3:00 PM on a working day. Electronic incorporation (e-Registry) can be completed within 1 hour if all requirements are met and processed electronically.',
                'faq.incorporation.q3.title': 'Can I choose any company name?',
                'faq.incorporation.q3.answer': 'Company names must be approved by the Companies Registry and cannot be identical to existing registered companies. Names cannot suggest government connection, be offensive, or mislead the public. We recommend conducting a name search first. Names can be in English, Chinese, or both, but must end with "Limited" or "Ltd" (or Chinese equivalent). Certain words require approval from relevant authorities.',
                'faq.incorporation.q4.title': 'What is a registered address and why do I need one?',
                'faq.incorporation.q4.answer': 'Every Hong Kong company must have a registered address in Hong Kong where official correspondence is received. This address appears on public records and is where government notices are served. The registered address can be a business address, professional service provider\'s address, or virtual office, but cannot be a P.O. Box. We provide registered address services as part of our incorporation packages.',

                // FAQ Content - Compliance Requirements
                'faq.compliance.title': 'Compliance Requirements',
                'faq.compliance.q1.title': 'What are the ongoing compliance requirements for Hong Kong companies?',
                'faq.compliance.q1.answer': 'Hong Kong companies must file Annual Returns (Form NAR1) within 42 days of the anniversary of incorporation, maintain statutory books and records, hold Annual General Meetings (for companies with more than one member), file audited financial statements if turnover exceeds HK$5 million, and maintain a registered address and company secretary in Hong Kong. Companies must also update the Companies Registry of any changes to company information.',
                'faq.compliance.q2.title': 'Do I need a company secretary in Hong Kong?',
                'faq.compliance.q2.answer': 'Yes, every Hong Kong company must appoint a company secretary within 6 months of incorporation. The company secretary must be either a Hong Kong resident individual or a Hong Kong company licensed to provide company secretary services. The secretary is responsible for ensuring compliance with statutory requirements, maintaining company records, and filing required documents with the Companies Registry.',
                'faq.compliance.q3.title': 'What records must a Hong Kong company maintain?',
                'faq.compliance.q3.answer': 'Companies must maintain registers of members, directors, company secretaries, and charges at the registered address or company secretary\'s office. These records must be available for inspection by members and, in some cases, the public. Companies must also keep proper accounting records for at least 5 years, including records of receipts and payments, assets and liabilities, and goods bought and sold.',
                'faq.compliance.q4.title': 'What happens if I don\'t comply with filing requirements?',
                'faq.compliance.q4.answer': 'Non-compliance can result in penalties, prosecution of directors and company secretaries, and potential striking off of the company from the register. Late filing of Annual Returns incurs penalty fees, and failure to file for extended periods can lead to the Registrar initiating deregistration proceedings. It\'s important to maintain compliance to avoid legal consequences and protect the company\'s good standing.',

                // FAQ Content - Fees & Timelines
                'faq.fees.title': 'Fees & Timelines',
                'faq.fees.q1.title': 'What are the government fees for Hong Kong company incorporation?',
                'faq.fees.q1.answer': 'The Hong Kong Companies Registry charges HK$1,720 for standard incorporation and HK$1,720 for incorporation by electronic means. Same-day incorporation costs an additional HK$320. Companies must also pay HK$340 for Business Registration within one month of incorporation. These are mandatory government fees that apply to all companies regardless of the service provider used. Note: Government fees are subject to change; please verify current rates with the Companies Registry at time of incorporation.',
                'faq.fees.q2.title': 'What are the ongoing annual costs for maintaining a Hong Kong company?',
                'faq.fees.q2.answer': 'Annual costs include Annual Return filing fee (HK$105 if filed by due date), Business Registration fee (HK$250 annually), company secretary fees (varies by provider), registered address fees (if using professional service), and audit fees if required. Companies with turnover under HK$5 million may be exempt from audit requirements, significantly reducing annual costs.',
                'faq.fees.q3.title': 'Are there any hidden costs in company incorporation?',
                'faq.fees.q3.answer': 'Our packages include all mandatory government fees upfront with no hidden charges. Additional costs may arise only for optional services like expedited processing, additional certified copies, apostille services, or bank account opening assistance. We provide transparent pricing and clearly outline what\'s included in each package before you proceed.',
                'faq.fees.q4.title': 'Can I get a refund if incorporation is not successful?',
                'faq.fees.q4.answer': 'We guarantee successful incorporation when all required documents are provided correctly. In the rare event that incorporation is rejected due to our error, we provide a full refund. However, government fees are non-refundable once submitted to the Companies Registry. We conduct thorough pre-submission reviews to minimize the risk of rejection and ensure smooth processing.',

                // FAQ Content - Post-Incorporation
                'faq.post.title': 'Post-Incorporation Obligations',
                'faq.post.q1.title': 'What should I do immediately after incorporation?',
                'faq.post.q1.answer': 'After incorporation, you should: obtain Business Registration Certificate, open a corporate bank account, appoint a company secretary (within 6 months), set up accounting systems, obtain any required business licenses, register for tax with the Inland Revenue Department if applicable, and ensure compliance with ongoing filing requirements. We can assist with these post-incorporation steps.',
                'faq.post.q2.title': 'When do I need to file my first Annual Return?',
                'faq.post.q2.answer': 'Your first Annual Return (Form NAR1) must be filed within 42 days of your company\'s first anniversary of incorporation. For example, if incorporated on January 15, 2024, the first Annual Return must be filed by February 26, 2025. Late filing incurs penalty fees, so it\'s important to track these deadlines or use professional services to manage compliance.',
                'faq.post.q3.title': 'Do I need to prepare audited financial statements?',
                'faq.post.q3.answer': 'Companies with annual turnover of HK$5 million or more must prepare audited financial statements and file them with the Annual Return. Companies below this threshold may qualify for audit exemption but must still maintain proper accounting records. Dormant companies may also qualify for exemption from audit requirements under certain conditions.',
                'faq.post.q4.title': 'How do I update company information with the Registry?',
                'faq.post.q4.answer': 'Changes to company information must be reported to the Companies Registry within the prescribed timeframes. This includes changes to directors, company secretary, registered address, or share capital. Different forms are required for different types of changes, and some changes may incur fees. We can assist with filing the necessary forms to keep your company records up to date.',

                // FAQ Content - Other Questions
                'faq.other.title': 'Other Common Questions',
                'faq.other.q1.title': 'Can I open a bank account for my Hong Kong company?',
                'faq.other.q1.answer': 'Yes, Hong Kong companies can open corporate bank accounts with local and international banks. Requirements typically include company incorporation documents, business registration certificate, proof of registered address, directors\' identity documents, business plan, and evidence of business activities. We provide bank account opening assistance to facilitate this process.',
                'faq.other.q2.title': 'Do I need to pay Hong Kong tax if I don\'t operate in Hong Kong?',
                'faq.other.q2.answer': 'Hong Kong follows a territorial tax system, meaning only profits sourced in Hong Kong are subject to Hong Kong profits tax. If your company operates entirely outside Hong Kong and derives no Hong Kong-sourced income, you may claim offshore exemption. However, proper documentation and professional advice are essential to support such claims and ensure compliance.',
                'faq.other.q3.title': 'Can I close my Hong Kong company if I no longer need it?',
                'faq.other.q3.answer': 'Yes, you can deregister your Hong Kong company through voluntary deregistration if it meets certain conditions: has not commenced business or has ceased operations for at least 3 months, has no outstanding liabilities, and has no legal proceedings pending. The process involves filing Form NDR1 and paying the prescribed fee. Alternatively, companies can be wound up through a more formal liquidation process.',
                'faq.other.q4.title': 'What support do you provide after incorporation?',
                'faq.other.q4.answer': 'We provide comprehensive post-incorporation support including company secretary services, registered address provision, annual return filing, accounting and audit services, tax filing assistance, bank account opening support, and ongoing compliance guidance. Our experienced team ensures your Hong Kong company remains compliant with all statutory requirements while you focus on growing your business.',

                // FAQ Disclaimer
                'faq.disclaimer.title': 'Important Notice',
                'faq.disclaimer.content': 'The information provided here is for reference only and is based on current Hong Kong laws and regulations. Business requirements and regulations may change, and individual circumstances may vary. Please contact us directly for tailored advice specific to your situation and the most up-to-date requirements.',

                // Insights Section
                'insights.hero.title': 'Insights',
                'insights.hero.subtitle': 'Explore our latest insights and updates on corporate services and fund operations.',
                'insights.filter.all': 'All Posts',
                'insights.filter.company-secretary': 'Company Secretary',
                'insights.filter.fund': 'Fund',

                // Page Titles
                'page.title.about': 'About Us - Fusiox',
                'page.title.contact': 'Contact Us - Fusiox', 
                'page.title.faq': 'FAQ - Fusiox',
                'page.title.funds': 'For Investment Funds - Fusiox',
                'page.title.how-it-works': 'How It Works - Fusiox',
                'page.title.insights': 'Insights - Fusiox',
                'page.title.services': 'Services - Fusiox',
                'page.title.index': 'Fusiox - Professional Incorporation Services',

                // Common
                'common.language': 'Language'
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
                'about.hero.subtitle': '通過專業指導和無縫註冊服務，讓企業家自信地啟動業務。',
                'about.mission.title': '我們的使命',
                'about.mission.description': '簡化複雜的業務註冊流程，讓全世界的企業家都能輕鬆負擔。我們相信每個偉大的想法都值得擁有堅實的基礎。',
                'about.vision.title': '我們的願景',
                'about.vision.description': '成為業務成立的領先平台，以創新、可靠性和對客戶成功的承諾而聞名。',
                'about.why-choose.title': '為什麼選擇我們？',
                'about.why-choose.experience.title': '經驗',
                'about.why-choose.experience.description': '在業務成立和監管合規方面擁有多年專業知識。',
                'about.why-choose.speed.title': '速度',
                'about.why-choose.speed.description': '通過我們簡化的數位流程，快速註冊。',
                'about.why-choose.support.title': '支援',
                'about.why-choose.support.description': '在每一步都是您的夥伴，提供專業建議和持續支援。',

                // Contact Page
                'contact.hero.title': '聯絡我們',
                'contact.hero.subtitle': '與我們的註冊專家聯繫，獲得個性化協助。',
                'contact.get-consultation': '免費諮詢',
                'contact.see-how-works': '查看服務流程',

                // How It Works Page
                'how-it-works.hero.title': '服務流程',
                'how-it-works.hero.subtitle': '簡單直接的流程，讓您的業務快速高效地完成註冊。',

                // FAQ Page
                'faq.hero.title': '常見問題',
                'faq.hero.subtitle': '查找關於香港公司註冊和我們企業服務的最常見問題答案。',
                'faq.still-questions': '還有疑問？',
                'faq.experts-help': '我們的註冊專家將在每一步為您提供幫助。',
                'faq.contact-us': '聯絡我們',

                // Funds Page
                'funds.hero.title': '基金服務',
                'funds.hero.subtitle': '為私募股權基金、創業投資基金、對沖基金和其他投資工具提供專業的註冊和合規服務。我們了解複雜的監管要求，並幫助您建立合規的基金結構。',
                'funds.schedule-consultation': '預約諮詢',
                'funds.our-services': '我們的服務',
                'funds.comprehensive-services.title': '全方位基金服務',

                // About Page - Values Section
                'about.values.title': '我們的價值觀',
                'about.values.reliability.title': '可靠性',
                'about.values.reliability.description': '依靠我們以細心和精確的方式處理您的業務設立。',
                'about.values.efficiency.title': '效率',
                'about.values.efficiency.description': '我們簡化流程以節省您的時間，讓您專注於成長。',
                'about.values.support.title': '支援',
                'about.values.support.description': '在每一步都是您的夥伴，提供專業建議和持續支援。',
                'about.values.value.title': '價值',
                'about.values.value.description': '透明、具競爭力的定價，不會在服務上妥協。',

                // Services Page
                'services.hero.title': '我們的服務',
                'services.hero.subtitle': '為您量身定制的全面業務註冊和合規服務。',
                'services.basic-services.title': '基本服務',
                'services.value-added-services.title': '增值服務',
                'services.hklpf.title': 'HKLPF 註冊',
                'services.hklpf.description': '為投資工具和基金結構提供專業的香港有限合夥基金註冊服務。',
                'services.company-secretary.title': '公司秘書服務',
                'services.company-secretary.description': '專業的公司秘書服務，確保您的業務持續符合香港法規。',
                'services.expand.more': '了解更多',
                'services.expand.less': '收起',

                // How It Works Page
                'how-it-works.process.title': '我們簡單的4步流程',
                'how-it-works.step.data-collection': '數據收集',
                'how-it-works.step.auto-fill': '自動填寫與準備',
                'how-it-works.step.review': '審核與批准',
                'how-it-works.step.submission': '提交與完成',
                'how-it-works.data-collection.description': '我們通過簡單的線上問卷收集關於您業務的所有必要資訊。',
                'how-it-works.data-collection.what-we-collect': '我們收集的資料：',
                'how-it-works.data-collection.business-name': '• 企業名稱偏好',
                'how-it-works.data-collection.business-structure': '• 企業結構類型',
                'how-it-works.data-collection.owner-info': '• 擁有者/成員資訊',
                'how-it-works.data-collection.registered-agent': '• 註冊代理詳情',
                'how-it-works.data-collection.state': '• 註冊州份',
                'how-it-works.auto-fill.description': '我們的系統根據您的資訊自動準備所有必需的文件和表格。',
                'how-it-works.auto-fill.we-prepare': '我們準備：',
                'how-it-works.auto-fill.articles': '• 公司章程/組織章程',
                'how-it-works.auto-fill.operating-agreements': '• 營運協議',
                'how-it-works.auto-fill.ein': '• EIN 申請',
                'how-it-works.auto-fill.state-forms': '• 州特定表格',
                'how-it-works.auto-fill.resolutions': '• 公司決議',
                'how-it-works.review.description': '在我們進行申報之前，審查所有文件的準確性並批准它們。',
                'how-it-works.review.you-can': '您可以：',
                'how-it-works.review.review-online': '• 線上審查所有文件',
                'how-it-works.review.request-modifications': '• 要求修改',
                'how-it-works.review.ask-questions': '• 向我們的專家提問',
                'how-it-works.review.approve-documents': '• 批准最終文件',
                'how-it-works.review.track-progress': '• 即時追蹤進度',
                'how-it-works.submission.description': '我們向適當的州機構提交所有文件，並交付您的完整套餐。',
                'how-it-works.submission.you-receive': '您將收到：',
                'how-it-works.submission.certified-documents': '• 認證申報文件',
                'how-it-works.submission.ein-confirmation': '• EIN 確認函',
                'how-it-works.submission.corporate-kit': '• 公司套件（如適用）',
                'how-it-works.submission.digital-copies': '• 所有文件的數位副本',
                'how-it-works.submission.support-info': '• 持續支援資訊',
                'how-it-works.timeline.title': '典型時間表',
                'how-it-works.timeline.day1': '第1天',
                'how-it-works.timeline.day1.description': '完成問卷和文件準備',
                'how-it-works.timeline.day2-3': '第2-3天',
                'how-it-works.timeline.day2-3.description': '審查、批准並向州政府提交文件',
                'how-it-works.timeline.day5-7': '第5-7天',
                'how-it-works.timeline.day5-7.description': '收到批准的文件和完整的業務套餐',
                'how-it-works.different.title': '我們的與眾不同之處',
                'how-it-works.different.lightning-fast.title': '閃電般快速',
                'how-it-works.different.lightning-fast.description': '大多數註冊在5-7個工作日內完成，並提供加急選項。',
                'how-it-works.different.expert-review.title': '專家審查',
                'how-it-works.different.expert-review.description': '每份文件都由法律專家審查，以確保準確性和合規性。',
                'how-it-works.different.ongoing-support.title': '持續支援',
                'how-it-works.different.ongoing-support.description': '即使在您的註冊完成後，我們也會繼續提供支援和指導。',
                'how-it-works.different.guarantee.title': '100% 保證',
                'how-it-works.different.guarantee.description': '我們保證您的註冊將被接受，否則我們將退還您的款項。',
                'how-it-works.different.transparent-pricing.title': '透明定價',
                'how-it-works.different.transparent-pricing.description': '沒有隱藏費用或意外收費。一切都預先清楚說明。',
                'how-it-works.different.all-in-one.title': '一站式平台',
                'how-it-works.different.all-in-one.description': '您需要的一切都在一個地方 - 無需在不同的服務或提供商之間跳轉。',
                'how-it-works.cta.title': '準備開始了嗎？',
                'how-it-works.cta.description': '立即開始您的註冊之旅，通過我們簡單的4步流程。',
                'how-it-works.cta.button': '開始您的註冊',

                // Contact Form
                'contact.form.full-name': '全名 *',
                'contact.form.email': '電子郵件地址 *',
                'contact.form.phone': '電話號碼',
                'contact.form.business-name': '企業名稱',
                'contact.form.service-interest': '服務興趣',
                'contact.form.message': '訊息 *',
                'contact.form.placeholder.full-name': '您的全名',
                'contact.form.placeholder.email': 'your.email@example.com',
                'contact.form.placeholder.phone': '輸入電話號碼',
                'contact.form.placeholder.business-name': '您的企業名稱（如果有的話）',
                'contact.form.placeholder.message': '告訴我們您的業務以及我們如何協助...',
                'contact.form.title': '免費諮詢',

                // FAQ Page
                'faq.sections.general': '一般問題',
                'faq.sections.pricing': '定價與服務',

                // FAQ Content - General Questions
                'faq.general.q1.title': '什麼是香港公司註冊？',
                'faq.general.q1.answer': '香港公司註冊是在香港設立私人有限公司的法律程序。它創建一個獨立的法律實體，可以簽訂合約、擁有財產和經營業務。香港公司享有有限責任保護，由於其簡單的稅制、戰略位置和友好的商業環境，使其成為國際業務的理想司法管轄區。',
                'faq.general.q2.title': '誰可以在香港註冊公司？',
                'faq.general.q2.answer': '任何年滿18歲的人都可以註冊香港公司，不論國籍或居住地。對外國所有權沒有限制。但是，每間香港公司必須至少有一名自然人董事（非法人實體），且至少50%的董事必須通常居住在香港，或公司必須有香港居民代表。',
                'faq.general.q3.title': '在香港註冊的優勢是什麼？',
                'faq.general.q3.answer': '香港提供眾多優勢：簡單和低稅制（16.5%企業稅率）、通往中國和亞洲的戰略門戶、優秀的國際銀行設施、基於英國普通法的強大法律制度、最少政府干預、資本自由流動、完善的金融基礎設施和國際認可。香港還與許多國家簽署了廣泛的雙重稅收協定。',
                'faq.general.q4.title': '最低股本要求是多少？',
                'faq.general.q4.answer': '香港公司沒有最低實繳股本要求。標準授權股本為港幣10,000元，分為10,000股每股港幣1元，但公司通常最初只向每個股東發行一股。您可以根據業務營運或投資目的需要發行額外股份。',

                // FAQ Content - Incorporation Process
                'faq.incorporation.title': '註冊流程',
                'faq.incorporation.q1.title': '香港公司註冊需要什麼文件？',
                'faq.incorporation.q1.answer': '所需文件包括：註冊表格（表格NNC1）、公司章程、所有董事和股東的身份證明文件副本、香港註冊地址證明，以及董事和公司秘書的同意書。如果董事不是香港居民，可能需要額外文件，包括地址證明和專業推薦信。',
                'faq.incorporation.q2.title': '註冊香港公司需要多長時間？',
                'faq.incorporation.q2.answer': '標準註冊通常從公司註冊處收到所有必需文件之日起需要4-6個工作日。如果在工作日下午3:00前提交文件，可以支付額外費用進行當日註冊。如果滿足所有要求並以電子方式處理，電子註冊（e-Registry）可在1小時內完成。',
                'faq.incorporation.q3.title': '我可以選擇任何公司名稱嗎？',
                'faq.incorporation.q3.answer': '公司名稱必須獲得公司註冊處批准，不能與現有註冊公司相同。名稱不能暗示政府關聯、具有冒犯性或誤導公眾。我們建議先進行名稱查冊。名稱可以是英文、中文或兩者兼有，但必須以「有限公司」或「Ltd」（或中文等同詞）結尾。某些詞語需要相關當局的批准。',
                'faq.incorporation.q4.title': '什麼是註冊地址，為什麼需要？',
                'faq.incorporation.q4.answer': '每間香港公司必須在香港有一個註冊地址，用於接收官方通信。此地址會出現在公共記錄上，是政府通知的送達地址。註冊地址可以是商業地址、專業服務提供者的地址或虛擬辦公室，但不能是郵政信箱。我們在註冊套餐中提供註冊地址服務。',

                // FAQ Content - Compliance Requirements
                'faq.compliance.title': '合規要求',
                'faq.compliance.q1.title': '香港公司的持續合規要求是什麼？',
                'faq.compliance.q1.answer': '香港公司必須在註冊週年日後42天內提交周年申報表（表格NAR1）、維護法定帳簿和記錄、舉行股東大會（對於有多個成員的公司）、如營業額超過港幣500萬元則提交經審計的財務報表，並在香港維護註冊地址和公司秘書。公司還必須向公司註冊處更新任何公司信息變更。',
                'faq.compliance.q2.title': '我需要在香港有公司秘書嗎？',
                'faq.compliance.q2.answer': '是的，每間香港公司必須在註冊後6個月內委任公司秘書。公司秘書必須是香港居民個人或獲得許可提供公司秘書服務的香港公司。秘書負責確保遵守法定要求、維護公司記錄，以及向公司註冊處提交所需文件。',
                'faq.compliance.q3.title': '香港公司必須維護什麼記錄？',
                'faq.compliance.q3.answer': '公司必須在註冊地址或公司秘書辦公室維護成員、董事、公司秘書和押記的登記冊。這些記錄必須供成員查閱，在某些情況下供公眾查閱。公司還必須保存適當的會計記錄至少5年，包括收支記錄、資產和負債記錄，以及貨物買賣記錄。',
                'faq.compliance.q4.title': '如果不遵守申報要求會怎樣？',
                'faq.compliance.q4.answer': '不合規可能導致罰款、起訴董事和公司秘書，以及可能將公司從登記冊中除名。遲交周年申報表會產生罰款，長期不申報可能導致註冊官啟動註銷程序。保持合規很重要，以避免法律後果並保護公司的良好聲譽。',

                // FAQ Content - Fees & Timelines
                'faq.fees.title': '費用與時間',
                'faq.fees.q1.title': '香港公司註冊的政府費用是多少？',
                'faq.fees.q1.answer': '香港公司註冊處收取標準註冊費港幣1,720元，電子註冊費港幣1,720元。當日註冊需額外支付港幣320元。公司還必須在註冊後一個月內支付港幣340元的商業登記費。這些是強制性政府費用，適用於所有公司，無論使用何種服務提供者。注意：政府費用可能會變更；請在註冊時向公司註冊處核實當前費率。',
                'faq.fees.q2.title': '維護香港公司的年度成本是多少？',
                'faq.fees.q2.answer': '年度成本包括周年申報表申報費（如按時申報為港幣105元）、商業登記費（每年港幣250元）、公司秘書費（因提供者而異）、註冊地址費（如使用專業服務）和審計費（如需要）。營業額低於港幣500萬元的公司可能豁免審計要求，大大降低年度成本。',
                'faq.fees.q3.title': '公司註冊有任何隱藏費用嗎？',
                'faq.fees.q3.answer': '我們的套餐預先包含所有強制性政府費用，沒有隱藏收費。只有可選服務（如加急處理、額外認證副本、海牙認證服務或銀行開戶協助）才可能產生額外費用。我們提供透明定價，在您進行之前清楚說明每個套餐包含的內容。',
                'faq.fees.q4.title': '如果註冊不成功，我可以退款嗎？',
                'faq.fees.q4.answer': '當提供所有必需文件正確時，我們保證成功註冊。在因我們的錯誤導致註冊被拒絕的罕見情況下，我們提供全額退款。但是，政府費用一旦提交給公司註冊處就不可退還。我們進行徹底的提交前審查，以最大限度地降低被拒絕的風險並確保順利處理。',

                // FAQ Content - Post-Incorporation
                'faq.post.title': '註冊後義務',
                'faq.post.q1.title': '註冊後我應該立即做什麼？',
                'faq.post.q1.answer': '註冊後，您應該：獲得商業登記證、開設企業銀行帳戶、委任公司秘書（6個月內）、建立會計系統、獲得任何所需的營業牌照、如適用則向稅務局登記稅務，並確保遵守持續申報要求。我們可以協助這些註冊後步驟。',
                'faq.post.q2.title': '我需要何時提交第一份周年申報表？',
                'faq.post.q2.answer': '您的第一份周年申報表（表格NAR1）必須在公司註冊第一個週年日後42天內提交。例如，如果在2024年1月15日註冊，第一份周年申報表必須在2025年2月26日前提交。遲交會產生罰款，因此跟蹤這些截止日期或使用專業服務管理合規很重要。',
                'faq.post.q3.title': '我需要準備經審計的財務報表嗎？',
                'faq.post.q3.answer': '年營業額達港幣500萬元或以上的公司必須準備經審計的財務報表並與周年申報表一起提交。低於此門檻的公司可能符合審計豁免條件，但仍必須維護適當的會計記錄。在某些條件下，休眠公司也可能符合審計要求豁免條件。',
                'faq.post.q4.title': '如何向註冊處更新公司信息？',
                'faq.post.q4.answer': '公司信息的變更必須在規定時間內向公司註冊處報告。這包括董事、公司秘書、註冊地址或股本的變更。不同類型的變更需要不同的表格，某些變更可能產生費用。我們可以協助提交必要的表格，以保持您的公司記錄最新。',

                // FAQ Content - Other Questions
                'faq.other.title': '其他常見問題',
                'faq.other.q1.title': '我可以為香港公司開設銀行帳戶嗎？',
                'faq.other.q1.answer': '是的，香港公司可以在本地和國際銀行開設企業銀行帳戶。要求通常包括公司註冊文件、商業登記證、註冊地址證明、董事身份證明文件、商業計劃和業務活動證明。我們提供銀行開戶協助以促進此過程。',
                'faq.other.q2.title': '如果我不在香港營運，我需要支付香港稅嗎？',
                'faq.other.q2.answer': '香港實行地域稅制，意味著只有在香港產生的利潤才需要繳納香港利得稅。如果您的公司完全在香港境外營運且沒有香港來源收入，您可以申請離岸免稅。然而，適當的文件和專業建議對於支持此類申請和確保合規是必要的。',
                'faq.other.q3.title': '如果我不再需要，我可以關閉香港公司嗎？',
                'faq.other.q3.answer': '是的，如果滿足某些條件，您可以通過自願註銷來註銷香港公司：尚未開始業務或已停止營運至少3個月、沒有未償債務、沒有待決法律程序。該過程涉及提交表格NDR1並支付規定費用。或者，公司可以通過更正式的清算程序進行清盤。',
                'faq.other.q4.title': '註冊後您提供什麼支援？',
                'faq.other.q4.answer': '我們提供全面的註冊後支援，包括公司秘書服務、註冊地址提供、周年申報表申報、會計和審計服務、稅務申報協助、銀行開戶支援和持續合規指導。我們經驗豐富的團隊確保您的香港公司持續符合所有法定要求，讓您專注於發展業務。',

                // FAQ Disclaimer
                'faq.disclaimer.title': '重要通知',
                'faq.disclaimer.content': '此處提供的信息僅供參考，基於當前的香港法律法規。業務要求和法規可能會變更，個別情況可能有所不同。請直接聯繫我們，獲得針對您具體情況和最新要求的量身定制建議。',

                // Insights Section
                'insights.hero.title': '洞察分析',
                'insights.hero.subtitle': '探索我們關於企業服務和基金營運的最新見解和更新。',
                'insights.filter.all': '所有文章',
                'insights.filter.company-secretary': '公司秘書',
                'insights.filter.fund': '基金',

                // Page Titles
                'page.title.about': '關於我們 - Fusiox',
                'page.title.contact': '聯絡我們 - Fusiox',
                'page.title.faq': '常見問題 - Fusiox',
                'page.title.funds': '基金服務 - Fusiox',
                'page.title.how-it-works': '服務流程 - Fusiox',
                'page.title.insights': '洞察分析 - Fusiox',
                'page.title.services': '服務 - Fusiox',
                'page.title.index': 'Fusiox - 專業註冊服務',

                // Common
                'common.language': '語言'
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
                'about.hero.subtitle': '通过专业指导和无缝注册服务，让企业家自信地启动业务。',
                'about.mission.title': '我们的使命',
                'about.mission.description': '简化复杂的业务注册流程，让全世界的企业家都能轻松负担。我们相信每个伟大的想法都值得拥有坚实的基础。',
                'about.vision.title': '我们的愿景',
                'about.vision.description': '成为业务成立的领先平台，以创新、可靠性和对客户成功的承诺而闻名。',
                'about.why-choose.title': '为什么选择我们？',
                'about.why-choose.experience.title': '经验',
                'about.why-choose.experience.description': '在业务成立和监管合规方面拥有多年专业知识。',
                'about.why-choose.speed.title': '速度',
                'about.why-choose.speed.description': '通过我们简化的数字流程，快速注册。',
                'about.why-choose.support.title': '支持',
                'about.why-choose.support.description': '在每一步都是您的伙伴，提供专业建议和持续支持。',

                // Contact Page
                'contact.hero.title': '联系我们',
                'contact.hero.subtitle': '与我们的注册专家联系，获得个性化协助。',
                'contact.get-consultation': '免费咨询',
                'contact.see-how-works': '查看服务流程',

                // How It Works Page
                'how-it-works.hero.title': '服务流程',
                'how-it-works.hero.subtitle': '简单直接的流程，让您的业务快速高效地完成注册。',

                // FAQ Page
                'faq.hero.title': '常见问题',
                'faq.hero.subtitle': '查找关于香港公司注册和我们企业服务的最常见问题答案。',
                'faq.still-questions': '还有疑问？',
                'faq.experts-help': '我们的注册专家将在每一步为您提供帮助。',
                'faq.contact-us': '联系我们',

                // Funds Page
                'funds.hero.title': '基金服务',
                'funds.hero.subtitle': '为私募股权基金、创业投资基金、对冲基金和其他投资工具提供专业的注册和合规服务。我们了解复杂的监管要求，并帮助您建立合规的基金结构。',
                'funds.schedule-consultation': '预约咨询',
                'funds.our-services': '我们的服务',
                'funds.comprehensive-services.title': '全方位基金服务',

                // About Page - Values Section
                'about.values.title': '我们的价值观',
                'about.values.reliability.title': '可靠性',
                'about.values.reliability.description': '依靠我们以细心和精确的方式处理您的业务设立。',
                'about.values.efficiency.title': '效率',
                'about.values.efficiency.description': '我们简化流程以节省您的时间，让您专注于成长。',
                'about.values.support.title': '支持',
                'about.values.support.description': '在每一步都是您的伙伴，提供专业建议和持续支持。',
                'about.values.value.title': '价值',
                'about.values.value.description': '透明、具竞争力的定价，不会在服务上妥协。',

                // Services Page
                'services.hero.title': '我们的服务',
                'services.hero.subtitle': '为您量身定制的全面业务注册和合规服务。',
                'services.basic-services.title': '基本服务',
                'services.value-added-services.title': '增值服务',
                'services.hklpf.title': 'HKLPF 注册',
                'services.hklpf.description': '为投资工具和基金结构提供专业的香港有限合伙基金注册服务。',
                'services.company-secretary.title': '公司秘书服务',
                'services.company-secretary.description': '专业的公司秘书服务，确保您的业务持续符合香港法规。',
                'services.expand.more': '了解更多',
                'services.expand.less': '收起',

                // How It Works Page
                'how-it-works.process.title': '我们简单的4步流程',
                'how-it-works.step.data-collection': '数据收集',
                'how-it-works.step.auto-fill': '自动填写与准备',
                'how-it-works.step.review': '审核与批准',
                'how-it-works.step.submission': '提交与完成',
                'how-it-works.data-collection.description': '我们通过简单的在线问卷收集关于您业务的所有必要信息。',
                'how-it-works.data-collection.what-we-collect': '我们收集的资料：',
                'how-it-works.data-collection.business-name': '• 企业名称偏好',
                'how-it-works.data-collection.business-structure': '• 企业结构类型',
                'how-it-works.data-collection.owner-info': '• 拥有者/成员信息',
                'how-it-works.data-collection.registered-agent': '• 注册代理详情',
                'how-it-works.data-collection.state': '• 注册州份',
                'how-it-works.auto-fill.description': '我们的系统根据您的信息自动准备所有必需的文件和表格。',
                'how-it-works.auto-fill.we-prepare': '我们准备：',
                'how-it-works.auto-fill.articles': '• 公司章程/组织章程',
                'how-it-works.auto-fill.operating-agreements': '• 运营协议',
                'how-it-works.auto-fill.ein': '• EIN 申请',
                'how-it-works.auto-fill.state-forms': '• 州特定表格',
                'how-it-works.auto-fill.resolutions': '• 公司决议',
                'how-it-works.review.description': '在我们进行申报之前，审查所有文件的准确性并批准它们。',
                'how-it-works.review.you-can': '您可以：',
                'how-it-works.review.review-online': '• 在线审查所有文件',
                'how-it-works.review.request-modifications': '• 要求修改',
                'how-it-works.review.ask-questions': '• 向我们的专家提问',
                'how-it-works.review.approve-documents': '• 批准最终文件',
                'how-it-works.review.track-progress': '• 实时跟踪进度',
                'how-it-works.submission.description': '我们向适当的州机构提交所有文件，并交付您的完整套餐。',
                'how-it-works.submission.you-receive': '您将收到：',
                'how-it-works.submission.certified-documents': '• 认证申报文件',
                'how-it-works.submission.ein-confirmation': '• EIN 确认函',
                'how-it-works.submission.corporate-kit': '• 公司套件（如适用）',
                'how-it-works.submission.digital-copies': '• 所有文件的数字副本',
                'how-it-works.submission.support-info': '• 持续支持信息',
                'how-it-works.timeline.title': '典型时间表',
                'how-it-works.timeline.day1': '第1天',
                'how-it-works.timeline.day1.description': '完成问卷和文件准备',
                'how-it-works.timeline.day2-3': '第2-3天',
                'how-it-works.timeline.day2-3.description': '审查、批准并向州政府提交文件',
                'how-it-works.timeline.day5-7': '第5-7天',
                'how-it-works.timeline.day5-7.description': '收到批准的文件和完整的业务套餐',
                'how-it-works.different.title': '我们的与众不同之处',
                'how-it-works.different.lightning-fast.title': '闪电般快速',
                'how-it-works.different.lightning-fast.description': '大多数注册在5-7个工作日内完成，并提供加急选项。',
                'how-it-works.different.expert-review.title': '专家审查',
                'how-it-works.different.expert-review.description': '每份文件都由法律专家审查，以确保准确性和合规性。',
                'how-it-works.different.ongoing-support.title': '持续支持',
                'how-it-works.different.ongoing-support.description': '即使在您的注册完成后，我们也会继续提供支持和指导。',
                'how-it-works.different.guarantee.title': '100% 保证',
                'how-it-works.different.guarantee.description': '我们保证您的注册将被接受，否则我们将退还您的款项。',
                'how-it-works.different.transparent-pricing.title': '透明定价',
                'how-it-works.different.transparent-pricing.description': '没有隐藏费用或意外收费。一切都预先清楚说明。',
                'how-it-works.different.all-in-one.title': '一站式平台',
                'how-it-works.different.all-in-one.description': '您需要的一切都在一个地方 - 无需在不同的服务或提供商之间跳转。',
                'how-it-works.cta.title': '准备开始了吗？',
                'how-it-works.cta.description': '立即开始您的注册之旅，通过我们简单的4步流程。',
                'how-it-works.cta.button': '开始您的注册',

                // Contact Form
                'contact.form.full-name': '全名 *',
                'contact.form.email': '电子邮件地址 *',
                'contact.form.phone': '电话号码',
                'contact.form.business-name': '企业名称',
                'contact.form.service-interest': '服务兴趣',
                'contact.form.message': '消息 *',
                'contact.form.placeholder.full-name': '您的全名',
                'contact.form.placeholder.email': 'your.email@example.com',
                'contact.form.placeholder.phone': '输入电话号码',
                'contact.form.placeholder.business-name': '您的企业名称（如果有的话）',
                'contact.form.placeholder.message': '告诉我们您的业务以及我们如何协助...',
                'contact.form.title': '免费咨询',

                // FAQ Page
                'faq.sections.general': '一般问题',
                'faq.sections.pricing': '定价与服务',

                // FAQ Content - General Questions
                'faq.general.q1.title': '什么是香港公司注册？',
                'faq.general.q1.answer': '香港公司注册是在香港设立私人有限公司的法律程序。它创建一个独立的法律实体，可以签订合约、拥有财产和经营业务。香港公司享有有限责任保护，由于其简单的税制、战略位置和友好的商业环境，使其成为国际业务的理想司法管辖区。',
                'faq.general.q2.title': '谁可以在香港注册公司？',
                'faq.general.q2.answer': '任何年满18岁的人都可以注册香港公司，不论国籍或居住地。对外国所有权没有限制。但是，每间香港公司必须至少有一名自然人董事（非法人实体），且至少50%的董事必须通常居住在香港，或公司必须有香港居民代表。',
                'faq.general.q3.title': '在香港注册的优势是什么？',
                'faq.general.q3.answer': '香港提供众多优势：简单和低税制（16.5%企业税率）、通往中国和亚洲的战略门户、优秀的国际银行设施、基于英国普通法的强大法律制度、最少政府干预、资本自由流动、完善的金融基础设施和国际认可。香港还与许多国家签署了广泛的双重税收协定。',
                'faq.general.q4.title': '最低股本要求是多少？',
                'faq.general.q4.answer': '香港公司没有最低实缴股本要求。标准授权股本为港币10,000元，分为10,000股每股港币1元，但公司通常最初只向每个股东发行一股。您可以根据业务运营或投资目的需要发行额外股份。',

                // FAQ Content - Incorporation Process
                'faq.incorporation.title': '注册流程',
                'faq.incorporation.q1.title': '香港公司注册需要什么文件？',
                'faq.incorporation.q1.answer': '所需文件包括：注册表格（表格NNC1）、公司章程、所有董事和股东的身份证明文件副本、香港注册地址证明，以及董事和公司秘书的同意书。如果董事不是香港居民，可能需要额外文件，包括地址证明和专业推荐信。',
                'faq.incorporation.q2.title': '注册香港公司需要多长时间？',
                'faq.incorporation.q2.answer': '标准注册通常从公司注册处收到所有必需文件之日起需要4-6个工作日。如果在工作日下午3:00前提交文件，可以支付额外费用进行当日注册。如果满足所有要求并以电子方式处理，电子注册（e-Registry）可在1小时内完成。',
                'faq.incorporation.q3.title': '我可以选择任何公司名称吗？',
                'faq.incorporation.q3.answer': '公司名称必须获得公司注册处批准，不能与现有注册公司相同。名称不能暗示政府关联、具有冒犯性或误导公众。我们建议先进行名称查册。名称可以是英文、中文或两者兼有，但必须以「有限公司」或「Ltd」（或中文等同词）结尾。某些词语需要相关当局的批准。',
                'faq.incorporation.q4.title': '什么是注册地址，为什么需要？',
                'faq.incorporation.q4.answer': '每间香港公司必须在香港有一个注册地址，用于接收官方通信。此地址会出现在公共记录上，是政府通知的送达地址。注册地址可以是商业地址、专业服务提供者的地址或虚拟办公室，但不能是邮政信箱。我们在注册套餐中提供注册地址服务。',

                // FAQ Content - Compliance Requirements
                'faq.compliance.title': '合规要求',
                'faq.compliance.q1.title': '香港公司的持续合规要求是什么？',
                'faq.compliance.q1.answer': '香港公司必须在注册周年日后42天内提交周年申报表（表格NAR1）、维护法定账簿和记录、举行股东大会（对于有多个成员的公司）、如营业额超过港币500万元则提交经审计的财务报表，并在香港维护注册地址和公司秘书。公司还必须向公司注册处更新任何公司信息变更。',
                'faq.compliance.q2.title': '我需要在香港有公司秘书吗？',
                'faq.compliance.q2.answer': '是的，每间香港公司必须在注册后6个月内委任公司秘书。公司秘书必须是香港居民个人或获得许可提供公司秘书服务的香港公司。秘书负责确保遵守法定要求、维护公司记录，以及向公司注册处提交所需文件。',
                'faq.compliance.q3.title': '香港公司必须维护什么记录？',
                'faq.compliance.q3.answer': '公司必须在注册地址或公司秘书办公室维护成员、董事、公司秘书和押记的登记册。这些记录必须供成员查阅，在某些情况下供公众查阅。公司还必须保存适当的会计记录至少5年，包括收支记录、资产和负债记录，以及货物买卖记录。',
                'faq.compliance.q4.title': '如果不遵守申报要求会怎样？',
                'faq.compliance.q4.answer': '不合规可能导致罚款、起诉董事和公司秘书，以及可能将公司从登记册中除名。迟交周年申报表会产生罚款，长期不申报可能导致注册官启动注销程序。保持合规很重要，以避免法律后果并保护公司的良好声誉。',

                // FAQ Content - Fees & Timelines
                'faq.fees.title': '费用与时间',
                'faq.fees.q1.title': '香港公司注册的政府费用是多少？',
                'faq.fees.q1.answer': '香港公司注册处收取标准注册费港币1,720元，电子注册费港币1,720元。当日注册需额外支付港币320元。公司还必须在注册后一个月内支付港币340元的商业登记费。这些是强制性政府费用，适用于所有公司，无论使用何种服务提供者。注意：政府费用可能会变更；请在注册时向公司注册处核实当前费率。',
                'faq.fees.q2.title': '维护香港公司的年度成本是多少？',
                'faq.fees.q2.answer': '年度成本包括周年申报表申报费（如按时申报为港币105元）、商业登记费（每年港币250元）、公司秘书费（因提供者而异）、注册地址费（如使用专业服务）和审计费（如需要）。营业额低于港币500万元的公司可能豁免审计要求，大大降低年度成本。',
                'faq.fees.q3.title': '公司注册有任何隐藏费用吗？',
                'faq.fees.q3.answer': '我们的套餐预先包含所有强制性政府费用，没有隐藏收费。只有可选服务（如加急处理、额外认证副本、海牙认证服务或银行开户协助）才可能产生额外费用。我们提供透明定价，在您进行之前清楚说明每个套餐包含的内容。',
                'faq.fees.q4.title': '如果注册不成功，我可以退款吗？',
                'faq.fees.q4.answer': '当提供所有必需文件正确时，我们保证成功注册。在因我们的错误导致注册被拒绝的罕见情况下，我们提供全额退款。但是，政府费用一旦提交给公司注册处就不可退还。我们进行彻底的提交前审查，以最大限度地降低被拒绝的风险并确保顺利处理。',

                // FAQ Content - Post-Incorporation
                'faq.post.title': '注册后义务',
                'faq.post.q1.title': '注册后我应该立即做什么？',
                'faq.post.q1.answer': '注册后，您应该：获得商业登记证、开设企业银行账户、委任公司秘书（6个月内）、建立会计系统、获得任何所需的营业牌照、如适用则向税务局登记税务，并确保遵守持续申报要求。我们可以协助这些注册后步骤。',
                'faq.post.q2.title': '我需要何时提交第一份周年申报表？',
                'faq.post.q2.answer': '您的第一份周年申报表（表格NAR1）必须在公司注册第一个周年日后42天内提交。例如，如果在2024年1月15日注册，第一份周年申报表必须在2025年2月26日前提交。迟交会产生罚款，因此跟踪这些截止日期或使用专业服务管理合规很重要。',
                'faq.post.q3.title': '我需要准备经审计的财务报表吗？',
                'faq.post.q3.answer': '年营业额达港币500万元或以上的公司必须准备经审计的财务报表并与周年申报表一起提交。低于此门槛的公司可能符合审计豁免条件，但仍必须维护适当的会计记录。在某些条件下，休眠公司也可能符合审计要求豁免条件。',
                'faq.post.q4.title': '如何向注册处更新公司信息？',
                'faq.post.q4.answer': '公司信息的变更必须在规定时间内向公司注册处报告。这包括董事、公司秘书、注册地址或股本的变更。不同类型的变更需要不同的表格，某些变更可能产生费用。我们可以协助提交必要的表格，以保持您的公司记录最新。',

                // FAQ Content - Other Questions
                'faq.other.title': '其他常见问题',
                'faq.other.q1.title': '我可以为香港公司开设银行账户吗？',
                'faq.other.q1.answer': '是的，香港公司可以在本地和国际银行开设企业银行账户。要求通常包括公司注册文件、商业登记证、注册地址证明、董事身份证明文件、商业计划和业务活动证明。我们提供银行开户协助以促进此过程。',
                'faq.other.q2.title': '如果我不在香港运营，我需要支付香港税吗？',
                'faq.other.q2.answer': '香港实行地域税制，意味着只有在香港产生的利润才需要缴纳香港利得税。如果您的公司完全在香港境外运营且没有香港来源收入，您可以申请离岸免税。然而，适当的文件和专业建议对于支持此类申请和确保合规是必要的。',
                'faq.other.q3.title': '如果我不再需要，我可以关闭香港公司吗？',
                'faq.other.q3.answer': '是的，如果满足某些条件，您可以通过自愿注销来注销香港公司：尚未开始业务或已停止运营至少3个月、没有未偿债务、没有待决法律程序。该过程涉及提交表格NDR1并支付规定费用。或者，公司可以通过更正式的清算程序进行清盘。',
                'faq.other.q4.title': '注册后您提供什么支持？',
                'faq.other.q4.answer': '我们提供全面的注册后支持，包括公司秘书服务、注册地址提供、周年申报表申报、会计和审计服务、税务申报协助、银行开户支持和持续合规指导。我们经验丰富的团队确保您的香港公司持续符合所有法定要求，让您专注于发展业务。',

                // FAQ Disclaimer
                'faq.disclaimer.title': '重要通知',
                'faq.disclaimer.content': '此处提供的信息仅供参考，基于当前的香港法律法规。业务要求和法规可能会变更，个别情况可能有所不同。请直接联系我们，获得针对您具体情况和最新要求的量身定制建议。',

                // Insights Section
                'insights.hero.title': '洞察分析',
                'insights.hero.subtitle': '探索我们关于企业服务和基金运营的最新见解和更新。',
                'insights.filter.all': '所有文章',
                'insights.filter.company-secretary': '公司秘书',
                'insights.filter.fund': '基金',

                // Page Titles
                'page.title.about': '关于我们 - Fusiox',
                'page.title.contact': '联系我们 - Fusiox',
                'page.title.faq': '常见问题 - Fusiox',
                'page.title.funds': '基金服务 - Fusiox',
                'page.title.how-it-works': '服务流程 - Fusiox',
                'page.title.insights': '洞察分析 - Fusiox',
                'page.title.services': '服务 - Fusiox',
                'page.title.index': 'Fusiox - 专业注册服务',

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

        // Update document title
        const titleElement = document.querySelector('title[data-i18n]');
        if (titleElement) {
            const key = titleElement.getAttribute('data-i18n');
            titleElement.textContent = this.translate(key);
        }
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