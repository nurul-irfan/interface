import { ComponentProps, ReactNode } from 'react';
import { View } from 'ui/src';
import { ModalNameType } from 'uniswap/src/features/telemetry/constants';
export interface ModalProps {
    name: ModalNameType;
    isOpen: boolean;
    showCloseButton?: boolean;
    icon: ReactNode;
    title: string;
    description: string;
    buttonText: string;
    buttonTheme?: 'primary' | 'secondary' | 'tertiary';
    linkText?: string;
    linkUrl?: string;
    onDismiss?: () => void;
    onButtonPress?: () => void;
    onAnalyticsEvent?: () => void;
    height?: ComponentProps<typeof View>['height'];
}
export declare function InfoLinkModal({ name, isOpen, showCloseButton, icon, title, description, buttonText, buttonTheme, linkText, linkUrl, onDismiss, onButtonPress, onAnalyticsEvent, height, }: React.PropsWithChildren<ModalProps>): JSX.Element;
//# sourceMappingURL=InfoLinkModal.d.ts.map