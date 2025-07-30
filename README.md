# Fusiox Corporate Website

A modern, responsive corporate website for Fusiox Corporate Services Limited, specializing in professional business incorporation and fund management services in Hong Kong.

## 🌟 Features

### Core Functionality
- **Multilingual Support**: English, Traditional Chinese (繁體中文), and Simplified Chinese (简体中文)
- **Responsive Design**: Mobile-first approach with DaisyUI and TailwindCSS
- **Interactive Components**: Enhanced with Alpine.js for dynamic user interactions
- **Performance Optimized**: Fast loading with local assets and efficient CSS/JS delivery
- **SEO Ready**: Proper meta tags, semantic HTML, and structured content

### Key Sections
- **Homepage**: Hero section, service overview, testimonials, and CTA
- **About**: Company mission, vision, values, and team information
- **Services**: Comprehensive service listings with interactive comparisons
- **How It Works**: Step-by-step process guide with visual diagrams
- **Funds**: Specialized fund management services
- **Insights**: Industry knowledge and regulatory updates
- **FAQ**: Frequently asked questions with collapsible answers
- **Contact**: Enhanced contact form with multiple communication channels

## 🛠️ Technology Stack

| Component | Technology |
|-----------|------------|
| **Frontend Framework** | HTML5, CSS3, JavaScript |
| **CSS Framework** | TailwindCSS v3.x |
| **UI Components** | DaisyUI v4.4.19 (Coffee theme) |
| **JavaScript Framework** | Alpine.js v3.x |
| **Animations** | AOS (Animate On Scroll) v2.3.1 |
| **Fonts** | Inter (Google Fonts) |
| **Icons** | Heroicons (inline SVG) |
| **Deployment** | Vercel (configured) |
| **Asset Management** | Local storage with optimized images |

## 📁 Project Structure

```
/
├── index.html              # Homepage
├── about.html              # About us page
├── services.html           # Services overview
├── how-it-works.html       # Process explanation
├── funds.html              # Fund management services
├── contact.html            # Contact form and information
├── faq.html                # Frequently asked questions
├── insights.html           # Industry insights hub
├── vercel.json             # Vercel deployment configuration
├── prd.md                  # Product Requirements Document
├── I18N_DOCUMENTATION.md   # Internationalization guide
├── README.md               # This file
├── assets/
│   ├── css/
│   │   ├── enhanced-contact-form.css
│   │   ├── hklpf-diagram.css
│   │   └── sticky-header.css
│   ├── js/
│   │   ├── i18n.js                    # Internationalization system
│   │   ├── enhanced-contact-form.js   # Contact form functionality
│   │   ├── hklpf-diagram.js          # Interactive diagrams
│   │   ├── mobile-touch.js           # Mobile touch enhancements
│   │   ├── modal-system.js           # Modal components
│   │   ├── service-comparison.js     # Service comparison tool
│   │   └── sticky-header.js          # Navigation enhancements
│   └── images/
│       ├── about-hero.jpg            # About page hero background
│       ├── services-hero.jpg         # Services page hero background
│       ├── faq-hero.jpg              # FAQ page hero background
│       ├── contact-hero.jpg          # Contact page hero background
│       ├── funds-hero.jpg            # Funds page hero background
│       ├── mission.jpg               # About page mission image
│       ├── vision.jpg                # About page vision image
│       ├── company-incorporation.jpg # Service illustration
│       ├── legal-compliance.jpg      # Service illustration
│       ├── ongoing-support.jpg       # Service illustration
│       ├── bruce-lee-statue.jpg      # Hong Kong landmark
│       ├── hk-flag-building.jpg      # Hong Kong architecture
│       ├── hk.jpg                    # Hong Kong cityscape
│       └── hk-cityscape.jpg          # Hong Kong panorama
└── insights/
    ├── annual-filing-requirements.html
    ├── company-secretary-best-practices.html
    ├── digital-transformation-corporate.html
    ├── esg-fund-strategies.html
    ├── fund-governance-trends.html
    └── regulatory-updates-funds.html
```

## 🚀 Getting Started

### Prerequisites
- A modern web browser
- Basic web server for local development (optional)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/xerosumio/Fusiox-Corporate-Website.git
   cd Fusiox-Corporate-Website
   ```

2. **Serve locally** (choose one method)
   
   **Using Python:**
   ```bash
   python -m http.server 8000
   ```
   
   **Using Node.js (http-server):**
   ```bash
   npx http-server
   ```
   
   **Using Live Server (VS Code extension):**
   - Install Live Server extension
   - Right-click `index.html` → "Open with Live Server"

3. **Open in browser**
   - Navigate to `http://localhost:8000` (or the port shown)
   - The website will load with the default English language

### Deployment

The project is configured for **Vercel** deployment:

1. **Deploy to Vercel:**
   ```bash
   vercel --prod
   ```

2. **Or deploy via GitHub:**
   - Connect your GitHub repository to Vercel
   - Automatic deployments on push to main branch

## ⚙️ Configuration

### Language Settings
The website supports three languages with automatic detection and storage:
- English (en) - Default
- Traditional Chinese (zh-Hant)
- Simplified Chinese (zh-Hans)

Language preferences are stored in localStorage and persist across sessions.

### Theme Customization
The website uses DaisyUI's "coffee" theme. To change themes:

1. Update the `data-theme` attribute in HTML files:
   ```html
   <html lang="en" data-theme="your-theme-name">
   ```

2. Available DaisyUI themes: light, dark, cupcake, bumblebee, emerald, corporate, synthwave, retro, cyberpunk, valentine, halloween, garden, forest, aqua, lofi, pastel, fantasy, wireframe, black, luxury, dracula, cmyk, autumn, business, acid, lemonade, night, coffee, winter

