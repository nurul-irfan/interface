import { PropsWithChildren } from 'react';
import { InfoTooltipProps } from 'uniswap/src/components/tooltip/InfoTooltipProps';
import { FormattedUniswapXGasFeeInfo } from 'uniswap/src/features/gas/types';
export declare function NetworkFeeWarning({ gasFeeHighRelativeToValue, children, tooltipTrigger, placement, uniswapXGasFeeInfo, }: PropsWithChildren<{
    gasFeeHighRelativeToValue?: boolean;
    tooltipTrigger?: InfoTooltipProps['trigger'];
    placement?: InfoTooltipProps['placement'];
    uniswapXGasFeeInfo?: FormattedUniswapXGasFeeInfo;
}>): JSX.Element;
//# sourceMappingURL=NetworkFeeWarning.d.ts.map