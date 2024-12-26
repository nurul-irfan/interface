import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { t } from 'i18next';
import { useState } from 'react';
import { Flex } from 'ui/src';
import { ShieldCheck } from 'ui/src/components/icons';
import { InfoLinkModal } from 'uniswap/src/components/modals/InfoLinkModal';
import { uniswapUrls } from 'uniswap/src/constants/urls';
import { ModalName, WalletEventName } from 'uniswap/src/features/telemetry/constants';
import { sendAnalyticsEvent } from 'uniswap/src/features/telemetry/send';
import { isExtension } from 'utilities/src/platform';
import { InformationBanner } from 'wallet/src/components/banners/InformationBanner';
export function ShowNFTModal() {
    const [isModalVisible, setModalVisible] = useState(false);
    const handlePressToken = () => {
        setModalVisible(true);
    };
    const closeModal = () => {
        setModalVisible(false);
    };
    const handleAnalytics = () => {
        sendAnalyticsEvent(WalletEventName.ExternalLinkOpened, {
            url: uniswapUrls.helpArticleUrls.hiddenNFTInfo,
        });
    };
    return (_jsxs(_Fragment, { children: [_jsx(Flex, { children: _jsx(InformationBanner, { infoText: t('hidden.nfts.info.banner.text'), onPress: handlePressToken }) }), _jsx(InfoLinkModal, { showCloseButton: true, buttonText: t('common.button.close'), buttonTheme: "tertiary", description: isExtension ? t('hidden.nfts.info.text.extension') : t('hidden.nfts.info.text.mobile'), icon: _jsx(Flex, { centered: true, backgroundColor: "$surface3", borderRadius: "$rounded12", p: "$spacing12", children: _jsx(ShieldCheck, { color: "$neutral1", size: "$icon.24" }) }), isOpen: isModalVisible, linkText: t('common.button.learn'), linkUrl: uniswapUrls.helpArticleUrls.hiddenNFTInfo, name: ModalName.HiddenNFTInfoModal, title: t('hidden.nfts.info.text.title'), onAnalyticsEvent: handleAnalytics, onButtonPress: closeModal, onDismiss: closeModal })] }));
}
//# sourceMappingURL=ShowNFTModal.js.map