/// <reference types="react" />
import { ColorTokens } from 'ui/src';
import { IconSizeTokens } from 'ui/src/theme';
interface SwapFormSettingsButtonProps {
    showCustomSlippage: boolean;
    showTooltip: boolean;
    customSlippageTolerance?: number;
    onPress: () => void;
    iconColor?: ColorTokens;
    iconSize?: IconSizeTokens;
}
export declare function SwapFormSettingsButton({ showCustomSlippage, showTooltip, customSlippageTolerance, onPress, iconColor, iconSize, }: SwapFormSettingsButtonProps): JSX.Element;
export {};
//# sourceMappingURL=SwapFormSettingsButton.d.ts.map