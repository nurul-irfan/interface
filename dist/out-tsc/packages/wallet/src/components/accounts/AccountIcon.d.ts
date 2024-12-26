/// <reference types="react" />
import { ColorTokens } from 'ui/src';
export interface AccountIconProps {
    size: number;
    showViewOnlyBadge?: boolean;
    address: string;
    avatarUri?: string | null;
    showBackground?: boolean;
    showBorder?: boolean;
    borderWidth?: number;
    borderColor?: ColorTokens;
}
export declare function AccountIcon({ size, showViewOnlyBadge, address, avatarUri, showBackground, showBorder, borderColor, borderWidth, }: AccountIconProps): JSX.Element;
export declare const UniconGradient: ({ color, size }: {
    color: string;
    size: number;
}) => JSX.Element;
//# sourceMappingURL=AccountIcon.d.ts.map