import { BigNumber } from 'ethers';
import { call } from 'typed-redux-saga';
import ERC1155_ABI from 'uniswap/src/abis/erc1155.json';
import ERC20_ABI from 'uniswap/src/abis/erc20.json';
import ERC721_ABI from 'uniswap/src/abis/erc721.json';
import { AssetType } from 'uniswap/src/entities/assets';
import { WalletEventName } from 'uniswap/src/features/telemetry/constants';
import { sendAnalyticsEvent } from 'uniswap/src/features/telemetry/send';
import { TransactionOriginType, TransactionType, } from 'uniswap/src/features/transactions/types/transactionDetails';
import { isNativeCurrencyAddress } from 'uniswap/src/utils/currencyId';
import { logger } from 'utilities/src/logger/logger';
import { sendTransaction } from 'wallet/src/features/transactions/sendTransactionSaga';
import { getContractManager, getProvider } from 'wallet/src/features/wallet/context';
import { createMonitoredSaga } from 'wallet/src/utils/saga';
export function* sendToken(params) {
    try {
        const { sendTokenParams, txRequest } = params;
        const { txId, account, chainId } = sendTokenParams;
        const typeInfo = getSendTypeInfo(sendTokenParams);
        yield* call(validateSend, sendTokenParams);
        yield* call(sendTransaction, {
            txId,
            chainId,
            account,
            options: { request: txRequest },
            typeInfo,
            transactionOriginType: TransactionOriginType.Internal,
        });
        const amountUSD = params.sendTokenParams.currencyAmountUSD
            ? parseFloat(params.sendTokenParams.currencyAmountUSD.toFixed(2))
            : undefined;
        sendAnalyticsEvent(WalletEventName.TransferSubmitted, {
            chainId: params.sendTokenParams.chainId,
            tokenAddress: params.sendTokenParams.tokenAddress,
            toAddress: params.sendTokenParams.toAddress,
            amountUSD,
        });
        logger.debug('transferTokenSaga', 'transferToken', 'Transfer submitted');
    }
    catch (error) {
        yield* call(logger.error, error, {
            tags: { file: 'transferTokenSaga', function: 'transferToken' },
        });
    }
}
function validateSendAmount(amountInWei, currentBalance) {
    const amount = BigNumber.from(amountInWei);
    if (amount.lte(0)) {
        throw new Error('Invalid transfer amount');
    }
    if (BigNumber.from(amountInWei).gt(currentBalance)) {
        throw new Error('Balance insufficient for transfer');
    }
}
function* validateSend(sendTokenParams) {
    const { type, chainId, tokenAddress, account } = sendTokenParams;
    const contractManager = yield* call(getContractManager);
    const provider = yield* call(getProvider, chainId);
    switch (type) {
        case AssetType.ERC1155: {
            const erc1155Contract = contractManager.getOrCreateContract(chainId, tokenAddress, provider, ERC1155_ABI);
            const balance = yield* call(erc1155Contract.balanceOf, account.address, sendTokenParams.tokenId);
            validateSendAmount('1', balance);
            return;
        }
        case AssetType.ERC721: {
            const erc721Contract = contractManager.getOrCreateContract(chainId, tokenAddress, provider, ERC721_ABI);
            const balance = yield* call(erc721Contract.balanceOf, account.address);
            validateSendAmount('1', balance);
            return;
        }
        case AssetType.Currency: {
            if (isNativeCurrencyAddress(chainId, tokenAddress)) {
                const balance = yield* call([provider, provider.getBalance], account.address);
                validateSendAmount(sendTokenParams.amountInWei, balance);
                return;
            }
            const tokenContract = contractManager.getOrCreateContract(chainId, tokenAddress, provider, ERC20_ABI);
            const currentBalance = yield* call(tokenContract.balanceOf, account.address);
            validateSendAmount(sendTokenParams.amountInWei, currentBalance);
        }
    }
}
function getSendTypeInfo(params) {
    const { type: assetType, toAddress, tokenAddress, currencyAmountUSD, gasEstimates } = params;
    const typeInfo = {
        assetType,
        recipient: toAddress,
        tokenAddress,
        type: TransactionType.Send,
        currencyAmountUSD,
        gasEstimates,
    };
    if (assetType === AssetType.ERC721 || assetType === AssetType.ERC1155) {
        typeInfo.tokenId = params.tokenId;
    }
    else if (assetType === AssetType.Currency) {
        typeInfo.currencyAmountRaw = params.amountInWei;
    }
    return typeInfo;
}
export const { name: sendTokenSagaName, wrappedSaga: sendTokenSaga, reducer: sendTokenReducer, actions: sendTokenActions, } = createMonitoredSaga(sendToken, 'sendToken');
//# sourceMappingURL=sendTokenSaga.js.map