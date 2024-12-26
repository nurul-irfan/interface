import { jsx as _jsx } from "react/jsx-runtime";
import { useAccountMeta } from 'uniswap/src/contexts/UniswapContext';
import { InsufficientNativeTokenWarningContent } from 'uniswap/src/features/transactions/InsufficientNativeTokenWarning/InsufficientNativeTokenWarningContent';
import { useInsufficientNativeTokenWarning } from 'uniswap/src/features/transactions/InsufficientNativeTokenWarning/useInsufficientNativeTokenWarning';
import { logger } from 'utilities/src/logger/logger';
export function InsufficientNativeTokenWarning({ warnings, flow, gasFee, }) {
    var _a;
    const parsedInsufficentNativeTokenWarning = useInsufficientNativeTokenWarning({
        warnings,
        flow,
        gasFee,
    });
    const { nativeCurrency, nativeCurrencyInfo } = parsedInsufficentNativeTokenWarning !== null && parsedInsufficentNativeTokenWarning !== void 0 ? parsedInsufficentNativeTokenWarning : {};
    const address = (_a = useAccountMeta()) === null || _a === void 0 ? void 0 : _a.address;
    if (!parsedInsufficentNativeTokenWarning || !nativeCurrencyInfo || !nativeCurrency) {
        return null;
    }
    if (!address) {
        logger.error(new Error('Unexpected render of `InsufficientNativeTokenWarning` without an active address'), {
            tags: {
                file: 'InsufficientNativeTokenWarning.tsx',
                function: 'InsufficientNativeTokenWarning',
            },
        });
        return null;
    }
    return (_jsx(InsufficientNativeTokenWarningContent, { address: address, parsedInsufficentNativeTokenWarning: parsedInsufficentNativeTokenWarning, nativeCurrencyInfo: nativeCurrencyInfo, nativeCurrency: nativeCurrency }));
}
//# sourceMappingURL=InsufficientNativeTokenWarning.js.map