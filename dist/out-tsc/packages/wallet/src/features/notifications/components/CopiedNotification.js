import { jsx as _jsx } from "react/jsx-runtime";
import { useTranslation } from 'react-i18next';
import { CopyNotificationType } from 'uniswap/src/features/notifications/types';
import { SuccessNotification } from 'wallet/src/features/notifications/components/SuccessNotification';
export function CopiedNotification({ notification: { hideDelay = 2000, copyType }, }) {
    const { t } = useTranslation();
    let title;
    switch (copyType) {
        case CopyNotificationType.Address:
            title = t('notification.copied.address');
            break;
        case CopyNotificationType.Calldata:
            title = t('notification.copied.calldata');
            break;
        case CopyNotificationType.ContractAddress:
            title = t('notification.copied.contractAddress');
            break;
        case CopyNotificationType.TransactionId:
            title = t('notification.copied.transactionId');
            break;
        case CopyNotificationType.Image:
            title = t('notification.copied.image');
            break;
        case CopyNotificationType.TokenUrl:
            title = t('notification.copied.tokenUrl');
            break;
        case CopyNotificationType.NftUrl:
            title = t('notification.copied.nftUrl');
            break;
        case CopyNotificationType.Unitag:
            title = t('notification.copied.unitag');
            break;
        case CopyNotificationType.BlockExplorerUrl:
            title = t('common.button.copied');
            break;
    }
    return _jsx(SuccessNotification, { notification: { title, hideDelay } });
}
//# sourceMappingURL=CopiedNotification.js.map