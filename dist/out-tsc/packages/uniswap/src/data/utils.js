export const objectToQueryString = (obj) => {
    return Object.entries(obj)
        .sort((a, b) => a[0].localeCompare(b[0]))
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
        .join('&');
};
//# sourceMappingURL=utils.js.map