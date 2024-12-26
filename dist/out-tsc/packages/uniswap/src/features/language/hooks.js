import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useUrlContext } from 'uniswap/src/contexts/UrlContext';
import { DEFAULT_LOCALE, Language, PLATFORM_SUPPORTED_LANGUAGES, mapLanguageToLocale, } from 'uniswap/src/features/language/constants';
import { selectCurrentLanguage } from 'uniswap/src/features/settings/selectors';
import { isInterface } from 'utilities/src/platform';
/**
 * Helper function used get the locale from the language. They're strongly associated,
 * but they have different ISO values and are used differently. Locale is what's mainly
 * used for integrations with other libraries, while language is more internal
 * @param language target language
 * @returns associated locale
 */
export function getLocale(language) {
    return mapLanguageToLocale[language];
}
/**
 * Returns all relevant info for the target language, including the translated name of
 * that language in that language (not a typo).
 * @param language target language
 * @returns all relevant language info
 */
export function getLanguageInfo(t, language) {
    const languageToLanguageInfo = {
        [Language.Afrikaans]: {
            displayName: t('language.afrikaans'),
            originName: t('language.afrikaans', { lng: getLocale(Language.Afrikaans) }),
            loggingName: 'Afrikaans',
            locale: getLocale(Language.Afrikaans),
        },
        [Language.Arabic]: {
            displayName: t('language.arabic'),
            originName: t('language.arabic', { lng: getLocale(Language.Arabic) }),
            loggingName: 'Arabic',
            locale: getLocale(Language.Arabic),
        },
        [Language.Catalan]: {
            displayName: t('language.catalan'),
            originName: t('language.catalan', { lng: getLocale(Language.Catalan) }),
            loggingName: 'Catalan',
            locale: getLocale(Language.Catalan),
        },
        [Language.ChineseSimplified]: {
            displayName: t('language.chineseSimplified'),
            originName: t('language.chineseSimplified', { lng: getLocale(Language.ChineseSimplified) }),
            loggingName: 'Chinese, Simplified',
            locale: getLocale(Language.ChineseSimplified),
        },
        [Language.ChineseTraditional]: {
            displayName: t('language.chineseTraditional'),
            originName: t('language.chineseTraditional', {
                lng: getLocale(Language.ChineseTraditional),
            }),
            loggingName: 'Chinese, Traditional',
            locale: getLocale(Language.ChineseTraditional),
        },
        [Language.Czech]: {
            displayName: t('language.czech'),
            originName: t('language.czech', { lng: getLocale(Language.Czech) }),
            loggingName: 'Czech',
            locale: getLocale(Language.Czech),
        },
        [Language.Danish]: {
            displayName: t('language.danish'),
            originName: t('language.danish', { lng: getLocale(Language.Danish) }),
            loggingName: 'Danish',
            locale: getLocale(Language.Danish),
        },
        [Language.Dutch]: {
            displayName: t('language.dutch'),
            originName: t('language.dutch', { lng: getLocale(Language.Dutch) }),
            loggingName: 'Dutch',
            locale: getLocale(Language.Dutch),
        },
        [Language.English]: {
            displayName: t('language.english'),
            originName: t('language.english', { lng: getLocale(Language.English) }),
            loggingName: 'English',
            locale: getLocale(Language.English),
        },
        [Language.Finnish]: {
            displayName: t('language.finnish'),
            originName: t('language.finnish', { lng: getLocale(Language.Finnish) }),
            loggingName: 'Finnish',
            locale: getLocale(Language.Finnish),
        },
        [Language.French]: {
            displayName: t('language.french'),
            originName: t('language.french', { lng: getLocale(Language.French) }),
            loggingName: 'French',
            locale: getLocale(Language.French),
        },
        [Language.Greek]: {
            displayName: t('language.greek'),
            originName: t('language.greek', { lng: getLocale(Language.Greek) }),
            loggingName: 'Greek',
            locale: getLocale(Language.Greek),
        },
        [Language.Hebrew]: {
            displayName: t('language.hebrew'),
            originName: t('language.hebrew', { lng: getLocale(Language.Hebrew) }),
            loggingName: 'Hebrew',
            locale: getLocale(Language.Hebrew),
        },
        [Language.Hindi]: {
            displayName: t('language.hindi'),
            originName: t('language.hindi', { lng: getLocale(Language.Hindi) }),
            loggingName: 'Hindi',
            locale: getLocale(Language.Hindi),
        },
        [Language.Hungarian]: {
            displayName: t('language.hungarian'),
            originName: t('language.hungarian', { lng: getLocale(Language.Hungarian) }),
            loggingName: 'Hungarian',
            locale: getLocale(Language.Hungarian),
        },
        [Language.Indonesian]: {
            displayName: t('language.indonesian'),
            originName: t('language.indonesian', { lng: getLocale(Language.Indonesian) }),
            loggingName: 'Indonesian',
            locale: getLocale(Language.Indonesian),
        },
        [Language.Italian]: {
            displayName: t('language.italian'),
            originName: t('language.italian', { lng: getLocale(Language.Italian) }),
            loggingName: 'Italian',
            locale: getLocale(Language.Italian),
        },
        [Language.Japanese]: {
            displayName: t('language.japanese'),
            originName: t('language.japanese', { lng: getLocale(Language.Japanese) }),
            loggingName: 'Japanese',
            locale: getLocale(Language.Japanese),
        },
        [Language.Korean]: {
            displayName: t('language.korean'),
            originName: t('language.korean', { lng: getLocale(Language.Korean) }),
            loggingName: 'Korean',
            locale: getLocale(Language.Korean),
        },
        [Language.Malay]: {
            displayName: t('language.malay'),
            originName: t('language.malay', { lng: getLocale(Language.Malay) }),
            loggingName: 'Malay',
            locale: getLocale(Language.Malay),
        },
        [Language.Norwegian]: {
            displayName: t('language.norwegian'),
            originName: t('language.norwegian', { lng: getLocale(Language.Norwegian) }),
            loggingName: 'Norweigan',
            locale: getLocale(Language.Norwegian),
        },
        [Language.Polish]: {
            displayName: t('language.polish'),
            originName: t('language.polish', { lng: getLocale(Language.Polish) }),
            loggingName: 'Polish',
            locale: getLocale(Language.Polish),
        },
        [Language.Portuguese]: {
            displayName: t('language.portuguese'),
            originName: t('language.portuguese', { lng: getLocale(Language.Portuguese) }),
            loggingName: 'Portuguese',
            locale: getLocale(Language.Portuguese),
        },
        [Language.Romanian]: {
            displayName: t('language.romanian'),
            originName: t('language.romanian', { lng: getLocale(Language.Romanian) }),
            loggingName: 'Romanian',
            locale: getLocale(Language.Romanian),
        },
        [Language.Russian]: {
            displayName: t('language.russian'),
            originName: t('language.russian', { lng: getLocale(Language.Russian) }),
            loggingName: 'Russian',
            locale: getLocale(Language.Russian),
        },
        [Language.Serbian]: {
            displayName: t('language.serbian'),
            originName: t('language.serbian', { lng: getLocale(Language.Serbian) }),
            loggingName: 'Serbian',
            locale: getLocale(Language.Serbian),
        },
        [Language.SpanishSpain]: {
            displayName: t('language.spanishSpain'),
            originName: t('language.spanishSpain', { lng: getLocale(Language.SpanishSpain) }),
            loggingName: 'Spanish (Spain)',
            locale: getLocale(Language.SpanishSpain),
        },
        [Language.SpanishLatam]: {
            displayName: t('language.spanishLatam'),
            originName: t('language.spanishLatam', { lng: getLocale(Language.SpanishLatam) }),
            loggingName: 'Spanish (Latin America)',
            locale: getLocale(Language.SpanishLatam),
        },
        [Language.SpanishUnitedStates]: {
            displayName: t('language.spanishUs'),
            originName: t('language.spanishUs', { lng: getLocale(Language.SpanishUnitedStates) }),
            loggingName: 'Spanish (US)',
            locale: getLocale(Language.SpanishUnitedStates),
        },
        [Language.Swahili]: {
            displayName: t('language.swahili'),
            originName: t('language.swahili', { lng: getLocale(Language.Swahili) }),
            loggingName: 'Swahili',
            locale: getLocale(Language.Swahili),
        },
        [Language.Swedish]: {
            displayName: t('language.swedish'),
            originName: t('language.swedish', { lng: getLocale(Language.Swedish) }),
            loggingName: 'Swedish',
            locale: getLocale(Language.Swedish),
        },
        [Language.Turkish]: {
            displayName: t('language.turkish'),
            originName: t('language.turkish', { lng: getLocale(Language.Turkish) }),
            loggingName: 'Turkish',
            locale: getLocale(Language.Turkish),
        },
        [Language.Ukrainian]: {
            displayName: t('language.ukrainian'),
            originName: t('language.ukrainian', { lng: getLocale(Language.Ukrainian) }),
            loggingName: 'Ukrainian',
            locale: getLocale(Language.Ukrainian),
        },
        [Language.Urdu]: {
            displayName: t('language.urdu'),
            originName: t('language.urdu', { lng: getLocale(Language.Urdu) }),
            loggingName: 'Urdu',
            locale: getLocale(Language.Urdu),
        },
        [Language.Vietnamese]: {
            displayName: t('language.vietnamese'),
            originName: t('language.vietnamese', { lng: getLocale(Language.Vietnamese) }),
            loggingName: 'Vietnamese',
            locale: getLocale(Language.Vietnamese),
        },
    };
    return languageToLanguageInfo[language];
}
// Language
/**
 * Hook used to get the currently selected language for the app
 * @returns currently selected language enum
 */
