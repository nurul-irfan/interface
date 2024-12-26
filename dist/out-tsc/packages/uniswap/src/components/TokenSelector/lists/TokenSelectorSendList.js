import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Flex } from 'ui/src';
import { BaseCard } from 'uniswap/src/components/BaseCard/BaseCard';
import { TokenSelectorList } from 'uniswap/src/components/TokenSelector/TokenSelectorList';
import { usePortfolioTokenOptions } from 'uniswap/src/components/TokenSelector/hooks/usePortfolioTokenOptions';
import { SectionHeader } from 'uniswap/src/components/TokenSelector/items/TokenSectionHeader';
import { TokenOptionSection, } from 'uniswap/src/components/TokenSelector/types';
import { useTokenOptionsSection } from 'uniswap/src/components/TokenSelector/utils';
function useTokenSectionsForSend({ activeAccountAddress, chainFilter, }) {
    const { data: portfolioTokenOptions, error: portfolioTokenOptionsError, refetch: refetchPortfolioTokenOptions, loading: portfolioTokenOptionsLoading, } = usePortfolioTokenOptions(activeAccountAddress, chainFilter);
    const loading = portfolioTokenOptionsLoading;
    const error = !portfolioTokenOptions && portfolioTokenOptionsError;
    const sections = useTokenOptionsSection({
        sectionKey: TokenOptionSection.YourTokens,
        tokenOptions: portfolioTokenOptions,
    });
    return useMemo(() => ({
        data: sections,
        loading,
        error: error || undefined,
        refetch: refetchPortfolioTokenOptions,
    }), [error, loading, refetchPortfolioTokenOptions, sections]);
}
function EmptyList({ onEmptyActionPress }) {
    const { t } = useTranslation();
    return (_jsxs(Flex, { children: [_jsx(SectionHeader, { sectionKey: TokenOptionSection.YourTokens }), _jsx(Flex, { pt: "$spacing16", px: "$spacing16", children: _jsx(BaseCard.EmptyState, { buttonLabel: onEmptyActionPress ? t('tokens.selector.empty.buy.title') : t('tokens.selector.empty.receive.title'), description: t('tokens.selector.empty.buy.message'), title: t('tokens.selector.empty.title'), onPress: onEmptyActionPress }) })] }));
}
function _TokenSelectorSendList({ activeAccountAddress, chainFilter, isKeyboardOpen, onSelectCurrency, onEmptyActionPress, }) {
    const { data: sections, loading, error, refetch, } = useTokenSectionsForSend({
        activeAccountAddress,
        chainFilter,
    });
    const emptyElement = useMemo(() => _jsx(EmptyList, { onEmptyActionPress: onEmptyActionPress }), [onEmptyActionPress]);
    return (_jsx(TokenSelectorList, { chainFilter: chainFilter, emptyElement: emptyElement, hasError: Boolean(error), isKeyboardOpen: isKeyboardOpen, loading: loading, refetch: refetch, sections: sections, showTokenWarnings: false, onSelectCurrency: onSelectCurrency }));
}
export const TokenSelectorSendList = memo(_TokenSelectorSendList);
//# sourceMappingURL=TokenSelectorSendList.js.map