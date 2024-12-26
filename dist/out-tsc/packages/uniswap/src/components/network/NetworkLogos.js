import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Flex, Image, Text, TouchableArea, UniversalImage, UniversalImageResizeMode, useSporeColors, } from 'ui/src';
import { ALL_NETWORKS_LOGO } from 'ui/src/assets';
import { GlobeFilled } from 'ui/src/components/icons/GlobeFilled';
import { X } from 'ui/src/components/icons/X';
import { borderRadii, iconSizes, zIndices } from 'ui/src/theme';
import { Modal } from 'uniswap/src/components/modals/Modal';
import { LearnMoreLink } from 'uniswap/src/components/text/LearnMoreLink';
import { uniswapUrls } from 'uniswap/src/constants/urls';
import { getChainInfo } from 'uniswap/src/features/chains/chainInfo';
import { ModalName } from 'uniswap/src/features/telemetry/constants';
import { isInterface } from 'utilities/src/platform';
export function NetworkLogos({ chains }) {
    const { t } = useTranslation();
    const colors = useSporeColors();
    const [isShowingModal, setIsShowingModal] = useState(false);
    const closeModal = useCallback(() => setIsShowingModal(false), []);
    const openModal = useCallback(() => setIsShowingModal(true), []);
    const chainPills = useMemo(() => (_jsx(Flex, { row: true, flexWrap: "wrap", justifyContent: "center", gap: "$gap12", children: chains.map((chain) => {
            const { label, logo } = getChainInfo(chain);
            return (_jsxs(Flex, { row: true, centered: true, p: "$spacing4", backgroundColor: "$surface2", width: "max-content", borderRadius: "$rounded8", gap: "$gap8", children: [logo && (_jsx(Image, { objectFit: "contain", source: logo, style: {
                            width: iconSizes.icon16,
                            height: iconSizes.icon16,
                            borderRadius: borderRadii.rounded4,
                        } })), _jsx(Text, { color: "$neutral1", variant: "body4", children: label })] }, chain));
        }) })), [chains]);
    return (_jsxs(_Fragment, { children: [_jsxs(Button, { backgroundColor: "$surface2", alignSelf: "center", borderRadius: "$rounded16", "aria-label": t('extension.connection.networks'), p: "$padding8", pr: "$padding12", hoverStyle: { backgroundColor: colors.surface3Hovered.val }, pressStyle: { backgroundColor: colors.surface3Hovered.val }, onPress: openModal, children: [_jsx(UniversalImage, { allowLocalUri: true, uri: ALL_NETWORKS_LOGO, size: {
                            width: iconSizes.icon20,
                            height: iconSizes.icon20,
                            resizeMode: UniversalImageResizeMode.Contain,
                        } }), _jsx(Text, { color: "$neutral2", variant: "buttonLabel4", children: t('extension.connection.networks') })] }), _jsx(Modal, { name: ModalName.QRCodeNetworkInfo, isModalOpen: isShowingModal, onClose: closeModal, children: _jsxs(Flex, { gap: "$spacing12", px: "$padding16", pb: "$spacing4", alignItems: "center", mt: "$gap12", children: [isInterface && (_jsx(TouchableArea, { alignSelf: "flex-end", zIndex: zIndices.default, onPress: closeModal, children: _jsx(X, { color: "$neutral2", size: "$icon.24" }) })), _jsx(Flex, { centered: true, p: "$padding12", backgroundColor: "$surface3", borderRadius: "$rounded12", children: _jsx(GlobeFilled, { color: "$neutral1", size: "$icon.20" }) }), _jsx(Text, { color: "$neutral1", mt: "$spacing2", textAlign: "center", variant: "subheading1", children: t('qrScanner.wallet.networks') }), chainPills, _jsx(LearnMoreLink, { textColor: "$neutral1", textVariant: "buttonLabel3", url: uniswapUrls.helpArticleUrls.supportedNetworks }), _jsx(Button, { width: "100%", color: "$neutral1", mt: "$spacing12", theme: "secondary", onPress: closeModal, children: t('common.button.close') })] }) })] }));
}
//# sourceMappingURL=NetworkLogos.js.map