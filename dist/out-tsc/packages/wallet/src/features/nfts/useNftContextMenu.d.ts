import { NativeSyntheticEvent } from 'react-native';
import { ContextMenuAction, ContextMenuOnPressNativeEvent } from 'react-native-context-menu-view';
import { GeneratedIcon } from 'ui/src';
import { UniverseChainId } from 'uniswap/src/features/chains/types';
interface NFTMenuParams {
    tokenId?: string;
    contractAddress?: Address;
    owner?: Address;
    showNotification?: boolean;
    isSpam?: boolean;
    chainId?: UniverseChainId;
}
type MenuAction = ContextMenuAction & {
    onPress: () => void;
    Icon?: GeneratedIcon;
};
export declare function useNFTContextMenu({ contractAddress, tokenId, owner, showNotification, isSpam, chainId, }: NFTMenuParams): {
    menuActions: Array<MenuAction>;
    onContextMenuPress: (e: NativeSyntheticEvent<ContextMenuOnPressNativeEvent>) => void;
    onlyShare: boolean;
};
export {};
//# sourceMappingURL=useNftContextMenu.d.ts.map