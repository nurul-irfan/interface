import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { ElementAfterText, Flex, Text } from 'ui/src';
import { Clock } from 'ui/src/components/icons/Clock';
import { Coins } from 'ui/src/components/icons/Coins';
import { Pin } from 'ui/src/components/icons/Pin';
import { Search } from 'ui/src/components/icons/Search';
import { Shuffle } from 'ui/src/components/icons/Shuffle';
import { Star } from 'ui/src/components/icons/Star';
import { TokenOptionSection } from 'uniswap/src/components/TokenSelector/types';
export const SectionHeader = memo(function _SectionHeader({ sectionKey, rightElement, endElement, name, }) {
    const title = useTokenOptionsSectionTitle(sectionKey);
    const icon = getTokenOptionsSectionIcon(sectionKey);
    if (sectionKey === TokenOptionSection.SuggestedTokens) {
        return null;
    }
    return (_jsx(Flex, { row: true, backgroundColor: "$surface1", justifyContent: "space-between", pb: "$spacing4", pt: "$spacing12", px: "$spacing16", children: _jsx(Text, { color: "$neutral2", variant: "subheading2", children: _jsxs(Flex, { row: true, alignItems: "center", gap: "$spacing8", width: "100%", children: [icon, _jsx(ElementAfterText, { text: name !== null && name !== void 0 ? name : title, textProps: { color: '$neutral2' }, wrapperProps: { flex: 1 }, element: rightElement }), endElement && _jsx(Flex, { ml: "auto", children: endElement })] }) }) }));
});
export function useTokenOptionsSectionTitle(section) {
    const { t } = useTranslation();
    switch (section) {
        case TokenOptionSection.BridgingTokens:
            return t('tokens.selector.section.bridging');
        case TokenOptionSection.YourTokens:
            return t('tokens.selector.section.yours');
        case TokenOptionSection.PopularTokens:
            return t('common.tokens');
        case TokenOptionSection.RecentTokens:
            return t('tokens.selector.section.recent');
        case TokenOptionSection.FavoriteTokens:
            return t('tokens.selector.section.favorite');
        case TokenOptionSection.SearchResults:
            return t('tokens.selector.section.search');
        case TokenOptionSection.SuggestedTokens:
            return ''; // no suggested tokens header
        default:
            return section;
    }
}
function getTokenOptionsSectionIcon(section) {
    switch (section) {
        case TokenOptionSection.BridgingTokens:
            return _jsx(Shuffle, { color: "$neutral2", size: "$icon.16" });
        case TokenOptionSection.YourTokens:
            return _jsx(Coins, { color: "$neutral2", size: "$icon.16" });
        case TokenOptionSection.PopularTokens:
            return _jsx(Star, { color: "$neutral2", size: "$icon.16" });
        case TokenOptionSection.RecentTokens:
            return _jsx(Clock, { color: "$neutral2", size: "$icon.16" });
        case TokenOptionSection.SearchResults:
            return _jsx(Search, { color: "$neutral2", size: "$icon.16" });
        case TokenOptionSection.FavoriteTokens:
            return _jsx(Pin, { color: "$neutral2", size: "$icon.16" });
        default:
            return null;
    }
}
//# sourceMappingURL=TokenSectionHeader.js.map