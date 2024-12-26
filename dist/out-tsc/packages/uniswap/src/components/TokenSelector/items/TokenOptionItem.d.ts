import React from 'react';
import { TokenOption } from 'uniswap/src/components/TokenSelector/types';
interface OptionProps {
    option: TokenOption;
    showWarnings: boolean;
    onPress: () => void;
    showTokenAddress?: boolean;
    tokenWarningDismissed: boolean;
    quantity: number | null;
    isKeyboardOpen?: boolean;
    balance: string;
    quantityFormatted?: string;
    isSelected?: boolean;
}
declare function _TokenOptionItem({ option, showWarnings, onPress, showTokenAddress, tokenWarningDismissed, balance, quantity, quantityFormatted, isKeyboardOpen, isSelected, }: OptionProps): JSX.Element;
export declare const TokenOptionItem: React.MemoExoticComponent<typeof _TokenOptionItem>;
export {};
//# sourceMappingURL=TokenOptionItem.d.ts.map