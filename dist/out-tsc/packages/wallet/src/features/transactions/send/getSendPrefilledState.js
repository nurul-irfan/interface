import { getNativeAddress } from 'uniswap/src/constants/addresses';
import { AssetType } from 'uniswap/src/entities/assets';
import { CurrencyField } from 'uniswap/src/types/currency';
export function getSendPrefilledState({ chainId, currencyAddress, }) {
    const nativeTokenAddress = getNativeAddress(chainId);
    const nativeToken = {
        address: nativeTokenAddress,
        chainId,
        type: AssetType.Currency,
    };
    const chosenToken = !currencyAddress
        ? undefined
        : {
            address: currencyAddress,
            chainId,
            type: AssetType.Currency,
        };
    const transactionState = {
        exactCurrencyField: CurrencyField.INPUT,
        exactAmountToken: '',
        // If specified currency address populate the currency, otherwise default to native token on chain
        [CurrencyField.INPUT]: chosenToken !== null && chosenToken !== void 0 ? chosenToken : nativeToken,
        [CurrencyField.OUTPUT]: null,
        showRecipientSelector: true,
    };
    return transactionState;
}
//# sourceMappingURL=getSendPrefilledState.js.map