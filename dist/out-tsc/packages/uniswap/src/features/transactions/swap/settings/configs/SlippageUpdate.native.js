import { Slippage } from 'uniswap/src/features/transactions/swap/settings/configs/Slippage';
// On native, the update slippage popup is the same as the usual tx settings update modal.
export const SlippageUpdate = {
    ...Slippage,
    renderCloseButtonText: (t) => t('common.button.save'),
};
//# sourceMappingURL=SlippageUpdate.native.js.map