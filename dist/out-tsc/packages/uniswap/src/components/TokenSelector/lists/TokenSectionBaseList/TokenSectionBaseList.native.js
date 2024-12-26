import { jsx as _jsx } from "react/jsx-runtime";
import { BottomSheetSectionList } from '@gorhom/bottom-sheet';
import { useEffect, useRef } from 'react';
import { useAppInsets } from 'uniswap/src/hooks/useAppInsets';
export function TokenSectionBaseList({ sectionListRef, ListEmptyComponent, focusHook, keyExtractor, renderItem, renderSectionHeader, sections, }) {
    const insets = useAppInsets();
    const ref = useRef(null);
    useEffect(() => {
        if (sectionListRef) {
            sectionListRef.current = {
                scrollToLocation: ({ itemIndex, sectionIndex, animated }) => {
                    var _a;
                    (_a = ref.current) === null || _a === void 0 ? void 0 : _a.scrollToLocation({ itemIndex, sectionIndex, animated });
                },
            };
        }
    }, [sectionListRef]);
    return (_jsx(BottomSheetSectionList, { ref: ref, ListEmptyComponent: ListEmptyComponent, bounces: true, contentContainerStyle: { paddingBottom: insets.bottom }, focusHook: focusHook, keyExtractor: keyExtractor, keyboardDismissMode: "on-drag", keyboardShouldPersistTaps: "always", renderItem: renderItem, renderSectionHeader: renderSectionHeader, sections: sections !== null && sections !== void 0 ? sections : [], showsVerticalScrollIndicator: false, stickySectionHeadersEnabled: true, windowSize: 4 }));
}
//# sourceMappingURL=TokenSectionBaseList.native.js.map