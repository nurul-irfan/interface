import { isInterface } from 'utilities/src/platform';
/**
 * List of supported languages in app, represented by ISO 639 language code.
 * If you add a new locale here, be sure to add polyfills for it in intl.js,
 * resource strings in i18n.ts, and supported localizations in the Uniswap Xcode project.
 */
export var Language;
(function (Language) {
    Language["Afrikaans"] = "af";
    Language["Arabic"] = "ar";
    Language["Catalan"] = "ca-ES";
    Language["ChineseSimplified"] = "zh";
    Language["ChineseTraditional"] = "zh-Hant";
    Language["Czech"] = "cs";
    Language["Danish"] = "da";
    Language["Dutch"] = "nl";
    Language["English"] = "en";
    Language["Finnish"] = "fi";
    Language["French"] = "fr";
    Language["Greek"] = "el";
    Language["Hebrew"] = "he";
    Language["Hindi"] = "hi";
    Language["Hungarian"] = "hu";
    Language["Indonesian"] = "id";
    Language["Italian"] = "it";
    Language["Japanese"] = "ja";
    Language["Korean"] = "ko";
    Language["Malay"] = "ms";
    Language["Norwegian"] = "no";
    Language["Polish"] = "pl";
    Language["Portuguese"] = "pt";
    Language["Romanian"] = "ro";
    Language["Russian"] = "ru";
    Language["Serbian"] = "sr";
    Language["SpanishSpain"] = "es";
    Language["SpanishLatam"] = "es-419";
    Language["SpanishUnitedStates"] = "es-US";
    Language["Swahili"] = "sw";
    Language["Swedish"] = "sv";
    Language["Turkish"] = "tr";
    Language["Ukrainian"] = "uk";
    Language["Urdu"] = "ur";
    Language["Vietnamese"] = "vi";
})(Language || (Language = {}));
export const WALLET_SUPPORTED_LANGUAGES = [
    Language.English,
    Language.ChineseSimplified,
    Language.ChineseTraditional,
    Language.French,
    Language.Japanese,
    Language.Portuguese,
    Language.SpanishSpain,
    Language.SpanishLatam,
    Language.SpanishUnitedStates,
];
// Web's supported Languages
// order as they appear in the language dropdown
export const WEB_SUPPORTED_LANGUAGES = [
    Language.English,
    Language.Afrikaans,
    Language.Arabic,
    Language.Catalan,
    Language.ChineseSimplified,
    Language.ChineseTraditional,
    Language.Danish,
    Language.Dutch,
    Language.Finnish,
    Language.French,
    Language.Greek,
    Language.Hebrew,
    Language.Hindi,
    Language.Hungarian,
    Language.Indonesian,
    Language.Italian,
    Language.Japanese,
    Language.Korean,
    Language.Malay,
    Language.Polish,
    Language.Portuguese,
    Language.Russian,
    Language.Serbian,
    Language.SpanishSpain,
    Language.SpanishLatam,
    Language.SpanishUnitedStates,
    Language.Swahili,
    Language.Swedish,
    Language.Turkish,
    Language.Ukrainian,
    Language.Urdu,
    Language.Vietnamese,
];
export const PLATFORM_SUPPORTED_LANGUAGES = isInterface ? WEB_SUPPORTED_LANGUAGES : WALLET_SUPPORTED_LANGUAGES;
/**
 * External mapping to be used with system locale strings trying to resolve to specific language
 * Included different Spanish variations availabled on Android/iOS as of 11/17/23
 */
