import { ComponentProps } from 'react';
import { TouchableArea } from 'ui/src';
import { RotatableChevron } from 'ui/src/components/icons/RotatableChevron';
import { CurrencyInfo } from 'uniswap/src/features/dataApi/types';
import { TestIDType } from 'uniswap/src/test/fixtures/testIDs';
interface SelectTokenButtonProps {
    onPress: () => void;
    selectedCurrencyInfo: Maybe<CurrencyInfo>;
    formattedAmount: string;
    amountReady?: boolean;
    disabled?: boolean;
    loading?: boolean;
    iconSize?: number;
    backgroundColor?: ComponentProps<typeof TouchableArea>['backgroundColor'];
    chevronDirection?: ComponentProps<typeof RotatableChevron>['direction'];
    testID?: TestIDType;
}
export declare function SelectTokenButton({ selectedCurrencyInfo, onPress, formattedAmount, amountReady, disabled, loading, iconSize, chevronDirection, testID, }: SelectTokenButtonProps): JSX.Element;
export {};
//# sourceMappingURL=SelectTokenButton.d.ts.map