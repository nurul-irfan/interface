import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Flex, Text, UniversalImage, useIsDarkMode } from 'ui/src';
import { TransactionType } from 'uniswap/src/features/transactions/types/transactionDetails';
const ICON_SIZE = 14;
export const TransactionSummaryTitle = ({ transaction, title }) => {
    const isDarkMode = useIsDarkMode();
    const onRampLogo = transaction.typeInfo.type === TransactionType.OnRampPurchase ||
        transaction.typeInfo.type === TransactionType.OnRampTransfer ? (_jsx(UniversalImage, { size: { height: ICON_SIZE, width: ICON_SIZE }, style: {
            image: {
                borderRadius: 4,
            },
        }, uri: isDarkMode
            ? transaction.typeInfo.serviceProvider.logoDarkUrl
            : transaction.typeInfo.serviceProvider.logoLightUrl })) : null;
    return (_jsxs(Flex, { row: true, alignItems: "center", children: [_jsx(Text, { color: "$neutral2", mr: onRampLogo ? 4 : 0, variant: "body2", children: title }), onRampLogo] }));
};
//# sourceMappingURL=TransactionSummaryTitle.js.map