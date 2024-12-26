import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useTranslation } from 'react-i18next';
import { Flex, QRCodeDisplay, Text, isWeb, useMedia, useSporeColors } from 'ui/src';
import { spacing } from 'ui/src/theme';
import { NetworkLogos } from 'uniswap/src/components/network/NetworkLogos';
import { useAvatar } from 'uniswap/src/features/address/avatar';
import { useAddressColorProps } from 'uniswap/src/features/address/color';
import { useOrderedChainIds } from 'uniswap/src/features/chains/hooks/useOrderedChainIds';
import { SUPPORTED_CHAIN_IDS } from 'uniswap/src/features/chains/types';
import { AccountIcon } from 'wallet/src/components/accounts/AccountIcon';
import { AddressDisplay } from 'wallet/src/components/accounts/AddressDisplay';
export function WalletQRCode({ address }) {
    const colors = useSporeColors();
    const { avatar } = useAvatar(address);
    const { t } = useTranslation();
    const media = useMedia();
    const addressColor = useAddressColorProps(address);
    const orderedChainIds = useOrderedChainIds(SUPPORTED_CHAIN_IDS);
    const QR_CODE_SIZE = media.short ? 220 : 240;
    const UNICON_SIZE = QR_CODE_SIZE / 4;
    return (_jsxs(Flex, { grow: true, "$short": { mb: spacing.none, mx: spacing.spacing48 }, alignItems: "center", animation: "quick", gap: "$spacing12", justifyContent: isWeb ? 'flex-start' : 'center', mb: "$spacing8", px: isWeb ? '$spacing16' : '$spacing60', py: isWeb ? '$spacing60' : '$spacing24', children: [_jsx(Flex, { py: "$spacing12", children: _jsx(AddressDisplay, { includeUnitagSuffix: true, showCopy: true, disableForcedWidth: true, address: address, captionVariant: "body2", showAccountIcon: false, variant: "heading3" }) }), _jsx(QRCodeDisplay, { color: addressColor, containerBackgroundColor: colors.surface1.val, encodedValue: address, size: QR_CODE_SIZE, children: _jsx(AccountIcon, { address: address, avatarUri: avatar, borderColor: "$surface1", borderWidth: 4, showBackground: true, showBorder: true, size: UNICON_SIZE }) }), _jsx(Text, { color: "$neutral2", lineHeight: 20, textAlign: "center", variant: "body4", children: t('qrScanner.wallet.title', { numOfNetworks: orderedChainIds.length }) }), _jsx(NetworkLogos, { chains: orderedChainIds })] }));
}
//# sourceMappingURL=WalletQRCode.js.map