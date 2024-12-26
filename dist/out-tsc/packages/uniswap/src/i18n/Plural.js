import { Fragment as _Fragment, jsx as _jsx } from "react/jsx-runtime";
import { Translation } from 'react-i18next';
import { isTestEnv } from 'utilities/src/environment/env';
export function Plural({ value, one, other }) {
    const children = value === 1 ? one : other;
    if (isTestEnv()) {
        return _jsx(_Fragment, { children: children });
    }
    // ensures it re-renders when language changes
    return _jsx(Translation, { children: () => children });
}
//# sourceMappingURL=Plural.js.map