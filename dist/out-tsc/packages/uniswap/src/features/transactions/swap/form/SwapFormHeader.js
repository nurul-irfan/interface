import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useTranslation } from 'react-i18next';
import { Flex, Text, TouchableArea, isWeb } from 'ui/src';
import { X } from 'ui/src/components/icons/X';
import { iconSizes } from 'ui/src/theme';
import { useTransactionModalContext } from 'uniswap/src/features/transactions/TransactionModal/TransactionModalContext';
import { TestID } from 'uniswap/src/test/fixtures/testIDs';
export function SwapFormHeader() {
    const { t } = useTranslation();
    const { onClose } = useTransactionModalContext();
    return (_jsxs(Flex, { row: true, alignItems: "center", position: "relative", justifyContent: "flex-start", mb: isWeb ? '$spacing16' : '$spacing12', mt: isWeb ? '$spacing4' : '$spacing8', pl: isWeb ? '$none' : '$spacing12', testID: TestID.SwapFormHeader, height: "$spacing32", children: [isWeb && (_jsx(TouchableArea, { testID: TestID.SwapSettings, onPress: onClose, children: _jsx(Flex, { centered: true, row: true, backgroundColor: isWeb ? undefined : '$surface2', borderRadius: "$roundedFull", px: "$spacing4", py: "$spacing4", children: _jsx(X, { color: "$neutral2", size: iconSizes.icon24 }) }) })), _jsx(Flex, { "$platform-web": { position: 'absolute', left: '50%', transform: 'translateX(-50%)' }, children: _jsx(Text, { variant: "subheading1", children: t('swap.form.header') }) })] }));
}
//# sourceMappingURL=SwapFormHeader.js.map