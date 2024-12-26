/// <reference types="react" />
import { TouchableAreaProps } from 'ui/src';
type SwapArrowButtonProps = Pick<TouchableAreaProps, 'disabled' | 'testID' | 'onPress' | 'borderColor' | 'backgroundColor'> & {
    size?: number;
};
export declare function SwapArrowButton(props: SwapArrowButtonProps): JSX.Element;
export {};
//# sourceMappingURL=SwapArrowButton.d.ts.map