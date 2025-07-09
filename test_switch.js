// Test script to switch language
setTimeout(() => {
    console.log('Current language:', window.i18n.currentLanguage);
    console.log('Switching to Traditional Chinese...');
    window.i18n.setLanguage('zh-Hant');
    
    setTimeout(() => {
        console.log('Checking text after switching...');
        const title = document.querySelector('[data-i18n="how-it-works.different.all-in-one.title"]');
        if (title) {
            console.log('All-in-One Platform title text:', title.textContent);
        }
        
        const expertReview = document.querySelector('[data-i18n="how-it-works.different.expert-review.title"]');
        if (expertReview) {
            console.log('Expert Review title text:', expertReview.textContent);
        }
    }, 1000);
}, 2000);
