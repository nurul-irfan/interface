import { NftsTabQuery } from 'uniswap/src/data/graphql/uniswap-data-api/__generated__/types-and-hooks';
import { NFTKeyToVisibility } from 'uniswap/src/features/favorites/slice';
import { NFTItem } from 'wallet/src/features/nfts/types';
export declare function formatNftItems(data: NftsTabQuery | undefined): NFTItem[] | undefined;
export declare const getNFTAssetKey: (address: Address, token_id: string) => string;
export declare const getIsNftHidden: ({ contractAddress, tokenId, isSpam, nftVisibility, }: {
    contractAddress?: string | undefined;
    tokenId?: string | undefined;
    isSpam?: boolean | undefined;
    nftVisibility: NFTKeyToVisibility;
}) => boolean;
//# sourceMappingURL=utils.d.ts.map