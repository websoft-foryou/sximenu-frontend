export const utils = {
  siteLanguage: function () {
    const currentLang = localStorage.getItem('lang');
    if (currentLang)
      return currentLang;
    return 'en'
  }
};