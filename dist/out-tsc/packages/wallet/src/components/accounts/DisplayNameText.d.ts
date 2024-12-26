/// <reference types="react" />
import { FlexProps, TextProps } from 'ui/src';
import { IconSizeTokens } from 'ui/src/theme';
import { DisplayName } from 'wallet/src/features/wallet/types';
type DisplayNameProps = {
    displayName?: DisplayName;
    unitagIconSize?: IconSizeTokens | number;
    textProps?: TextProps;
    includeUnitagSuffix?: boolean;
    forcedWidth?: number;
    disableForcedWidth?: boolean;
} & FlexProps;
export declare function DisplayNameText({ displayName, unitagIconSize, textProps, includeUnitagSuffix, forcedWidth, disableForcedWidth, ...rest }: DisplayNameProps): JSX.Element;
export {};
//# sourceMappingURL=DisplayNameText.d.ts.map