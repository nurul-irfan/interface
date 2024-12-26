import { Fragment as _Fragment, jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useTranslation } from 'react-i18next';
import { Flex, Text } from 'ui/src';
import { SlippageControl } from 'uniswap/src/features/transactions/swap/settings/SlippageControl';
export const SlippageUpdate = {
    renderTitle: (t) => t('swap.slippage.settings.title'),
    renderCloseButtonText: (t) => t('common.button.save'),
    hideTitle: true,
    Control() {
        return _jsx(_Fragment, {});
    },
    Screen() {
        const { t } = useTranslation();
        return (_jsx(Flex, { gap: "$spacing16", width: "100%", children: _jsxs(Flex, { row: true, alignItems: "center", justifyContent: "space-between", py: "$spacing16", children: [_jsx(Text, { variant: "body2", children: t('swap.slippage.settings.title') }), _jsx(SlippageControl, { saveOnBlur: true })] }) }));
    },
};
//# sourceMappingURL=SlippageUpdate.web.js.map