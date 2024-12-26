import { ComponentProps } from 'react';
import { RotatableChevron } from 'ui/src/components/icons/RotatableChevron';
import { CurrencyInfo } from 'uniswap/src/features/dataApi/types';
import { TestIDType } from 'uniswap/src/test/fixtures/testIDs';
interface TokenSelectorBalanceDisplayProps {
    onPress: () => void;
    selectedCurrencyInfo: CurrencyInfo;
    formattedAmount?: string;
    disabled?: boolean;
    loading?: boolean;
    chevronDirection?: ComponentProps<typeof RotatableChevron>['direction'];
    testID?: TestIDType;
}
export declare function TokenSelectorBalanceDisplay({ selectedCurrencyInfo, onPress, formattedAmount, disabled, loading, chevronDirection, testID, }: TokenSelectorBalanceDisplayProps): JSX.Element;
export {};
//# sourceMappingURL=TokenSelectorBalanceDisplay.d.ts.map