# Multilingual Support Documentation

## Overview

The Fusiox Corporate Website now supports three languages:
- **English** (en) - Default language
- **Traditional Chinese** (zh-Hant) - 繁體中文  
- **Simplified Chinese** (zh-Hans) - 简体中文

## Implementation Details

### Technology Stack
- **Frontend Framework**: AlpineJS for reactive language switching
- **Translation System**: JavaScript-based i18n system with JSON-like translation objects
- **Storage**: LocalStorage for language preference persistence
- **UI Framework**: DaisyUI/TailwindCSS for language selector styling

### File Structure
```
assets/
  js/
    i18n.js          # Main internationalization system
*.html               # All HTML files updated with data-i18n attributes
```

## How to Use

### Language Selector
A language selector is available in the top navigation bar on all pages. Users can click the dropdown to switch between:
- English
- 繁體中文 (Traditional Chinese)
- 简体中文 (Simplified Chinese)

The selected language preference is automatically saved and restored on subsequent visits.

### Adding Translations

#### 1. Add Translation Keys
Edit `assets/js/i18n.js` and add new translation keys to all three language objects:

```javascript
// In the translations object for each language (en, zh-Hant, zh-Hans)
'your.translation.key': 'Your translated text here'
```

#### 2. Update HTML Elements
Add the `data-i18n` attribute to any HTML element you want to be translatable:

```html
<h1 data-i18n="your.translation.key">Default English Text</h1>
<p data-i18n="your.description.key">Default description text</p>
<button data-i18n="your.button.key">Default Button Text</button>
```

#### 3. Special Attributes
For form inputs and other special cases:

```html
<!-- For placeholder text -->
<input data-i18n-placeholder="form.placeholder.key" placeholder="Default placeholder">

<!-- For title attributes -->
<img data-i18n-title="image.title.key" title="Default title">
```

### Translation Key Naming Convention

Use a hierarchical naming system with dots:
- `nav.about` - Navigation items
- `hero.title` - Hero section content
- `services.company-incorporation.title` - Service-specific content
- `footer.copyright` - Footer content
- `common.language` - Common/shared text

### Current Translation Coverage

All major website sections are covered:
- Navigation menu
- Hero sections
- Service descriptions
- Why choose us sections
- Call-to-action buttons
- Footer content
- About page content
- Contact page content
- FAQ page content

## Technical Implementation

### Language Detection
1. First checks localStorage for saved preference
2. Falls back to English as default
3. Updates HTML `lang` attribute for accessibility

### Dynamic Content Updates
The system automatically updates:
- Text content in elements with `data-i18n` attributes
- Placeholder text in form elements
- Title attributes for tooltips
- HTML document language attribute

### Language Switching
When a user selects a new language:
1. Updates the global language setting
2. Saves preference to localStorage
3. Re-scans all translatable elements
4. Updates content immediately without page refresh

## Browser Support
- Modern browsers with ES6+ support
- AlpineJS compatible browsers
- LocalStorage support required for preference persistence

## Future Enhancements

1. **Additional Languages**: Easy to add more languages by:
   - Adding translation objects to `i18n.js`
   - Adding language options to the `getSupportedLanguages()` method

2. **Dynamic Loading**: Could be enhanced to load translation files dynamically for better performance

3. **Right-to-Left Support**: Framework ready for RTL languages if needed

4. **Translation Management**: Could integrate with translation management tools

## Troubleshooting

### Language Selector Not Showing
- Ensure AlpineJS is loading correctly
- Check browser console for JavaScript errors
- Verify `assets/js/i18n.js` is accessible

### Translations Not Working
- Check that `data-i18n` attributes match keys in translation objects
- Verify translation keys exist in all language objects
- Check browser console for missing translation warnings

### Language Not Persisting
- Ensure localStorage is available and not blocked
- Check if the domain allows localStorage access