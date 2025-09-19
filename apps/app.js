function getGoogleTranslateLanguage() {
  const match = document.cookie.match(/googtrans=\/[^/]+\/([^;]+)/);
  return match ? match[1] : null;
}

// Only Arabic for RTL
const rtlLanguages = ['ar'];

// Flag so header padding is only applied once
let wrapperAdjusted = false;

function applyDirection(lang) {
  const wrapper = document.querySelector('.wrapper');
  const bootstrapLink = document.getElementById('bootstrap-css');

  // Add header padding only once
  if (wrapper && !wrapperAdjusted) {
    wrapper.style.paddingTop = '1.5rem';
    wrapperAdjusted = true;
  }

  if (rtlLanguages.includes(lang)) {
    // RTL handling
    document.body.setAttribute('dir', 'rtl');
    document.body.classList.add('rtl-mode');

    if (bootstrapLink) {
      bootstrapLink.setAttribute('href', 'bootstrap-5.3.8-dist/css/bootstrap.rtl.min.css');
    }
  } else {
    // LTR handling
    document.body.setAttribute('dir', 'ltr');
    document.body.classList.remove('rtl-mode');

    if (bootstrapLink) {
      bootstrapLink.setAttribute('href', 'bootstrap-5.3.8-dist/css/bootstrap.min.css');
    }
  }
}

// Run once on page load
let currentLang = getGoogleTranslateLanguage();
if (currentLang) {
  applyDirection(currentLang);
}

// Watch for language changes
const observer = new MutationObserver(() => {
  const newLang = document.documentElement.lang || getGoogleTranslateLanguage();
  if (newLang && newLang !== currentLang) {
    currentLang = newLang;
    applyDirection(newLang);
  }
});

observer.observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });


observer.observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
