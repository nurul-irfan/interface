import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { PollingInterval } from 'uniswap/src/constants/misc';
import { useNftsQuery } from 'uniswap/src/data/graphql/uniswap-data-api/__generated__/types-and-hooks';
import { selectNftsVisibility } from 'uniswap/src/features/favorites/selectors';
import { EMPTY_NFT_ITEM, HIDDEN_NFTS_ROW } from 'wallet/src/features/nfts/constants';
import { getIsNftHidden } from 'wallet/src/features/nfts/utils';
export function useNFT(owner = '', address, tokenId) {
    // TODO: [MOB-227] do a direct cache lookup in Apollo using id instead of re-querying
    const { data, loading, refetch } = useNftsQuery({
        variables: { ownerAddress: owner },
        pollInterval: PollingInterval.Slow,
        skip: !owner,
    });
    const nft = useMemo(() => {
        var _a, _b, _c, _d, _e;
        return (_e = (_d = (_c = (_b = (_a = data === null || data === void 0 ? void 0 : data.portfolios) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.nftBalances) === null || _c === void 0 ? void 0 : _c.find((balance) => { var _a, _b, _c; return ((_b = (_a = balance === null || balance === void 0 ? void 0 : balance.ownedAsset) === null || _a === void 0 ? void 0 : _a.nftContract) === null || _b === void 0 ? void 0 : _b.address) === address && ((_c = balance === null || balance === void 0 ? void 0 : balance.ownedAsset) === null || _c === void 0 ? void 0 : _c.tokenId) === tokenId; })) === null || _d === void 0 ? void 0 : _d.ownedAsset) !== null && _e !== void 0 ? _e : undefined;
    }, [data, address, tokenId]);
    return { data: nft, loading, refetch };
}
// Apply to NFTs fetched from API hidden filter, which is stored in Redux
export function useGroupNftsByVisibility(nftDataItems, showHidden) {
    const nftVisibility = useSelector(selectNftsVisibility);
    return useMemo(() => {
        const { shown, hidden } = (nftDataItems !== null && nftDataItems !== void 0 ? nftDataItems : []).reduce((acc, item) => {
            const isNftHidden = getIsNftHidden({
                contractAddress: item.contractAddress,
                tokenId: item.tokenId,
                isSpam: item.isSpam,
                nftVisibility,
            });
            if (isNftHidden) {
                acc.hidden.push(item);
            }
            else {
                acc.shown.push(item);
            }
            return acc;
        }, { shown: [], hidden: [] });
        return {
            nfts: [
                ...shown,
                ...((hidden.length && [
                    // to fill the gap for odd number of shown elements in 2 columns layout
                    ...(shown.length % 2 ? [EMPTY_NFT_ITEM] : []),
                    HIDDEN_NFTS_ROW,
                ]) ||
                    []),
                ...((showHidden && hidden) || []),
            ],
            numHidden: hidden.length,
            numShown: shown.length,
        };
    }, [nftDataItems, nftVisibility, showHidden]);
}
//# sourceMappingURL=hooks.js.map