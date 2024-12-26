/// <reference types="react" />
import { ColorTokens, FlexProps } from 'ui/src';
import { IconSizeTokens } from 'ui/src/theme';
import { SwapSettingConfig } from 'uniswap/src/features/transactions/swap/settings/configs/types';
export declare function SwapFormSettings({ settings, adjustTopAlignment, adjustRightAlignment, position, iconColor, iconSize, defaultTitle, isBridgeTrade, }: {
    settings: SwapSettingConfig[];
    adjustTopAlignment?: boolean;
    adjustRightAlignment?: boolean;
    position?: FlexProps['position'];
    iconColor?: ColorTokens;
    iconSize?: IconSizeTokens;
    defaultTitle?: string;
    isBridgeTrade?: boolean;
}): JSX.Element;
//# sourceMappingURL=SwapFormSettings.d.ts.map