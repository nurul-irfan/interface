export async function openURL(url) {
    // eslint-disable-next-line security/detect-non-literal-fs-filename
    return window.open(url);
}
export async function canOpenURL(_url) {
    return true;
}
//# sourceMappingURL=link.web.js.map