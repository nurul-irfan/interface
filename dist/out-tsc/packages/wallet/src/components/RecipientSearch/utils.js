export function filterSections(sections, filteredAddresses, includeTitle = true) {
    return sections
        .map((section) => {
        const { title, data } = section;
        const filteredData = data.filter((item) => filteredAddresses.includes(item.address));
        return includeTitle ? { title, data: filteredData } : { data: filteredData };
    })
        .filter((section) => section.data.length > 0);
}
//# sourceMappingURL=utils.js.map