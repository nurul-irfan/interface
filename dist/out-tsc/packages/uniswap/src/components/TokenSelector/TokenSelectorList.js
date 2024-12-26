import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AnimateTransition, Flex, Loader, Skeleton, Text } from 'ui/src';
import { fonts } from 'ui/src/theme';
import { BaseCard } from 'uniswap/src/components/BaseCard/BaseCard';
import { ITEM_SECTION_HEADER_ROW_HEIGHT } from 'uniswap/src/components/TokenSelector/constants';
import { TokenOptionItem } from 'uniswap/src/components/TokenSelector/items/TokenOptionItem';
import { SectionHeader } from 'uniswap/src/components/TokenSelector/items/TokenSectionHeader';
import { HorizontalTokenList } from 'uniswap/src/components/TokenSelector/lists/HorizontalTokenList/HorizontalTokenList';
import { TokenSectionBaseList, } from 'uniswap/src/components/TokenSelector/lists/TokenSectionBaseList/TokenSectionBaseList';
import { useBottomSheetFocusHook } from 'uniswap/src/components/modals/hooks';
import { useEnabledChains } from 'uniswap/src/features/chains/hooks/useEnabledChains';
import { useLocalizationContext } from 'uniswap/src/features/language/LocalizationContext';
import { useDismissedTokenWarnings } from 'uniswap/src/features/tokens/slice/hooks';
import { NumberType } from 'utilities/src/format/types';
function isHorizontalListTokenItem(data) {
    return Array.isArray(data);
}
const TokenOptionItemWrapper = memo(function _TokenOptionItemWrapper({ tokenOption, onSelectCurrency, section, index, showWarnings, showTokenAddress, isKeyboardOpen, }) {
    const { convertFiatAmountFormatted, formatNumberOrString } = useLocalizationContext();
    const onPress = useCallback(() => onSelectCurrency(tokenOption.currencyInfo, section, index), [index, onSelectCurrency, section, tokenOption.currencyInfo]);
    const { isTestnetModeEnabled } = useEnabledChains();
    const { tokenWarningDismissed } = useDismissedTokenWarnings(tokenOption.currencyInfo.currency);
    const tokenBalance = formatNumberOrString({
        value: tokenOption.quantity,
        type: NumberType.TokenTx,
    });
    const fiatBalance = convertFiatAmountFormatted(tokenOption.balanceUSD, NumberType.FiatTokenPrice);
    const title = isTestnetModeEnabled ? tokenBalance : fiatBalance;
    const subtitle = isTestnetModeEnabled ? undefined : tokenBalance;
    return (_jsx(TokenOptionItem, { balance: title, isKeyboardOpen: isKeyboardOpen, option: tokenOption, quantity: tokenOption.quantity, quantityFormatted: subtitle, showTokenAddress: showTokenAddress, showWarnings: showWarnings, tokenWarningDismissed: tokenWarningDismissed, onPress: onPress }));
});
function EmptyResults() {
    const { t } = useTranslation();
    return (_jsx(Flex, { children: _jsx(Text, { color: "$neutral3", mt: "$spacing16", textAlign: "center", variant: "subheading2", children: t('common.noResults') }) }));
}
function _TokenSelectorList({ onSelectCurrency, sections, chainFilter, showTokenWarnings, isKeyboardOpen, refetch, loading, hasError, emptyElement, errorText, showTokenAddress, }) {
    const { t } = useTranslation();
    const sectionListRef = useRef();
    const [expandedItems, setExpandedItems] = useState([]);
    useEffect(() => {
        var _a;
        if (sections === null || sections === void 0 ? void 0 : sections.length) {
            (_a = sectionListRef.current) === null || _a === void 0 ? void 0 : _a.scrollToLocation({
                itemIndex: 0,
                sectionIndex: 0,
                animated: true,
            });
        }
    }, [chainFilter, sections === null || sections === void 0 ? void 0 : sections.length]);
    const handleExpand = useCallback((item) => {
        setExpandedItems((prev) => [...prev, key(item)]);
    }, [setExpandedItems]);
    const isExpandedItem = useCallback((item) => {
        return expandedItems.includes(key(item));
    }, [expandedItems]);
    // Note: the typing for this comes from the web TokenSectionBaseList.tsx's renderItem
    const renderItem = useCallback(({ item, section, index }) => {
        if (isHorizontalListTokenItem(item)) {
            return (_jsx(HorizontalTokenList, { tokens: item, section: section, index: index, expanded: isExpandedItem(item), onSelectCurrency: onSelectCurrency, onExpand: () => handleExpand(item) }));
        }
        return (_jsx(TokenOptionItemWrapper, { index: index, isKeyboardOpen: isKeyboardOpen, section: section, showTokenAddress: showTokenAddress, showWarnings: showTokenWarnings, tokenOption: item, onSelectCurrency: onSelectCurrency }));
    }, [onSelectCurrency, showTokenAddress, showTokenWarnings, isKeyboardOpen, handleExpand, isExpandedItem]);
    const renderSectionHeader = useCallback(({ section }) => (_jsx(SectionHeader, { rightElement: section.rightElement, endElement: section.endElement, sectionKey: section.sectionKey, name: section.name })), []);
    if (hasError) {
        return (_jsxs(_Fragment, { children: [_jsx(Flex, { grow: true, justifyContent: "center", children: _jsx(BaseCard.ErrorState, { retryButtonLabel: t('common.button.retry'), title: errorText !== null && errorText !== void 0 ? errorText : t('tokens.selector.error.load'), onRetry: refetch }) }), _jsx(Flex, { grow: true })] }));
    }
    return (_jsxs(AnimateTransition, { animationType: "fade", currentIndex: (!sections || !sections.length) && loading ? 0 : 1, children: [_jsxs(Flex, { grow: true, px: "$spacing16", children: [_jsx(Flex, { height: ITEM_SECTION_HEADER_ROW_HEIGHT, justifyContent: "center", py: "$spacing16", width: 80, children: _jsx(Skeleton, { children: _jsx(Loader.Box, { height: fonts.subheading2.lineHeight }) }) }), _jsx(Loader.Token, { gap: "$none", repeat: 15 })] }), _jsx(TokenSectionBaseList, { ListEmptyComponent: emptyElement || _jsx(EmptyResults, {}), focusHook: useBottomSheetFocusHook, keyExtractor: key, renderItem: renderItem, renderSectionHeader: renderSectionHeader, sectionListRef: sectionListRef, sections: sections !== null && sections !== void 0 ? sections : [], expandedItems: expandedItems })] }));
}
function key(item) {
    if (isHorizontalListTokenItem(item)) {
        return item.map((token) => token.currencyInfo.currencyId).join('-');
    }
    return item.currencyInfo.currencyId;
}
export const TokenSelectorList = memo(_TokenSelectorList);
//# sourceMappingURL=TokenSelectorList.js.map