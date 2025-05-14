let _currentLanguage = '';
let _fallbackLanguage = '';
let _languages = [];
let _translations = {};

export const getCurrentLanguage = () => {
  return _currentLanguage;
};

export const setCurrentLanguage = currentLanguage => {
  _currentLanguage = currentLanguage;
};

export const getFallbackLanguage = () => {
  return _fallbackLanguage;
};

export const setFallbackLanguage = fallbackLanguage => {
  _fallbackLanguage = fallbackLanguage;
};

export const getLanguages = () => {
  return _languages;
};

export const setLanguages = async (languages) => {
  _languages = languages;

  for (const language of languages) {
    const loadedLanguage = await import(`../Languages/${language}.json`);
    _translations[language] = loadedLanguage.default;
  }
};

export const getTranslations = () => {
  return _translations;
};

export const setTranslations = translations => {
  _translations = translations;
};

export const t = label => {
  return _translations[_currentLanguage] &&
    _translations[_currentLanguage][label]
    ? _translations[_currentLanguage][label]
    : _translations[_fallbackLanguage] &&
      _translations[_fallbackLanguage][label]
    ? _translations[_fallbackLanguage][label]
    : label;
};