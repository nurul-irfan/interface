export function isLoadingItem(x) {
    return 'itemType' in x && x.itemType === 'LOADING';
}
export function isSectionHeader(x) {
    return 'itemType' in x && x.itemType === 'HEADER';
}
export function getActivityItemType(item) {
    if (isLoadingItem(item)) {
        return `loading`;
    }
    else if (isSectionHeader(item)) {
        return `sectionHeader`;
    }
    else {
        return `activity`;
    }
}
//# sourceMappingURL=utils.js.map