import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Flex, Text, TouchableArea } from 'ui/src';
import { Check } from 'ui/src/components/icons';
import { iconSizes } from 'ui/src/theme';
import { useLocalizationContext } from 'uniswap/src/features/language/LocalizationContext';
import { NumberType } from 'utilities/src/format/types';
import { AddressDisplay } from 'wallet/src/components/accounts/AddressDisplay';
// Some preview cards do not have a name (no unitag), so we need to set a default height to keep their height consistent.
export const WALLET_PREVIEW_CARD_HEIGHT = 72;
export default function WalletPreviewCard({ address, selected, balance, onSelect, hideSelectionCircle, ...rest }) {
    const { convertFiatAmountFormatted } = useLocalizationContext();
    const balanceFormatted = convertFiatAmountFormatted(balance, NumberType.FiatTokenQuantity);
    return (_jsx(TouchableArea, { backgroundColor: selected ? '$surface1' : '$surface2', borderColor: selected ? '$surface3' : '$surface2', borderRadius: "$rounded20", borderWidth: 1, height: WALLET_PREVIEW_CARD_HEIGHT, p: "$spacing12", shadowColor: selected ? '$shadowColor' : '$transparent', shadowOpacity: 0.05, shadowRadius: selected ? '$spacing8' : '$none', onPress: () => onSelect(address), ...rest, children: _jsxs(Flex, { fill: true, row: true, alignContent: "center", alignItems: "center", justifyContent: "space-between", children: [_jsx(AddressDisplay, { address: address, captionVariant: "body2", size: iconSizes.icon36 }), _jsxs(Flex, { row: true, gap: "$spacing8", px: "$spacing4", children: [Boolean(balance) && (_jsx(Text, { color: "$neutral2", variant: "body3", children: balanceFormatted })), !hideSelectionCircle && selected && _jsx(Check, { strokeWidth: 6, color: "$accent1", size: iconSizes.icon20 })] })] }) }));
}
//# sourceMappingURL=WalletPreviewCard.js.map