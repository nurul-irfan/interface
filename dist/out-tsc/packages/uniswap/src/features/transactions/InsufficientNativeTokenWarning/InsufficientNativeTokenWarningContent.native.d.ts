/// <reference types="react" />
import { Currency } from '@uniswap/sdk-core';
import { CurrencyInfo } from 'uniswap/src/features/dataApi/types';
import { useInsufficientNativeTokenWarning } from 'uniswap/src/features/transactions/InsufficientNativeTokenWarning/useInsufficientNativeTokenWarning';
export declare function InsufficientNativeTokenWarningContent({ address, parsedInsufficentNativeTokenWarning, nativeCurrencyInfo, nativeCurrency, }: {
    address: Address;
    parsedInsufficentNativeTokenWarning: NonNullable<ReturnType<typeof useInsufficientNativeTokenWarning>>;
    nativeCurrencyInfo: CurrencyInfo;
    nativeCurrency: Currency;
}): JSX.Element;
//# sourceMappingURL=InsufficientNativeTokenWarningContent.native.d.ts.map