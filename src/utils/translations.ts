import Vue from 'vue';
import Axios from 'axios';
import {
	TranslationLangs,
	getTranslationLang,
} from '../lib/gj-lib-client/components/translate/translate.service';

export function bootstrapAppTranslations() {
	const availableLanguages: any = {};
	for (const _lang of TranslationLangs) {
		availableLanguages[_lang.code] = _lang.label;
	}

	let lang = getTranslationLang();
	let translations = require('!json-loader!../translations/en_US/main.json');

	const VueGettext = require('vue-gettext');
	Vue.use(VueGettext, {
		silent: true,
		availableLanguages,
		defaultLanguage: lang,
		translations,
	});
}

export async function loadCurrentLanguage(comp: Vue) {
	// This is always loaded.
	if (comp.$language.current === 'en_US') {
		return;
	}

	// Don't use webpack to require directly. If we did it would generate
	// new files for each section that we built for.
	const response = await Axios({
		url: require('!file-loader!../translations/' + comp.$language.current + '/main.json'),
		ignoreLoadingBar: true,
	});

	comp.$language.addTranslations(response.data);
}