export const mapDeviceLanguageToLanguage = {
    'es-AR': Language.SpanishLatam,
    'es-BO': Language.SpanishLatam,
    'es-BZ': Language.SpanishLatam,
    'es-BR': Language.SpanishLatam,
    'es-CL': Language.SpanishLatam,
    'es-CO': Language.SpanishLatam,
    'es-CR': Language.SpanishLatam,
    'es-CU': Language.SpanishLatam,
    'es-DO': Language.SpanishLatam,
    'es-EC': Language.SpanishLatam,
    'es-SV': Language.SpanishLatam,
    'es-GT': Language.SpanishLatam,
    'es-GQ': Language.SpanishLatam, // Equatorial Guinea is an African country but format is closer to LATAM
    'es-HN': Language.SpanishLatam,
    'es-MX': Language.SpanishLatam,
    'es-NI': Language.SpanishLatam,
    'es-PA': Language.SpanishLatam,
    'es-PY': Language.SpanishLatam,
    'es-PE': Language.SpanishLatam,
    'es-PR': Language.SpanishUnitedStates,
    'es-UY': Language.SpanishLatam,
    'es-VE': Language.SpanishLatam,
};
/**
 * List of supported locales in app, comprised of two letter language code (ISO 639) combined with two letter country code (ISO 3166).
 * Matches to locale codes for languages provided by Crowdin
 */
export var Locale;
(function (Locale) {
    Locale["Afrikaans"] = "af-ZA";
    Locale["ArabicSaudi"] = "ar-SA";
    Locale["Catalan"] = "ca-ES";
    Locale["ChineseSimplified"] = "zh-Hans";
    Locale["ChineseTraditional"] = "zh-Hant";
    Locale["CzechCzechia"] = "cs-CZ";
    Locale["DanishDenmark"] = "da-DK";
    Locale["DutchNetherlands"] = "nl-NL";
    Locale["EnglishUnitedStates"] = "en-US";
    Locale["FinnishFinland"] = "fi-FI";
    Locale["FrenchFrance"] = "fr-FR";
    Locale["GreekGreece"] = "el-GR";
    Locale["HebrewIsrael"] = "he-IL";
    Locale["HindiIndia"] = "hi-IN";
    Locale["HungarianHungarian"] = "hu-HU";
    Locale["IndonesianIndonesia"] = "id-ID";
    Locale["ItalianItaly"] = "it-IT";
    Locale["JapaneseJapan"] = "ja-JP";
    Locale["KoreanKorea"] = "ko-KR";
    Locale["MalayMalaysia"] = "ms-MY";
    Locale["NorwegianNorway"] = "no-NO";
    Locale["PolishPoland"] = "pl-PL";
    Locale["PortugueseBrazil"] = "pt-BR";
    Locale["PortuguesePortugal"] = "pt-PT";
    Locale["RomanianRomania"] = "ro-RO";
    Locale["RussianRussia"] = "ru-RU";
    Locale["Serbian"] = "sr-SP";
    Locale["SpanishSpain"] = "es-ES";
    Locale["SpanishLatam"] = "es-419";
    Locale["SpanishUnitedStates"] = "es-US";
    Locale["SwahiliTanzania"] = "sw-TZ";
    Locale["SwedishSweden"] = "sv-SE";
    Locale["TurkishTurkey"] = "tr-TR";
    Locale["UkrainianUkraine"] = "uk-UA";
    Locale["UrduPakistan"] = "ur-PK";
    Locale["VietnameseVietnam"] = "vi-VN";
})(Locale || (Locale = {}));
export const DEFAULT_LOCALE = Locale.EnglishUnitedStates;
/**
 * Internal app mapping between language and locale enums
 * This is needed because we not support all locales and default languages to specific locales
 */
