import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Flex, Popover } from 'ui/src';
import { ExternalLink } from 'ui/src/components/icons';
import { pushNotification } from 'uniswap/src/features/notifications/slice';
import { AppNotificationType, CopyNotificationType } from 'uniswap/src/features/notifications/types';
import { setClipboard } from 'uniswap/src/utils/clipboard';
import { isMobileApp } from 'utilities/src/platform';
import { MenuContent } from 'wallet/src/components/menu/MenuContent';
import { InfoRow } from 'wallet/src/features/transactions/SummaryCards/DetailsModal/InfoRow';
import { TransactionParticipantDisplay } from 'wallet/src/features/transactions/SummaryCards/DetailsModal/TransactionParticipantDisplay';
export function TransactionParticipantRow({ address, isSend = false }) {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const onCopyAddress = async () => {
        await setClipboard(address);
        dispatch(pushNotification({
            type: AppNotificationType.Copied,
            copyType: CopyNotificationType.Address,
        }));
    };
    const options = [
        {
            label: 'Copy address',
            onPress: onCopyAddress,
            Icon: !isMobileApp ? ExternalLink : undefined,
            iconPlacement: 'left',
            iconTextGap: '$spacing8',
        },
    ];
    return (_jsx(InfoRow, { label: isSend ? t('common.text.recipient') : t('common.text.sender'), children: _jsxs(Popover, { hoverable: true, placement: "top-end", children: [_jsx(Popover.Trigger, { children: _jsx(TransactionParticipantDisplay, { address: address }) }), _jsx(Popover.Content, { animation: [
                        'quick',
                        {
                            opacity: {
                                overshootClamping: true,
                            },
                        },
                    ], borderColor: "$surface3", borderRadius: "$rounded16", borderWidth: "$spacing1", disableRemoveScroll: false, enterStyle: { y: -10, opacity: 0 }, exitStyle: { y: -10, opacity: 0 }, p: "$none", children: _jsx(Flex, { children: _jsx(MenuContent, { items: options }) }) })] }) }));
}
//# sourceMappingURL=TransactionParticipantRow.web.js.map