import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useCallback, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { Flex, Switch, Text, UniswapXText } from 'ui/src';
import { InfoCircleFilled } from 'ui/src/components/icons/InfoCircleFilled';
import { UniswapX } from 'ui/src/components/icons/UniswapX';
import { ProtocolItems } from 'uniswap/src/data/tradingApi/__generated__';
import { getChainInfo } from 'uniswap/src/features/chains/chainInfo';
import { FeatureFlags } from 'uniswap/src/features/gating/flags';
import { useFeatureFlag } from 'uniswap/src/features/gating/hooks';
import Trace from 'uniswap/src/features/telemetry/Trace';
import { ElementName } from 'uniswap/src/features/telemetry/constants';
import { useTransactionSettingsContext } from 'uniswap/src/features/transactions/settings/contexts/TransactionSettingsContext';
import { useSwapFormContext } from 'uniswap/src/features/transactions/swap/contexts/SwapFormContext';
import { UniswapXInfo } from 'uniswap/src/features/transactions/swap/modals/UniswapXInfo';
import { DEFAULT_PROTOCOL_OPTIONS, } from 'uniswap/src/features/transactions/swap/utils/protocols';
import { isMobileApp } from 'utilities/src/platform';
function isDefaultOptions(selectedProtocols) {
    return new Set(selectedProtocols).size === new Set([...selectedProtocols, ...DEFAULT_PROTOCOL_OPTIONS]).size;
}
export const ProtocolPreference = {
    renderTitle: (t) => t('swap.settings.routingPreference.title'),
    Control() {
        const { t } = useTranslation();
        const { selectedProtocols } = useTransactionSettingsContext();
        const { isOnlyV2Allowed } = useTransactionSettingsContext();
        const getTradeProtocolPreferenceTitle = () => {
            if (isDefaultOptions(selectedProtocols)) {
                return t('common.default');
            }
            if (isOnlyV2Allowed) {
                return t('swap.settings.routingPreference.option.v2.title');
            }
            return t('common.custom');
        };
        return (_jsx(Text, { color: "$neutral2", flexWrap: "wrap", variant: "subheading2", children: getTradeProtocolPreferenceTitle() }));
    },
    Screen() {
        const { t } = useTranslation();
        const { selectedProtocols, updateTransactionSettings, isOnlyV2Allowed } = useTransactionSettingsContext();
        const [isDefault, setIsDefault] = useState(isDefaultOptions(selectedProtocols));
        const uniswapXEnabled = useFeatureFlag(FeatureFlags.UniswapX);
        const { chainId } = useSwapFormContext().derivedSwapInfo;
        const chainName = getChainInfo(chainId).name;
        const v2RestrictionDescription = isOnlyV2Allowed
            ? t('swap.settings.protection.subtitle.unavailable', { chainName })
            : null;
        // We prevent the user from deselecting all options
        const onlyOneProtocolSelected = selectedProtocols.length === 1;
        // We prevent the user from deselecting all on-chain protocols (AKA only selecting UniswapX)
        const onlyOneClassicProtocolSelected = selectedProtocols.filter((p) => p !== ProtocolItems.UNISWAPX_V2).length === 1;
        const toggleProtocol = useCallback((protocol) => {
            if (selectedProtocols.includes(protocol)) {
                updateTransactionSettings({ selectedProtocols: selectedProtocols.filter((p) => p !== protocol) });
            }
            else {
                updateTransactionSettings({ selectedProtocols: [...selectedProtocols, protocol] });
            }
        }, [updateTransactionSettings, selectedProtocols]);
        const v4Enabled = useFeatureFlag(FeatureFlags.V4Swap);
        const toggleDefault = useCallback(() => {
            setIsDefault(!isDefault);
            if (!isDefault) {
                updateTransactionSettings({ selectedProtocols: DEFAULT_PROTOCOL_OPTIONS });
            }
        }, [updateTransactionSettings, isDefault]);
        return (_jsxs(Flex, { gap: "$spacing16", my: "$spacing16", children: [_jsx(OptionRow, { active: isDefault, description: _jsx(DefaultOptionDescription, { isDefault: isDefault }), elementName: ElementName.SwapRoutingPreferenceDefault, title: t('common.default'), cantDisable: false, disabled: isOnlyV2Allowed, onSelect: toggleDefault }), !isDefault && (_jsxs(_Fragment, { children: [uniswapXEnabled && (_jsx(OptionRow, { active: selectedProtocols.includes(ProtocolItems.UNISWAPX_V2), elementName: ElementName.SwapRoutingPreferenceUniswapX, title: getProtocolTitle(ProtocolItems.UNISWAPX_V2, t), cantDisable: onlyOneProtocolSelected, disabled: isOnlyV2Allowed, description: v2RestrictionDescription, onSelect: () => toggleProtocol(ProtocolItems.UNISWAPX_V2) })), v4Enabled && (_jsx(OptionRow, { active: selectedProtocols.includes(ProtocolItems.V4), elementName: ElementName.SwapRoutingPreferenceV4, title: getProtocolTitle(ProtocolItems.V4, t), cantDisable: onlyOneProtocolSelected, disabled: isOnlyV2Allowed, description: v2RestrictionDescription, onSelect: () => toggleProtocol(ProtocolItems.V4) })), _jsx(OptionRow, { active: selectedProtocols.includes(ProtocolItems.V3), elementName: ElementName.SwapRoutingPreferenceV3, title: getProtocolTitle(ProtocolItems.V3, t), cantDisable: onlyOneClassicProtocolSelected, disabled: isOnlyV2Allowed, description: v2RestrictionDescription, onSelect: () => toggleProtocol(ProtocolItems.V3) }), _jsx(OptionRow, { active: selectedProtocols.includes(ProtocolItems.V2), elementName: ElementName.SwapRoutingPreferenceV3, title: getProtocolTitle(ProtocolItems.V2, t), cantDisable: onlyOneClassicProtocolSelected || isOnlyV2Allowed, onSelect: () => toggleProtocol(ProtocolItems.V2) })] }))] }));
    },
};
export function getProtocolTitle(preference, t) {
    switch (preference) {
        case ProtocolItems.UNISWAPX_V2:
            return (_jsx(UniswapXInfo, { tooltipTrigger: _jsx(Text, { alignItems: "center", color: "$neutral2", variant: "body3", children: _jsx(Trans, { components: {
                            icon: _jsx(UniswapX, { size: "$icon.16", style: !isMobileApp && { transform: 'translateY(3px)' } }),
                            gradient: _jsx(UniswapXText, { height: 18, variant: "body3" }),
                            info: (_jsx(InfoCircleFilled, { color: "$neutral3", size: "$icon.16", style: !isMobileApp && { transform: 'translateY(3px)' } })),
                        }, i18nKey: "uniswapx.item" }) }) }));
        case ProtocolItems.V2:
            return t('swap.settings.routingPreference.option.v2.title');
        case ProtocolItems.V3:
            return t('swap.settings.routingPreference.option.v3.title');
        case ProtocolItems.V4:
            return t('swap.settings.routingPreference.option.v4.title');
        default:
            return _jsx(_Fragment, {});
    }
}
function OptionRow({ title, description, active, elementName, cantDisable, onSelect, disabled, }) {
    return (_jsxs(Flex, { row: true, gap: "$spacing16", justifyContent: "space-between", children: [_jsxs(Flex, { shrink: true, gap: "$spacing4", children: [_jsx(Text, { color: "$neutral1", variant: "subheading2", children: title }), typeof description === 'string' ? (_jsx(Text, { color: "$neutral2", variant: "body3", children: description })) : (description)] }), _jsx(Trace, { element: elementName, logPress: !active, children: _jsx(Switch, { disabled: (active && cantDisable) || disabled, checked: active, variant: "branded", onCheckedChange: onSelect }) })] }));
}
function DefaultOptionDescription({ isDefault }) {
    const v4Enabled = useFeatureFlag(FeatureFlags.V4Swap);
    const uniswapXEnabled = useFeatureFlag(FeatureFlags.UniswapX);
    const { t } = useTranslation();
    const showIncludesUniswapX = uniswapXEnabled && isDefault;
    const cheapestRouteText = t('swap.settings.routingPreference.option.default.description');
    const cheapestRouteTextV4 = t('swap.settings.routingPreference.option.default.description.v4');
    return (_jsxs(Flex, { gap: "$spacing4", children: [_jsx(Text, { color: "$neutral2", variant: "body3", children: v4Enabled ? cheapestRouteTextV4 : cheapestRouteText }), showIncludesUniswapX && (_jsx(UniswapXInfo, { tooltipTrigger: _jsx(Text, { alignItems: "center", color: "$neutral2", variant: "body3", children: _jsx(Trans, { components: {
                            icon: _jsx(UniswapX, { size: "$icon.16", style: !isMobileApp && { transform: 'translateY(3px)' } }),
                            gradient: _jsx(UniswapXText, { height: 18, variant: "body3" }),
                            info: (_jsx(InfoCircleFilled, { color: "$neutral3", size: "$icon.16", style: !isMobileApp && { transform: 'translateY(3px)' } })),
                        }, i18nKey: "uniswapx.included" }) }) }))] }));
}
//# sourceMappingURL=ProtocolPreference.js.map