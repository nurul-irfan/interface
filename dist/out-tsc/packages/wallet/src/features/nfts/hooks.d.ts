import { GqlResult } from 'uniswap/src/data/types';
import { GQLNftAsset } from 'uniswap/src/features/nfts/types';
import { NFTItem } from 'wallet/src/features/nfts/types';
export declare function useNFT(owner?: Address, address?: Address, tokenId?: string): GqlResult<GQLNftAsset>;
export declare function useGroupNftsByVisibility(nftDataItems: Array<NFTItem> | undefined, showHidden: boolean): {
    nfts: Array<NFTItem | string>;
    numHidden: number;
    numShown: number;
};
//# sourceMappingURL=hooks.d.ts.map