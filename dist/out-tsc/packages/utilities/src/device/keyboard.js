import { PlatformSplitStubError } from 'utilities/src/errors';
/** Dismisses the keyboard on the mobile app. No-ops on other platforms. */
export function dismissNativeKeyboard() {
    throw new PlatformSplitStubError('dismissNativeKeyboard');
}
//# sourceMappingURL=keyboard.js.map