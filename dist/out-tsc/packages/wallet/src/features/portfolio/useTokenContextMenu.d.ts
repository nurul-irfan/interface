import { NativeSyntheticEvent } from 'react-native';
import type { ContextMenuAction, ContextMenuOnPressNativeEvent } from 'react-native-context-menu-view';
import { GeneratedIcon } from 'ui/src';
import { PortfolioBalance } from 'uniswap/src/features/dataApi/types';
import { CurrencyId } from 'uniswap/src/types/currency';
interface TokenMenuParams {
    currencyId: CurrencyId;
    isBlocked: boolean;
    tokenSymbolForNotification?: Nullable<string>;
    portfolioBalance?: Nullable<PortfolioBalance>;
}
type MenuAction = ContextMenuAction & {
    onPress: () => void;
    Icon?: GeneratedIcon;
};
export declare function useTokenContextMenu({ currencyId, isBlocked, tokenSymbolForNotification, portfolioBalance, }: TokenMenuParams): {
    menuActions: Array<MenuAction>;
    onContextMenuPress: (e: NativeSyntheticEvent<ContextMenuOnPressNativeEvent>) => void;
};
export {};
//# sourceMappingURL=useTokenContextMenu.d.ts.map