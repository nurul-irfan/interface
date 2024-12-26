import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useTranslation } from 'react-i18next';
import { Button, Flex, ScrollView, Text } from 'ui/src';
import { UserSquare } from 'ui/src/components/icons';
import { fonts, iconSizes, imageSizes } from 'ui/src/theme';
import { Modal } from 'uniswap/src/components/modals/Modal';
import { useENSAvatar, useENSName } from 'uniswap/src/features/ens/api';
import { ModalName } from 'uniswap/src/features/telemetry/constants';
import { getValidAddress } from 'uniswap/src/utils/addresses';
import { isMobileApp } from 'utilities/src/platform';
import { AccountIcon } from 'wallet/src/components/accounts/AccountIcon';
import { AddressDisplay } from 'wallet/src/components/accounts/AddressDisplay';
import { useDisplayName } from 'wallet/src/features/wallet/hooks';
import { DisplayNameType } from 'wallet/src/features/wallet/types';
/**
 * Helper component to render a left label column and a right child. The label + text
 * will wrap if the content is too long.
 *
 * @param leftText Label text on left
 * @param rightChild Dynamic child on the right side
 */
const LeftRightText = ({ leftText, rightChild }) => {
    return (_jsxs(Flex, { row: true, flexGrow: 1, alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", px: "$spacing16", children: [_jsx(Text, { color: "$neutral2", fontWeight: "bold", variant: "body3", pr: "$spacing8", children: leftText }), _jsx(Flex, { flexShrink: 1, children: rightChild })] }));
};
/**
 * Modal shown when trying to do a transaction with a that the user has not done a transaction
 * with before. The user can then confirm that they want to proceed or cancel the transaction.
 *
 * @param address Target address the user has not transacted with
 * @param onAcknowledge Callback when the user has confirmed they want to proceed
 * @param onConfirm Callback when the user does not want to proceed with the transaction for new address
 */
export function NewAddressWarningModal({ address, onAcknowledge, onClose }) {
    const { t } = useTranslation();
    const validated = getValidAddress(address);
    const displayName = useDisplayName(address, { includeUnitagSuffix: true });
    const ensDisplayName = useENSName(validated !== null && validated !== void 0 ? validated : undefined);
    const { data: ensAvatar } = useENSAvatar(validated);
    return (_jsx(Modal, { name: ModalName.NewAddressWarning, onClose: onClose, children: _jsxs(Flex, { px: isMobileApp && '$spacing24', py: "$spacing12", children: [_jsxs(Flex, { centered: true, gap: "$spacing16", pb: "$spacing16", children: [_jsx(Flex, { centered: true, backgroundColor: "$surface2", borderRadius: "$rounded12", p: "$spacing12", children: _jsx(UserSquare, { color: "$neutral2", size: iconSizes.icon24 }) }), _jsx(Text, { color: "$neutral1", variant: "subheading1", children: t('send.warning.newAddress.title') }), _jsx(Text, { color: "$neutral2", variant: "body3", children: t('send.warning.newAddress.message') })] }), _jsxs(ScrollView, { horizontal: true, showsHorizontalScrollIndicator: false, contentContainerStyle: styles.scrollViewContent, borderColor: "$surface3", borderRadius: "$rounded16", borderWidth: 1, flexDirection: "column", children: [(displayName === null || displayName === void 0 ? void 0 : displayName.type) === DisplayNameType.Unitag && (_jsx(LeftRightText, { leftText: t('send.warning.newAddress.details.username'), rightChild: _jsx(AddressDisplay, { hideAddressInSubtitle: true, includeUnitagSuffix: true, horizontalGap: "$spacing4", address: address, lineHeight: fonts.body3.lineHeight, size: 16, variant: "body3" }) })), ensDisplayName.data && (_jsx(LeftRightText, { leftText: t('send.warning.newAddress.details.ENS'), rightChild: _jsxs(Flex, { row: true, alignItems: "center", gap: "$spacing4", children: [_jsx(AccountIcon, { address: address, avatarUri: ensAvatar, size: imageSizes.image16 }), _jsx(Text, { numberOfLines: 0, loading: ensDisplayName.isLoading, variant: "body3", children: ensDisplayName.data })] }) })), _jsx(LeftRightText, { leftText: t('send.warning.newAddress.details.walletAddress'), rightChild: _jsx(Text, { numberOfLines: 0, variant: "body3", children: address }) })] }), _jsxs(Flex, { row: true, gap: "$spacing12", pt: "$spacing24", children: [_jsx(Button, { flex: 1, flexBasis: 1, theme: "secondary", onPress: onClose, children: t('common.button.back') }), _jsx(Button, { flex: 1, flexBasis: 1, theme: "primary", onPress: onAcknowledge, children: t('common.button.confirm') })] })] }) }));
}
const styles = {
    scrollViewContent: {
        flexDirection: 'column',
        flexWrap: 'wrap',
        py: '$spacing16',
        flexGrow: 1,
    },
};
//# sourceMappingURL=NewAddressWarningModal.js.map