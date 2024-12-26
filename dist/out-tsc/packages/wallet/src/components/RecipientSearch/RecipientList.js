import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { BottomSheetSectionList } from '@gorhom/bottom-sheet';
import { memo, useCallback } from 'react';
import { SectionList } from 'react-native';
import { FadeIn, FadeOut } from 'react-native-reanimated';
import { Text, TouchableArea, isWeb } from 'ui/src';
import { AnimatedFlex } from 'ui/src/components/layout/AnimatedFlex';
import { spacing } from 'ui/src/theme';
import { AccountType } from 'uniswap/src/features/accounts/types';
import { ENS_SUFFIX } from 'uniswap/src/features/ens/constants';
import { SearchResultType, extractDomain } from 'uniswap/src/features/search/SearchResult';
import { WalletEventName } from 'uniswap/src/features/telemetry/constants';
import { sendAnalyticsEvent } from 'uniswap/src/features/telemetry/send';
import { UNITAG_SUFFIX } from 'uniswap/src/features/unitags/constants';
import { useAppInsets } from 'uniswap/src/hooks/useAppInsets';
import { AddressDisplay } from 'wallet/src/components/accounts/AddressDisplay';
export function RecipientList({ onPress, sections, renderedInModal = false }) {
    const insets = useAppInsets();
    const onRecipientPress = useCallback((recipient) => {
        onPress(recipient.address);
    }, [onPress]);
    const renderItem = function ({ item }) {
        return (
        // TODO(EXT-526): re-enable `exiting` animation when it's fixed.
        _jsx(AnimatedFlex, { entering: FadeIn, exiting: isWeb ? undefined : FadeOut, py: "$spacing12", children: _jsx(RecipientRow, { recipient: item, onPress: onRecipientPress }) }));
    };
    const List = renderedInModal ? BottomSheetSectionList : SectionList;
    return (_jsx(_Fragment, { children: _jsx(List, { contentContainerStyle: {
                paddingBottom: insets.bottom + spacing.spacing12,
            }, keyExtractor: key, keyboardDismissMode: "on-drag", keyboardShouldPersistTaps: "always", renderItem: renderItem, renderSectionHeader: SectionHeader, sections: sections, showsVerticalScrollIndicator: false }) }));
}
function SectionHeader(info) {
    return info.section.title ? (_jsx(AnimatedFlex, { backgroundColor: "$surface1", entering: FadeIn, 
        // TODO(EXT-526): re-enable `exiting` animation when it's fixed.
        exiting: isWeb ? undefined : FadeOut, py: "$spacing8", children: _jsx(Text, { color: "$neutral2", variant: "subheading2", children: info.section.title }) })) : null;
}
function key(recipient) {
    return `recipient-${recipient.address}`;
}
export const RecipientRow = memo(function RecipientRow({ recipient, onPress }) {
    const domain = recipient.name
        ? extractDomain(recipient.name, recipient.isUnitag ? SearchResultType.Unitag : SearchResultType.ENSAddress)
        : undefined;
    const onPressWithAnalytics = () => {
        if (domain) {
            sendAnalyticsEvent(WalletEventName.SendRecipientSelected, {
                domain,
            });
        }
        onPress(recipient);
    };
    const isViewOnlyWallet = recipient.type === AccountType.Readonly;
    const isUnitag = recipient.isUnitag || domain === UNITAG_SUFFIX;
    const isNonUnitagSubdomain = !isUnitag && domain !== undefined && domain !== ENS_SUFFIX;
    return (_jsx(TouchableArea, { onPress: onPressWithAnalytics, children: _jsx(AddressDisplay, { includeUnitagSuffix: true, address: recipient.address, overrideDisplayName: isNonUnitagSubdomain && recipient.name ? recipient.name : undefined, showViewOnlyBadge: isViewOnlyWallet, size: 35 }) }));
});
//# sourceMappingURL=RecipientList.js.map