import { AssetType } from 'uniswap/src/entities/assets';
import { CurrencyField } from 'uniswap/src/types/currency';
import { currencyIdToAddress, currencyIdToChain } from 'uniswap/src/utils/currencyId';
export const prepareSwapFormState = ({ inputCurrencyId, defaultChainId, }) => {
    var _a;
    if (!inputCurrencyId) {
        return undefined;
    }
    return {
        exactCurrencyField: CurrencyField.INPUT,
        exactAmountToken: '',
        [CurrencyField.INPUT]: {
            address: currencyIdToAddress(inputCurrencyId),
            chainId: (_a = currencyIdToChain(inputCurrencyId)) !== null && _a !== void 0 ? _a : defaultChainId,
            type: AssetType.Currency,
        },
        [CurrencyField.OUTPUT]: null,
    };
};
//# sourceMappingURL=transactionState.js.map