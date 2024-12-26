import { jsx as _jsx } from "react/jsx-runtime";
import { useSelector } from 'react-redux';
import { Flex } from 'ui/src';
import { useEnabledChains } from 'uniswap/src/features/chains/hooks/useEnabledChains';
import { fromGraphQLChain } from 'uniswap/src/features/chains/utils';
import { selectNftsVisibility } from 'uniswap/src/features/favorites/selectors';
import { ContextMenu } from 'wallet/src/components/menu/ContextMenu';
import { NftView } from 'wallet/src/components/nfts/NftView';
import { useNFTContextMenu } from 'wallet/src/features/nfts/useNftContextMenu';
import { getIsNftHidden } from 'wallet/src/features/nfts/utils';
// WALL-4875 TODO try to combine web and mobile versions
export function NftViewWithContextMenu(props) {
    var _a;
    const { defaultChainId } = useEnabledChains();
    const { owner, item } = props;
    const { menuActions } = useNFTContextMenu({
        contractAddress: item.contractAddress,
        tokenId: item.tokenId,
        owner,
        isSpam: item.isSpam,
        showNotification: true,
        chainId: (_a = fromGraphQLChain(item.chain)) !== null && _a !== void 0 ? _a : defaultChainId,
    });
    const menuOptions = menuActions.map((action) => ({
        label: action.title,
        onPress: action.onPress,
        Icon: action.Icon,
        destructive: action.destructive,
    }));
    const nftVisibility = useSelector(selectNftsVisibility);
    const hidden = getIsNftHidden({
        contractAddress: item.contractAddress,
        tokenId: item.tokenId,
        isSpam: item.isSpam,
        nftVisibility,
    });
    const itemId = `${item.chain}-${item.contractAddress}-${item.tokenId}-${hidden}`;
    return (_jsx(Flex, { children: _jsx(ContextMenu, { itemId: itemId, menuOptions: menuOptions, children: _jsx(NftView, { ...props }) }) }));
}
//# sourceMappingURL=NftViewWithContextMenu.web.js.map