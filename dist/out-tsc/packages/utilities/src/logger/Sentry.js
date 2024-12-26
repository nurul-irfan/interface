import { PlatformSplitStubError } from 'utilities/src/errors';
/** This will be overridden by the compiler with platform-specific Sentry file. */
export const Sentry = {
    captureException: () => {
        throw new PlatformSplitStubError('Sentry not implemented');
    },
    captureMessage: () => {
        throw new PlatformSplitStubError('Sentry not implemented');
    },
    addBreadCrumb: (_breadCrumb) => {
        throw new PlatformSplitStubError('Sentry not implemented');
    },
    setTag: (_key, _value) => {
        throw new PlatformSplitStubError('Sentry not implemented');
    },
};
//# sourceMappingURL=Sentry.js.map