import { Fragment as _Fragment, jsx as _jsx } from "react/jsx-runtime";
import { ARBITRUM_DAI_CURRENCY_INFO, BASE_CURRENCY, ETH_CURRENCY_INFO, OPTIMISM_CURRENCY, POLYGON_CURRENCY, currencyInfo, } from 'uniswap/src/test/fixtures';
import { TransferTransactionDetails } from 'wallet/src/features/transactions/SummaryCards/DetailsModal/TransferTransactionDetails';
import { ACCOUNT, preloadedWalletPackageState } from 'wallet/src/test/fixtures';
import { render } from 'wallet/src/test/test-utils';
const preloadedState = preloadedWalletPackageState({ account: ACCOUNT });
const transferTypeInfo = {
    type: 'send',
    assetType: 'currency',
    recipient: '0xcd20dfedef359abb25e0c6789eb67ffee814caea',
    tokenAddress: '0x14f6cccfeae34fea11d9a2ca6aabb112e8b8dafe',
    currencyAmountRaw: '1000000000000000000',
};
const mockTransaction = {
    id: '9920dbad-ff24-47c8-814a-094566fc45ff',
    chainId: 81457,
    routing: 'CLASSIC',
    from: '0xee814caea14f6cccfeae34fea11d9a2ca6aabb11',
    typeInfo: transferTypeInfo,
    status: 'confirmed',
    addedTime: 1719911758204,
    options: { request: {} },
    hash: 'b568a9e9-bbe7-42fc-ab00-5070186c0600',
    receipt: {
        transactionIndex: 29529,
        blockNumber: 17489,
        blockHash: 'dfd3ad45-78e7-4124-90f2-92758b4499ba',
        confirmedTime: 1719946653408,
        confirmations: 57408,
        gasUsed: 27844,
        effectiveGasPrice: 2941,
    },
};
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
jest.mock('uniswap/src/features/gating/hooks', () => ({
    useDynamicConfigValue: jest.fn().mockReturnValue(1000),
    useFeatureFlag: jest.fn().mockReturnValue(true),
    getFeatureFlag: jest.fn().mockReturnValue(true),
}));
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
jest.mock('ui/src/loading/Skeleton', () => ({
    Skeleton: () => _jsx(_Fragment, {}),
}));
describe('TransferTransactionDetails Component', () => {
    it('renders TransferTransactionDetails without error', () => {
        const onClose = jest.fn();
        const tree = render(_jsx(TransferTransactionDetails, { transactionDetails: mockTransaction, typeInfo: transferTypeInfo, onClose: onClose }), {
            preloadedState,
        });
        expect(tree).toMatchSnapshot();
    });
});
//# sourceMappingURL=TransferTransactionDetails.test.js.map