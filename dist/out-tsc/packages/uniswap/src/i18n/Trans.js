import { jsx as _jsx } from "react/jsx-runtime";
import { Trans as OGTrans, useTranslation } from 'react-i18next';
export const Trans = ((props) => {
    // forces re-render on language change because it doesn't by default
    useTranslation();
    return _jsx(OGTrans, { ...props, children: props.children });
});
//# sourceMappingURL=Trans.js.map