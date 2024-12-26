import { Fragment as _Fragment, jsx as _jsx } from "react/jsx-runtime";
import { ARBITRUM_DAI_CURRENCY_INFO, BASE_CURRENCY, ETH_CURRENCY_INFO, OPTIMISM_CURRENCY, POLYGON_CURRENCY, currencyInfo, } from 'uniswap/src/test/fixtures';
import { SwapTransactionDetails } from 'wallet/src/features/transactions/SummaryCards/DetailsModal/SwapTransactionDetails';
import { ACCOUNT, preloadedWalletPackageState } from 'wallet/src/test/fixtures';
import { render } from 'wallet/src/test/test-utils';
// Function to set up mocks
const getCurrencyInfoForChain = (chainId) => {
    switch (chainId) {
        case 1: // Mainnet
            return ETH_CURRENCY_INFO;
        case 42161: // Arbitrum One
            return ARBITRUM_DAI_CURRENCY_INFO;
        case 8453: // Base
            return currencyInfo({ nativeCurrency: BASE_CURRENCY });
        case 10: // Optimism
            return currencyInfo({ nativeCurrency: OPTIMISM_CURRENCY });
        case 137: // Polygon
            return currencyInfo({ nativeCurrency: POLYGON_CURRENCY });
        default:
            return ETH_CURRENCY_INFO; // fallback to ETH
    }
};
jest.mock('uniswap/src/features/tokens/useCurrencyInfo', () => ({
    useCurrencyInfo: (currencyIdString) => {
        if (!currencyIdString) {
            return null;
        }
        const [, chainIdStr] = currencyIdString.split(':');
        if (!chainIdStr) {
            return null;
        }
        const chainId = parseInt(chainIdStr, 10);
        return getCurrencyInfoForChain(chainId);
    },
}));
jest.mock('uniswap/src/features/gating/hooks', () => ({
    useDynamicConfigValue: jest.fn().mockReturnValue(1000),
    useFeatureFlag: jest.fn().mockReturnValue(true),
    getFeatureFlag: jest.fn().mockReturnValue(true),
}));
jest.mock('ui/src/loading/Skeleton', () => ({
    Skeleton: () => _jsx(_Fragment, {}),
}));
const preloadedState = preloadedWalletPackageState({ account: ACCOUNT });
const swapTypeInfo = {
    type: 'swap',
    inputCurrencyId: '9920dbad-ff24-47c8-814a-094566fc45ff',
    outputCurrencyId: 'ee612dba-c03f-44dd-9be7-e23fec01e671',
    inputCurrencyAmountRaw: '83116',
    outputCurrencyAmountRaw: '77261',
};
describe('SwapTransactionDetails Component', () => {
    it('renders SwapTransactionDetails without error', () => {
        const onClose = jest.fn();
        const tree = render(_jsx(SwapTransactionDetails, { typeInfo: swapTypeInfo, onClose: onClose }), {
            preloadedState,
        });
        expect(tree).toMatchSnapshot();
    });
});
//# sourceMappingURL=SwapTransactionDetails.test.js.map