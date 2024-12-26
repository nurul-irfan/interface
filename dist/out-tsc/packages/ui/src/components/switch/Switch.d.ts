/// <reference types="react" />
import { SwitchProps as TamaguiSwitchProps } from 'tamagui';
import { SporeComponentVariant } from 'ui/src/components/types';
export type SwitchProps = TamaguiSwitchProps & {
    variant: SporeComponentVariant;
};
export declare function Switch({ checked: checkedProp, onCheckedChange: onCheckedChangeProp, disabled, variant, disabledStyle, ...rest }: SwitchProps): JSX.Element;
//# sourceMappingURL=Switch.d.ts.map