/// <reference types="react" />
import { Currency } from '@uniswap/sdk-core';
import { TokenSelectorFlow } from 'uniswap/src/components/TokenSelector/types';
import { TradeableAsset } from 'uniswap/src/entities/assets';
import { UniverseChainId } from 'uniswap/src/features/chains/types';
import { CurrencyField } from 'uniswap/src/types/currency';
export declare const TOKEN_SELECTOR_WEB_MAX_WIDTH = 400;
export declare const TOKEN_SELECTOR_WEB_MAX_HEIGHT = 700;
export declare enum TokenSelectorVariation {
    BalancesOnly = "balances-only",
    SwapInput = "swap-input",// balances, recent searches, favorites, popular
    SwapOutput = "swap-output"
}
export interface TokenSelectorProps {
    variation: TokenSelectorVariation;
    isModalOpen: boolean;
    currencyField: CurrencyField;
    flow: TokenSelectorFlow;
    activeAccountAddress?: string;
    chainId?: UniverseChainId;
    chainIds?: UniverseChainId[];
    input?: TradeableAsset;
    isSurfaceReady?: boolean;
    isLimits?: boolean;
    onClose: () => void;
    onSelectChain?: (chainId: UniverseChainId | null) => void;
    onSelectCurrency: (currency: Currency, currencyField: CurrencyField, isBridgePair: boolean) => void;
}
export declare function TokenSelectorContent({ currencyField, flow, variation, input, activeAccountAddress, chainId, chainIds, isSurfaceReady, isLimits, onClose, onSelectChain, onSelectCurrency, }: Omit<TokenSelectorProps, 'isModalOpen'>): JSX.Element;
declare function _TokenSelectorModal(props: TokenSelectorProps): JSX.Element;
export declare const TokenSelectorModal: import("react").MemoExoticComponent<typeof _TokenSelectorModal>;
export {};
//# sourceMappingURL=TokenSelector.d.ts.map