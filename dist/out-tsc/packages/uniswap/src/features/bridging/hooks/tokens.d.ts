import { TokenOption } from 'uniswap/src/components/TokenSelector/types';
import { GetSwappableTokensResponse } from 'uniswap/src/data/tradingApi/__generated__';
import { GqlResult } from 'uniswap/src/data/types';
import { TradeableAsset } from 'uniswap/src/entities/assets';
import { UniverseChainId } from 'uniswap/src/features/chains/types';
import { CurrencyInfo, PortfolioBalance } from 'uniswap/src/features/dataApi/types';
export declare function useBridgingTokenWithHighestBalance({ address, currencyAddress, currencyChainId, }: {
    address: Address;
    currencyAddress: Address;
    currencyChainId: UniverseChainId;
}): {
    token: GetSwappableTokensResponse['tokens'][number];
    balance: PortfolioBalance;
    currencyInfo: CurrencyInfo;
} | undefined;
export declare function useBridgingTokensOptions({ input, walletAddress, chainFilter, }: {
    input: TradeableAsset | undefined;
    walletAddress: Address | undefined;
    chainFilter: UniverseChainId | null;
}): GqlResult<TokenOption[] | undefined> & {
    shouldNest?: boolean;
};
//# sourceMappingURL=tokens.d.ts.map