export function useCurrentLanguage() {
    return useSelector(selectCurrentLanguage);
}
export function useLanguageInfo(language) {
    const { t } = useTranslation();
    return getLanguageInfo(t, language);
}
/**
 * Hook used to get all relevant info for the currently selected language in the app
 * @returns all relevant language info
 */
export function useCurrentLanguageInfo() {
    const currentLanguage = useCurrentLanguage();
    return useLanguageInfo(currentLanguage);
}
// Locale
/**
 * Returns the supported locale read from the user agent (navigator)
 */
export function navigatorLocale() {
    var _a;
    if (!navigator.language) {
        return undefined;
    }
    const [language, region] = navigator.language.split('-');
    if (region) {
        return (_a = parseLocale(`${language}-${region.toUpperCase()}`)) !== null && _a !== void 0 ? _a : parseLocale(language);
    }
    return parseLocale(language);
}
/**
 * Given a locale string (e.g. from user agent), return the best match for corresponding Locale enum object
 * @param maybeSupportedLocale the fuzzy locale identifier
 */
export function parseLocale(maybeSupportedLocale) {
    if (typeof maybeSupportedLocale !== 'string') {
        return undefined;
    }
    const lowerMaybeSupportedLocale = maybeSupportedLocale.toLowerCase();
    return PLATFORM_SUPPORTED_LANGUAGES.map((lang) => getLocale(lang)).find((locale) => locale.toLowerCase() === lowerMaybeSupportedLocale || locale.split('-')[0] === lowerMaybeSupportedLocale);
}
/**
 * Hook used to get the locale for the currently selected language in the app
 * @returns locale for the currently selected language
 */
export function useCurrentLocale() {
    const { useParsedQueryString } = useUrlContext();
    const parsedQueryString = useParsedQueryString();
    const urlLocale = parseLocale(parsedQueryString.lng);
    const currentLanguage = useCurrentLanguage();
    const currentLocale = getLocale(currentLanguage);
    return useMemo(() => {
        var _a, _b;
        if (isInterface) {
            return (_b = (_a = urlLocale !== null && urlLocale !== void 0 ? urlLocale : currentLocale) !== null && _a !== void 0 ? _a : navigatorLocale()) !== null && _b !== void 0 ? _b : DEFAULT_LOCALE;
        }
        else {
            return currentLocale;
        }
    }, [urlLocale, currentLocale]);
}
//# sourceMappingURL=hooks.js.map