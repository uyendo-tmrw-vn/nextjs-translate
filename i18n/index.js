const en = require('./en.json');
const id = require('./id.json');

const i18n = {
  translations: {
    en,
    id,
  },
  defaultLang: 'en',
  useBrowserDefault: true,
};

module.exports = i18n;
