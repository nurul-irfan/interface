import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { AssetType } from 'uniswap/src/entities/assets';
import { sendTokenActions } from 'wallet/src/features/transactions/send/sendTokenSaga';
import { useActiveAccount } from 'wallet/src/features/wallet/hooks';
/** Helper send callback for ERC20s */
export function useSendERC20Callback(txId, chainId, toAddress, tokenAddress, amountInWei, transferTxWithGasSettings, onSubmit, currencyAmountUSD, // for analytics
gasEstimates) {
    const account = useActiveAccount();
    return useSendCallback(chainId && toAddress && tokenAddress && amountInWei && account
        ? {
            account,
            chainId,
            toAddress,
            tokenAddress,
            amountInWei,
            type: AssetType.Currency,
            txId,
            currencyAmountUSD,
            gasEstimates,
        }
        : undefined, transferTxWithGasSettings, onSubmit);
}
/** Helper send callback for NFTs */
export function useSendNFTCallback(txId, chainId, toAddress, tokenAddress, tokenId, txRequest, onSubmit, gasEstimates) {
    const account = useActiveAccount();
    return useSendCallback(account && chainId && toAddress && tokenAddress && tokenId
        ? {
            account,
            chainId,
            toAddress,
            tokenAddress,
            tokenId,
            type: AssetType.ERC721,
            txId,
            gasEstimates,
        }
        : undefined, txRequest, onSubmit);
}
/** General purpose send callback for ERC20s, NFTs, etc. */
function useSendCallback(sendTokenParams, txRequest, onSubmit) {
    const dispatch = useDispatch();
    return useMemo(() => {
        if (!sendTokenParams || !txRequest) {
            return null;
        }
        return () => {
            dispatch(sendTokenActions.trigger({ sendTokenParams, txRequest }));
            onSubmit === null || onSubmit === void 0 ? void 0 : onSubmit();
        };
    }, [sendTokenParams, dispatch, txRequest, onSubmit]);
}
//# sourceMappingURL=useSendCallback.js.map