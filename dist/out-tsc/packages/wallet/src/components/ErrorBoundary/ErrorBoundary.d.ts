import React, { PropsWithChildren } from 'react';
interface ErrorBoundariesOwnProps {
    onError?: (error: Error | null) => void;
    fallback?: React.ReactNode;
    name?: string;
    notificationText?: string;
}
export declare const ErrorBoundary: ({ notificationText, showNotification, ...props }: ErrorBoundariesOwnProps & {
    children?: React.ReactNode;
} & {
    showNotification?: boolean | undefined;
}) => JSX.Element;
export {};
//# sourceMappingURL=ErrorBoundary.d.ts.map