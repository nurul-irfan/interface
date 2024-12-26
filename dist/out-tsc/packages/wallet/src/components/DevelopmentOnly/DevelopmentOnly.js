import { Fragment as _Fragment, jsx as _jsx } from "react/jsx-runtime";
export function DevelopmentOnly({ children }) {
    if (!__DEV__ || !children) {
        return null;
    }
    return _jsx(_Fragment, { children: children });
}
//# sourceMappingURL=DevelopmentOnly.js.map