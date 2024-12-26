/// <reference types="react" />
import type { IconProps as TamaguiIconProps } from '@tamagui/helpers-icon';
import { Svg, SvgProps } from 'react-native-svg';
import { ColorTokens, ThemeKeys } from 'tamagui';
import { DynamicColor } from 'ui/src/hooks/useSporeColors';
import { IconSizeTokens } from 'ui/src/theme';
type SvgPropsWithRef = SvgProps & {
    ref: React.ForwardedRef<Svg>;
    style?: {
        color?: string;
    };
};
export type IconProps = Omit<Omit<TamaguiIconProps, 'size' | 'width' | 'height'>, 'color'> & {
    size?: IconSizeTokens | number;
    color?: (ColorTokens | ThemeKeys | (string & {})) | DynamicColor | null;
    Component?: React.FunctionComponent<SvgPropsWithRef>;
};
export type GeneratedIcon = React.ForwardRefExoticComponent<IconProps & React.RefAttributes<Svg>>;
export declare function createIcon({ name, getIcon, defaultFill, }: {
    name: string;
    getIcon: (props: SvgPropsWithRef) => JSX.Element;
    defaultFill?: string;
}): readonly [GeneratedIcon, GeneratedIcon];
export {};
//# sourceMappingURL=createIcon.d.ts.map