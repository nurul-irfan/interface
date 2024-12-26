import { getDeviceLocales } from 'utilities/src/device/locales.native';
const MOCK_LANGUAGE_CODE = 'es';
const MOCK_LANGUAGE_TAG = 'es-ES';
jest.mock('expo-localization', () => ({
    getLocales: () => [
        {
            languageCode: MOCK_LANGUAGE_CODE,
            languageTag: MOCK_LANGUAGE_TAG,
            regionCode: null,
            currencyCode: null,
            currencySymbol: null,
            decimalSeparator: null,
            digitGroupingSeparator: null,
            textDirection: null,
            measurementSystem: null,
            temperatureUnit: null,
        },
    ],
}));
describe(getDeviceLocales, () => {
    it('should return the device locale', () => {
        expect(getDeviceLocales).not.toThrow();
        expect(getDeviceLocales()).toEqual([{ languageCode: MOCK_LANGUAGE_CODE, languageTag: MOCK_LANGUAGE_TAG }]);
    });
});
//# sourceMappingURL=locales.native.test.js.map