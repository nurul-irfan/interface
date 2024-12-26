import { ApolloError } from '@apollo/client';
import { MissingI18nInterpolationError } from 'uniswap/src/i18n/shared';
const APOLLO_HTTP_ERROR_REGEX = /Received status code ([0-9]+)/;
export function beforeSend(event, hint) {
    var _a, _b, _c;
    const exception = hint.originalException;
    if (exception instanceof ApolloError) {
        const statusCode = (_a = exception.message.match(APOLLO_HTTP_ERROR_REGEX)) === null || _a === void 0 ? void 0 : _a[1];
        if (statusCode) {
            // Do not group together ApolloErrors with different status codes.
            event.fingerprint = ['{{ default }}', String(statusCode)];
            // This changes the title of the error to avoid having multiple issues titled "ApolloError".
            (_c = (_b = event.exception) === null || _b === void 0 ? void 0 : _b.values) === null || _c === void 0 ? void 0 : _c.forEach((value) => {
                if (value.type === 'ApolloError') {
                    value.type = `ApolloError ${statusCode}`;
                }
            });
        }
    }
    else if (exception instanceof MissingI18nInterpolationError) {
        // We want to split up each i18n interpolation error into its own issue.
        event.fingerprint = ['{{ default }}', String(exception.message)];
    }
    return event;
}
//# sourceMappingURL=sentry.js.map