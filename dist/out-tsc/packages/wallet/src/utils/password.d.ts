import { ColorTokens } from 'ui/src';
export declare enum PasswordErrors {
    WeakPassword = "WeakPassword",
    PasswordsDoNotMatch = "PasswordsDoNotMatch"
}
export declare enum PasswordStrength {
    NONE = 0,// if there is no input or we don't want it to be displayed yet
    WEAK = 1,
    MEDIUM = 2,
    STRONG = 3
}
export declare const PASSWORD_VALIDATION_DEBOUNCE_MS = 500;
export declare function isPasswordStrongEnough({ minStrength, currentStrength, }: {
    minStrength: PasswordStrength;
    currentStrength: PasswordStrength;
}): boolean;
export declare function getPasswordStrength(password: string): PasswordStrength;
export declare function getPasswordStrengthTextAndColor(strength: PasswordStrength): {
    text: string;
    color: ColorTokens;
};
export declare function usePasswordForm(): {
    password: string;
    confirmPassword: string;
    hideInput: boolean;
    enableNext: boolean;
    debouncedPasswordStrength: PasswordStrength;
    errorText: string;
    onChangePassword: (text: string) => void;
    onChangeConfirmPassword: (text: string) => void;
    setHideInput: (value: boolean) => void;
    checkSubmit: () => boolean;
    onPasswordBlur: () => void;
};
//# sourceMappingURL=password.d.ts.map