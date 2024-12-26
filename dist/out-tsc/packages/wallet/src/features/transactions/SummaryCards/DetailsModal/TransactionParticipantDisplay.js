import { jsx as _jsx } from "react/jsx-runtime";
import { Flex } from 'ui/src';
import { iconSizes } from 'ui/src/theme';
import { AddressDisplay } from 'wallet/src/components/accounts/AddressDisplay';
export function TransactionParticipantDisplay({ address }) {
    return (_jsx(Flex, { centered: true, flexDirection: "row", gap: "$spacing4", children: _jsx(AddressDisplay, { hideAddressInSubtitle: true, address: address, size: iconSizes.icon16, horizontalGap: "$spacing6", variant: "body3" }) }));
}
//# sourceMappingURL=TransactionParticipantDisplay.js.map