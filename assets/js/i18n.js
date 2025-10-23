// Internationalization (i18n) system for Fusiox Corporate Website
class I18n {
    constructor() {
        console.log('I18n constructor called');
        this.currentLanguage = this.getStoredLanguage() || 'en';
        console.log('Current language set to:', this.currentLanguage);
        this.translations = {};
        this.loadTranslations();
        console.log('I18n constructor completed - translations loaded');
        console.log('Sample translation test:', this.translate('services.hero.title'));
        // Don't call updatePageContent here - let the fallback initialization handle it
    }

    getStoredLanguage() {
        return localStorage.getItem('fusiox-language');
    }

    setLanguage(language) {
        this.currentLanguage = language;
        localStorage.setItem('fusiox-language', language);
        this.updatePageContent();
        this.updateHTMLLang();
        
        // Dispatch custom event for Alpine.js components
        window.dispatchEvent(new CustomEvent('fusiox-language-changed', {
            detail: { language: language }
        }));
    }

    updateHTMLLang() {
        document.documentElement.lang = this.currentLanguage;
    }

    loadTranslations() {
        console.log('Loading translations...');
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
                'hero.subtitle': 'Trust or Company Service Provider License No. TC010402. As per 2020 Hong Kong Companies Registry regulations: Implementation of licensing system for company incorporation in Hong Kong.',
                'hero.start-incorporation': 'Start Your Incorporation',
                'hero.learn-how': 'Learn How',

                // Services Section
                'services.title': 'Our Core Services',
                'services.company-incorporation.title': 'Hong Kong Company Incorporation',
                'services.company-incorporation.description': 'Fast-track your business registration with our streamlined incorporation process.',
                'services.legal-compliance.title': 'Legal Compliance',
                'services.legal-compliance.description': 'Stay compliant with all regulations and legal requirements for your business type.',
                'services.ongoing-support.title': 'Hong Kong Bank Account Opening',
                'services.ongoing-support.description': 'Assist with appointments for Hong Kong mainstream banks such as CITIC Bank International, China Minsheng Banking Corp (Hong Kong), as well as virtual banks like Airwallex and ZA Bank. Remote document pre-screening available to increase approval rates.',
                'services.learn-more': 'Learn More',

                // Why Choose Section
                'why-choose.title': 'Why Choose Fusiox?',
                'why-choose.lightning-fast.title': 'Lightning Fast',
                'why-choose.lightning-fast.description': 'Get your company incorporated in record time with our streamlined process.',
                'why-choose.expert-guidance.title': 'Expert Guidance',
                'why-choose.expert-guidance.description': 'Our experienced team ensures every detail is handled correctly and professionally.',
                'why-choose.affordable-pricing.title': 'Affordable Pricing',
                'why-choose.affordable-pricing.description': 'Competitive rates with transparent pricing and no hidden fees.',

                // HK Company Advantages Section
                'hk-advantages.title': 'Advantages of Registering a Hong Kong Company',
                'hk-advantages.subtitle': 'Why choose Hong Kong as your business base?',
                'hk-advantages.payment.title': 'Seamless Cross-Border Transactions',
                'hk-advantages.payment.description': 'Open a Hong Kong bank account and enjoy free capital flow without foreign exchange control. Payments in USD, EUR, and other major currencies are settled in real time, eliminating cumbersome approval and reporting procedures.',
                'hk-advantages.tax.title': 'Favorable Tax Regime, Lower Operating Costs',
                'hk-advantages.tax.description': 'Hong Kong offers one of the world\'s most competitive tax systems, with profits tax as low as 8.25%. Offshore profits not derived from Hong Kong may qualify for tax exemption, enabling efficient "zero-tax" operations with only one annual filing required.',
                'hk-advantages.maintenance.title': 'Low Maintenance, Simple Compliance',
                'hk-advantages.maintenance.description': 'Annual maintenance costs are minimal. There is no requirement for a physical office or local staff. Companies only need to file annual returns and tax documents once a year, keeping compliance straightforward and cost-effective.',
                'hk-advantages.brand.title': 'International Credibility, Stronger Market Access',
                'hk-advantages.brand.description': 'A Hong Kong company enhances brand reputation and credibility. It facilitates trademark registration, trade fairs, associations, and cooperation both in Mainland China and internationally, providing a trusted gateway to global markets.',
                'hk-advantages.investment.title': 'Access to Mainland China\'s Policy Incentives',
                'hk-advantages.investment.description': 'Hong Kong companies investing in Mainland China can enjoy preferential tax treatments and local government funding support. Joint ventures or wholly foreign-owned enterprises benefit from policy incentives that encourage growth and expansion.',
                'hk-advantages.financing.title': 'Global Recognition, Enhanced Financing Opportunities',
                'hk-advantages.financing.description': 'Incorporating in Hong Kong boosts international reputation and investor confidence. Whether raising capital, attracting foreign investment, or pursuing overseas listing, a Hong Kong company provides a solid platform for global business success.',

                // HK Company Requirements Section
                'hk-requirements.title': 'Required Documents for Registering a Hong Kong Company',
                'hk-requirements.subtitle': 'Essential requirements and materials for Hong Kong company incorporation:',
                'hk-requirements.shareholders.title': '1. Shareholder Requirement',
                'hk-requirements.shareholders.description': 'At least one shareholder is required, who may be a natural person or a corporate entity.',
                'hk-requirements.age.title': '2. Shareholder Eligibility',
                'hk-requirements.age.description': 'All shareholders must be at least 18 years old, with no restrictions on nationality, domicile, or residency.',
                'hk-requirements.id.title': '3. Shareholder Identification',
                'hk-requirements.id.description': 'Individual shareholders: Copy of valid ID card or passport. Corporate shareholders: Copy of the business license and the legal representative\'s ID card/passport.',
                'hk-requirements.corporate.title': '4. Registered Capital',
                'hk-requirements.corporate.description': 'The minimum registered capital is HKD 100, with no paid-up or verification requirement.',
                'hk-requirements.capital.title': '5. Registered Address',
                'hk-requirements.capital.description': 'A company must have a statutory registered address in Hong Kong (a licensed TCSP can provide business address services).',
                'hk-requirements.address.title': '6. Company Secretary',
                'hk-requirements.address.description': 'A company must appoint a statutory company secretary who is either a Hong Kong resident or a Hong Kong-registered company (a licensed TCSP can act as company secretary).',
                'hk-requirements.secretary.title': '7. Compliance Requirement',
                'hk-requirements.secretary.description': 'The company\'s incorporation and ongoing operations must comply with the laws and regulations of Hong Kong.',
                'hk-requirements.compliance.title': '',
                'hk-requirements.compliance.description': '',

                // CTA Section
                'cta.title': 'Ready to Start Your Business?',
                'cta.subtitle': 'Join thousands of successful entrepreneurs who chose Fusiox for their incorporation needs.',
                'cta.description': 'Our Hong Kong corporate services experts are ready to assist with your incorporation and compliance needs.',
                'cta.consultation-button': 'Get Free Consultation',
                'cta.how-it-works-button': 'See How It Works',
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
                'footer.company-name': 'Fusiox Corporate Services Limited',
                'footer.company-description': 'Professional corporate services for modern businesses.',
                'footer.fund-consultation': 'Fund Consultation',
                'footer.corporate-governance': 'Company Incorporation',
                'footer.insights': 'Insights',
                'footer.faq': 'FAQ',
                'footer.how-it-works': 'How It Works',
                'footer.address': 'Suite 3, 39/F, The Center, 99 Queen\'s Road Central, Central, Hong Kong',
                'footer.contact-us': 'Contact Us',

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
                'contact.hero.subtitle': 'Ready to start your business? Get in touch with our incorporation experts today.',

                // How It Works Page
                'how-it-works.hero.title': 'How It Works',
                'how-it-works.hero.subtitle': 'Simple, straightforward process to get your business incorporated quickly and efficiently.',

                // FAQ Page
                'faq.hero.title': 'FAQ',
                'faq.hero.subtitle': 'Find answers to the most common questions about Hong Kong company incorporation and our corporate services.',
                'faq.still-questions': 'Still Have Questions?',
                'faq.experts-help': 'Our incorporation experts are here to help you every step of the way.',
                'faq.contact-us': 'Contact Us',
                
                // FAQ Section
                'faq.section.title': 'Frequently Asked Questions – Company Incorporation',
                'faq.section.subtitle': 'Get answers to the most common questions about incorporating your company in Hong Kong',
                'faq.categories.all': 'All',
                'faq.categories.general': 'General',
                'faq.categories.costs': 'Costs & Fees',
                'faq.categories.requirements': 'Requirements',
                'faq.categories.compliance': 'Compliance',
                'faq.categories.business': 'Business',
                'faq.no-results': 'No FAQs found for this category.',
                'faq.cta.title': 'Still have questions?',
                'faq.cta.description': 'Our experts are here to help. Get in touch for personalized guidance on your Hong Kong company incorporation.',
                'faq.cta.button': 'Contact Our Experts',

                // Funds Page
                'funds.hero.title': 'For Investment Funds',
                'funds.hero.subtitle': 'Specialized incorporation and compliance services for private equity funds, venture capital funds, hedge funds, and other investment vehicles. We understand the complex regulatory requirements and help you establish compliant fund structures.',
                'funds.schedule-consultation': 'Schedule Consultation',
                'funds.our-services': 'Our Services',
                'funds.cta.title': 'Ready to Launch Your Fund?',
                'funds.cta.subtitle': 'Let our fund formation experts help you establish a compliant and efficient investment vehicle.',
                'funds.comprehensive-services.title': 'Comprehensive Fund Services',
                
                // Fund Services Section
                'funds.services.title': 'Our Fund Services',
                'funds.services.description': 'We provide global, customized fund registration, structure design, and tax planning services for investors, helping clients stand out in the complex global investment environment.',
                
                // LPF Overview Section
                'funds.lpf.title': 'Hong Kong Limited Partnership Fund (LPF)',
                'funds.lpf.description': 'The Limited Partnership Fund (LPF) is one of the most flexible and widely adopted fund structures for private equity and alternative investment strategies in Hong Kong. It is particularly favored by global investors looking for a tax-efficient and regulated fund regime.',
                'funds.lpf.fusiox-services': 'Fusiox offers full-scope registration and setup services for LPFs, handling every step from legal structuring to operational support.',
                'funds.lpf.key-services': 'Key Services:',
                'funds.lpf.service-1-title': 'Fund Registration & Setup:',
                'funds.lpf.service-1-desc': 'End-to-end support for LPF establishment and registration with Hong Kong authorities.',
                'funds.lpf.service-2-title': 'Legal & Tax Advisory:',
                'funds.lpf.service-2-desc': 'Professional advice on LPF legal structures, tax policies, and compliance requirements.',
                'funds.lpf.service-3-title': 'Operational Support:',
                'funds.lpf.service-3-desc': 'Ongoing services for fund management, accounting, investor relations, and audit.',
                'funds.lpf.badge': 'Popular with General Partners',
                'funds.lpf.visual.title': 'Structured Investment Vehicle',
                'funds.lpf.visual.subtitle': 'Professional fund architecture designed for institutional and qualified investors',
                'funds.lpf.benefits.tax-efficient': 'Tax Efficient',
                'funds.lpf.benefits.flexible': 'Flexible',
                'funds.lpf.benefits.regulated': 'Regulated',
                
                // Fund Structure
                'funds.structure.roles.gp': 'General Partner (GP)',
                'funds.structure.roles.ia': 'Investment Advisor (IA)',
                'funds.structure.roles.licensed-entity': 'Type 4/9 Licensed Entity',
                'funds.structure.roles.im': 'Investment Manager (IM)',
                'funds.structure.lpf.title': 'Limited Partnership Fund',
                'funds.structure.lpf.subtitle': '(HKLPF)',
                'funds.structure.investment-target': 'Investment Target',
                'funds.structure.roles.investors': 'Investors',
                'funds.structure.roles.lp': 'Limited Partners (LP)',
                'funds.structure.roles.custodian': 'Custodian',
                'funds.structure.roles.optional': '(Optional)',
                'funds.structure.caption': 'Simplified structure showing key participants and their relationships in a typical Hong Kong LPF.',
                
                // Hong Kong Limited Partnership Fund
                'funds.hklpf.title': 'Hong Kong Limited Partnership Fund Agency Registration Service',
                'funds.hklpf.description': 'Hong Kong Limited Partnership Fund (LPF) has become a popular choice for global investors to establish funds in Hong Kong in recent years. We provide comprehensive agency registration services, including:',
                'funds.hklpf.registration.title': 'Fund Registration & Establishment:',
                'funds.hklpf.registration.description': 'Assist clients in completing the registration procedures for limited partnership funds in Hong Kong, ensuring compliance with Hong Kong Monetary Authority regulations.',
                'funds.hklpf.legal.title': 'Legal & Tax Consultation:',
                'funds.hklpf.legal.description': 'Provide professional advice on the legal framework, tax policies, and compliance requirements for Hong Kong limited partnership funds.',
                'funds.hklpf.operational.title': 'Operational Support:',
                'funds.hklpf.operational.description': 'Provide ongoing support services required for fund operations, such as fund management, partner relationship management, accounting and audit services.',
                'funds.hklpf.conclusion': 'We understand that each investor\'s needs are different, so we can tailor registration and operational solutions that suit you, ensuring your fund operates smoothly and complies with Hong Kong and global relevant laws and regulations.',
                
                // Global Fund Consulting
                'funds.global.title': 'Global Fund Consulting Services',
                'funds.global.description': 'In the global market, choosing the right fund structure and investment strategy is crucial for investor success. We provide high-end fund structure consulting services for global clients, mainly including:',
                'funds.global.structure.title': 'Fund Structure Design:',
                'funds.global.structure.description': 'Based on your and your investors\' needs, we provide tailored fund structure design services, covering a wide range of vehicles including Hong Kong Limited Partnership Funds (HKLPF), Hong Kong Open-ended Fund Companies (HKOFC), Cayman Segregated Portfolio Company Funds (SPC Funds), and British Virgin Islands Funds (BVI Funds).',
                'funds.global.hklpf': 'Hong Kong Limited Partnership Fund (HKLPF)',
                'funds.global.hkofc': 'Hong Kong Open-ended Fund Company (HKOFC)',
                'funds.global.spc': 'Cayman Special Purpose Company Fund (SPC Fund)',
                'funds.global.bvi': 'British Virgin Islands Fund (BVI Fund)',
                'funds.global.compliance.title': 'Compliance & Regulatory Consultation:',
                'funds.global.compliance.description': 'Our expert team can provide consultation on regulatory frameworks in different markets, helping you conduct business under multi-country compliance frameworks.',
                'funds.global.conclusion': 'Our goal is to help clients gain advantages in the global investment environment through comprehensive consulting services and utilizing fund structures with different characteristics.',
                
                // Tax Planning Services
                'funds.tax.title': 'Tax Planning Services',
                'funds.tax.description': 'We understand the importance of tax planning for fund investors and their investment returns. Our tax planning services focus on developing optimized tax structures for clients, ensuring compliance while maximizing tax benefits. Specific service content includes:',
                'funds.tax.global.title': 'Global Tax Structure Design:',
                'funds.tax.global.description': 'Customize global tax structures for clients, ensuring minimized tax burden in different countries and regions while complying with local tax regulations.',
                'funds.tax.compliance.title': 'Tax Compliance & Risk Management:',
                'funds.tax.compliance.description': 'We help clients identify and manage potential tax risks, ensuring investment structures are legal and compliant within the legal framework.',
                'funds.tax.offshore.title': 'Cayman, BVI and Other Offshore Fund Tax Optimization:',
                'funds.tax.offshore.description': 'Focus on providing tax planning for clients\' offshore funds in Cayman Islands, British Virgin Islands, etc., helping clients achieve reasonable tax avoidance globally while avoiding potential tax risks.',
                'funds.tax.crossborder.title': 'Cross-border Tax Planning:',
                'funds.tax.crossborder.description': 'Provide tax optimization advice for cross-border investments, including tax compliance and structural design for international fund investments, helping clients achieve optimal global tax planning solutions.',
                'funds.tax.conclusion': 'Our tax experts work with leading global tax advisors to ensure our clients\' fund structures comply with international standards while achieving tax optimization within a legal framework.',

                // HKLPF Structure Section
                'funds.structure.title': 'Hong Kong Limited Partnership Fund Structure Diagram',
                'funds.structure.description': 'Typical structure relationship diagram when Fusiox assists clients in completing Hong Kong Limited Partnership Fund registration.',

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
                'services.most-popular': 'Most Popular',
                'services.annual-service': 'Annual service',
                'services.includes': 'Includes:',
                'services.value-added-title': 'Value-added Services',
                // Pricing selector
                'pricing.selector.incorporation': 'Company Incorporation',
                'pricing.selector.secretary': 'Company Secretary',
                'pricing.selector.accounting': 'Accounting & Payroll',
                'pricing.selector.audit': 'Audit & Tax',
                // Pricing tiers & badges
                'pricing.tier.entry': 'Entry Plan',
                'pricing.tier.basic': 'Basic Plan',
                'pricing.tier.compliance': 'Compliance Plan',
                'pricing.badge.limited': 'Limited Offer',
                'pricing.badge.popular': 'Most Popular',
                // Plan descriptions
                'pricing.incorporation.entry.desc': 'Starter company setup with essential compliance support.',
                'pricing.incorporation.basic.desc': 'Complete setup with privacy and compliance protection.',
                'pricing.incorporation.compliance.desc': 'End-to-end compliance from setup to annual filing.',
                'pricing.secretary.entry.desc': 'Core company secretary functions and statutory filings.',
                'pricing.secretary.basic.desc': 'Annual document management and director support.',
                'pricing.secretary.compliance.desc': 'Board/Shareholder meetings and ongoing compliance.',
                'pricing.accounting.entry.desc': 'Annual compliance with basic reporting.',
                'pricing.accounting.basic.desc': 'Monthly bookkeeping with annual statements.',
                'pricing.accounting.compliance.desc': 'Management reports, tax planning and audit coordination.',
                'pricing.audit.entry.desc': 'Basic tax and statutory filing support.',
                'pricing.audit.basic.desc': 'Audit coordination and tax support.',
                'pricing.audit.compliance.desc': 'Comprehensive audit alignment and tax representation.',
                // Company Incorporation specific features
                'pricing.incorporation.gov-filing-fee': '✓ One-time government filing and company registration service fee',
                'pricing.incorporation.certificate-ci': '✓ Certificate of Incorporation (CI)',
                'pricing.incorporation.articles': '✓ Articles of Association',
                'pricing.incorporation.brc-1year': '✓ 1-year Business Registration Certificate (BRC)',
                'pricing.incorporation.app-access': '✓ Free access to Sleek application',
                'pricing.incorporation.support-team': '✓ Dedicated support team',
                // New pricing structure
                'pricing.from': 'From',
                'pricing.entry.includes': 'All essentials for your company:',
                'pricing.entry.feature1': '✓ Certificate of Incorporation (CI)',
                'pricing.entry.feature2': '✓ Business Registration Certificate (BRC)',
                'pricing.entry.feature3': '✓ Articles of Association',
                'pricing.entry.feature4': '✓ Dedicated Company Secretary (CS)',
                'pricing.entry.feature5': '✓ Maintain statutory registers of shareholders and directors',
                'pricing.entry.feature6': '✓ File Annual Return (NAR1)',
                'pricing.entry.feature7': '✓ Facilitate Annual General Meeting (AGM)',
                'pricing.entry.feature8': '✓ Designated Representative (DR) service',
                'pricing.basic.includes': 'Includes all Entry plan features, plus:',
                'pricing.basic.feature1': '✓ Registered office address',
                'pricing.basic.feature2': '✓ Receive all mail and packages',
                'pricing.basic.feature3': '✓ Unlimited mail scanning and forwarding service',
                // Comparison table
                'pricing.compare.header': 'Company Incorporation',
                'pricing.compare.secretary-section': 'Company Secretary',
                'pricing.compare.secretary.maintain': 'Maintain company registration package to meet legal requirements and capital registration',
                'pricing.compare.secretary.legal-records': 'Prepare company legal records',
                'pricing.compare.secretary.nar1': 'File Annual Return NAR1 (does not include government fees)',
                'pricing.compare.secretary.agm': 'Draft Annual General Meeting and major meeting documents (AGM)',
                'pricing.compare.secretary.manage': 'Manage company related matters',
                'pricing.compare.office-section': 'Registered Office and Mail Forwarding',
                'pricing.compare.office.address': 'Registered office address',
                'pricing.compare.office.mail-receive': 'Receive all mail and packages',
                'pricing.compare.office.mail-forward': 'Unlimited mail scanning and forwarding service',
                'pricing.cta.entry': 'Select Entry Plan',
                'pricing.cta.basic': 'Select Basic Plan',
                // Features
                'pricing.features.name-check': '✓ Company name check & document preparation',
                'pricing.features.basic-filing': '✓ Basic filing submission',
                'pricing.features.digital-delivery': '✓ Digital document delivery',
                'pricing.features.registered-address': '✓ Registered address & mail forwarding',
                'pricing.features.seals': '✓ Company seals (if applicable)',
                'pricing.features.priority-support': '✓ Priority client support',
                'pricing.features.annual-return-tax-rep': '✓ Annual return (NAR1) / Tax representative',
                'pricing.features.cloud-archive': '✓ Scanning and cloud archiving',
                'pricing.features.dedicated-advisor': '✓ Dedicated advisor support',
                // Service-specific features
                'pricing.features.incorporation-kit': '✓ Full incorporation kit',
                'pricing.features.secretary-appointment': '✓ Company secretary appointment',
                'pricing.features.annual-return-filing': '✓ Annual return filing (NAR1)',
                'pricing.features.statutory-registers': '✓ Statutory register maintenance',
                'pricing.features.board-meeting-support': '✓ Board meeting support',
                'pricing.features.agm-coordination': '✓ AGM coordination',
                'pricing.features.annual-accounts': '✓ Annual accounts preparation',
                'pricing.features.basic-bookkeeping': '✓ Basic bookkeeping',
                'pricing.features.monthly-bookkeeping': '✓ Monthly bookkeeping',
                'pricing.features.financial-statements': '✓ Financial statements',
                'pricing.features.payroll-processing': '✓ Payroll processing',
                'pricing.features.management-reports': '✓ Management reports',
                'pricing.features.tax-planning': '✓ Tax planning advisory',
                'pricing.features.tax-return-filing': '✓ Tax return filing',
                'pricing.features.tax-computation': '✓ Tax computation',
                'pricing.features.audit-coordination': '✓ Audit coordination',
                'pricing.features.tax-advice': '✓ Tax advisory',
                'pricing.features.audit-fieldwork': '✓ Full audit fieldwork support',
                'pricing.features.tax-representative': '✓ Tax representative services',
                'pricing.features.ird-correspondence': '✓ IRD correspondence handling',
                // Includes labels
                'pricing.includes.entryplus': 'Includes everything in Entry, plus:',
                'pricing.includes.basicplus': 'Includes everything in Basic, plus:',
                // CTAs and notes
                'pricing.cta.whatsapp': 'Contact us on WhatsApp',
                'pricing.disclaimer.gov': '+ Government fees apply',
                'pricing.note.contact': 'All prices exclude government fees. Need a tailored solution?',
                'pricing.note.link': 'Contact us',
                'pricing.compare': 'Compare plans',
                'pricing.hide-compare': 'Hide comparison',
                'pricing.shareholders.label': 'Select number of shareholders',
                'pricing.shareholders.suffix': 'shareholder(s)',
                'common.close': 'Close',
                'services.company-secretary.title': 'Company Secretary Service',
                'services.company-secretary.description-main': 'Professional company secretary services to ensure your business remains compliant with Hong Kong regulations.',
                'services.company-secretary.price': 'USD 1,180',
                'services.features.secretary': 'Dedicated company secretary',
                'services.features.filing': 'Annual return filing',
                'services.features.coordination': 'Board meeting coordination',
                'services.features.monitoring': 'Statutory compliance monitoring',
                'services.features.maintenance': 'Corporate record maintenance',
                'services.features.support': 'Regulatory filing support',
                'services.registered-address.title': 'Registered Address and Mail Receiving',
                'services.registered-address.description-short': 'Professional registered address service with mail handling and forwarding capabilities.',
                'services.registered-address.price': 'USD 500',
                'services.audit-tax.title': 'Audit and Tax Filing',
                'services.audit-tax.description-short': 'Comprehensive tax filing support tailored to your needs.',
                'services.audit-tax.price': 'Case-by-case basis',
                'services.bank-account.title': 'Bank Account Opening',
                'services.bank-account.description-short': 'Assistance with corporate bank account setup and relationships.',
                'services.bank-account.price': 'Starting from USD 800',
                'services.ctc.title': 'CTC Certification',
                'services.ctc.description-short': 'Certified True Copy for official document authentication.',
                'services.ctc.price': 'Case-by-case basis',
                'services.fund-note.text': 'Interested in fund-related incorporation services?',
                'services.fund-note.link': 'Please contact us directly for details.',

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
                'how-it-works.auto-fill.state-forms': '• Specific forms',
                'how-it-works.auto-fill.resolutions': '• Corporate resolutions',
                'how-it-works.review.description': 'Review all documents for accuracy and approve them before we proceed with filing.',
                'how-it-works.review.you-can': 'You can:',
                'how-it-works.review.review-online': '• Review all documents online',
                'how-it-works.review.request-modifications': '• Request modifications',
                'how-it-works.review.ask-questions': '• Ask questions to our experts',
                'how-it-works.review.approve-documents': '• Approve final documents',
                'how-it-works.review.track-progress': '• Track progress in real-time',
                'how-it-works.submission.description': 'We file all documents with the appropriate state agencies and deliver your completed package.',
                'how-it-works.submission.you-receive': 'You will receive:',
                'how-it-works.submission.certified-documents': '• Business Registration Certificate',
                'how-it-works.submission.certificate-incorporation': '• Certificate of Incorporation',
                'how-it-works.submission.articles-association': '• Articles of Association',
                'how-it-works.submission.corporate-kit': '• Company seals (if applicable)',
                'how-it-works.submission.digital-copies': '• Digital copies of all documents',
                'how-it-works.submission.support-info': '• Ongoing information support',
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
                'how-it-works.different.expert-review.description': 'Every document is reviewed by experts to ensure accuracy and compliance.',
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

                // Contact Page
                'contact.office.title': 'Office Address',
                'contact.office.address.line1': 'Suite 3, 39/F, The Center',
                'contact.office.address.line2': '99 Queen\'s Road Central, Central',
                'contact.office.address.line3': 'Hong Kong',
                'contact.office.viewMap': 'View on Map',

                'contact.methods.title': 'Get In Touch',
                'contact.methods.hours.label': 'Business Hours',
                'contact.methods.hours.time': 'Mon – Fri: 9:00 AM – 6:00 PM HKT',

                'contact.form.title': 'Send Us a Message',
                'contact.form.subtitle': 'Ready to start your business journey? Fill out the form below and our incorporation experts will get back to you within 24 hours.',
                'contact.form.name.label': 'Name *',
                'contact.form.name.placeholder': 'Your full name',
                'contact.form.email.label': 'Email *',
                'contact.form.email.placeholder': 'your.email@example.com',
                'contact.form.company.label': 'Company Name',
                'contact.form.company.placeholder': 'Your company name (optional)',
                'contact.form.subject.label': 'Subject *',
                'contact.form.subject.placeholder': 'Select a subject...',
                'contact.form.subject.options.general': 'General Inquiry',
                'contact.form.subject.options.funds': 'Fund Services',
                'contact.form.subject.options.secretary': 'Company Secretary',
                'contact.form.subject.options.others': 'Others',
                'contact.form.message.label': 'Message *',
                'contact.form.message.placeholder': 'Tell us about your business needs and how we can help you...',
                'contact.form.submit': 'Send Message',
                'contact.form.sending': 'Sending...',
                'contact.form.success': 'Thank you for your message! We\'ll get back to you within 24 hours.',
                'contact.form.error': 'There was an error sending your message. Please try again or contact us directly.',

                // Page Titles
                'page.title.contact': 'Contact Us - Fusiox',

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
                'insights.section.title': 'Latest Insights',
                'insights.section.subtitle': 'Stay informed with our latest insights and expert analysis on corporate governance and business operations.',
                'insights.filter.all': 'All Insights',
                'insights.filter.company-secretary': 'Company Secretary',
                'insights.filter.fund': 'Fund Services',
                'insights.category.company-secretary': 'Company Secretary',
                'insights.category.fund': 'Fund',
                'insights.read-more': 'Read More →',
                'insights.no-posts': 'No posts available',
                'insights.loading': 'Loading posts...',
                'insights.updated': 'Updated',
                'insights.untitled': 'Untitled',

                // Insight Detail Page
                'insight-detail.published-on': 'Published on',
                'insight-detail.updated-on': 'Updated on',
                'insight-detail.no-insight-selected': 'No Insight Selected',
                'insight-detail.post-not-found': 'Post Not Found',
                'insight-detail.no-insight-desc': 'Please select an insight from the insights page to view its content.',
                'insight-detail.post-not-found-desc': "The insight you're looking for doesn't exist or has been moved.",
                'insight-detail.view-all-btn': 'View All Insights',

                // Page Titles
                'page.title.about': 'About Us - Fusiox',
                'page.title.contact': 'Contact Us - Fusiox', 
                'page.title.faq': 'FAQ - Fusiox',
                'page.title.funds': 'For Investment Funds - Fusiox',
                'page.title.how-it-works': 'How It Works - Fusiox',
                'page.title.insights': 'Insights - Fusiox',
                'page.title.services': 'Services - Fusiox',
                'page.title.index': 'Fusiox - Professional Incorporation Services',

                // Breadcrumb
                'breadcrumb.home': 'Home',
                'breadcrumb.insights': 'Insights',

                // Insight Detail Page - Generic translations
                'insight-detail.back-btn': '← Back to Insights',
                'insight-detail.contact-btn': 'Get Expert Advice',
                'insight-detail.services-btn': 'Our Services',
                'insight-detail.related-posts': 'Related Articles',
                'insight-detail.loading': 'Loading article...',
                'insight-detail.not-found': 'Article not found',
                'insight-detail.related-title': 'Related Articles',
                'insight-detail.related1.title': 'Annual Filing Requirements Update',
                'insight-detail.related1.desc': 'Stay updated with the latest changes in annual filing requirements.',
                'insight-detail.related2.title': 'Digital Transformation in Corporate Services',
                'insight-detail.related2.desc': 'How technology is revolutionizing corporate services and operations.',

                // Common
                'common.language': 'Language',

                // Diagram tooltips
                'diagram.gp.title': 'GP (General Partner)',
                'diagram.gp.desc': 'The general partner is responsible for fund management and operations.',
                'diagram.im.title': 'Hong Kong Type 4/9 IM',
                'diagram.im.desc': 'Licensed investment manager providing investment advice and management services.',
                'diagram.lp.title': 'LP (Limited Partner)',
                'diagram.lp.desc': 'Limited partners provide capital but do not participate in management.',
                'diagram.hklpf.title': 'HKLPF',
                'diagram.hklpf.desc': 'The limited partnership fund entity registered in Hong Kong.',
                'diagram.target1.title': 'Investment Target 1',
                'diagram.target1.desc': 'Specific asset or project invested by the fund.',
                'diagram.target2.title': 'Investment Target 2',
                'diagram.target2.desc': 'Specific asset or project invested by the fund.',
                // Diagram detail panels
                'diagram.gp.detail.title': 'General Partner (GP)',
                'diagram.gp.detail.1': '• Responsible for daily management and operational decisions of the fund',
                'diagram.gp.detail.2': '• Bears unlimited liability for fund debts',
                'diagram.gp.detail.3': '• Formulates investment strategies and decisions',
                'diagram.gp.detail.4': '• Manages the fund portfolio and risk control',
                'diagram.gp.detail.5': '• Reports fund performance and operations to limited partners',
                'diagram.im.detail.title': 'Investment Manager (IM)',
                'diagram.im.detail.1': '• Holds Hong Kong SFC Type 4 and/or 9 licenses',
                'diagram.im.detail.2': '• Provides professional investment advice and asset management services',
                'diagram.im.detail.3': '• Executes investment strategies and trading instructions',
                'diagram.im.detail.4': '• Conducts investment research and market analysis',
                'diagram.im.detail.5': '• Ensures compliance with regulatory requirements',
                'diagram.lp.detail.title': 'Limited Partners (LP)',
                'diagram.lp.detail.1': '• Provide capital but do not participate in fund management',
                'diagram.lp.detail.2': '• Enjoy limited liability protection',
                'diagram.lp.detail.3': '• Receive returns based on investment shares',
                'diagram.lp.detail.4': '• Entitled to fund operation and performance reports',
                'diagram.lp.detail.5': '• May participate in voting on major matters',
                'diagram.hklpf.detail.title': 'Hong Kong Limited Partnership Fund (HKLPF)',
                'diagram.hklpf.detail.1': '• Limited partnership fund entity registered in Hong Kong',
                'diagram.hklpf.detail.2': '• Enjoys Hong Kong\'s favorable tax environment',
                'diagram.hklpf.detail.3': '• Protected by Hong Kong legal and regulatory framework',
                'diagram.hklpf.detail.4': '• Facilitates cross-border investment and capital flow',
                'diagram.hklpf.detail.5': '• Provides a professional fund management structure',
                'diagram.target1.detail.title': 'Investment Target',
                'diagram.target1.detail.1': '• Specific asset or project invested by the fund',
                'diagram.target1.detail.2': '• May include equity, debt, real estate, etc.',
                'diagram.target1.detail.3': '• Diversified allocation according to fund strategy',
                'diagram.target1.detail.4': '• Regularly evaluates investment value and risk',
                'diagram.target1.detail.5': '• Aims for capital appreciation and returns',
                'diagram.target2.detail.title': 'Investment Target',
                'diagram.target2.detail.1': '• Specific asset or project invested by the fund',
                'diagram.target2.detail.2': '• May include equity, debt, real estate, etc.',
                'diagram.target2.detail.3': '• Diversified allocation according to fund strategy',
                'diagram.target2.detail.4': '• Regularly evaluates investment value and risk',
                'diagram.target2.detail.5': '• Aims for capital appreciation and returns',
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
                'hero.subtitle': '信託或公司服務提供者牌照No. TC010402，2020年香港公司註冊處新規定：在香港註冊成立公司實施持牌制度',
                'hero.start-incorporation': '開始註冊公司',
                'hero.learn-how': '了解詳情',

                // Services Section
                'services.title': '我們的核心服務',
                'services.company-incorporation.title': '香港公司註冊',
                'services.company-incorporation.description': '透過我們簡化的註冊流程，快速完成您的業務註冊。',
                'services.legal-compliance.title': '法律合規',
                'services.legal-compliance.description': '確保您的業務類型符合所有法規和法律要求。',
                'services.ongoing-support.title': '香港銀行開戶',
                'services.ongoing-support.description': '協助預約香港主流銀行開戶，如中信銀行(國際)、民生銀行(香港)等，以及Airwallex、眾安銀行(ZA Bank)等虛擬銀行，可遠程預審資料，提升通過率',
                'services.learn-more': '了解更多',

                // Why Choose Section
                'why-choose.title': '為什麼選擇 Fusiox？',
                'why-choose.lightning-fast.title': '閃電般快速',
                'why-choose.lightning-fast.description': '通過我們的簡化流程，在創紀錄的時間內完成公司註冊。',
                'why-choose.expert-guidance.title': '專家指導',
                'why-choose.expert-guidance.description': '我們經驗豐富的團隊確保每個細節都得到正確和專業的處理。',
                'why-choose.affordable-pricing.title': '實惠價格',
                'why-choose.affordable-pricing.description': '具競爭力的價格，透明定價，無隱藏費用。',

                // HK Company Advantages Section
                'hk-advantages.title': '註冊香港公司的優勢',
                'hk-advantages.subtitle': '為什麼選擇在香港註冊公司？',
                'hk-advantages.payment.title': '跨境結算便捷，資金往來無憂',
                'hk-advantages.payment.description': '開設香港銀行賬戶，無外匯管制，收款靈活便捷。美元、歐元等主要貨幣實時到賬，免除繁瑣的銀行審核和報備流程。',
                'hk-advantages.tax.title': '稅制優惠，降低企業成本',
                'hk-advantages.tax.description': '香港實行低稅率和簡易稅制，企業利得稅率低至 8%。若利潤不源自香港，可申請離岸豁免，實現"零稅務"運營，每年僅需申報一次，無需複雜手續。',
                'hk-advantages.maintenance.title': '維護成本低，管理簡便',
                'hk-advantages.maintenance.description': '公司年度維護費用低，無需在港設立辦公室或雇傭員工，僅需遞交年度申報與稅務資料，一年一次即可完成。',
                'hk-advantages.brand.title': '品牌背書，助力拓展內地市場',
                'hk-advantages.brand.description': '香港公司享有國際信譽，可提升品牌形象和市場信任度。無論是與國際接軌，還是在內地註冊商標、參與展會、組建協會，均具備更高的便利性與認可度。',
                'hk-advantages.investment.title': '投資內地，享受政策紅利',
                'hk-advantages.investment.description': '香港公司在內地設立合資企業或獨資企業，可享受內地政府提供的稅收優惠及資金扶持政策，助力企業發展。',
                'hk-advantages.financing.title': '全球融資渠道更廣，信譽提升顯著',
                'hk-advantages.financing.description': '香港公司有助於企業提升國際聲譽，贏得海外客戶信任。無論是國際平台對接、融資上市、還是跨境引資，香港身份均可為企業增添競爭優勢。',

                // HK Company Requirements Section
                'hk-requirements.title': '註冊香港公司所需資料',
                'hk-requirements.subtitle': '申請香港公司註冊的必備材料與條件：',
                'hk-requirements.shareholders.title': '①需一位或一位以上股東',
                'hk-requirements.shareholders.description': '至少需一名股東，可為自然人或企業法人。',
                'hk-requirements.age.title': '②所有股東必須超過 18 歲（無戶籍、國籍、地區限制）',
                'hk-requirements.age.description': '所有股東須年滿18周歲，不受國籍、戶籍或地區限制。',
                'hk-requirements.id.title': '③所有股東必須出示有效身份證或護照影印件',
                'hk-requirements.id.description': '自然人股東：需提供有效身份證或護照複印件。',
                'hk-requirements.corporate.title': '④以企業法人作為股東的，企業法人必須遞交營業執照和法人代表的身份證複印件',
                'hk-requirements.corporate.description': '企業法人股東：需提供公司營業執照及法定代表人身份證複印件。',
                'hk-requirements.capital.title': '⑤註冊資本最低為10000元港幣，無需驗資',
                'hk-requirements.capital.description': '最低註冊資本為10000港幣，無需實繳及驗資。',
                'hk-requirements.address.title': '⑥在香港能提供註冊地址（鑫隆源提供多個商業地址供選擇）',
                'hk-requirements.address.description': '公司須在香港設立法定註冊地址（可由持牌TCSP機構提供商務地址）。',
                'hk-requirements.secretary.title': '⑦委托香港人或香港公司擔任公司法定秘書（由鑫隆源提供）',
                'hk-requirements.secretary.description': '必須委任一名香港居民或香港公司擔任法定公司秘書（可由持牌TCSP機構提供）。',
                'hk-requirements.compliance.title': '⑧註冊香港公司的運營業務必須合法',
                'hk-requirements.compliance.description': '公司註冊及運營必須遵守香港相關法律法規。',

                // CTA Section
                'cta.title': '準備開始您的業務？',
                'cta.subtitle': '加入數千名選擇 Fusiox 滿足註冊需求的成功企業家。',
                'cta.description': '我們的香港企業服務專家隨時準備協助您的註冊和合規需求。',
                'cta.consultation-button': '獲取免費諮詢',
                'cta.how-it-works-button': '了解服務流程',
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
                'footer.copyright': '2025 復山企業服務有限公司. 版權所有。',
                'footer.company-name': '復山企業服務有限公司',
                'footer.company-description': '為現代企業提供專業的企業服務。',
                'footer.fund-consultation': '基金諮詢',
                'footer.corporate-governance': '公司註冊',
                'footer.insights': '洞察分析',
                'footer.faq': '常見問題',
                'footer.how-it-works': '如何運作',
                'footer.address': '中環中心39樓3室 皇后大道中99號 中環 香港',
                'footer.contact-us': '聯絡我們',

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
                'contact.hero.subtitle': '準備開始您的業務？立即與我們的註冊專家聯繫。',

                // How It Works Page
                'how-it-works.hero.title': '服務流程',
                'how-it-works.hero.subtitle': '簡單直接的流程，讓您的業務快速高效地完成註冊。',

                // FAQ Page
                'faq.hero.title': '常見問題',
                'faq.hero.subtitle': '查找關於香港公司註冊和我們企業服務的最常見問題答案。',
                'faq.still-questions': '還有疑問？',
                'faq.experts-help': '我們的註冊專家將在每一步為您提供幫助。',
                'faq.contact-us': '聯絡我們',
                
                // FAQ Section
                'faq.section.title': '常見問題 – 公司註冊',
                'faq.section.subtitle': '獲取有關在香港註冊公司的最常見問題的答案',
                'faq.categories.all': '全部',
                'faq.categories.general': '一般問題',
                'faq.categories.costs': '費用',
                'faq.categories.requirements': '要求',
                'faq.categories.compliance': '合規',
                'faq.categories.business': '業務',
                'faq.no-results': '此類別沒有找到常見問題。',
                'faq.cta.title': '還有疑問？',
                'faq.cta.description': '我們的專家隨時為您提供幫助。聯絡我們獲得有關香港公司註冊的個性化指導。',
                'faq.cta.button': '聯絡我們的專家',

                // Funds Page
                'funds.hero.title': '基金服務',
                'funds.hero.subtitle': '為私募股權基金、創業投資基金、對沖基金和其他投資工具提供專業的註冊和合規服務。我們了解複雜的監管要求，並幫助您建立合規的基金結構。',
                'funds.schedule-consultation': '預約諮詢',
                'funds.our-services': '我們的服務',
                'funds.cta.title': '準備啟動您的基金？',
                'funds.cta.subtitle': '讓我們的基金組建專家幫助您建立合規且高效的投資工具。',
                'funds.comprehensive-services.title': '全方位基金服務',
                
                // Fund Services Section
                'funds.services.title': '我們的基金服務',
                'funds.services.description': '為投資者提供全球化、定制化的基金註冊、架構設計和稅務籌劃服務，助力客戶在複雜的全球投資環境中脫穎而出。',
                
                // LPF Overview Section
                'funds.lpf.title': '香港有限合夥基金（LPF）',
                'funds.lpf.description': '有限合夥基金（LPF）是香港私募股權和另類投資策略最靈活且廣泛採用的基金結構之一。特別受到尋求稅務高效和受監管基金制度的全球投資者青睞。',
                'funds.lpf.fusiox-services': 'Fusiox提供LPF全方位註冊和設立服務，從法律架構到運營支援的每個步驟都為您處理。',
                'funds.lpf.key-services': '主要服務：',
                'funds.lpf.service-1-title': '基金註冊與設立：',
                'funds.lpf.service-1-desc': '為LPF設立和香港當局註冊提供端到端支援。',
                'funds.lpf.service-2-title': '法律與稅務諮詢：',
                'funds.lpf.service-2-desc': '提供LPF法律架構、稅務政策和合規要求的專業建議。',
                'funds.lpf.service-3-title': '營運支援：',
                'funds.lpf.service-3-desc': '提供基金管理、會計、投資者關係和審計等持續服務。',
                'funds.lpf.badge': '全球投資者首選',
                'funds.lpf.visual.title': '專業的募集全球資金的基金架構',
                'funds.lpf.visual.subtitle': '為機構投資者和合格投資者設計的專業基金架構',
                'funds.lpf.benefits.tax-efficient': '稅務高效',
                'funds.lpf.benefits.flexible': '靈活',
                'funds.lpf.benefits.regulated': '受監管',
                
                // Fund Structure
                'funds.structure.roles.gp': '普通合夥人（GP）',
                'funds.structure.roles.ia': '投資顧問（IA）',
                'funds.structure.roles.licensed-entity': '第4類/第9類持牌實體',
                'funds.structure.roles.im': '投資經理（IM）',
                'funds.structure.lpf.title': '有限合夥基金',
                'funds.structure.lpf.subtitle': '（HKLPF）',
                'funds.structure.investment-target': '投資標的',
                'funds.structure.roles.investors': '投資者',
                'funds.structure.roles.lp': '有限合夥人（LP）',
                'funds.structure.roles.custodian': '託管人',
                'funds.structure.roles.optional': '（可選）',
                'funds.structure.caption': '簡化架構，顯示典型香港LPF中的主要參與者及其關係。',
                
                // Hong Kong Limited Partnership Fund
                'funds.hklpf.title': '香港有限合夥基金代理註冊服務',
                'funds.hklpf.description': '香港有限合夥基金（Limited Partnership Fund, LPF）是近年來全球投資者在香港設立基金的熱門選擇。我們提供全方位的代理註冊服務，包括：',
                'funds.hklpf.registration.title': '基金註冊與設立：',
                'funds.hklpf.registration.description': '協助客戶在香港完成有限合夥基金的註冊手續，確保符合香港金融管理局的法規要求。',
                'funds.hklpf.legal.title': '法律與稅務諮詢：',
                'funds.hklpf.legal.description': '提供有關香港有限合夥基金的法律框架、稅務政策以及合規要求的專業建議。',
                'funds.hklpf.operational.title': '運營支援：',
                'funds.hklpf.operational.description': '提供基金運營所需的持續支援服務，如資金管理、合夥人關係管理、會計及審計服務等。',
                'funds.hklpf.conclusion': '我們深知每個投資者的需求不同，因此能夠為您量身定制適合的註冊及運營方案，確保您的基金能夠順利運行，符合香港及全球相關的法律法規。',
                
                // Global Fund Consulting
                'funds.global.title': '全球基金諮詢服務',
                'funds.global.description': '在全球市場中，選擇適合的基金結構和投資策略對於投資者的成功至關重要。我們為全球客戶提供高端的基金架構諮詢服務，主要包括：',
                'funds.global.structure.title': '基金架構設計：',
                'funds.global.structure.description': '根據您和投資者的需求，我們提供量身定制的基金架構設計服務，涵蓋多種架構類型，包括香港有限合夥基金（HKLPF）、香港開放式基金公司（HKOFC）、開曼特別目的公司基金（SPC Fund）、以及英屬維爾京群島基金（BVI Fund）。',
                'funds.global.hklpf': '香港有限合夥基金 (HKLPF)',
                'funds.global.hkofc': '香港開放式基金 (HKOFC)',
                'funds.global.spc': '開曼特別目的公司基金 (SPC Fund)',
                'funds.global.bvi': '英屬維爾京群島基金 (BVI Fund)',
                'funds.global.compliance.title': '合規與監管諮詢：',
                'funds.global.compliance.description': '我們的專家團隊能夠為您提供關於不同市場監管法規的諮詢，幫助您在多國合規框架下開展業務。',
                'funds.global.conclusion': '我們的目標是通過全面的諮詢服務，利用不同特點的基金架構，幫助客戶在全球投資環境中占據優勢。',
                
                // Tax Planning Services
                'funds.tax.title': '稅務籌劃服務',
                'funds.tax.description': '我們了解稅務規劃對基金投資者及其投資回報的重要性。我們的稅務籌劃服務專注於為客戶制定優化稅務結構，確保合規同時最大化稅務效益。具體服務內容包括：',
                'funds.tax.global.title': '全球稅務結構設計：',
                'funds.tax.global.description': '為客戶量身定制全球稅務結構，確保在不同國家和地區的稅務負擔最小化，並符合當地的稅法規定。',
                'funds.tax.compliance.title': '稅務合規與風險管理：',
                'funds.tax.compliance.description': '我們幫助客戶識別和管理可能的稅務風險，確保投資結構在法律框架下合法合規。',
                'funds.tax.offshore.title': '開曼、BVI 等離岸基金稅務優化：',
                'funds.tax.offshore.description': '專注於為客戶提供開曼群島、英屬維爾京群島等離岸基金的稅務籌劃，幫助客戶在全球範圍內合理避稅，同時避免潛在的稅務風險。',
                'funds.tax.crossborder.title': '跨境稅務籌劃：',
                'funds.tax.crossborder.description': '為跨境投資提供稅務優化建議，包括跨國基金投資的稅務合規及結構設計，幫助客戶實現全球稅務規劃最優解。',
                'funds.tax.conclusion': '我們的稅務專家與全球領先的稅務顧問合作，確保客戶的基金結構既符合國際標準，又能在合法的框架下實現稅務最優化。',

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
                'services.most-popular': '最受歡迎',
                'services.annual-service': '年度服務',
                'services.includes': '包括：',
                'services.value-added-title': '增值服務',
                // Pricing selector
                'pricing.selector.incorporation': '公司註冊',
                'pricing.selector.secretary': '公司秘書',
                'pricing.selector.accounting': '記賬、會計及薪資',
                'pricing.selector.audit': '審計及報稅',
                // Pricing tiers & badges
                'pricing.tier.entry': '入門方案',
                'pricing.tier.basic': '基本方案',
                'pricing.tier.compliance': '合規方案',
                'pricing.badge.limited': '限時優惠',
                'pricing.badge.popular': '最受歡迎',
                // Plan descriptions
                'pricing.incorporation.entry.desc': '基本公司設立連合規支援。',
                'pricing.incorporation.basic.desc': '完整公司設立連私隱及合規保障。',
                'pricing.incorporation.compliance.desc': '由設立至年結申報的全面合規保障。',
                'pricing.secretary.entry.desc': '核心公司秘書職能及法定申報。',
                'pricing.secretary.basic.desc': '年度法定文件管理與董事支援。',
                'pricing.secretary.compliance.desc': '董事/股東會文件與持續合規。',
                'pricing.accounting.entry.desc': '年度合規與基礎報告。',
                'pricing.accounting.basic.desc': '每月記賬與年度報表。',
                'pricing.accounting.compliance.desc': '管理報表、稅務規劃與審計配合。',
                'pricing.audit.entry.desc': '基礎稅務與法定申報支援。',
                'pricing.audit.basic.desc': '審計協調與報稅支援。',
                'pricing.audit.compliance.desc': '全面審計配合與稅務代表。',
                // Company Incorporation specific features
                'pricing.incorporation.gov-filing-fee': '✓ 一次性政府投影及公司註冊服務費用',
                'pricing.incorporation.certificate-ci': '✓ 公司註冊證明書（CI）',
                'pricing.incorporation.articles': '✓ 公司章程',
                'pricing.incorporation.brc-1year': '✓ 為期1年的商業登記證（BRC）',
                'pricing.incorporation.app-access': '✓ 免費使用Sleek應用程式',
                'pricing.incorporation.support-team': '✓ 專屬支援團隊',
                // New pricing structure
                'pricing.from': '從',
                'pricing.entry.includes': '包括屆滿公司所需的所有事項：',
                'pricing.entry.feature1': '✓ 公司註冊證書（CI）',
                'pricing.entry.feature2': '✓ 商業登記證（BRC）',
                'pricing.entry.feature3': '✓ 公司章程',
                'pricing.entry.feature4': '✓ 專屬公司秘書（CS）',
                'pricing.entry.feature5': '✓ 維護公司股東及法定登記册',
                'pricing.entry.feature6': '✓ 遞交周年申報表（NAR1）',
                'pricing.entry.feature7': '✓ 善德周年大會（AGM）',
                'pricing.entry.feature8': '✓ 指定代表（DR）服務',
                'pricing.basic.includes': '包括初階計劃的所有內容，以及:',
                'pricing.basic.feature1': '✓ 註冊辦事處地址',
                'pricing.basic.feature2': '✓ 接收所有郵件及放題',
                'pricing.basic.feature3': '✓ 無限量件掃描及轉發服務',
                // Comparison table
                'pricing.compare.header': '公司註冊',
                'pricing.compare.secretary-section': '公司秘書',
                'pricing.compare.secretary.maintain': '維持公司登記包裝達至要求的法律及資本登記冊',
                'pricing.compare.secretary.legal-records': '備存公司的法定紀錄',
                'pricing.compare.secretary.nar1': '交付周年申報表 NAR1（政府收費另計）',
                'pricing.compare.secretary.agm': '草擬股東周年大會及大會文件（AGM）',
                'pricing.compare.secretary.manage': '處理公司相關事宜',
                'pricing.compare.office-section': '註冊辦事處及郵件置',
                'pricing.compare.office.address': '註冊辦事處地址',
                'pricing.compare.office.mail-receive': '接收所有郵件及包裹',
                'pricing.compare.office.mail-forward': '無限郵件掃描及轉發服務',
                'pricing.cta.entry': '選擇入門方案',
                'pricing.cta.basic': '選擇基本方案',
                // Features
                'pricing.features.name-check': '✓ 公司名稱查冊與文件準備',
                'pricing.features.basic-filing': '✓ 基本文件提交',
                'pricing.features.digital-delivery': '✓ 電子檔案交付',
                'pricing.features.registered-address': '✓ 註冊辦事處地址與郵件轉發',
                'pricing.features.seals': '✓ 公司印章（如適用）',
                'pricing.features.priority-support': '✓ 優先客戶支援',
                'pricing.features.annual-return-tax-rep': '✓ 年度申報（NAR1）/ 稅務代表',
                'pricing.features.cloud-archive': '✓ 文件掃描及雲端存檔',
                'pricing.features.dedicated-advisor': '✓ 專屬顧問一對一支援',
                // Service-specific features
                'pricing.features.incorporation-kit': '✓ 完整公司設立文件包',
                'pricing.features.secretary-appointment': '✓ 公司秘書委任',
                'pricing.features.annual-return-filing': '✓ 年度申報（NAR1）',
                'pricing.features.statutory-registers': '✓ 法定登記冊維護',
                'pricing.features.board-meeting-support': '✓ 董事會會議支援',
                'pricing.features.agm-coordination': '✓ 股東週年大會協調',
                'pricing.features.annual-accounts': '✓ 年度帳目編製',
                'pricing.features.basic-bookkeeping': '✓ 基礎記賬',
                'pricing.features.monthly-bookkeeping': '✓ 每月記賬',
                'pricing.features.financial-statements': '✓ 財務報表',
                'pricing.features.payroll-processing': '✓ 薪資處理',
                'pricing.features.management-reports': '✓ 管理報表',
                'pricing.features.tax-planning': '✓ 稅務規劃諮詢',
                'pricing.features.tax-return-filing': '✓ 報稅表遞交',
                'pricing.features.tax-computation': '✓ 稅務計算',
                'pricing.features.audit-coordination': '✓ 審計協調',
                'pricing.features.tax-advice': '✓ 稅務諮詢',
                'pricing.features.audit-fieldwork': '✓ 全面審計實地工作支援',
                'pricing.features.tax-representative': '✓ 稅務代表服務',
                'pricing.features.ird-correspondence': '✓ 稅務局信件處理',
                // Includes labels
                'pricing.includes.entryplus': '包含入門方案所有內容，另外：',
                'pricing.includes.basicplus': '包含基本方案所有內容，另外：',
                // CTAs and notes
                'pricing.cta.whatsapp': '透過 WhatsApp 聯絡我們',
                'pricing.disclaimer.gov': '+ 政府費用另計',
                'pricing.note.contact': '以上價格未含政府費用。需要客製化方案？',
                'pricing.note.link': '與我們聯絡',
                'pricing.compare': '方案比較',
                'pricing.hide-compare': '隱藏比較',
                'pricing.shareholders.label': '選擇股東數量',
                'pricing.shareholders.suffix': '位股東',
                'common.close': '關閉',
                'services.company-secretary.title': '公司秘書服務',
                'services.company-secretary.description-main': '專業的公司秘書服務，確保您的業務持續符合香港法規。',
                'services.company-secretary.price': 'USD 1,180',
                'services.features.secretary': '專屬公司秘書',
                'services.features.filing': '年度申報表填報',
                'services.features.coordination': '董事會會議協調',
                'services.features.monitoring': '法定合規監察',
                'services.features.maintenance': '企業記錄維護',
                'services.features.support': '監管申報支援',
                'services.registered-address.title': '註冊地址及郵件接收',
                'services.registered-address.description-short': '專業的註冊地址服務，提供郵件處理和轉寄功能。',
                'services.registered-address.price': 'USD 500',
                'services.audit-tax.title': '審計及稅務申報',
                'services.audit-tax.description-short': '量身定制的全面稅務申報支持。',
                'services.audit-tax.price': '按情況而定',
                'services.bank-account.title': '銀行開戶',
                'services.bank-account.description-short': '協助企業銀行開戶和建立銀行關係。',
                'services.bank-account.price': '起價 USD 800',
                'services.ctc.title': 'CTC 認證',
                'services.ctc.description-short': '認證副本證明服務，用於官方文件認證。',
                'services.ctc.price': '按情況而定',
                'services.fund-note.text': '對基金相關註冊服務感興趣？',
                'services.fund-note.link': '請直接聯繫我們了解詳情。',

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
                'how-it-works.auto-fill.description': '我們的系統根據您的資訊自動準備所有必需的文件和表格。',
                'how-it-works.auto-fill.we-prepare': '我們準備：',
                'how-it-works.auto-fill.articles': '• 公司章程/組織章程',
                'how-it-works.auto-fill.operating-agreements': '• 營運協議',
                'how-it-works.auto-fill.state-forms': '• 特定表格',
                'how-it-works.auto-fill.resolutions': '• 公司決議',
                'how-it-works.review.description': '在我們進行申報之前，審查所有文件的準確性並批准它們。',
                'how-it-works.review.you-can': '您可以：',
                'how-it-works.review.review-online': '• 線上審查所有文件',
                'how-it-works.review.request-modifications': '• 要求修改',
                'how-it-works.review.ask-questions': '• 向我們的專家提問',
                'how-it-works.review.approve-documents': '• 批准最終文件',
                'how-it-works.review.track-progress': '• 即時追蹤進度',
                'how-it-works.submission.description': '我們向適當的機構提交所有文件，並交付您的完整套餐。',
                'how-it-works.submission.you-receive': '您將收到：',
                'how-it-works.submission.certified-documents': '• 商業登記證',
                'how-it-works.submission.certificate-incorporation': '• 公司註冊證明書',
                'how-it-works.submission.articles-association': '• 公司章程',
                'how-it-works.submission.corporate-kit': '• 公司印章（如適用）',
                'how-it-works.submission.digital-copies': '• 所有文件的數位副本',
                'how-it-works.submission.support-info': '• 持續的資訊支援',
                'how-it-works.timeline.title': '典型時間表',
                'how-it-works.timeline.day1': '第1天',
                'how-it-works.timeline.day1.description': '完成問卷和文件準備',
                'how-it-works.timeline.day2-3': '第2-3天',
                'how-it-works.timeline.day2-3.description': '審查、批准並向政府提交文件',
                'how-it-works.timeline.day5-7': '第5-7天',
                'how-it-works.timeline.day5-7.description': '收到批准的文件和完整的業務套餐',
                'how-it-works.different.title': '我們的與眾不同之處',
                'how-it-works.different.lightning-fast.title': '閃電般快速',
                'how-it-works.different.lightning-fast.description': '大多數註冊在5-7個工作日內完成，並提供加急選項。',
                'how-it-works.different.expert-review.title': '專家審查',
                'how-it-works.different.expert-review.description': '每份文件都由專家審查，以確保準確性和合規性。',
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

                // Contact Page
                'contact.office.title': '辦公地址',
                'contact.office.address.line1': '中環中心39樓3室',
                'contact.office.address.line2': '皇后大道中99號 中環',
                'contact.office.address.line3': '香港',
                'contact.office.viewMap': '查看地圖',

                'contact.methods.title': '聯繫方式',
                'contact.methods.hours.label': '辦公時間',
                'contact.methods.hours.time': '週一至週五：上午9:00 - 下午6:00 (香港時間)',

                'contact.form.title': '發送訊息',
                'contact.form.subtitle': '準備開始您的創業之旅？填寫以下表格，我們的註冊專家將在24小時內回覆您。',
                'contact.form.name.label': '姓名 *',
                'contact.form.name.placeholder': '您的全名',
                'contact.form.email.label': '電子郵件 *',
                'contact.form.email.placeholder': 'your.email@example.com',
                'contact.form.company.label': '公司名稱',
                'contact.form.company.placeholder': '您的公司名稱（可選）',
                'contact.form.subject.label': '主題 *',
                'contact.form.subject.placeholder': '選擇主題...',
                'contact.form.subject.options.general': '一般查詢',
                'contact.form.subject.options.funds': '基金服務',
                'contact.form.subject.options.secretary': '公司秘書',
                'contact.form.subject.options.others': '其他',
                'contact.form.message.label': '訊息 *',
                'contact.form.message.placeholder': '告訴我們您的業務需求以及我們如何協助您...',
                'contact.form.submit': '發送訊息',
                'contact.form.sending': '發送中...',
                'contact.form.success': '感謝您的訊息！我們將在24小時內回覆您。',
                'contact.form.error': '發送訊息時出現錯誤。請重試或直接與我們聯繫。',

                // Page Titles
                'page.title.contact': '聯絡我們 - Fusiox',

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
                'insights.section.title': '最新洞察',
                'insights.section.subtitle': '透過我們關於企業治理和商業營運的最新見解和專家分析保持資訊更新。',
                'insights.filter.all': '所有洞察',
                'insights.filter.company-secretary': '公司秘書服務',
                'insights.filter.fund': '基金服務',
                'insights.category.company-secretary': '公司秘書',
                'insights.category.fund': '基金',
                'insights.read-more': '閱讀更多 →',
                'insights.no-posts': '暫無文章',
                'insights.loading': '載入中...',
                'insights.updated': '更新於',
                'insights.untitled': '無標題',

                // Insight Detail Page
                'insight-detail.published-on': '發佈於',
                'insight-detail.updated-on': '更新於',
                'insight-detail.no-insight-selected': '未選擇文章',
                'insight-detail.post-not-found': '文章未找到',
                'insight-detail.no-insight-desc': '請從洞察分析頁面選擇一篇文章來查看內容。',
                'insight-detail.post-not-found-desc': '您要查找的文章不存在或已被移動。',
                'insight-detail.view-all-btn': '查看所有洞察',

                // Page Titles
                'page.title.about': '關於我們 - Fusiox',
                'page.title.contact': '聯絡我們 - Fusiox',
                'page.title.faq': '常見問題 - Fusiox',
                'page.title.funds': '基金服務 - Fusiox',
                'page.title.how-it-works': '服務流程 - Fusiox',
                'page.title.insights': '洞察分析 - Fusiox',
                'page.title.services': '服務 - Fusiox',
                'page.title.index': 'Fusiox - 專業註冊服務',

                // Breadcrumb
                'breadcrumb.home': '首頁',
                'breadcrumb.insights': '洞察分析',

                // Insight Detail Page - Generic translations
                'insight-detail.back-btn': '← 返回洞察分析',
                'insight-detail.contact-btn': '獲取專業建議',
                'insight-detail.services-btn': '我們的服務',
                'insight-detail.related-posts': '相關文章',
                'insight-detail.loading': '載入文章中...',
                'insight-detail.not-found': '找不到文章',
                'insight-detail.contact-btn': '獲取專家建議',
                'insight-detail.services-btn': '我們的服務',
                'insight-detail.related-title': '相關文章',
                'insight-detail.related1.title': '年度申報要求更新',
                'insight-detail.related1.desc': '隨時了解年度申報要求的最新變化。',
                'insight-detail.related2.title': '企業服務的數位轉型',
                'insight-detail.related2.desc': '科技如何革命性地改變企業服務和營運。',

                // Common
                'common.language': '語言',

                // Diagram tooltips
                'diagram.gp.title': '普通合夥人 (GP)',
                'diagram.gp.desc': '普通合夥人負責基金管理和運營。',
                'diagram.im.title': '香港4/9號牌投資經理',
                'diagram.im.desc': '持牌投資經理提供投資建議和管理服務。',
                'diagram.lp.title': '有限合夥人 (LP)',
                'diagram.lp.desc': '有限合夥人提供資本但不參與管理。',
                'diagram.hklpf.title': '有限合夥基金 (HKLPF)',
                'diagram.hklpf.desc': '在香港註冊的有限合夥基金主體。',
                'diagram.target1.title': '投資標的 1',
                'diagram.target1.desc': '基金投資的具體資產或項目。',
                'diagram.target2.title': '投資標的 2',
                'diagram.target2.desc': '基金投資的具體資產或項目。',
                // Diagram detail panels
                'diagram.gp.detail.title': '普通合夥人 (GP)',
                'diagram.gp.detail.1': '• 負責基金的日常管理和運營決策',
                'diagram.gp.detail.2': '• 承擔無限責任，對基金債務負責',
                'diagram.gp.detail.3': '• 制定投資策略和投資決策',
                'diagram.gp.detail.4': '• 管理基金的投資組合和風險控制',
                'diagram.gp.detail.5': '• 向有限合夥人報告基金業績和運營情況',
                'diagram.im.detail.title': '投資經理 (IM)',
                'diagram.im.detail.1': '• 持有香港證監會4號和/或9號牌照',
                'diagram.im.detail.2': '• 提供專業的投資建議和資產管理服務',
                'diagram.im.detail.3': '• 執行投資策略和交易指令',
                'diagram.im.detail.4': '• 進行投資研究和市場分析',
                'diagram.im.detail.5': '• 確保符合監管要求和合規標準',
                'diagram.lp.detail.title': '有限合夥人 (LP)',
                'diagram.lp.detail.1': '• 提供資本但不參與基金管理',
                'diagram.lp.detail.2': '• 享有有限責任保護',
                'diagram.lp.detail.3': '• 根據投資份額獲得收益分配',
                'diagram.lp.detail.4': '• 有權獲得基金運營和業績報告',
                'diagram.lp.detail.5': '• 可參與重大事項的投票決策',
                'diagram.hklpf.detail.title': '香港有限合夥基金 (HKLPF)',
                'diagram.hklpf.detail.1': '• 在香港註冊的有限合夥基金實體',
                'diagram.hklpf.detail.2': '• 享受香港優惠的稅務環境',
                'diagram.hklpf.detail.3': '• 受香港法律和監管框架保護',
                'diagram.hklpf.detail.4': '• 便於進行跨境投資和資金流動',
                'diagram.hklpf.detail.5': '• 提供專業的基金管理架構',
                'diagram.target1.detail.title': '投資標的',
                'diagram.target1.detail.1': '• 基金投資的具體資產或項目',
                'diagram.target1.detail.2': '• 可包括股權、債權、房地產等',
                'diagram.target1.detail.3': '• 根據基金策略進行多元化配置',
                'diagram.target1.detail.4': '• 定期評估投資價值和風險',
                'diagram.target1.detail.5': '• 目標實現資本增值和收益分配',
                'diagram.target2.detail.title': '投資標的',
                'diagram.target2.detail.1': '• 基金投資的具體資產或項目',
                'diagram.target2.detail.2': '• 可包括股權、債權、房地產等',
                'diagram.target2.detail.3': '• 根據基金策略進行多元化配置',
                'diagram.target2.detail.4': '• 定期評估投資價值和風險',
                'diagram.target2.detail.5': '• 目標實現資本增值和收益分配',
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
                'hero.subtitle': '信託或公司服務提供者牌照No. TC010402，2020年香港公司注册处新规定：在香港注册成立公司实施持牌制度',
                'hero.start-incorporation': '开始注册公司',
                'hero.learn-how': '了解详情',

                // Services Section
                'services.title': '我们的核心服务',
                'services.company-incorporation.title': '香港公司注册',
                'services.company-incorporation.description': '通过我们简化的注册流程，快速完成您的业务注册。',
                'services.legal-compliance.title': '法律合规',
                'services.legal-compliance.description': '确保您的业务类型符合所有法规和法律要求。',
                'services.ongoing-support.title': '香港银行开户',
                'services.ongoing-support.description': '协助预约香港主流银行开户，如中信银行(国际)、民生银行(香港)等，以及Airwallex、众安银行(ZA Bank)等虚拟银行，可远程预审资料，提升通过率',
                'services.learn-more': '了解更多',

                // Why Choose Section
                'why-choose.title': '为什么选择 Fusiox？',
                'why-choose.lightning-fast.title': '闪电般快速',
                'why-choose.lightning-fast.description': '通过我们的简化流程，在创纪录的时间内完成公司注册。',
                'why-choose.expert-guidance.title': '专家指导',
                'why-choose.expert-guidance.description': '我们经验丰富的团队确保每个细节都得到正确和专业的处理。',
                'why-choose.affordable-pricing.title': '实惠价格',
                'why-choose.affordable-pricing.description': '具竞争力的价格，透明定价，无隐藏费用。',

                // HK Company Advantages Section
                'hk-advantages.title': '注册香港公司的优势',
                'hk-advantages.subtitle': '为什么选择在香港注册公司？',
                'hk-advantages.payment.title': '跨境结算便捷，资金往来无忧',
                'hk-advantages.payment.description': '开设香港银行账户，无外汇管制，收款灵活便捷。美元、欧元等主要货币实时到账，免除繁琐的银行审核和报备流程。',
                'hk-advantages.tax.title': '税制优惠，降低企业成本',
                'hk-advantages.tax.description': '香港实行低税率和简易税制，企业利得税率低至 8%。若利润不源自香港，可申请离岸豁免，实现"零税务"运营，每年仅需申报一次，无需复杂手续。',
                'hk-advantages.maintenance.title': '维护成本低，管理简便',
                'hk-advantages.maintenance.description': '公司年度维护费用低，无需在港设立办公室或雇佣员工，仅需递交年度申报与税务资料，一年一次即可完成。',
                'hk-advantages.brand.title': '品牌背书，助力拓展内地市场',
                'hk-advantages.brand.description': '香港公司享有国际信誉，可提升品牌形象和市场信任度。无论是与国际接轨，还是在内地注册商标、参与展会、组建协会，均具备更高的便利性与认可度。',
                'hk-advantages.investment.title': '投资内地，享受政策红利',
                'hk-advantages.investment.description': '香港公司在内地设立合资企业或独资企业，可享受内地政府提供的税收优惠及资金扶持政策，助力企业发展。',
                'hk-advantages.financing.title': '全球融资渠道更广，信誉提升显著',
                'hk-advantages.financing.description': '香港公司有助于企业提升国际声誉，赢得海外客户信任。无论是国际平台对接、融资上市、还是跨境引资，香港身份均可为企业增添竞争优势。',

                // HK Company Requirements Section
                'hk-requirements.title': '注册香港公司所需资料',
                'hk-requirements.subtitle': '申请香港公司注册的必备材料与条件：',
                'hk-requirements.shareholders.title': '①需一位或一位以上股东',
                'hk-requirements.shareholders.description': '至少需一名股东，可为自然人或企业法人。',
                'hk-requirements.age.title': '②所有股东必须超过 18 岁（无户籍、国籍、地区限制）',
                'hk-requirements.age.description': '所有股东须年满18周岁，不受国籍、户籍或地区限制。',
                'hk-requirements.id.title': '③所有股东必须出示有效身份证或护照影印件',
                'hk-requirements.id.description': '自然人股东：需提供有效身份证或护照复印件。',
                'hk-requirements.corporate.title': '④以企业法人作为股东的，企业法人必须递交营业执照和法人代表的身份证复印件',
                'hk-requirements.corporate.description': '企业法人股东：需提供公司营业执照及法定代表人身份证复印件。',
                'hk-requirements.capital.title': '⑤注册资本最低为10000元港币，无需验资',
                'hk-requirements.capital.description': '最低注册资本为10000港币，无需实缴及验资。',
                'hk-requirements.address.title': '⑥在香港能提供注册地址（鑫隆源提供多个商业地址供选择）',
                'hk-requirements.address.description': '公司须在香港设立法定注册地址（可由持牌TCSP机构提供商务地址）。',
                'hk-requirements.secretary.title': '⑦委托香港人或香港公司担任公司法定秘书（由鑫隆源提供）',
                'hk-requirements.secretary.description': '必须委任一名香港居民或香港公司担任法定公司秘书（可由持牌TCSP机构提供）。',
                'hk-requirements.compliance.title': '⑧注册香港公司的运营业务必须合法',
                'hk-requirements.compliance.description': '公司注册及运营必须遵守香港相关法律法规。',

                // CTA Section
                'cta.title': '准备开始您的业务？',
                'cta.subtitle': '加入数千名选择 Fusiox 满足注册需求的成功企业家。',
                'cta.description': '我们的香港企业服务专家随时准备协助您的注册和合规需求。',
                'cta.consultation-button': '获取免费咨询',
                'cta.how-it-works-button': '了解服务流程',
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
                'footer.copyright': '2025 复山企业服务有限公司. 版权所有。',
                'footer.company-name': '复山企业服务有限公司',
                'footer.company-description': '为现代企业提供专业的企业服务。',
                'footer.fund-consultation': '基金咨询',
                'footer.corporate-governance': '公司注册',
                'footer.insights': '洞察分析',
                'footer.faq': '常见问题',
                'footer.how-it-works': '如何运作',
                'footer.address': '中环中心39楼3室 皇后大道中99号 中环 香港',
                'footer.contact-us': '联系我们',

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
                'contact.hero.subtitle': '准备开始您的业务？立即与我们的注册专家联系。',

                // How It Works Page
                'how-it-works.hero.title': '服务流程',
                'how-it-works.hero.subtitle': '简单直接的流程，让您的业务快速高效地完成注册。',

                // FAQ Page
                'faq.hero.title': '常见问题',
                'faq.hero.subtitle': '查找关于香港公司注册和我们企业服务的最常见问题答案。',
                'faq.still-questions': '还有疑问？',
                'faq.experts-help': '我们的注册专家将在每一步为您提供帮助。',
                'faq.contact-us': '联系我们',
                
                // FAQ Section
                'faq.section.title': '常见问题 – 公司注册',
                'faq.section.subtitle': '获取有关在香港注册公司的最常见问题的答案',
                'faq.categories.all': '全部',
                'faq.categories.general': '一般问题',
                'faq.categories.costs': '费用',
                'faq.categories.requirements': '要求',
                'faq.categories.compliance': '合规',
                'faq.categories.business': '业务',
                'faq.no-results': '此类别没有找到常见问题。',
                'faq.cta.title': '还有疑问？',
                'faq.cta.description': '我们的专家随时为您提供帮助。联系我们获得有关香港公司注册的个性化指导。',
                'faq.cta.button': '联系我们的专家',

                // Funds Page
                'funds.hero.title': '基金服务',
                'funds.hero.subtitle': '为私募股权基金、创业投资基金、对冲基金和其他投资工具提供专业的注册和合规服务。我们了解复杂的监管要求，并帮助您建立合规的基金结构。',
                'funds.schedule-consultation': '预约咨询',
                'funds.our-services': '我们的服务',
                'funds.cta.title': '准备启动您的基金？',
                'funds.cta.subtitle': '让我们的基金组建专家帮助您建立合规且高效的投资工具。',
                'funds.comprehensive-services.title': '全方位基金服务',
                
                // Fund Services Section
                'funds.services.title': '我们的基金服务',
                'funds.services.description': '为投资者提供全球化、定制化的基金注册、架构设计和税务筹划服务，助力客户在复杂的全球投资环境中脱颖而出。',
                
                // LPF Overview Section
                'funds.lpf.title': '香港有限合伙基金（LPF）',
                'funds.lpf.description': '有限合伙基金（LPF）是香港私募股权和另类投资策略最灵活且广泛采用的基金结构之一。特别受到寻求税务高效和受监管基金制度的全球投资者青睐。',
                'funds.lpf.fusiox-services': 'Fusiox提供LPF全方位注册和设立服务，从法律架构到运营支持的每个步骤都为您处理。',
                'funds.lpf.key-services': '主要服务：',
                'funds.lpf.service-1-title': '基金注册与设立：',
                'funds.lpf.service-1-desc': '为LPF设立和香港当局注册提供端到端支持。',
                'funds.lpf.service-2-title': '法律与税务咨询：',
                'funds.lpf.service-2-desc': '提供LPF法律架构、税务政策和合规要求的专业建议。',
                'funds.lpf.service-3-title': '运营支持：',
                'funds.lpf.service-3-desc': '提供基金管理、会计、投资者关系和审计等持续服务。',
                'funds.lpf.badge': '全球投资者首选',
                'funds.lpf.visual.title': '专业的募集全球资金的基金架构',
                'funds.lpf.visual.subtitle': '为机构投资者和合格投资者设计的专业基金架构',
                'funds.lpf.benefits.tax-efficient': '税务高效',
                'funds.lpf.benefits.flexible': '灵活',
                'funds.lpf.benefits.regulated': '受监管',
                
                // Fund Structure
                'funds.structure.roles.gp': '普通合伙人（GP）',
                'funds.structure.roles.ia': '投资顾问（IA）',
                'funds.structure.roles.licensed-entity': '第4类/第9类持牌实体',
                'funds.structure.roles.im': '投资经理（IM）',
                'funds.structure.lpf.title': '有限合伙基金',
                'funds.structure.lpf.subtitle': '（HKLPF）',
                'funds.structure.investment-target': '投资标的',
                'funds.structure.roles.investors': '投资者',
                'funds.structure.roles.lp': '有限合伙人（LP）',
                'funds.structure.roles.custodian': '托管人',
                'funds.structure.roles.optional': '（可选）',
                'funds.structure.caption': '简化架构，显示典型香港LPF中的主要参与者及其关系。',
                
                // Hong Kong Limited Partnership Fund
                'funds.hklpf.title': '香港有限合伙基金代理注册服务',
                'funds.hklpf.description': '香港有限合伙基金（Limited Partnership Fund, LPF）是近年来全球投资者在香港设立基金的热门选择。我们提供全方位的代理注册服务，包括：',
                'funds.hklpf.registration.title': '基金注册与设立：',
                'funds.hklpf.registration.description': '协助客户在香港完成有限合伙基金的注册手续，确保符合香港金融管理局的法规要求。',
                'funds.hklpf.legal.title': '法律与税务咨询：',
                'funds.hklpf.legal.description': '提供有关香港有限合伙基金的法律框架、税务政策以及合规要求的专业建议。',
                'funds.hklpf.operational.title': '运营支持：',
                'funds.hklpf.operational.description': '提供基金运营所需的持续支持服务，如资金管理、合伙人关系管理、会计及审计服务等。',
                'funds.hklpf.conclusion': '我们深知每个投资者的需求不同，因此能够为您量身定制适合的注册及运营方案，确保您的基金能够顺利运行，符合香港及全球相关的法律法规。',
                
                // Global Fund Consulting
                'funds.global.title': '全球基金咨询服务',
                'funds.global.description': '在全球市场中，选择适合的基金结构和投资策略对于投资者的成功至关重要。我们为全球客户提供高端的基金架构咨询服务，主要包括：',
                'funds.global.structure.title': '基金架构设计：',
                'funds.global.structure.description': '根据您和投资者的需求，我们提供量身定制的基金架构设计，涵盖香港有限合伙基金(HKLPF)、香港开放式基金(HKOFC)、开曼特别目的公司基金(SPC Fund)、英属维尔京群岛基金(BVI Fund)等多个领域。',
                'funds.global.hklpf': '香港有限合伙基金 (HKLPF)',
                'funds.global.hkofc': '香港开放式基金 (HKOFC)',
                'funds.global.spc': '开曼特别目的公司基金 (SPC Fund)',
                'funds.global.bvi': '英属维尔京群岛基金 (BVI Fund)',
                'funds.global.compliance.title': '合规与监管咨询：',
                'funds.global.compliance.description': '我们的专家团队能够为您提供关于不同市场监管法规的咨询，帮助您在多国合规框架下开展业务。',
                'funds.global.conclusion': '我们的目标是通过全面的咨询服务，利用不同特点的基金架构，帮助客户在全球投资环境中占据优势。',
                
                // Tax Planning Services
                'funds.tax.title': '税务筹划服务',
                'funds.tax.description': '我们了解税务规划对基金投资者及其投资回报的重要性。我们的税务筹划服务专注于为客户制定优化税务结构，确保合规同时最大化税务效益。具体服务内容包括：',
                'funds.tax.global.title': '全球税务结构设计：',
                'funds.tax.global.description': '为客户量身定制全球税务结构，确保在不同国家和地区的税务负担最小化，并符合当地的税法规定。',
                'funds.tax.compliance.title': '税务合规与风险管理：',
                'funds.tax.compliance.description': '我们帮助客户识别和管理可能的税务风险，确保投资结构在法律框架下合法合规。',
                'funds.tax.offshore.title': '开曼、BVI 等离岸基金税务优化：',
                'funds.tax.offshore.description': '专注于为客户提供开曼群岛、英属维尔京群岛等离岸基金的税务筹划，帮助客户在全球范围内合理避税，同时避免潜在的税务风险。',
                'funds.tax.crossborder.title': '跨境税务筹划：',
                'funds.tax.crossborder.description': '为跨境投资提供税务优化建议，包括跨国基金投资的税务合规及结构设计，帮助客户实现全球税务规划最优解。',
                'funds.tax.conclusion': '我们的税务专家与全球领先的税务顾问合作，确保客户的基金结构既符合国际标准，又能在合法的框架下实现税务最优化。',

                // HKLPF Structure Section
                'funds.structure.title': '香港有限合伙基金架构示意',
                'funds.structure.description': 'Fusiox 协助客户完成香港有限合伙基金注册时的典型架构关系示意图。',

                // HKLPF Structure Section
                'funds.structure.title': '香港有限合夥基金架構示意',
                'funds.structure.description': 'Fusiox 協助客戶完成香港有限合夥基金註冊時的典型架構關係示意圖。',

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
                'services.most-popular': '最受欢迎',
                'services.annual-service': '年度服务',
                'services.includes': '包括：',
                'services.value-added-title': '增值服务',
                // Pricing selector
                'pricing.selector.incorporation': '公司注册',
                'pricing.selector.secretary': '公司秘书',
                'pricing.selector.accounting': '记账、会计及薪资',
                'pricing.selector.audit': '审计及报税',
                // Pricing tiers & badges
                'pricing.tier.entry': '入门方案',
                'pricing.tier.basic': '基本方案',
                'pricing.tier.compliance': '合规方案',
                'pricing.badge.limited': '限时优惠',
                'pricing.badge.popular': '最受欢迎',
                // Plan descriptions
                'pricing.incorporation.entry.desc': '基础公司设立与合规支持。',
                'pricing.incorporation.basic.desc': '完整设立方案，含隐私与合规保障。',
                'pricing.incorporation.compliance.desc': '从设立到年结申报的全面合规保障。',
                'pricing.secretary.entry.desc': '核心公司秘书职能及法定申报。',
                'pricing.secretary.basic.desc': '年度法定文件管理与董事支持。',
                'pricing.secretary.compliance.desc': '董事/股东会文件与持续合规。',
                'pricing.accounting.entry.desc': '年度合规与基础报告。',
                'pricing.accounting.basic.desc': '每月记账与年度报表。',
                'pricing.accounting.compliance.desc': '管理报表、税务规划与审计配合。',
                'pricing.audit.entry.desc': '基础税务与法定申报支持。',
                'pricing.audit.basic.desc': '审计协调与报税支持。',
                'pricing.audit.compliance.desc': '全面审计配合与税务代表。',
                // Company Incorporation specific features
                'pricing.incorporation.gov-filing-fee': '✓ 一次性政府投影及公司注册服务费用',
                'pricing.incorporation.certificate-ci': '✓ 公司注册证明书（CI）',
                'pricing.incorporation.articles': '✓ 公司章程',
                'pricing.incorporation.brc-1year': '✓ 为期1年的商业登记证（BRC）',
                'pricing.incorporation.app-access': '✓ 免费使用Sleek应用程式',
                'pricing.incorporation.support-team': '✓ 专属支持团队',
                // New pricing structure
                'pricing.from': '从',
                'pricing.entry.includes': '包括届满公司所需的所有事项：',
                'pricing.entry.feature1': '✓ 公司注册证书（CI）',
                'pricing.entry.feature2': '✓ 商业登记证（BRC）',
                'pricing.entry.feature3': '✓ 公司章程',
                'pricing.entry.feature4': '✓ 专属公司秘书（CS）',
                'pricing.entry.feature5': '✓ 维护公司股东及法定登记册',
                'pricing.entry.feature6': '✓ 递交周年申报表（NAR1）',
                'pricing.entry.feature7': '✓ 善德周年大会（AGM）',
                'pricing.entry.feature8': '✓ 指定代表（DR）服务',
                'pricing.basic.includes': '包括初阶计划的所有内容，以及:',
                'pricing.basic.feature1': '✓ 注册办事处地址',
                'pricing.basic.feature2': '✓ 接收所有邮件及放题',
                'pricing.basic.feature3': '✓ 无限量件扫描及转发服务',
                // Comparison table
                'pricing.compare.header': '公司注册',
                'pricing.compare.secretary-section': '公司秘书',
                'pricing.compare.secretary.maintain': '维持公司登记包装达至要求的法律及资本登记册',
                'pricing.compare.secretary.legal-records': '备存公司的法定纪录',
                'pricing.compare.secretary.nar1': '交付周年申报表 NAR1（政府收费另计）',
                'pricing.compare.secretary.agm': '草拟股东周年大会及大会文件（AGM）',
                'pricing.compare.secretary.manage': '处理公司相关事宜',
                'pricing.compare.office-section': '注册办事处及邮件置',
                'pricing.compare.office.address': '注册办事处地址',
                'pricing.compare.office.mail-receive': '接收所有邮件及包裹',
                'pricing.compare.office.mail-forward': '无限邮件扫描及转发服务',
                'pricing.cta.entry': '选择入门方案',
                'pricing.cta.basic': '选择基本方案',
                // Features
                'pricing.features.name-check': '✓ 公司名称查册与文件准备',
                'pricing.features.basic-filing': '✓ 基本文件提交',
                'pricing.features.digital-delivery': '✓ 电子档案交付',
                'pricing.features.registered-address': '✓ 注册办事处地址与邮件转发',
                'pricing.features.seals': '✓ 公司印章（如适用）',
                'pricing.features.priority-support': '✓ 优先客户支持',
                'pricing.features.annual-return-tax-rep': '✓ 年度申报（NAR1）/ 税务代表',
                'pricing.features.cloud-archive': '✓ 文件扫描及云端存档',
                'pricing.features.dedicated-advisor': '✓ 专属顾问一对一支持',
                // Service-specific features
                'pricing.features.incorporation-kit': '✓ 完整公司设立文件包',
                'pricing.features.secretary-appointment': '✓ 公司秘书委任',
                'pricing.features.annual-return-filing': '✓ 年度申报（NAR1）',
                'pricing.features.statutory-registers': '✓ 法定登记册维护',
                'pricing.features.board-meeting-support': '✓ 董事会会议支持',
                'pricing.features.agm-coordination': '✓ 股东周年大会协调',
                'pricing.features.annual-accounts': '✓ 年度账目编制',
                'pricing.features.basic-bookkeeping': '✓ 基础记账',
                'pricing.features.monthly-bookkeeping': '✓ 每月记账',
                'pricing.features.financial-statements': '✓ 财务报表',
                'pricing.features.payroll-processing': '✓ 薪资处理',
                'pricing.features.management-reports': '✓ 管理报表',
                'pricing.features.tax-planning': '✓ 税务规划咨询',
                'pricing.features.tax-return-filing': '✓ 报税表递交',
                'pricing.features.tax-computation': '✓ 税务计算',
                'pricing.features.audit-coordination': '✓ 审计协调',
                'pricing.features.tax-advice': '✓ 税务咨询',
                'pricing.features.audit-fieldwork': '✓ 全面审计实地工作支持',
                'pricing.features.tax-representative': '✓ 税务代表服务',
                'pricing.features.ird-correspondence': '✓ 税务局信件处理',
                // Includes labels
                'pricing.includes.entryplus': '包含入门方案所有内容，另外：',
                'pricing.includes.basicplus': '包含基本方案所有内容，另外：',
                // CTAs and notes
                'pricing.cta.whatsapp': '通过 WhatsApp 联系我们',
                'pricing.disclaimer.gov': '+ 政府费用另计',
                'pricing.note.contact': '以上价格未含政府费用。需要定制方案？',
                'pricing.note.link': '联系我们',
                'pricing.compare': '对比方案',
                'pricing.hide-compare': '隐藏对比',
                'pricing.shareholders.label': '选择股东数量',
                'pricing.shareholders.suffix': '位股东',
                'common.close': '关闭',
                'services.company-secretary.title': '公司秘书服务',
                'services.company-secretary.description-main': '专业的公司秘书服务，确保您的业务持续符合香港法规。',
                'services.company-secretary.price': 'USD 1,180',
                'services.features.secretary': '专属公司秘书',
                'services.features.filing': '年度申报表填报',
                'services.features.coordination': '董事会会议协调',
                'services.features.monitoring': '法定合规监察',
                'services.features.maintenance': '企业记录维护',
                'services.features.support': '监管申报支援',
                'services.registered-address.title': '注册地址及邮件接收',
                'services.registered-address.description-short': '专业的注册地址服务，提供邮件处理和转寄功能。',
                'services.registered-address.price': 'USD 500',
                'services.audit-tax.title': '审计及税务申报',
                'services.audit-tax.description-short': '量身定制的全面税务申报支持。',
                'services.audit-tax.price': '按情况而定',
                'services.bank-account.title': '银行开户',
                'services.bank-account.description-short': '协助企业银行开户和建立银行关系。',
                'services.bank-account.price': '起价 USD 800',
                'services.ctc.title': 'CTC 认证',
                'services.ctc.description-short': '认证副本证明服务，用于官方文件认证。',
                'services.ctc.price': '按情況而定',
                'services.fund-note.text': '对基金相关注册服务感兴趣？',
                'services.fund-note.link': '请直接联系我们了解详情。',

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
                'how-it-works.auto-fill.description': '我们的系统根据您的信息自动准备所有必需的文件和表格。',
                'how-it-works.auto-fill.we-prepare': '我们准备：',
                'how-it-works.auto-fill.articles': '• 公司章程/组织章程',
                'how-it-works.auto-fill.operating-agreements': '• 运营协议',
                'how-it-works.auto-fill.state-forms': '• 特定表格',
                'how-it-works.auto-fill.resolutions': '• 公司决议',
                'how-it-works.review.description': '在我们进行申报之前，审查所有文件的准确性并批准它们。',
                'how-it-works.review.you-can': '您可以：',
                'how-it-works.review.review-online': '• 在线审查所有文件',
                'how-it-works.review.request-modifications': '• 要求修改',
                'how-it-works.review.ask-questions': '• 向我们的专家提问',
                'how-it-works.review.approve-documents': '• 批准最终文件',
                'how-it-works.review.track-progress': '• 实时跟踪进度',
                'how-it-works.submission.description': '我们向适当的机构提交所有文件，并交付您的完整套餐。',
                'how-it-works.submission.you-receive': '您将收到：',
                'how-it-works.submission.certified-documents': '• 商业登记证',
                'how-it-works.submission.certificate-incorporation': '• 公司注册证明书',
                'how-it-works.submission.articles-association': '• 公司章程',
                'how-it-works.submission.corporate-kit': '• 公司印章（如适用）',
                'how-it-works.submission.digital-copies': '• 所有文件的数字副本',
                'how-it-works.submission.support-info': '• 持续的信息支持',
                'how-it-works.timeline.title': '典型时间表',
                'how-it-works.timeline.day1': '第1天',
                'how-it-works.timeline.day1.description': '完成问卷和文件准备',
                'how-it-works.timeline.day2-3': '第2-3天',
                'how-it-works.timeline.day2-3.description': '审查、批准并向政府提交文件',
                'how-it-works.timeline.day5-7': '第5-7天',
                'how-it-works.timeline.day5-7.description': '收到批准的文件和完整的业务套餐',
                'how-it-works.different.title': '我们的与众不同之处',
                'how-it-works.different.lightning-fast.title': '闪电般快速',
                'how-it-works.different.lightning-fast.description': '大多数注册在5-7个工作日内完成，并提供加急选项。',
                'how-it-works.different.expert-review.title': '专家审查',
                'how-it-works.different.expert-review.description': '每份文件都由专家审查，以确保准确性和合规性。',
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

                // Contact Page
                'contact.office.title': '办公地址',
                'contact.office.address.line1': '中环中心39楼3室',
                'contact.office.address.line2': '皇后大道中99号 中环',
                'contact.office.address.line3': '香港',
                'contact.office.viewMap': '查看地图',

                'contact.methods.title': '联系方式',
                'contact.methods.hours.label': '办公时间',
                'contact.methods.hours.time': '周一至周五：上午9:00 - 下午6:00 (香港时间)',

                'contact.form.title': '发送消息',
                'contact.form.subtitle': '准备开始您的创业之旅？填写以下表格，我们的注册专家将在24小时内回复您。',
                'contact.form.name.label': '姓名 *',
                'contact.form.name.placeholder': '您的全名',
                'contact.form.email.label': '电子邮件 *',
                'contact.form.email.placeholder': 'your.email@example.com',
                'contact.form.company.label': '公司名称',
                'contact.form.company.placeholder': '您的公司名称（可选）',
                'contact.form.subject.label': '主题 *',
                'contact.form.subject.placeholder': '选择主题...',
                'contact.form.subject.options.general': '一般咨询',
                'contact.form.subject.options.funds': '基金服务',
                'contact.form.subject.options.secretary': '公司秘书',
                'contact.form.subject.options.others': '其他',
                'contact.form.message.label': '消息 *',
                'contact.form.message.placeholder': '告诉我们您的业务需求以及我们如何协助您...',
                'contact.form.submit': '发送消息',
                'contact.form.sending': '发送中...',
                'contact.form.success': '感谢您的消息！我们将在24小时内回复您。',
                'contact.form.error': '发送消息时出现错误。请重试或直接与我们联系。',

                // Page Titles
                'page.title.contact': '联系我们 - Fusiox',

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
                'insights.section.title': '最新洞察',
                'insights.section.subtitle': '通过我们关于企业治理和商业运营的最新见解和专家分析保持信息更新。',
                'insights.filter.all': '所有洞察',
                'insights.filter.company-secretary': '公司秘书服务',
                'insights.filter.fund': '基金服务',
                'insights.category.company-secretary': '公司秘书',
                'insights.category.fund': '基金',
                'insights.read-more': '阅读更多 →',
                'insights.no-posts': '暂无文章',
                'insights.loading': '加载中...',
                'insights.updated': '更新于',
                'insights.untitled': '无标题',

                // Insight Detail Page
                'insight-detail.published-on': '发布于',
                'insight-detail.updated-on': '更新于',
                'insight-detail.no-insight-selected': '未选择文章',
                'insight-detail.post-not-found': '文章未找到',
                'insight-detail.no-insight-desc': '请从洞察分析页面选择一篇文章来查看内容。',
                'insight-detail.post-not-found-desc': '您要查找的文章不存在或已被移动。',
                'insight-detail.view-all-btn': '查看所有洞察',

                // Page Titles
                'page.title.about': '关于我们 - Fusiox',
                'page.title.contact': '联系我们 - Fusiox',
                'page.title.faq': '常见问题 - Fusiox',
                'page.title.funds': '基金服务 - Fusiox',
                'page.title.how-it-works': '服务流程 - Fusiox',
                'page.title.insights': '洞察分析 - Fusiox',
                'page.title.services': '服务 - Fusiox',
                'page.title.index': 'Fusiox - 专业注册服务',

                // Breadcrumb
                'breadcrumb.home': '首页',
                'breadcrumb.insights': '洞察分析',

                // Insight Detail Page - Generic translations
                'insight-detail.back-btn': '← 返回洞察分析',
                'insight-detail.contact-btn': '获取专家建议',
                'insight-detail.services-btn': '我们的服务',
                'insight-detail.related-posts': '相关文章',
                'insight-detail.loading': '加载文章中...',
                'insight-detail.not-found': '找不到文章',

                // Common
                'common.language': '语言',

                // Diagram tooltips
                'diagram.gp.title': '普通合伙人 (GP)',
                'diagram.gp.desc': '普通合伙人负责基金管理和运营。',
                'diagram.im.title': '香港4/9号牌投资经理',
                'diagram.im.desc': '持牌投资经理提供投资建议和管理服务。',
                'diagram.lp.title': '有限合伙人 (LP)',
                'diagram.lp.desc': '有限合伙人提供资本但不参与管理。',
                'diagram.hklpf.title': '有限合伙基金 (HKLPF)',
                'diagram.hklpf.desc': '在香港注册的有限合伙基金主體。',
                'diagram.target1.title': '投資標的 1',
                'diagram.target1.desc': '基金投資的具體資產或項目。',
                'diagram.target2.title': '投資標的 2',
                'diagram.target2.desc': '基金投資的具體資產或項目。',
                // Diagram detail panels
                'diagram.gp.detail.title': '普通合夥人 (GP)',
                'diagram.gp.detail.1': '• 負責基金的日常管理和運營決策',
                'diagram.gp.detail.2': '• 承擔無限責任，對基金債務負責',
                'diagram.gp.detail.3': '• 制定投資策略和投資決策',
                'diagram.gp.detail.4': '• 管理基金的投資組合和風險控制',
                'diagram.gp.detail.5': '• 向有限合夥人報告基金業績和運營情況',
                'diagram.im.detail.title': '投資經理 (IM)',
                'diagram.im.detail.1': '• 持有香港證監會4號和/或9號牌照',
                'diagram.im.detail.2': '• 提供專業的投資建議和資產管理服務',
                'diagram.im.detail.3': '• 執行投資策略和交易指令',
                'diagram.im.detail.4': '• 進行投資研究和市場分析',
                'diagram.im.detail.5': '• 確保符合監管要求和合規標準',
                'diagram.lp.detail.title': '有限合夥人 (LP)',
                'diagram.lp.detail.1': '• 提供資本但不參與基金管理',
                'diagram.lp.detail.2': '• 享有有限責任保護',
                'diagram.lp.detail.3': '• 根據投資份額獲得收益分配',
                'diagram.lp.detail.4': '• 有權獲得基金運營和業績報告',
                'diagram.lp.detail.5': '• 可參與重大事項的投票決策',
                'diagram.hklpf.detail.title': '香港有限合夥基金 (HKLPF)',
                'diagram.hklpf.detail.1': '• 在香港註冊的有限合夥基金實體',
                'diagram.hklpf.detail.2': '• 享受香港優惠的稅務環境',
                'diagram.hklpf.detail.3': '• 受香港法律和監管框架保護',
                'diagram.hklpf.detail.4': '• 便於進行跨境投資和資金流動',
                'diagram.hklpf.detail.5': '• 提供專業的基金管理架構',
                'diagram.target1.detail.title': '投資標的',
                'diagram.target1.detail.1': '• 基金投資的具體資產或項目',
                'diagram.target1.detail.2': '• 可包括股權、債權、房地產等',
                'diagram.target1.detail.3': '• 根據基金策略進行多元化配置',
                'diagram.target1.detail.4': '• 定期評估投資價值和風險',
                'diagram.target1.detail.5': '• 目標實現資本增值和收益分配',
                'diagram.target2.detail.title': '投資標的',
                'diagram.target2.detail.1': '• 基金投資的具體資產或項目',
                'diagram.target2.detail.2': '• 可包括股權、債權、房地產等',
                'diagram.target2.detail.3': '• 根據基金策略進行多元化配置',
                'diagram.target2.detail.4': '• 定期評估投資價值和風險',
                'diagram.target2.detail.5': '• 目標實現資本增值和收益分配',
            }
        };
        console.log('Translations loaded. Available languages:', Object.keys(this.translations));
        console.log('English translations count:', Object.keys(this.translations.en).length);
        console.log('Sample English translation:', this.translations.en['services.hero.title']);
    }

    translate(key) {
        const translation = this.translations[this.currentLanguage]?.[key];
        const fallback = this.translations['en'][key];
        const result = translation || fallback || key;
        
        // Debug logging for missing translations
        if (!translation && !fallback) {
            console.warn(`Missing translation for key: ${key} in language: ${this.currentLanguage}`);
        }
        
        return result;
    }

    updatePageContent() {
        console.log('updatePageContent called, current language:', this.currentLanguage);
        console.log('document.readyState:', document.readyState);
        
        // Update all elements with data-i18n attribute
        const elements = document.querySelectorAll('[data-i18n]');
        console.log('Found', elements.length, 'elements with data-i18n attribute');
        
        if (elements.length === 0) {
            console.warn('No elements with data-i18n found!');
            return;
        }
        
        elements.forEach((element, index) => {
            const key = element.getAttribute('data-i18n');
            const translation = this.translate(key);
            const originalText = element.textContent;
            console.log(`Element ${index}: key="${key}", original="${originalText}", translation="${translation}"`);
            
            if (element.tagName === 'INPUT' && element.type === 'submit') {
                element.value = translation;
                console.log(`Updated input value for "${key}"`);
            } else if (element.hasAttribute('placeholder')) {
                element.placeholder = translation;
                console.log(`Updated placeholder for "${key}"`);
            } else {
                element.textContent = translation;
                console.log(`Updated textContent for "${key}" from "${originalText}" to "${translation}"`);
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

// Single initialization function
function initializeI18n() {
    console.log('Initializing i18n system...');
    if (window.i18n) {
        window.i18n.updatePageContent();
        window.i18n.updateHTMLLang();
        
        // Dispatch event to notify Alpine.js components that i18n is ready
        window.dispatchEvent(new CustomEvent('fusiox-i18n-ready', {
            detail: { i18n: window.i18n }
        }));
    } else {
        console.error('i18n system not available');
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeI18n);
} else {
    // DOM is already loaded
    initializeI18n();
}

// Additional fallback - wait a bit longer to ensure all content is loaded
setTimeout(initializeI18n, 1000);

// Alpine.js data for language switching
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
            
            // Listen for i18n ready event
            window.addEventListener('fusiox-i18n-ready', (event) => {
                if (window.i18n) {
                    this.currentLanguage = window.i18n.currentLanguage;
                    this.languages = window.i18n.getSupportedLanguages();
                }
            });
        },

        get currentLanguageObj() {
            return this.languages.find(lang => lang.code === this.currentLanguage) || this.languages[0];
        },

        changeLanguage(languageCode) {
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

