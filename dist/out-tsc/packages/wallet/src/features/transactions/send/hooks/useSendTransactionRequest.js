import { useCallback } from 'react';
import ERC1155_ABI from 'uniswap/src/abis/erc1155.json';
import ERC20_ABI from 'uniswap/src/abis/erc20.json';
import ERC721_ABI from 'uniswap/src/abis/erc721.json';
import { AssetType } from 'uniswap/src/entities/assets';
import { useEnabledChains } from 'uniswap/src/features/chains/hooks/useEnabledChains';
import { toSupportedChainId } from 'uniswap/src/features/chains/utils';
import { CurrencyField } from 'uniswap/src/types/currency';
import { currencyAddress, isNativeCurrencyAddress } from 'uniswap/src/utils/currencyId';
import { useAsyncData } from 'utilities/src/react/hooks';
import { useContractManager, useProvider } from 'wallet/src/features/wallet/context';
import { useActiveAccountWithThrow } from 'wallet/src/features/wallet/hooks';
export function useSendTransactionRequest(derivedSendInfo) {
    const { defaultChainId } = useEnabledChains();
    const account = useActiveAccountWithThrow();
    const chainId = toSupportedChainId(derivedSendInfo.chainId);
    const provider = useProvider(chainId !== null && chainId !== void 0 ? chainId : defaultChainId);
    const contractManager = useContractManager();
    const transactionFetcher = useCallback(() => {
        if (!provider) {
            return undefined;
        }
        return getSendTransaction(provider, contractManager, account, derivedSendInfo);
    }, [account, contractManager, derivedSendInfo, provider]);
    return useAsyncData(transactionFetcher).data;
}
// eslint-disable-next-line consistent-return
async function getSendTransaction(provider, contractManager, account, derivedSendInfo) {
    const params = getSendParams(account, derivedSendInfo);
    if (!params) {
        return undefined;
    }
    const { type, tokenAddress, chainId } = params;
    switch (type) {
        case AssetType.ERC1155:
            return getErc1155SendRequest(params, provider, contractManager);
        case AssetType.ERC721:
            return getErc721SendRequest(params, provider, contractManager);
        case AssetType.Currency:
            return isNativeCurrencyAddress(chainId, tokenAddress)
                ? getNativeSendRequest(params)
                : getTokenSendRequest(params, provider, contractManager);
    }
}
// eslint-disable-next-line consistent-return
function getSendParams(account, derivedSendInfo) {
    var _a, _b;
    const { currencyAmounts, currencyTypes, chainId, recipient, currencyInInfo, nftIn } = derivedSendInfo;
    const tokenAddress = currencyInInfo ? currencyAddress(currencyInInfo.currency) : (_a = nftIn === null || nftIn === void 0 ? void 0 : nftIn.nftContract) === null || _a === void 0 ? void 0 : _a.address;
    const amount = (_b = currencyAmounts[CurrencyField.INPUT]) === null || _b === void 0 ? void 0 : _b.quotient.toString();
    const assetType = currencyTypes[CurrencyField.INPUT];
    if (!chainId || !tokenAddress || !recipient || !assetType) {
        return undefined;
    }
    switch (assetType) {
        case AssetType.ERC1155:
        case AssetType.ERC721: {
            if (!nftIn) {
                return undefined;
            }
            return {
                account,
                chainId: chainId,
                toAddress: recipient,
                tokenAddress,
                type: assetType,
                tokenId: nftIn.tokenId,
            };
        }
        case AssetType.Currency: {
            if (!currencyInInfo || amount === undefined) {
                return undefined;
            }
            return {
                account,
                chainId: chainId,
                toAddress: recipient,
                tokenAddress,
                type: AssetType.Currency,
                amountInWei: amount,
            };
        }
    }
}
async function getErc721SendRequest(params, provider, contractManager) {
    const { chainId, account, toAddress, tokenAddress, tokenId } = params;
    const erc721Contract = contractManager.getOrCreateContract(chainId, tokenAddress, provider, ERC721_ABI);
    const baseRequest = await erc721Contract.populateTransaction.transferFrom(account.address, toAddress, tokenId);
    return {
        ...baseRequest,
        chainId,
        from: account.address,
    };
}
async function getErc1155SendRequest(params, provider, contractManager) {
    const { chainId, account, toAddress, tokenAddress, tokenId } = params;
    const erc1155Contract = contractManager.getOrCreateContract(chainId, tokenAddress, provider, ERC1155_ABI);
    // TODO: [MOB-242] handle `non ERC1155 Receiver implement` error
    const baseRequest = await erc1155Contract.populateTransaction.safeTransferFrom(account.address, toAddress, tokenId, 
    /*amount=*/ '1', 
    /*data=*/ '0x0');
    return {
        ...baseRequest,
        chainId,
        from: account.address,
    };
}
function getNativeSendRequest(params) {
    const { account, toAddress, amountInWei, chainId } = params;
    return {
        from: account.address,
        to: toAddress,
        value: amountInWei,
        chainId,
    };
}
export async function getTokenSendRequest(params, provider, contractManager) {
    const { account, toAddress, chainId, tokenAddress, amountInWei } = params;
    const tokenContract = contractManager.getOrCreateContract(chainId, tokenAddress, provider, ERC20_ABI);
    const transactionRequest = await tokenContract.populateTransaction.transfer(toAddress, amountInWei, {
        from: account.address,
    });
    return { ...transactionRequest, chainId };
}
//# sourceMappingURL=useSendTransactionRequest.js.map