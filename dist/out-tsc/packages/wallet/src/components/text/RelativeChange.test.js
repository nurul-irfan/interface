import { jsx as _jsx } from "react/jsx-runtime";
import renderer from 'react-test-renderer';
import { Locale } from 'uniswap/src/features/language/constants';
import { TamaguiProvider } from 'wallet/src/providers/tamagui-provider';
// Needs to be imported after the mock localization context
import { RelativeChange } from 'wallet/src/components/text/RelativeChange';
const mockLocale = Locale.EnglishUnitedStates;
jest.mock('uniswap/src/features/language/hooks', () => {
    return {
        useCurrentLocale: () => mockLocale,
    };
});
const mockFiatCurrencyInfo = {
    name: 'United States Dollar',
    shortName: 'USD ($)',
    code: 'USD',
    symbol: '$',
    groupingSeparator: ',',
    decimalSeparator: '.',
    fullSymbol: '$',
    symbolAtFront: true,
};
jest.mock('uniswap/src/features/fiatCurrency/hooks', () => {
    return {
        useAppFiatCurrencyInfo: () => mockFiatCurrencyInfo,
    };
});
it('renders a relative change', () => {
    const tree = renderer.create(_jsx(TamaguiProvider, { children: _jsx(RelativeChange, { change: 12 }) }));
    expect(tree).toMatchSnapshot();
});
it('renders placeholders without a change', () => {
    const tree = renderer.create(_jsx(TamaguiProvider, { children: _jsx(RelativeChange, {}) }));
    expect(tree).toMatchSnapshot();
});
it('renders placeholders with absolute change', () => {
    const tree = renderer.create(_jsx(TamaguiProvider, { children: _jsx(RelativeChange, { absoluteChange: 100, change: 12 }) }));
    expect(tree).toMatchSnapshot();
});
//# sourceMappingURL=RelativeChange.test.js.map