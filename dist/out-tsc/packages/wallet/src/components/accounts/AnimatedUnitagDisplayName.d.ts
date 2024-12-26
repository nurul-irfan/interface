/// <reference types="react" />
import { IconSizeTokens } from 'ui/src/theme';
import { DisplayName } from 'wallet/src/features/wallet/types';
export type AnimatedUnitagDisplayNameProps = {
    displayName: DisplayName;
    unitagIconSize?: IconSizeTokens;
    address?: string;
};
/**
 * Renders as a bottom sheet modal on mobile app/mweb & a dialog modal on desktop web/extension.
 */
export declare function AnimatedUnitagDisplayName(_: AnimatedUnitagDisplayNameProps): JSX.Element;
//# sourceMappingURL=AnimatedUnitagDisplayName.d.ts.map