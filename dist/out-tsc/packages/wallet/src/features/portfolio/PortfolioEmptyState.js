import { jsx as _jsx } from "react/jsx-runtime";
import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { ImageBackground, StyleSheet, VirtualizedList } from 'react-native';
import { Flex, useIsDarkMode } from 'ui/src';
import { CRYPTO_PURCHASE_BACKGROUND_DARK, CRYPTO_PURCHASE_BACKGROUND_LIGHT } from 'ui/src/assets';
import { ArrowDownCircle, Buy as BuyIcon, PaperStack } from 'ui/src/components/icons';
import { borderRadii } from 'ui/src/theme';
import { ActionCard } from 'uniswap/src/components/misc/ActionCard';
import { AccountType } from 'uniswap/src/features/accounts/types';
import { useCexTransferProviders } from 'uniswap/src/features/fiatOnRamp/useCexTransferProviders';
import { ElementName } from 'uniswap/src/features/telemetry/constants';
import { ImageUri } from 'wallet/src/features/images/ImageUri';
import { useActiveAccount } from 'wallet/src/features/wallet/hooks';
var ActionOption;
(function (ActionOption) {
    ActionOption["Buy"] = "Buy";
    ActionOption["Import"] = "Import";
    ActionOption["Receive"] = "Receive";
})(ActionOption || (ActionOption = {}));
const ICON_SIZE = 28;
const ICON_SHIFT = -10;
export function PortfolioEmptyState({ onPressReceive, onPressImport, onPressBuy, disableCexTransfers = false, }) {
    const { t } = useTranslation();
    const isDarkMode = useIsDarkMode();
    const activeAccount = useActiveAccount();
    const isViewOnly = (activeAccount === null || activeAccount === void 0 ? void 0 : activeAccount.type) === AccountType.Readonly;
    const cexTransferProviders = useCexTransferProviders({ isDisabled: disableCexTransfers });
    const BackgroundImageWrapperCallback = useCallback(({ children }) => {
        return (_jsx(BackgroundImage, { image: isDarkMode ? CRYPTO_PURCHASE_BACKGROUND_DARK : CRYPTO_PURCHASE_BACKGROUND_LIGHT, children: children }));
    }, [isDarkMode]);
    const options = useMemo(() => ({
        [ActionOption.Buy]: {
            title: t('home.tokens.empty.action.buy.title'),
            blurb: t('home.tokens.empty.action.buy.description'),
            elementName: ElementName.EmptyStateBuy,
            icon: _jsx(BuyIcon, { color: "$accent1", size: "$icon.28" }),
            onPress: onPressBuy,
            BackgroundImageWrapperCallback,
        },
        [ActionOption.Receive]: {
            title: t('home.tokens.empty.action.receive.title'),
            blurb: t('home.tokens.empty.action.receive.description'),
            elementName: ElementName.EmptyStateReceive,
            icon: cexTransferProviders.length > 0 ? (_jsx(OverlappingLogos, { logos: cexTransferProviders.map((provider) => provider.logos.lightLogo) })) : (_jsx(ArrowDownCircle, { color: "$accent1", size: "$icon.28" })),
            onPress: onPressReceive,
        },
        [ActionOption.Import]: {
            title: t('home.tokens.empty.action.import.title'),
            blurb: t('home.tokens.empty.action.import.description'),
            elementName: ElementName.EmptyStateImport,
            icon: _jsx(PaperStack, { color: "$accent1", size: "$icon.28" }),
            onPress: onPressImport,
        },
    }), [t, onPressBuy, BackgroundImageWrapperCallback, cexTransferProviders, onPressReceive, onPressImport]);
    // Order options based on view only status, and wether we have a valid buy handler
    const sortedOptions = isViewOnly && onPressImport ? [options.Import] : [...(onPressBuy ? [options.Buy] : []), options.Receive];
    return (_jsx(Flex, { gap: "$spacing8", children: sortedOptions.map((option) => (_jsx(ActionCard, { ...option }, option.title))) }));
}
const BackgroundImage = ({ children, image, }) => {
    return (_jsx(ImageBackground, { borderRadius: borderRadii.rounded24, source: image, children: children }));
};
function ReceiveCryptoIcon() {
    return (_jsx(Flex, { centered: true, shrink: true, backgroundColor: "$surface1", style: {
            ...styles.iconContainer,
            borderRadius: borderRadii.roundedFull,
        }, children: _jsx(ArrowDownCircle, { color: "$accent1", style: {
                borderRadius: borderRadii.roundedFull,
                height: ICON_SIZE - 2,
                width: ICON_SIZE - 2,
            } }) }, "ReceiveCryptoIcon"));
}
function ServiceProviderLogo({ uri }) {
    return (_jsx(Flex, { centered: true, shrink: true, animation: "quick", backgroundColor: "$surface1", borderColor: "$surface1", borderWidth: 2, enterStyle: { opacity: 0 }, exitStyle: { opacity: 0 }, style: styles.iconContainer, children: _jsx(ImageUri, { imageStyle: {
                borderRadius: borderRadii.rounded8,
                height: ICON_SIZE - 3,
                overflow: 'hidden',
                width: ICON_SIZE - 3,
            }, resizeMode: "cover", uri: uri }) }, uri));
}
function renderItem({ item }) {
    return item === 'icon' ? _jsx(ReceiveCryptoIcon, {}) : _jsx(ServiceProviderLogo, { uri: item });
}
function keyExtractor(item) {
    return item;
}
/*
 * Set the zIndex to -index to reverse the order of the elements.
 */
const LogoRendererComponent = ({ children, index, style, ...props }) => {
    const cellStyle = [style, { zIndex: -index }];
    return (_jsx(Flex, { style: cellStyle, ...props, children: children }));
};
function OverlappingLogos({ logos }) {
    const getItem = (_data, index) => {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        return index === 0 ? 'icon' : logos[index - 1];
    };
    const getItemCount = () => {
        return logos.length + 1;
    };
    return (_jsx(Flex, { height: ICON_SIZE, children: _jsx(VirtualizedList, { horizontal: true, CellRendererComponent: LogoRendererComponent, contentContainerStyle: {
                paddingRight: -ICON_SHIFT,
            }, getItem: getItem, getItemCount: getItemCount, keyExtractor: keyExtractor, renderItem: renderItem }) }));
}
const styles = StyleSheet.create({
    iconContainer: {
        borderRadius: borderRadii.rounded8,
        height: ICON_SIZE,
        marginRight: ICON_SHIFT,
        overflow: 'hidden',
        width: ICON_SIZE,
    },
});
//# sourceMappingURL=PortfolioEmptyState.js.map