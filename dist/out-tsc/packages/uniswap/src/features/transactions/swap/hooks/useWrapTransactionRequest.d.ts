import { Currency, CurrencyAmount } from '@uniswap/sdk-core';
import { providers } from 'ethers/lib/ethers';
import { Weth } from 'uniswap/src/abis/types';
import { AccountMeta } from 'uniswap/src/features/accounts/types';
import { UniverseChainId } from 'uniswap/src/features/chains/types';
import { DerivedSwapInfo } from 'uniswap/src/features/transactions/swap/types/derivedSwapInfo';
import { WrapType } from 'uniswap/src/features/transactions/types/wrap';
export declare function getWethContract(chainId: UniverseChainId, provider: providers.Provider): Promise<Weth>;
export declare function useWrapTransactionRequest(derivedSwapInfo: DerivedSwapInfo, account?: AccountMeta): providers.TransactionRequest | undefined;
export declare const getWrapTransactionRequest: (provider: providers.Provider | undefined, isUniswapXWrap: boolean, chainId: UniverseChainId, address: Address | undefined, wrapType: WrapType, currencyAmountIn: Maybe<CurrencyAmount<Currency>>) => Promise<providers.TransactionRequest | undefined>;
//# sourceMappingURL=useWrapTransactionRequest.d.ts.map