### Contact Form
The contact form is enhanced with:
- Real-time validation
- Mobile-optimized input fields
- Success/error feedback
- Form submission handling (requires backend integration)

## 🌐 Internationalization (i18n)

### Adding New Languages

1. **Update i18n.js:**
   ```javascript
   // Add new language to translations object
   'new-lang': {
     'nav.home': 'Your translation',
     // ... other translations
   }
   ```

2. **Update language selector:**
   ```javascript
   // Add to languages array
   { code: 'new-lang', name: 'Language Name', nativeName: 'Native Name' }
   ```

3. **Add HTML attributes:**
   ```html
   <element data-i18n="translation.key">Default text</element>
   ```

### Translation Guidelines
- Use nested keys for organization (e.g., `nav.home`, `about.mission.title`)
- Keep translations consistent across all languages
- Test language switching functionality
- Ensure proper text direction for RTL languages if needed

## 📱 Mobile Optimization

- **Responsive Breakpoints**: Tailored for mobile, tablet, and desktop
- **Touch Interactions**: Enhanced touch handling for mobile devices
- **Performance**: Optimized images and lazy loading
- **Navigation**: Mobile-friendly hamburger menu
- **Forms**: Touch-optimized input fields and buttons

## 🎨 Design System

### Typography
- **Primary Font**: Inter (Google Fonts)
- **Weights**: 300, 400, 500, 600, 700
- **Hierarchy**: Consistent heading scales and body text

### Colors
- **Theme**: DaisyUI Coffee theme
- **Accents**: Primary, secondary, accent colors from DaisyUI
- **Semantic**: Success, warning, error states

### Components
- **Cards**: Consistent styling with hover effects
- **Buttons**: Multiple variants with animations
- **Forms**: Unified input styling and validation states
- **Navigation**: Sticky header with mobile hamburger menu

## 🔧 Development

### Adding New Pages

1. **Create HTML file** following the existing structure
2. **Include required dependencies:**
   ```html
   <link href="https://cdn.jsdelivr.net/npm/daisyui@4.4.19/dist/full.min.css" rel="stylesheet" />
   <script src="https://cdn.tailwindcss.com"></script>
   <script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"></script>
   <script src="assets/js/i18n.js"></script>
   ```
3. **Add navigation links** to all existing pages
4. **Include i18n attributes** for multilingual support

### Custom JavaScript Components

#### Language Selector (Alpine.js)
```javascript
function languageSelector() {
    return {
        isOpen: false,
        toggleDropdown() { this.isOpen = !this.isOpen; },
        closeDropdown() { this.isOpen = false; }
    };
}
```

#### Contact Form Enhancement
```javascript
// Enhanced form validation and submission
// See assets/js/enhanced-contact-form.js
```

### CSS Customization

Custom styles are organized in separate CSS files:
- `sticky-header.css`: Navigation enhancements
- `enhanced-contact-form.css`: Form styling
- `hklpf-diagram.css`: Interactive diagram styles

## 📊 Performance

### Optimization Features
- **Image Optimization**: All images stored locally with appropriate compression
- **CSS/JS Minification**: CDN-delivered frameworks for caching
- **Lazy Loading**: AOS library for scroll-based animations
- **Caching**: Vercel edge caching and browser caching headers

### Loading Speed
- **First Contentful Paint**: Optimized with critical CSS inlining
- **Largest Contentful Paint**: Hero images optimized for web
- **Cumulative Layout Shift**: Prevented with proper image dimensions

## 🧪 Testing

### Browser Compatibility
- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+
- Mobile browsers (iOS Safari, Chrome Mobile)

### Testing Checklist
- [ ] All pages load without errors
- [ ] Language switching works correctly
- [ ] Contact form validation functions
- [ ] Mobile responsiveness verified
- [ ] Images load properly
- [ ] Navigation works on all devices
- [ ] AOS animations trigger correctly

## 📈 SEO Optimization

### Implemented Features
- **Meta Tags**: Title, description, keywords for each page
- **Open Graph**: Social media sharing optimization
- **Semantic HTML**: Proper heading hierarchy and structure
- **Alt Tags**: All images have descriptive alt attributes
- **Schema Markup**: Ready for structured data implementation

### Recommended Improvements
- Add structured data (JSON-LD) for business information
- Implement sitemap.xml
- Add robots.txt
- Optimize Core Web Vitals
- Add analytics tracking (Google Analytics/other)

## 🔒 Security

### Current Measures
- **Content Security Policy**: Configured in Vercel headers
- **HTTPS**: Enforced in production
- **Form Validation**: Client-side and server-side (when integrated)
- **Asset Integrity**: CDN resources with integrity hashes

## 🤝 Contributing

### Development Workflow
1. Create feature branch from `main`
2. Make changes following existing code patterns
3. Test on multiple devices and browsers
4. Update translations if adding new content
5. Submit pull request for review

### Code Standards
- **HTML**: Semantic, accessible markup
- **CSS**: Utility-first with TailwindCSS
- **JavaScript**: ES6+ with Alpine.js patterns
- **Images**: WebP format preferred, proper compression
- **Translations**: Complete coverage for all languages

## 📞 Support

For technical support or business inquiries:
- **Email**: info@fusiox.ai
- **Address**: Room 3903, The Center, 99 Queen's Road Central, Hong Kong
- **Website**: [Contact Page](contact.html)

## 📄 License

© 2025 Fusiox Corporate Services Limited. All rights reserved.

---

Built with ❤️ in Hong Kong using modern web technologies.