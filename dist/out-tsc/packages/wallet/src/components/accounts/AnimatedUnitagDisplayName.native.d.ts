/// <reference types="react" />
import { LayoutChangeEvent } from 'react-native';
import { AnimatedUnitagDisplayNameProps } from 'wallet/src/components/accounts/AnimatedUnitagDisplayName';
/**
 * Used in the account header that displays the user's unitag and name if available and
 * address. The unitag is animated which shows the unitag suffix.
 */
declare function _AnimatedUnitagDisplayName({ displayName, unitagIconSize, address, }: AnimatedUnitagDisplayNameProps): JSX.Element;
/**
 * Returns a width and a callback to be used in a `onLayout` handler.
 * The width is set to the initial width only once if it's not already set.
 */
export declare function useInitialLayoutWidth(initialWidth?: number): {
    width: number;
    onLayout: (event: LayoutChangeEvent) => void;
};
export declare const AnimatedUnitagDisplayName: import("react").MemoExoticComponent<typeof _AnimatedUnitagDisplayName>;
export {};
//# sourceMappingURL=AnimatedUnitagDisplayName.native.d.ts.map