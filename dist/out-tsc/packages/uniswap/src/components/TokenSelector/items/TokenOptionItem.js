import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import React, { useCallback, useState } from 'react';
import { Flex, Text, TouchableArea } from 'ui/src';
import { Check } from 'ui/src/components/icons/Check';
import { iconSizes } from 'ui/src/theme';
import { TokenLogo } from 'uniswap/src/components/CurrencyLogo/TokenLogo';
import { WarningSeverity } from 'uniswap/src/components/modals/WarningModal/types';
import WarningIcon from 'uniswap/src/components/warnings/WarningIcon';
import { getWarningIconColors } from 'uniswap/src/components/warnings/utils';
import { SafetyLevel } from 'uniswap/src/data/graphql/uniswap-data-api/__generated__/types-and-hooks';
import { TokenList } from 'uniswap/src/features/dataApi/types';
import { FeatureFlags } from 'uniswap/src/features/gating/flags';
import { useFeatureFlag } from 'uniswap/src/features/gating/hooks';
import TokenWarningModal from 'uniswap/src/features/tokens/TokenWarningModal';
import { getTokenWarningSeverity } from 'uniswap/src/features/tokens/safetyUtils';
import { getSymbolDisplayText } from 'uniswap/src/utils/currency';
import { shortenAddress } from 'utilities/src/addresses';
import { dismissNativeKeyboard } from 'utilities/src/device/keyboard';
import { isInterface } from 'utilities/src/platform';
function getTokenWarningDetails(currencyInfo) {
    const { safetyLevel, safetyInfo } = currencyInfo;
    const severity = getTokenWarningSeverity(currencyInfo);
    const isNonDefaultList = safetyLevel === SafetyLevel.MediumWarning ||
        safetyLevel === SafetyLevel.StrongWarning ||
        (safetyInfo === null || safetyInfo === void 0 ? void 0 : safetyInfo.tokenList) === TokenList.NonDefault;
    const isBlocked = severity === WarningSeverity.Blocked || safetyLevel === SafetyLevel.Blocked;
    return {
        severity,
        isNonDefaultList,
        isBlocked,
    };
}
function _TokenOptionItem({ option, showWarnings, onPress, showTokenAddress, tokenWarningDismissed, balance, quantity, quantityFormatted, isKeyboardOpen, isSelected, }) {
    var _a;
    const { currencyInfo, isUnsupported } = option;
    const { currency } = currencyInfo;
    const [showWarningModal, setShowWarningModal] = useState(false);
    const tokenProtectionEnabled = useFeatureFlag(FeatureFlags.TokenProtection);
    const { severity, isBlocked, isNonDefaultList } = getTokenWarningDetails(currencyInfo);
    // in token selector, we only show the warning icon if token is >=Medium severity
    const { colorSecondary: warningIconColor } = getWarningIconColors(severity);
    const shouldShowWarningModalOnPress = !tokenProtectionEnabled
        ? isBlocked || (isNonDefaultList && !tokenWarningDismissed)
        : isBlocked || (severity !== WarningSeverity.None && !tokenWarningDismissed);
    const handleShowWarningModal = useCallback(() => {
        dismissNativeKeyboard();
        setShowWarningModal(true);
    }, [setShowWarningModal]);
    const onPressTokenOption = useCallback(() => {
        if (showWarnings && shouldShowWarningModalOnPress) {
            // On mobile web we need to wait for the keyboard to hide
            // before showing the modal to avoid height issues
            if (isKeyboardOpen && isInterface) {
                const activeElement = document.activeElement;
                activeElement === null || activeElement === void 0 ? void 0 : activeElement.blur();
                setTimeout(handleShowWarningModal, 700);
            }
            else {
                handleShowWarningModal();
            }
            return;
        }
        onPress();
    }, [showWarnings, shouldShowWarningModalOnPress, onPress, isKeyboardOpen, handleShowWarningModal]);
    const onAcceptTokenWarning = useCallback(() => {
        setShowWarningModal(false);
        onPress();
    }, [onPress]);
    return (_jsxs(_Fragment, { children: [_jsx(TouchableArea, { animation: "300ms", hoverStyle: { backgroundColor: '$surface1Hovered' }, opacity: (showWarnings && severity === WarningSeverity.Blocked) || isUnsupported ? 0.5 : 1, width: "100%", onPress: onPressTokenOption, children: _jsxs(Flex, { row: true, alignItems: "center", gap: "$spacing8", justifyContent: "space-between", px: "$spacing16", py: "$spacing12", style: {
                        pointerEvents: 'auto',
                    }, testID: `token-option-${currency.chainId}-${currency.symbol}`, children: [_jsxs(Flex, { row: true, shrink: true, alignItems: "center", gap: "$spacing12", children: [_jsx(TokenLogo, { chainId: currency.chainId, name: currency.name, symbol: currency.symbol, url: (_a = currencyInfo.logoUrl) !== null && _a !== void 0 ? _a : undefined }), _jsxs(Flex, { shrink: true, children: [_jsxs(Flex, { row: true, alignItems: "center", gap: "$spacing8", children: [_jsx(Text, { color: "$neutral1", numberOfLines: 1, variant: "body1", children: currency.name }), warningIconColor && (_jsx(Flex, { children: _jsx(WarningIcon, { severity: severity, size: "$icon.16", strokeColorOverride: warningIconColor }) }))] }), _jsxs(Flex, { row: true, alignItems: "center", gap: "$spacing8", children: [_jsx(Text, { color: "$neutral2", numberOfLines: 1, variant: "body3", children: getSymbolDisplayText(currency.symbol) }), !currency.isNative && showTokenAddress && (_jsx(Flex, { shrink: true, children: _jsx(Text, { color: "$neutral3", numberOfLines: 1, variant: "body3", children: shortenAddress(currency.address) }) }))] })] })] }), isSelected && (_jsx(Flex, { grow: true, alignItems: "flex-end", justifyContent: "center", children: _jsx(Check, { color: "$accent1", size: iconSizes.icon20 }) })), !isSelected && quantity && quantity !== 0 ? (_jsxs(Flex, { alignItems: "flex-end", children: [_jsx(Text, { variant: "body1", children: balance }), quantityFormatted && (_jsx(Text, { color: "$neutral2", variant: "body3", children: quantityFormatted }))] })) : null] }) }), _jsx(TokenWarningModal, { currencyInfo0: currencyInfo, isVisible: showWarningModal, closeModalOnly: () => setShowWarningModal(false), onAcknowledge: onAcceptTokenWarning })] }));
}
export const TokenOptionItem = React.memo(_TokenOptionItem);
//# sourceMappingURL=TokenOptionItem.js.map