import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useTranslation } from 'react-i18next';
import { Flex, Text, Tooltip } from 'ui/src';
import { AlertTriangleFilled } from 'ui/src/components/icons';
import { iconSizes } from 'ui/src/theme';
import { areAddressesEqual } from 'uniswap/src/utils/addresses';
import { isMobileApp } from 'utilities/src/platform';
import { AddressDisplay } from 'wallet/src/components/accounts/AddressDisplay';
import { ContentRow } from 'wallet/src/features/transactions/TransactionRequest/ContentRow';
export function AddressFooter({ connectedAccountAddress, activeAccountAddress, px = '$none', }) {
    const { t } = useTranslation();
    const variant = isMobileApp ? 'body3' : 'body4';
    const currentAccountAddress = connectedAccountAddress || activeAccountAddress;
    const showWarning = connectedAccountAddress && !areAddressesEqual(connectedAccountAddress, activeAccountAddress);
    return (_jsx(Flex, { grow: true, px: px, children: _jsx(ContentRow, { label: _jsxs(Flex, { grow: true, row: true, alignItems: "center", gap: "$spacing4", children: [_jsx(Text, { color: "$neutral2", variant: variant, children: t('dapp.request.approve.label') }), showWarning && _jsx(TooltipWarning, {})] }), children: _jsx(AddressDisplay, { disableForcedWidth: true, hideAddressInSubtitle: true, address: currentAccountAddress, horizontalGap: "$spacing4", size: 16, variant: variant }) }) }));
}
const TooltipWarning = () => {
    const { t } = useTranslation();
    return (_jsxs(Tooltip, { placement: "top", children: [_jsx(Tooltip.Trigger, { children: _jsx(AlertTriangleFilled, { color: "$neutral3", size: iconSizes.icon16 }) }), _jsx(Tooltip.Content, { ml: "$spacing12", px: "$none", py: "$none", children: _jsxs(Flex, { backgroundColor: "$surface3", borderColor: "$surface3", borderRadius: "$rounded16", borderWidth: 1, p: "$spacing12", children: [_jsx(Text, { variant: "body4", children: t('dapp.request.warning.notActive.title') }), _jsx(Text, { color: "$neutral2", variant: "body4", children: t('dapp.request.warning.notActive.message') })] }) })] }));
};
//# sourceMappingURL=AddressFooter.js.map