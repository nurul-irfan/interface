import { jsx as _jsx } from "react/jsx-runtime";
import { RemoteSvg } from 'wallet/src/features/images/RemoteSvg';
export function WebSvgUri({ maxHeight, uri }) {
    // TODO: get sizing and other params accounted for
    return _jsx(RemoteSvg, { borderRadius: 0, height: maxHeight !== null && maxHeight !== void 0 ? maxHeight : 100, imageHttpUrl: uri, width: maxHeight !== null && maxHeight !== void 0 ? maxHeight : 100 });
}
//# sourceMappingURL=WebSvgUri.web.js.map