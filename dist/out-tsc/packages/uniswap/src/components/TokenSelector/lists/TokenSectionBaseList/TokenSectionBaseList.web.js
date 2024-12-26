import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import isArray from 'lodash/isArray';
import isEqual from 'lodash/isEqual';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';
import { VariableSizeList as List } from 'react-window';
import { Flex, useWindowDimensions } from 'ui/src';
import { zIndices } from 'ui/src/theme';
import { ITEM_SECTION_HEADER_ROW_HEIGHT } from 'uniswap/src/components/TokenSelector/constants';
import { TokenOptionSection } from 'uniswap/src/components/TokenSelector/types';
const ITEM_ROW_HEIGHT = 68;
function isSectionHeader(rowInfo) {
    return !('renderItem' in rowInfo);
}
function isHorizontalTokenRowInfo(rowInfo) {
    const isHeader = isSectionHeader(rowInfo);
    return !isHeader && isArray(rowInfo.item);
}
export function TokenSectionBaseList({ ListEmptyComponent, keyExtractor, renderItem, renderSectionHeader, sections, sectionListRef, expandedItems, }) {
    const ref = useRef(null);
    const rowHeightMap = useRef({});
    const [firstVisibleIndex, setFirstVisibleIndex] = useState(-1);
    const { width: windowWidth } = useWindowDimensions();
    useEffect(() => {
        if (sectionListRef) {
            sectionListRef.current = {
                scrollToLocation: ({ itemIndex, sectionIndex }) => {
                    var _a, _b, _c;
                    let listIndex = 0;
                    for (let i = 0; i < sectionIndex; i++) {
                        const section = sections[i];
                        listIndex += (_b = (_a = section === null || section === void 0 ? void 0 : section.data) === null || _a === void 0 ? void 0 : _a.length) !== null && _b !== void 0 ? _b : 0;
                    }
                    listIndex += itemIndex;
                    (_c = ref.current) === null || _c === void 0 ? void 0 : _c.scrollToItem(listIndex);
                },
            };
        }
    }, [sectionListRef, sections]);
    const items = useMemo(() => {
        return sections.reduce((acc, section) => {
            const sectionInfo = {
                section: { sectionKey: section.sectionKey, rightElement: section.rightElement, endElement: section.endElement },
                key: section.sectionKey,
                renderSectionHeader,
            };
            if (section.sectionKey !== TokenOptionSection.SuggestedTokens) {
                acc.push(sectionInfo);
            }
            return acc.concat(section.data.map((item, index) => {
                var _a, _b;
                const itemInfo = {
                    item,
                    section,
                    index,
                    key: keyExtractor === null || keyExtractor === void 0 ? void 0 : keyExtractor(item, index),
                    renderItem,
                    expanded: (_b = expandedItems === null || expandedItems === void 0 ? void 0 : expandedItems.includes((_a = keyExtractor === null || keyExtractor === void 0 ? void 0 : keyExtractor(item, index)) !== null && _a !== void 0 ? _a : '')) !== null && _b !== void 0 ? _b : false,
                };
                return itemInfo;
            }));
        }, []);
    }, [sections, renderSectionHeader, keyExtractor, renderItem, expandedItems]);
    // Used for rendering the sticky header
    const activeSessionIndex = useMemo(() => {
        return items.slice(0, firstVisibleIndex + 1).reduceRight((acc, item, index) => {
            return acc === -1 && isSectionHeader(item) ? index : acc;
        }, -1);
    }, [firstVisibleIndex, items]);
    const updateRowHeight = useCallback((index, height) => {
        var _a;
        if (rowHeightMap.current[index] !== height) {
            rowHeightMap.current[index] = height;
            (_a = ref.current) === null || _a === void 0 ? void 0 : _a.resetAfterIndex(index);
        }
    }, []);
    const getRowHeight = useCallback((index) => {
        const item = items[index];
        if (!item) {
            return 0;
        }
        if (isHorizontalTokenRowInfo(item)) {
            if (!isSectionHeader(item)) {
                if (isArray(item.item) && !item.item.length) {
                    return 0;
                }
            }
            const measuredHeight = rowHeightMap.current[index];
            if (measuredHeight) {
                return measuredHeight;
            }
        }
        return isSectionHeader(item) ? ITEM_SECTION_HEADER_ROW_HEIGHT : ITEM_ROW_HEIGHT;
    }, [items]);
    const ListContent = useCallback(({ data, index, style }) => {
        if (activeSessionIndex === index) {
            return null;
        }
        return (_jsx(TokenSectionBaseListRow, { data: data, index: index, style: style, updateRowHeight: updateRowHeight, windowWidth: windowWidth }));
    }, [updateRowHeight, windowWidth, activeSessionIndex]);
    return (_jsxs(Flex, { grow: true, maxHeight: "100dvh", children: [!sections.length && ListEmptyComponent, _jsx(AutoSizer, { disableWidth: true, children: ({ height }) => {
                    return (_jsxs(Flex, { position: "relative", children: [_jsx(Flex, { position: "absolute", top: -1, width: "100%", zIndex: zIndices.sticky, children: activeSessionIndex >= 0 && (_jsx(TokenSectionBaseListRow, { data: items, index: activeSessionIndex, windowWidth: windowWidth })) }), _jsx(List, { ref: ref, height: height, itemCount: items.length, itemData: items, itemSize: getRowHeight, width: "100%", onItemsRendered: ({ visibleStartIndex }) => {
                                    setFirstVisibleIndex(visibleStartIndex);
                                }, children: ListContent })] }));
                } })] }));
}
function TokenSectionBaseListRow({ index, data, style, windowWidth, updateRowHeight, }) {
    const itemData = data[index];
    return (_jsx(_Fragment, { children: itemData && (_jsx(Row, { index: index, itemData: itemData, style: style, updateRowHeight: updateRowHeight, windowWidth: windowWidth })) }));
}
function _Row({ index, itemData, style, updateRowHeight }) {
    var _a, _b;
    const rowRef = useRef(null);
    const handleLayout = useCallback((e) => {
        const height = e.nativeEvent.layout.height;
        if (height && updateRowHeight) {
            updateRowHeight(index, height);
        }
    }, [updateRowHeight, index]);
    return (_jsx(Flex, { grow: true, alignItems: "center", justifyContent: "center", style: style, children: _jsx(Flex, { ref: rowRef, width: "100%", onLayout: handleLayout, children: itemData &&
                (isSectionHeader(itemData) ? (_a = itemData.renderSectionHeader) === null || _a === void 0 ? void 0 : _a.call(itemData, itemData) : itemData.renderItem(itemData)) }) }, (_b = itemData === null || itemData === void 0 ? void 0 : itemData.key) !== null && _b !== void 0 ? _b : index));
}
const Row = React.memo(_Row, isEqual);
//# sourceMappingURL=TokenSectionBaseList.web.js.map