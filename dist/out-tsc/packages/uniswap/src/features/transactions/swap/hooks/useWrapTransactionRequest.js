import { Contract } from 'ethers/lib/ethers';
import { useCallback } from 'react';
import WETH_ABI from 'uniswap/src/abis/weth.json';
import { getWrappedNativeAddress } from 'uniswap/src/constants/addresses';
import { useProvider } from 'uniswap/src/contexts/UniswapContext';
import { isUniswapX } from 'uniswap/src/features/transactions/swap/utils/routing';
import { WrapType } from 'uniswap/src/features/transactions/types/wrap';
import { useAsyncData } from 'utilities/src/react/hooks';
export async function getWethContract(chainId, provider) {
    return new Contract(getWrappedNativeAddress(chainId), WETH_ABI, provider);
}
export function useWrapTransactionRequest(derivedSwapInfo, account) {
    const { chainId, wrapType, currencyAmounts, trade } = derivedSwapInfo;
    const provider = useProvider(chainId);
    const isUniswapXWrap = Boolean(trade.trade && isUniswapX(trade.trade) && trade.trade.needsWrap);
    const transactionFetcher = useCallback(() => getWrapTransactionRequest(provider, isUniswapXWrap, chainId, account === null || account === void 0 ? void 0 : account.address, wrapType, currencyAmounts.input), [provider, isUniswapXWrap, chainId, account, wrapType, currencyAmounts.input]);
    return useAsyncData(transactionFetcher).data;
}
export const getWrapTransactionRequest = async (provider, isUniswapXWrap, chainId, address, wrapType, currencyAmountIn) => {
    if (!currencyAmountIn || !provider || (wrapType === WrapType.NotApplicable && !isUniswapXWrap)) {
        return undefined;
    }
    const wethContract = await getWethContract(chainId, provider);
    const wethTx = wrapType === WrapType.Wrap || isUniswapXWrap
        ? await wethContract.populateTransaction.deposit({
            value: `0x${currencyAmountIn.quotient.toString(16)}`,
        })
        : await wethContract.populateTransaction.withdraw(`0x${currencyAmountIn.quotient.toString(16)}`);
    return { ...wethTx, from: address, chainId };
};
//# sourceMappingURL=useWrapTransactionRequest.js.map