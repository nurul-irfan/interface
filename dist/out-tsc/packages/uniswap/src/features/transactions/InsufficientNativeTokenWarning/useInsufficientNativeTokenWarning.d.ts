import { Currency, CurrencyAmount } from '@uniswap/sdk-core';
import { ComponentProps } from 'react';
import { Warning } from 'uniswap/src/components/modals/WarningModal/types';
import { CurrencyInfo } from 'uniswap/src/features/dataApi/types';
import { NativeCurrency } from 'uniswap/src/features/tokens/NativeCurrency';
import { InsufficientNativeTokenWarning } from 'uniswap/src/features/transactions/InsufficientNativeTokenWarning/InsufficientNativeTokenWarning';
import { useNetworkColors } from 'uniswap/src/utils/colors';
export declare function useInsufficientNativeTokenWarning({ flow, gasFee, warnings, }: ComponentProps<typeof InsufficientNativeTokenWarning>): {
    gasAmount: CurrencyAmount<NativeCurrency> | null | undefined;
    gasAmountFiatFormatted: string;
    nativeCurrency: Currency;
    nativeCurrencyInfo: CurrencyInfo;
    networkColors: ReturnType<typeof useNetworkColors>;
    networkName: string;
    modalOrTooltipMainMessage: JSX.Element;
    warning: Warning;
    flow: ComponentProps<typeof InsufficientNativeTokenWarning>['flow'];
} | null;
//# sourceMappingURL=useInsufficientNativeTokenWarning.d.ts.map