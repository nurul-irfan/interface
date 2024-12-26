import { jsx as _jsx } from "react/jsx-runtime";
import ContextMenu from 'react-native-context-menu-view';
import { Flex } from 'ui/src';
import { borderRadii } from 'ui/src/theme';
import { fromGraphQLChain } from 'uniswap/src/features/chains/utils';
import { NftView } from 'wallet/src/components/nfts/NftView';
import { useNFTContextMenu } from 'wallet/src/features/nfts/useNftContextMenu';
// WALL-4875 TODO try to combine web and mobile versions
export function NftViewWithContextMenu(props) {
    var _a;
    const { item, owner } = props;
    const { menuActions, onContextMenuPress } = useNFTContextMenu({
        contractAddress: item.contractAddress,
        tokenId: item.tokenId,
        owner,
        isSpam: item.isSpam,
        showNotification: true,
        chainId: (_a = fromGraphQLChain(item.chain)) !== null && _a !== void 0 ? _a : undefined,
    });
    return (_jsx(Flex, { children: _jsx(ContextMenu, { actions: menuActions, disabled: menuActions.length === 0, style: { borderRadius: borderRadii.rounded16 }, onPress: onContextMenuPress, children: _jsx(NftView, { ...props }) }) }));
}
//# sourceMappingURL=NftViewWithContextMenu.native.js.map