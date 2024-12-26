import { Currency, CurrencyAmount } from '@uniswap/sdk-core';
import { providers } from 'ethers';
import { UniverseChainId } from 'uniswap/src/features/chains/types';
import { GasFeeEstimates } from 'uniswap/src/features/transactions/types/transactionDetails';
/** Helper send callback for ERC20s */
export declare function useSendERC20Callback(txId?: string, chainId?: UniverseChainId, toAddress?: Address, tokenAddress?: Address, amountInWei?: string, transferTxWithGasSettings?: providers.TransactionRequest, onSubmit?: () => void, currencyAmountUSD?: Maybe<CurrencyAmount<Currency>>, // for analytics
gasEstimates?: GasFeeEstimates): (() => void) | null;
/** Helper send callback for NFTs */
export declare function useSendNFTCallback(txId?: string, chainId?: UniverseChainId, toAddress?: Address, tokenAddress?: Address, tokenId?: string, txRequest?: providers.TransactionRequest, onSubmit?: () => void, gasEstimates?: GasFeeEstimates): (() => void) | null;
//# sourceMappingURL=useSendCallback.d.ts.map