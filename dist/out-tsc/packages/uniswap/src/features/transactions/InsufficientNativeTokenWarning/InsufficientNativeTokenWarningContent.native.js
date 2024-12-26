import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Flex, Text, TouchableArea } from 'ui/src';
import { CurrencyLogo } from 'uniswap/src/components/CurrencyLogo/CurrencyLogo';
import { WarningModal } from 'uniswap/src/components/modals/WarningModal/WarningModal';
import { LearnMoreLink } from 'uniswap/src/components/text/LearnMoreLink';
import { uniswapUrls } from 'uniswap/src/constants/urls';
import { useBridgingTokenWithHighestBalance } from 'uniswap/src/features/bridging/hooks/tokens';
import { UniverseChainId } from 'uniswap/src/features/chains/types';
import { ModalName } from 'uniswap/src/features/telemetry/constants';
import { BridgeTokenButton } from 'uniswap/src/features/transactions/InsufficientNativeTokenWarning/BridgeTokenButton';
import { BuyNativeTokenButton } from 'uniswap/src/features/transactions/InsufficientNativeTokenWarning/BuyNativeTokenButton';
import { InsufficientNativeTokenBaseComponent } from 'uniswap/src/features/transactions/InsufficientNativeTokenWarning/InsufficientNativeTokenBaseComponent';
import { currencyIdToAddress } from 'uniswap/src/utils/currencyId';
export function InsufficientNativeTokenWarningContent({ address, parsedInsufficentNativeTokenWarning, nativeCurrencyInfo, nativeCurrency, }) {
    const { t } = useTranslation();
    const [showModal, setShowModal] = useState(false);
    const { networkName, modalOrTooltipMainMessage } = parsedInsufficentNativeTokenWarning;
    const currencyAddress = currencyIdToAddress(nativeCurrencyInfo.currencyId);
    const bridgingTokenWithHighestBalance = useBridgingTokenWithHighestBalance({
        address,
        currencyAddress,
        currencyChainId: nativeCurrencyInfo.currency.chainId,
    });
    const shouldShowNetworkName = nativeCurrency.symbol === 'ETH' && nativeCurrency.chainId !== UniverseChainId.Mainnet;
    return (_jsxs(_Fragment, { children: [_jsx(TouchableArea, { onPress: () => setShowModal(true), children: _jsx(InsufficientNativeTokenBaseComponent, { parsedInsufficentNativeTokenWarning: parsedInsufficentNativeTokenWarning }) }), showModal && (_jsx(WarningModal, { isOpen: true, backgroundIconColor: false, icon: _jsx(CurrencyLogo, { currencyInfo: nativeCurrencyInfo }), modalName: ModalName.SwapWarning, title: shouldShowNetworkName
                    ? t('transaction.warning.insufficientGas.modal.title.withNetwork', {
                        tokenSymbol: nativeCurrency.symbol,
                        networkName,
                    })
                    : t('transaction.warning.insufficientGas.modal.title.withoutNetwork', {
                        tokenSymbol: nativeCurrency.symbol,
                    }), onClose: () => setShowModal(false), children: _jsxs(Flex, { centered: true, gap: "$spacing16", width: "100%", children: [_jsx(Text, { color: "$neutral2", textAlign: "center", variant: "body3", children: modalOrTooltipMainMessage }), bridgingTokenWithHighestBalance && (_jsx(BridgeTokenButton, { inputToken: bridgingTokenWithHighestBalance.currencyInfo, outputToken: nativeCurrencyInfo, outputNetworkName: networkName })), _jsx(BuyNativeTokenButton, { nativeCurrencyInfo: nativeCurrencyInfo, canBridge: !!bridgingTokenWithHighestBalance }), _jsx(LearnMoreLink, { textColor: "$neutral2", textVariant: "buttonLabel2", url: uniswapUrls.helpArticleUrls.networkFeeInfo })] }) }))] }));
}
//# sourceMappingURL=InsufficientNativeTokenWarningContent.native.js.map