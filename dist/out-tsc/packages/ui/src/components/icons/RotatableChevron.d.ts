/// <reference types="react" />
import { ColorTokens } from 'tamagui';
import { FlexProps } from 'ui/src/components/layout';
type Props = {
    width?: string | number;
    height?: string | number;
    direction?: 'up' | 'right' | 'down' | 'left' | 'start' | 'end';
    color?: ColorTokens;
} & Omit<FlexProps, 'direction'>;
declare function _RotatableChevron({ color, width, height, direction, ...rest }: Props): JSX.Element;
export declare const RotatableChevron: import("react").MemoExoticComponent<typeof _RotatableChevron>;
export {};
//# sourceMappingURL=RotatableChevron.d.ts.map