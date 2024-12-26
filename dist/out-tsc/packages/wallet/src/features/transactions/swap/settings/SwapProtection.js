import { jsx as _jsx } from "react/jsx-runtime";
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Switch, Text } from 'ui/src';
import { getChainLabel } from 'uniswap/src/features/chains/utils';
import { FeatureFlags } from 'uniswap/src/features/gating/flags';
import { useSwapFormContext } from 'uniswap/src/features/transactions/swap/contexts/SwapFormContext';
import { isPrivateRpcSupportedOnChain } from 'wallet/src/features/providers/utils';
import { SwapProtectionInfoModal } from 'wallet/src/features/transactions/swap/modals/SwapProtectionModal';
import { useSwapProtectionSetting } from 'wallet/src/features/wallet/hooks';
import { SwapProtectionSetting, setSwapProtectionSetting } from 'wallet/src/features/wallet/slice';
export const SwapProtection = {
    renderTitle: (t) => t('swap.settings.protection.title'),
    Description() {
        const { t } = useTranslation();
        const chainId = useSwapFormContext().derivedSwapInfo.chainId;
        const privateRpcSupportedOnChain = isPrivateRpcSupportedOnChain(chainId);
        const chainName = getChainLabel(chainId);
        return (_jsx(Text, { color: "$neutral2", variant: "body3", children: privateRpcSupportedOnChain
                ? t('swap.settings.protection.subtitle.supported', { chainName })
                : t('swap.settings.protection.subtitle.unavailable', { chainName }) }));
    },
    Control() {
        const dispatch = useDispatch();
        const chainId = useSwapFormContext().derivedSwapInfo.chainId;
        const privateRpcSupportedOnChain = isPrivateRpcSupportedOnChain(chainId);
        const swapProtectionSetting = useSwapProtectionSetting();
        const toggleSwapProtectionSetting = useCallback(() => {
            if (swapProtectionSetting === SwapProtectionSetting.On) {
                dispatch(setSwapProtectionSetting({ newSwapProtectionSetting: SwapProtectionSetting.Off }));
            }
            if (swapProtectionSetting === SwapProtectionSetting.Off) {
                dispatch(setSwapProtectionSetting({ newSwapProtectionSetting: SwapProtectionSetting.On }));
            }
        }, [dispatch, swapProtectionSetting]);
        return (_jsx(Switch, { checked: privateRpcSupportedOnChain && swapProtectionSetting === SwapProtectionSetting.On, disabled: !privateRpcSupportedOnChain, variant: "branded", onCheckedChange: toggleSwapProtectionSetting }));
    },
    InfoModal: SwapProtectionInfoModal,
    featureFlag: FeatureFlags.PrivateRpc,
};
//# sourceMappingURL=SwapProtection.js.map