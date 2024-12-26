import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { t } from 'i18next';
import { FadeIn } from 'react-native-reanimated';
import { Flex, isWeb, SpinningLoader, Text } from 'ui/src';
import { Gas } from 'ui/src/components/icons';
import { AnimatedFlex } from 'ui/src/components/layout/AnimatedFlex';
import { iconSizes } from 'ui/src/theme';
import { useGasFeeFormattedDisplayAmounts } from 'uniswap/src/features/gas/hooks';
import { NetworkFeeWarning } from 'uniswap/src/features/transactions/swap/modals/NetworkFeeWarning';
export function GasFeeRow({ gasFee, chainId }) {
    const { gasFeeFormatted } = useGasFeeFormattedDisplayAmounts({
        gasFee,
        chainId,
        placeholder: undefined,
    });
    if (!gasFeeFormatted) {
        return null;
    }
    return (_jsxs(Flex, { centered: true, row: true, justifyContent: isWeb ? 'space-between' : 'center', px: "$spacing8", children: [isWeb && (_jsx(Text, { color: "$neutral2", flexShrink: 1, variant: "body3", children: t('send.gas.networkCost.title') })), gasFee.isLoading ? (_jsx(SpinningLoader, { size: iconSizes.icon16 })) : gasFee.error ? (_jsx(Text, { color: "$neutral2", variant: "body3", children: t('send.gas.error.title') })) : (_jsx(NetworkFeeWarning, { placement: "bottom", tooltipTrigger: _jsxs(AnimatedFlex, { centered: true, row: true, entering: FadeIn, gap: "$spacing4", children: [_jsx(Gas, { color: "$neutral2", size: "$icon.16" }), _jsx(Text, { color: "$neutral2", variant: "body3", children: gasFeeFormatted })] }) }))] }));
}
//# sourceMappingURL=GasFeeRow.js.map