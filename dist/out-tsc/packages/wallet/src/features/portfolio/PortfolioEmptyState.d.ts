/// <reference types="react" />
type WalletEmptyStateProps = {
    onPressReceive: () => void;
    onPressImport?: () => void;
    onPressBuy?: () => void;
    disableCexTransfers?: boolean;
};
export declare function PortfolioEmptyState({ onPressReceive, onPressImport, onPressBuy, disableCexTransfers, }: WalletEmptyStateProps): JSX.Element;
export {};
//# sourceMappingURL=PortfolioEmptyState.d.ts.map