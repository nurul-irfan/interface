/// <reference types="react" />
export interface NotificationContentProps {
    title: string;
    subtitle?: string;
    icon?: JSX.Element;
    postCaptionElement?: JSX.Element;
    actionButton?: {
        title: string;
        onPress: () => void;
    };
    onPress?: () => void;
    onPressIn?: () => void;
    contentOverride?: JSX.Element;
}
export interface NotificationToastProps extends NotificationContentProps {
    hideDelay?: number;
    address?: string;
    smallToast?: boolean;
}
export declare function NotificationToast({ subtitle, title, icon, postCaptionElement, onPress, onPressIn, hideDelay, actionButton, address, smallToast, contentOverride, }: NotificationToastProps): JSX.Element;
//# sourceMappingURL=NotificationToast.d.ts.map