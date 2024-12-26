import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Flex, Text, Tooltip } from 'ui/src';
import { LearnMoreLink } from 'uniswap/src/components/text/LearnMoreLink';
import { uniswapUrls } from 'uniswap/src/constants/urls';
import { useBridgingTokenWithHighestBalance } from 'uniswap/src/features/bridging/hooks/tokens';
import { BridgeTokenButton } from 'uniswap/src/features/transactions/InsufficientNativeTokenWarning/BridgeTokenButton';
import { BuyNativeTokenButton } from 'uniswap/src/features/transactions/InsufficientNativeTokenWarning/BuyNativeTokenButton';
import { InsufficientNativeTokenBaseComponent } from 'uniswap/src/features/transactions/InsufficientNativeTokenWarning/InsufficientNativeTokenBaseComponent';
import { currencyIdToAddress } from 'uniswap/src/utils/currencyId';
export function InsufficientNativeTokenWarningContent({ address, parsedInsufficentNativeTokenWarning, nativeCurrencyInfo, }) {
    const { networkName, modalOrTooltipMainMessage } = parsedInsufficentNativeTokenWarning;
    const currencyAddress = currencyIdToAddress(nativeCurrencyInfo.currencyId);
    const bridgingTokenWithHighestBalance = useBridgingTokenWithHighestBalance({
        address,
        currencyAddress,
        currencyChainId: nativeCurrencyInfo.currency.chainId,
    });
    return (_jsxs(Tooltip, { delay: 100, placement: "bottom-end", children: [_jsx(Tooltip.Trigger, { cursor: "default", children: _jsx(InsufficientNativeTokenBaseComponent, { parsedInsufficentNativeTokenWarning: parsedInsufficentNativeTokenWarning }) }), _jsxs(Tooltip.Content, { maxWidth: 300, px: "$spacing16", py: "$spacing12", children: [_jsxs(Flex, { alignItems: "center", gap: "$spacing18", justifyContent: "space-between", children: [_jsx(Text, { color: "$neutral2", variant: "body4", children: modalOrTooltipMainMessage }), _jsxs(Flex, { centered: true, gap: "$spacing8", children: [bridgingTokenWithHighestBalance && (_jsx(BridgeTokenButton, { inputToken: bridgingTokenWithHighestBalance.currencyInfo, outputToken: nativeCurrencyInfo, outputNetworkName: networkName })), _jsx(BuyNativeTokenButton, { nativeCurrencyInfo: nativeCurrencyInfo, canBridge: !!bridgingTokenWithHighestBalance }), _jsx(LearnMoreLink, { textVariant: "buttonLabel3", url: uniswapUrls.helpArticleUrls.networkFeeInfo })] })] }), _jsx(Tooltip.Arrow, {})] })] }));
}
//# sourceMappingURL=InsufficientNativeTokenWarningContent.web.js.map