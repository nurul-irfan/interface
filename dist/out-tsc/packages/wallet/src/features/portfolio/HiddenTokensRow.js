import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useTranslation } from 'react-i18next';
import { Flex, Separator, Text, TouchableArea } from 'ui/src';
import { AnglesDownUp, SortVertical } from 'ui/src/components/icons';
import { isMobileApp } from 'utilities/src/platform';
export function HiddenTokensRow({ numHidden, isExpanded, onPress, }) {
    const { t } = useTranslation();
    return (_jsx(TouchableArea, { activeOpacity: 1, mx: isMobileApp && '$spacing16', onPress: onPress, children: _jsx(Flex, { row: true, alignItems: "center", justifyContent: "space-between", py: "$spacing8", children: _jsxs(Flex, { centered: true, grow: true, row: true, gap: "$spacing12", children: [_jsx(Separator, {}), _jsxs(Flex, { centered: true, row: true, gap: "$gap4", children: [_jsx(Text, { color: "$neutral3", textAlign: "center", variant: "body3", children: t('hidden.tokens.info.text.button', { numHidden }) }), _jsx(Flex, { centered: true, justifyContent: "center", children: isExpanded ? (_jsx(AnglesDownUp, { color: "$neutral3", size: "$icon.16" })) : (_jsx(SortVertical, { color: "$neutral3", size: "$icon.16" })) })] }), _jsx(Separator, {})] }) }) }));
}
//# sourceMappingURL=HiddenTokensRow.js.map