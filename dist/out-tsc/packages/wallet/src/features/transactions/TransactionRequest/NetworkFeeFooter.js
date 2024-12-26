import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useTranslation } from 'react-i18next';
import { Flex, Text } from 'ui/src';
import { iconSizes } from 'ui/src/theme';
import { NetworkLogo } from 'uniswap/src/components/CurrencyLogo/NetworkLogo';
import { UniswapXFee } from 'uniswap/src/components/gas/NetworkFee';
import { useGasFeeFormattedDisplayAmounts } from 'uniswap/src/features/gas/hooks';
import { isMobileApp } from 'utilities/src/platform';
import { ContentRow } from 'wallet/src/features/transactions/TransactionRequest/ContentRow';
export function NetworkFeeFooter({ chainId, showNetworkLogo, gasFee, isUniswapX, }) {
    const { t } = useTranslation();
    const variant = isMobileApp ? 'body3' : 'body4';
    const { gasFeeFormatted } = useGasFeeFormattedDisplayAmounts({
        gasFee,
        chainId,
        placeholder: '-',
    });
    return (_jsx(Flex, { px: "$spacing8", children: _jsx(ContentRow, { label: t('transaction.networkCost.label'), variant: variant, children: _jsxs(Flex, { centered: true, row: true, gap: "$spacing4", children: [showNetworkLogo && _jsx(NetworkLogo, { chainId: chainId, size: iconSizes.icon16 }), isUniswapX ? (_jsx(UniswapXFee, { gasFee: gasFeeFormatted })) : (_jsx(Text, { color: "$neutral1", variant: variant, children: gasFeeFormatted }))] }) }) }));
}
//# sourceMappingURL=NetworkFeeFooter.js.map