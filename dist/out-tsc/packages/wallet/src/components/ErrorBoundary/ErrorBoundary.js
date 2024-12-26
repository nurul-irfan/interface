import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Image, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { Button, Flex, Text } from 'ui/src';
import { DEAD_LUNI } from 'ui/src/assets';
import { pushNotification, resetNotifications } from 'uniswap/src/features/notifications/slice';
import { AppNotificationType } from 'uniswap/src/features/notifications/types';
import { logger } from 'utilities/src/logger/logger';
import { restartApp } from 'wallet/src/components/ErrorBoundary/restart';
import { useAccounts } from 'wallet/src/features/wallet/hooks';
import { setFinishedOnboarding } from 'wallet/src/features/wallet/slice';
const NOTIFICATION_ROUTER_COMPONENT_NAME = 'SharedNotificationToastRouter';
// Uncaught errors during renders of subclasses will be caught here
// Errors in handlers (e.g. press handler) will not reach here
class InternalErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { error: null };
    }
    static getDerivedStateFromError(error) {
        return { error };
    }
    componentDidCatch(error, errorInfo) {
        var _a, _b, _c, _d, _e;
        // Based on https://github.com/getsentry/sentry-javascript/blob/develop/packages/react/src/errorboundary.tsx
        const errorBoundaryError = new Error(error.message);
        errorBoundaryError.name = `React ErrorBoundary ${errorBoundaryError.name}`;
        errorBoundaryError.stack = errorInfo.componentStack;
        error.cause = errorBoundaryError;
        logger.error(error, {
            level: 'fatal',
            tags: {
                file: 'ErrorBoundary',
                function: 'componentDidCatch',
                errorBoundaryName: (_a = this.props.name) !== null && _a !== void 0 ? _a : 'Global',
            },
        });
        (_c = (_b = this.props).onError) === null || _c === void 0 ? void 0 : _c.call(_b, error);
        const isNotificationError = !!((_e = (_d = errorBoundaryError.stack) === null || _d === void 0 ? void 0 : _d.includes) === null || _e === void 0 ? void 0 : _e.call(_d, NOTIFICATION_ROUTER_COMPONENT_NAME));
        if (isNotificationError) {
            this.props.dispatch(resetNotifications());
        }
        if (this.props.notificationText) {
            this.props.dispatch(pushNotification({
                type: AppNotificationType.Error,
                errorMessage: this.props.notificationText,
            }));
        }
    }
    render() {
        const { error } = this.state;
        const { fallback } = this.props;
        if (error !== null) {
            return fallback === null ? null : _jsx(ErrorScreen, { error: error });
        }
        return this.props.children;
    }
}
export const ErrorBoundary = ({ notificationText, showNotification = false, ...props }) => {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    // We want to temporary disable non global error boundaries until https://linear.app/uniswap/issue/WALL-4461 is done
    const disableLocalErrorBoundaries = true;
    // we do not pass `name` to global error boundary
    if (disableLocalErrorBoundaries && props.name) {
        return _jsx(_Fragment, { children: props.children });
    }
    return (_jsx(InternalErrorBoundary, { dispatch: dispatch, notificationText: showNotification ? notificationText !== null && notificationText !== void 0 ? notificationText : t('common.error.somethingWrong') : undefined, ...props }));
};
const LUNI_SIZE = 150;
function ErrorScreen({ error }) {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const accounts = useAccounts();
    // If there is no active account, we need to reset the onboarding flow
    if (error.message === 'No active account' && Object.values(accounts).length === 0) {
        dispatch(setFinishedOnboarding({ finishedOnboarding: false }));
    }
    return (_jsxs(Flex, { centered: true, fill: true, backgroundColor: "$surface1", gap: "$spacing16", px: "$spacing16", py: "$spacing48", children: [_jsxs(Flex, { centered: true, grow: true, gap: "$spacing36", children: [_jsx(Image, { resizeMode: "contain", source: DEAD_LUNI, style: styles.errorImage }), _jsxs(Flex, { centered: true, gap: "$spacing8", children: [_jsx(Text, { variant: "subheading1", children: t('errors.crash.title') }), _jsx(Text, { variant: "body2", children: t('errors.crash.message') })] }), error.message && __DEV__ && _jsx(Text, { variant: "body2", children: error.message })] }), _jsx(Flex, { alignSelf: "stretch", children: _jsx(Button, { onPress: restartApp, children: t('errors.crash.restart') }) })] }));
}
const styles = StyleSheet.create({
    errorImage: {
        height: LUNI_SIZE,
        width: LUNI_SIZE,
    },
});
//# sourceMappingURL=ErrorBoundary.js.map