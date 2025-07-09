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
                'faq.hero.subtitle': 'Find answers to the most common questions about business incorporation and our services.',
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

                // Page Titles
                'page.title.about': 'About Us - Fusiox',
                'page.title.contact': 'Contact Us - Fusiox', 
                'page.title.faq': 'FAQ - Fusiox',
                'page.title.funds': 'For Investment Funds - Fusiox',
                'page.title.how-it-works': 'How It Works - Fusiox',
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
                'faq.hero.subtitle': '查找關於業務註冊和我們服務的最常見問題答案。',
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

                // Page Titles
                'page.title.about': '關於我們 - Fusiox',
                'page.title.contact': '聯絡我們 - Fusiox',
                'page.title.faq': '常見問題 - Fusiox',
                'page.title.funds': '基金服務 - Fusiox',
                'page.title.how-it-works': '服務流程 - Fusiox',
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
                'faq.hero.subtitle': '查找关于业务注册和我们服务的最常见问题答案。',
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

                // Page Titles
                'page.title.about': '关于我们 - Fusiox',
                'page.title.contact': '联系我们 - Fusiox',
                'page.title.faq': '常见问题 - Fusiox',
                'page.title.funds': '基金服务 - Fusiox',
                'page.title.how-it-works': '服务流程 - Fusiox',
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