export const mapLanguageToLocale = {
    [Language.Afrikaans]: Locale.Afrikaans,
    [Language.Arabic]: Locale.ArabicSaudi,
    [Language.Catalan]: Locale.Catalan,
    [Language.ChineseSimplified]: Locale.ChineseSimplified,
    [Language.ChineseTraditional]: Locale.ChineseTraditional,
    [Language.Czech]: Locale.CzechCzechia,
    [Language.Danish]: Locale.DanishDenmark,
    [Language.Dutch]: Locale.DutchNetherlands,
    [Language.English]: Locale.EnglishUnitedStates,
    [Language.Finnish]: Locale.FinnishFinland,
    [Language.French]: Locale.FrenchFrance,
    [Language.Greek]: Locale.GreekGreece,
    [Language.Hebrew]: Locale.HebrewIsrael,
    [Language.Hindi]: Locale.HindiIndia,
    [Language.Hungarian]: Locale.HungarianHungarian,
    [Language.Indonesian]: Locale.IndonesianIndonesia,
    [Language.Italian]: Locale.ItalianItaly,
    [Language.Japanese]: Locale.JapaneseJapan,
    [Language.Korean]: Locale.KoreanKorea,
    [Language.Malay]: Locale.MalayMalaysia,
    [Language.Norwegian]: Locale.NorwegianNorway,
    [Language.Polish]: Locale.PolishPoland,
    [Language.Portuguese]: Locale.PortuguesePortugal,
    [Language.Romanian]: Locale.RomanianRomania,
    [Language.Russian]: Locale.RussianRussia,
    [Language.SpanishSpain]: Locale.SpanishSpain,
    [Language.SpanishLatam]: Locale.SpanishLatam,
    [Language.SpanishUnitedStates]: Locale.SpanishUnitedStates,
    [Language.Serbian]: Locale.Serbian,
    [Language.Swahili]: Locale.SwahiliTanzania,
    [Language.Swedish]: Locale.SwedishSweden,
    [Language.Turkish]: Locale.TurkishTurkey,
    [Language.Ukrainian]: Locale.UkrainianUkraine,
    [Language.Urdu]: Locale.UrduPakistan,
    [Language.Vietnamese]: Locale.VietnameseVietnam,
};
/**
 * Internal app mapping between language and locale enums
 * This is needed because we not support all locales and default languages to specific locales
 */
export const mapLocaleToLanguage = {
    [Locale.Afrikaans]: Language.Afrikaans,
    [Locale.ArabicSaudi]: Language.Arabic,
    [Locale.Catalan]: Language.Catalan,
    [Locale.ChineseSimplified]: Language.ChineseSimplified,
    [Locale.ChineseTraditional]: Language.ChineseTraditional,
    [Locale.CzechCzechia]: Language.Czech,
    [Locale.DanishDenmark]: Language.Danish,
    [Locale.DutchNetherlands]: Language.Dutch,
    [Locale.EnglishUnitedStates]: Language.English,
    [Locale.FinnishFinland]: Language.Finnish,
    [Locale.FrenchFrance]: Language.French,
    [Locale.GreekGreece]: Language.Greek,
    [Locale.HebrewIsrael]: Language.Hebrew,
    [Locale.HindiIndia]: Language.Hindi,
    [Locale.HungarianHungarian]: Language.Hungarian,
    [Locale.IndonesianIndonesia]: Language.Indonesian,
    [Locale.ItalianItaly]: Language.Italian,
    [Locale.JapaneseJapan]: Language.Japanese,
    [Locale.KoreanKorea]: Language.Korean,
    [Locale.MalayMalaysia]: Language.Malay,
    [Locale.NorwegianNorway]: Language.Norwegian,
    [Locale.PolishPoland]: Language.Polish,
    [Locale.PortugueseBrazil]: Language.Portuguese,
    [Locale.PortuguesePortugal]: Language.Portuguese,
    [Locale.RomanianRomania]: Language.Romanian,
    [Locale.RussianRussia]: Language.Russian,
    [Locale.Serbian]: Language.Serbian,
    [Locale.SpanishSpain]: Language.SpanishSpain,
    [Locale.SpanishLatam]: Language.SpanishLatam,
    [Locale.SpanishUnitedStates]: Language.SpanishUnitedStates,
    [Locale.SwahiliTanzania]: Language.Swahili,
    [Locale.SwedishSweden]: Language.Swedish,
    [Locale.TurkishTurkey]: Language.Turkish,
    [Locale.UkrainianUkraine]: Language.Ukrainian,
    [Locale.UrduPakistan]: Language.Urdu,
    [Locale.VietnameseVietnam]: Language.Vietnamese,
};
//# sourceMappingURL=constants.js.map