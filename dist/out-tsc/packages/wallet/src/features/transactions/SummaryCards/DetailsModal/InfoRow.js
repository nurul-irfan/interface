import { jsx as _jsx } from "react/jsx-runtime";
import { Flex } from 'ui/src';
import { ContentRow } from 'wallet/src/features/transactions/TransactionRequest/ContentRow';
export function InfoRow({ label, children, }) {
    return (_jsx(ContentRow, { label: label, variant: "body3", children: _jsx(Flex, { centered: true, row: true, gap: "$spacing4", children: children }) }));
}
//# sourceMappingURL=InfoRow.js.map