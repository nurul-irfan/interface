import { useMemo } from 'react';
import { AssetType } from 'uniswap/src/entities/assets';
import { useEnabledChains } from 'uniswap/src/features/chains/hooks/useEnabledChains';
import { useOnChainCurrencyBalance, useOnChainNativeCurrencyBalance } from 'uniswap/src/features/portfolio/api';
import { ValueType, getCurrencyAmount } from 'uniswap/src/features/tokens/getCurrencyAmount';
import { useCurrencyInfo } from 'uniswap/src/features/tokens/useCurrencyInfo';
import { CurrencyField } from 'uniswap/src/types/currency';
import { buildCurrencyId } from 'uniswap/src/utils/currencyId';
import { useNFT } from 'wallet/src/features/nfts/hooks';
import { useActiveAccount } from 'wallet/src/features/wallet/hooks';
export function useDerivedSendInfo(state) {
    var _a;
    const { [CurrencyField.INPUT]: tradeableAsset, exactAmountToken, exactAmountFiat, recipient, isFiatInput, txId, } = state;
    const activeAccount = useActiveAccount();
    const { defaultChainId } = useEnabledChains();
    const chainId = (_a = tradeableAsset === null || tradeableAsset === void 0 ? void 0 : tradeableAsset.chainId) !== null && _a !== void 0 ? _a : defaultChainId;
    const currencyInInfo = useCurrencyInfo((tradeableAsset === null || tradeableAsset === void 0 ? void 0 : tradeableAsset.type) === AssetType.Currency
        ? buildCurrencyId(tradeableAsset === null || tradeableAsset === void 0 ? void 0 : tradeableAsset.chainId, tradeableAsset === null || tradeableAsset === void 0 ? void 0 : tradeableAsset.address)
        : undefined, { refetch: true });
    const currencyIn = currencyInInfo === null || currencyInInfo === void 0 ? void 0 : currencyInInfo.currency;
    const { data: nftIn } = useNFT(activeAccount === null || activeAccount === void 0 ? void 0 : activeAccount.address, tradeableAsset === null || tradeableAsset === void 0 ? void 0 : tradeableAsset.address, (tradeableAsset === null || tradeableAsset === void 0 ? void 0 : tradeableAsset.type) === AssetType.ERC1155 || (tradeableAsset === null || tradeableAsset === void 0 ? void 0 : tradeableAsset.type) === AssetType.ERC721
        ? tradeableAsset.tokenId
        : undefined);
    const currencies = useMemo(() => ({
        [CurrencyField.INPUT]: currencyInInfo !== null && currencyInInfo !== void 0 ? currencyInInfo : nftIn,
    }), [currencyInInfo, nftIn]);
    const { balance: tokenInBalance } = useOnChainCurrencyBalance((currencyIn === null || currencyIn === void 0 ? void 0 : currencyIn.isToken) ? currencyIn : undefined, activeAccount === null || activeAccount === void 0 ? void 0 : activeAccount.address);
    const { balance: nativeInBalance } = useOnChainNativeCurrencyBalance(chainId !== null && chainId !== void 0 ? chainId : defaultChainId, activeAccount === null || activeAccount === void 0 ? void 0 : activeAccount.address);
    const amountSpecified = useMemo(() => getCurrencyAmount({
        value: exactAmountToken,
        valueType: ValueType.Exact,
        currency: currencyIn,
    }), [currencyIn, exactAmountToken]);
    const currencyAmounts = useMemo(() => ({
        [CurrencyField.INPUT]: amountSpecified,
    }), [amountSpecified]);
    const currencyBalances = useMemo(() => ({
        [CurrencyField.INPUT]: (currencyIn === null || currencyIn === void 0 ? void 0 : currencyIn.isNative) ? nativeInBalance : tokenInBalance,
    }), [currencyIn, nativeInBalance, tokenInBalance]);
    return useMemo(() => ({
        chainId,
        currencies,
        currencyAmounts,
        currencyBalances,
        currencyTypes: { [CurrencyField.INPUT]: tradeableAsset === null || tradeableAsset === void 0 ? void 0 : tradeableAsset.type },
        currencyInInfo,
        exactAmountToken,
        exactAmountFiat: exactAmountFiat !== null && exactAmountFiat !== void 0 ? exactAmountFiat : '',
        exactCurrencyField: CurrencyField.INPUT,
        isFiatInput,
        nftIn: nftIn !== null && nftIn !== void 0 ? nftIn : undefined,
        recipient,
        txId,
    }), [
        chainId,
        currencies,
        currencyAmounts,
        currencyBalances,
        currencyInInfo,
        exactAmountToken,
        exactAmountFiat,
        isFiatInput,
        nftIn,
        recipient,
        tradeableAsset === null || tradeableAsset === void 0 ? void 0 : tradeableAsset.type,
        txId,
    ]);
}
//# sourceMappingURL=useDerivedSendInfo.js.map