import { t } from 'i18next';
import { useEffect, useMemo, useState } from 'react';
import { useDebounce } from 'utilities/src/time/timing';
import zxcvbn from 'zxcvbn';
export var PasswordErrors;
(function (PasswordErrors) {
    PasswordErrors["WeakPassword"] = "WeakPassword";
    PasswordErrors["PasswordsDoNotMatch"] = "PasswordsDoNotMatch";
})(PasswordErrors || (PasswordErrors = {}));
export var PasswordStrength;
(function (PasswordStrength) {
    PasswordStrength[PasswordStrength["NONE"] = 0] = "NONE";
    PasswordStrength[PasswordStrength["WEAK"] = 1] = "WEAK";
    PasswordStrength[PasswordStrength["MEDIUM"] = 2] = "MEDIUM";
    PasswordStrength[PasswordStrength["STRONG"] = 3] = "STRONG";
})(PasswordStrength || (PasswordStrength = {}));
export const PASSWORD_VALIDATION_DEBOUNCE_MS = 500;
export function isPasswordStrongEnough({ minStrength, currentStrength, }) {
    return currentStrength >= minStrength;
}
export function getPasswordStrength(password) {
    const { score } = zxcvbn(password);
    if (!password) {
        return PasswordStrength.NONE;
    }
    if (score < 2) {
        return PasswordStrength.WEAK;
    }
    else if (score < 4) {
        return PasswordStrength.MEDIUM;
    }
    else {
        return PasswordStrength.STRONG;
    }
}
export function getPasswordStrengthTextAndColor(strength) {
    switch (strength) {
        case PasswordStrength.WEAK:
            return { text: t('common.input.password.strength.weak'), color: '$statusCritical' };
        case PasswordStrength.MEDIUM:
            return {
                text: t('common.input.password.strength.medium'),
                color: '$DEP_accentWarning',
            };
        case PasswordStrength.STRONG:
            return { text: t('common.input.password.strength.strong'), color: '$statusSuccess' };
        default:
            return { text: '', color: '$neutral1' };
    }
}
function doPasswordsDiffer(password, confirmPassword) {
    return Boolean(password && confirmPassword) && password !== confirmPassword;
}
export function usePasswordForm() {
    const [lostPasswordFocus, setLostPasswordFocused] = useState(false);
    const onPasswordBlur = () => setLostPasswordFocused(true);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [hideInput, setHideInput] = useState(true);
    const [error, setError] = useState(undefined);
    const passwordStrength = useMemo(() => getPasswordStrength(password), [password]);
    const debouncedPasswordStrength = useDebounce(passwordStrength, PASSWORD_VALIDATION_DEBOUNCE_MS);
    const isWeakPassword = useMemo(() => password &&
        !isPasswordStrongEnough({
            currentStrength: passwordStrength,
            minStrength: PasswordStrength.MEDIUM,
        }), [passwordStrength, password]);
    const debouncedPassword = useDebounce(password, PASSWORD_VALIDATION_DEBOUNCE_MS);
    const debouncedConfirmPassword = useDebounce(confirmPassword, PASSWORD_VALIDATION_DEBOUNCE_MS);
    // Used to disable the continue button right away
    const passwordsDiffer = useMemo(() => doPasswordsDiffer(password, confirmPassword), [password, confirmPassword]);
    // Used to show the error message after debounce time
    const debouncedPasswordsDiffer = useMemo(() => doPasswordsDiffer(debouncedPassword, debouncedConfirmPassword), [debouncedPassword, debouncedConfirmPassword]);
    const enableNext = Boolean(password && confirmPassword) && !isWeakPassword && !passwordsDiffer;
    const onChangePassword = (text) => {
        setPassword(text);
    };
    const onChangeConfirmPassword = (text) => {
        // if the user corrects the mismatched passwords then clear the error rigtht away without waiting for the debounce.
        if ((!text || text === password) && error === PasswordErrors.PasswordsDoNotMatch) {
            setError(undefined);
        }
        setConfirmPassword(text);
    };
    useEffect(() => {
        if (isWeakPassword && lostPasswordFocus) {
            setError(PasswordErrors.WeakPassword);
        }
        else if (debouncedPasswordsDiffer) {
            setError(PasswordErrors.PasswordsDoNotMatch);
        }
        else {
            setError(undefined);
        }
    }, [debouncedPasswordsDiffer, isWeakPassword, lostPasswordFocus]);
    const errorText = useMemo(() => {
        if (error === PasswordErrors.WeakPassword) {
            return t('common.input.password.error.weak');
        }
        if (error === PasswordErrors.PasswordsDoNotMatch) {
            return t('common.input.password.error.mismatch');
        }
        return '';
    }, [error]);
    const checkSubmit = () => {
        const isValid = !isWeakPassword && !doPasswordsDiffer(password, confirmPassword);
        if (!isValid) {
            setError(isWeakPassword ? PasswordErrors.WeakPassword : PasswordErrors.PasswordsDoNotMatch);
        }
        return isValid;
    };
    return {
        password,
        confirmPassword,
        hideInput,
        enableNext,
        debouncedPasswordStrength,
        errorText,
        onChangePassword,
        onChangeConfirmPassword,
        setHideInput,
        checkSubmit,
        onPasswordBlur,
    };
}
//# sourceMappingURL=password.js.map