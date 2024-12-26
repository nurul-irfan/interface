import { PlatformSplitStubError } from 'utilities/src/errors';
export const SlippageUpdate = {
    renderTitle: (t) => t('swap.slippage.settings.title'),
    renderCloseButtonText: (t) => t('common.button.save'),
    Control() {
        throw new PlatformSplitStubError('Slippage');
    },
};
//# sourceMappingURL=SlippageUpdate.js.map