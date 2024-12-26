import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Flex, Text, TouchableArea, isWeb } from 'ui/src';
import { RotatableChevron } from 'ui/src/components/icons/RotatableChevron';
import { iconSizes, spacing } from 'ui/src/theme';
import { CurrencyLogo } from 'uniswap/src/components/CurrencyLogo/CurrencyLogo';
import { getSymbolDisplayText } from 'uniswap/src/utils/currency';
import { isInterface, isMobileWeb } from 'utilities/src/platform';
export const SelectTokenButton = memo(function _SelectTokenButton({ selectedCurrencyInfo, onPress, testID, }) {
    const { t } = useTranslation();
    const hoverStyle = useMemo(() => ({ backgroundColor: selectedCurrencyInfo ? '$surface1Hovered' : '$accent1Hovered' }), [selectedCurrencyInfo]);
    const isCompact = !isInterface || isMobileWeb;
    if (!onPress && selectedCurrencyInfo) {
        return (_jsxs(Flex, { centered: true, row: true, gap: "$spacing4", p: "$spacing4", pr: isWeb ? undefined : '$spacing12', children: [_jsx(CurrencyLogo, { currencyInfo: selectedCurrencyInfo, size: iconSizes.icon28 }), _jsx(Text, { color: "$neutral1", pl: "$spacing4", testID: `${testID}-label`, variant: "buttonLabel1", children: getSymbolDisplayText(selectedCurrencyInfo.currency.symbol) })] }));
    }
    const textColor = selectedCurrencyInfo ? '$neutral1' : '$white';
    const chevronColor = selectedCurrencyInfo ? '$neutral2' : textColor;
    return (_jsx(TouchableArea, { backgroundColor: selectedCurrencyInfo ? '$surface1' : '$accent1', borderRadius: "$roundedFull", testID: testID, borderColor: "$surface3Solid", borderWidth: 1, shadowColor: "$surface3", shadowRadius: 10, shadowOpacity: 0.04, scaleTo: 0.98, hoverable: !!selectedCurrencyInfo, hoverStyle: hoverStyle, onPress: onPress, children: _jsxs(Flex, { centered: true, row: true, gap: "$spacing6", px: "$spacing12", height: "$spacing36", children: [selectedCurrencyInfo && (_jsx(Flex, { ml: -spacing.spacing8, children: _jsx(CurrencyLogo, { currencyInfo: selectedCurrencyInfo, size: iconSizes.icon28 }) })), _jsx(Text, { color: textColor, testID: `${testID}-label`, variant: "buttonLabel2", children: selectedCurrencyInfo
                        ? getSymbolDisplayText(selectedCurrencyInfo.currency.symbol)
                        : t('tokens.selector.button.choose') }), !isCompact && (_jsx(RotatableChevron, { color: chevronColor, direction: "down", height: "$spacing24", mx: -spacing.spacing2 }))] }) }));
});
//# sourceMappingURL=SelectTokenButton.js.map