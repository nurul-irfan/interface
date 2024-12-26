import { jsx as _jsx } from "react/jsx-runtime";
import { SlippageControl } from 'uniswap/src/features/transactions/swap/settings/SlippageControl';
export const Slippage = {
    renderTitle: (t) => t('swap.slippage.settings.title'),
    renderTooltip: (t) => t('swap.settings.slippage.description'),
    settingId: 'slippage',
    Control() {
        return _jsx(SlippageControl, { saveOnBlur: false });
    },
};
//# sourceMappingURL=Slippage.web.js.map