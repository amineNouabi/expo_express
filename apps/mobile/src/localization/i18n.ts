import "intl-pluralrules";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./en/translation.json";
import fr from "./fr/translation.json";
import ar from "./ar/translation.json";

// the translations
export const resources = {
	en: {
		translation: en,
	},
	fr: {
		translation: fr,
	},
	ar: {
		translation: ar,
	},
};

i18n.use(initReactI18next).init({
	resources,
	lng: "ar",
	fallbackLng: "en",
	interpolation: {
		escapeValue: false,
	},
});
