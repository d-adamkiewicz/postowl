import i18n from '@sveltekit-i18n/base';
import parser from '@sveltekit-i18n/parser-icu';

import lang from './lang.json';

export const defaultLocale = 'en';
/** @type {import('sveltekit-i18n').Config} */
const config = {
	parser: parser({}),
	translations: {
		en: { lang },
		pl: { lang }
	},
	loaders: [
		{
			locale: 'en',
			key: 'common',
			loader: async () => (await import('./en/common.json')).default
		},
		{
			locale: 'pl',
			key: 'common',
			loader: async () => (await import('./pl/common.json')).default
		}
	]
};

export const {
	t,
	loading,
	locales,
	locale,
	translations,
	loadTranslations,
	addTranslations,
	setLocale,
	setRoute
} = new i18n(config);
