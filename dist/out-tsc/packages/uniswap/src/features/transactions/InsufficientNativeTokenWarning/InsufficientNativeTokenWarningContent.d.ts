/// <reference types="react" />
import { Currency } from '@uniswap/sdk-core';
import { CurrencyInfo } from 'uniswap/src/features/dataApi/types';
import { useInsufficientNativeTokenWarning } from 'uniswap/src/features/transactions/InsufficientNativeTokenWarning/useInsufficientNativeTokenWarning';
export type InsufficientNativeTokenWarningContentProps = {
    address: Address;
    parsedInsufficentNativeTokenWarning: NonNullable<ReturnType<typeof useInsufficientNativeTokenWarning>>;
    nativeCurrencyInfo: CurrencyInfo;
    nativeCurrency: Currency;
};
export declare function InsufficientNativeTokenWarningContent(_: InsufficientNativeTokenWarningContentProps): JSX.Element | null;
//# sourceMappingURL=InsufficientNativeTokenWarningContent.d.ts.map