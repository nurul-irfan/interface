import { providers } from 'ethers';
import { DerivedSendInfo } from 'uniswap/src/features/transactions/send/types';
import { ContractManager } from 'wallet/src/features/contracts/ContractManager';
import { SendCurrencyParams } from 'wallet/src/features/transactions/send/types';
export declare function useSendTransactionRequest(derivedSendInfo: DerivedSendInfo): providers.TransactionRequest | undefined;
export declare function getTokenSendRequest(params: SendCurrencyParams, provider: providers.Provider, contractManager: ContractManager): Promise<providers.TransactionRequest>;
//# sourceMappingURL=useSendTransactionRequest.d.ts.map