import { launchImageLibrary } from 'react-native-image-picker';
import { useNftsTabQuery } from 'uniswap/src/data/graphql/uniswap-data-api/__generated__/types-and-hooks';
import { useEnabledChains } from 'uniswap/src/features/chains/hooks/useEnabledChains';
import { NUM_FIRST_NFTS } from 'wallet/src/components/nfts/NftsList';
import { formatNftItems } from 'wallet/src/features/nfts/utils';
// Selected image will be shrunk to max width/height
// URI will then be for an image of those dimensions
const IMAGE_OPTIONS = {
    mediaType: 'photo',
    maxWidth: 500,
    maxHeight: 500,
    quality: 1, // best quality
    includeBase64: false,
    selectionLimit: 1,
};
export async function selectPhotoFromLibrary() {
    var _a;
    const response = await launchImageLibrary(IMAGE_OPTIONS);
    if (!response.didCancel && !response.errorCode && response.assets) {
        return (_a = response.assets[0]) === null || _a === void 0 ? void 0 : _a.uri;
    }
    return undefined;
}
export function useAvatarSelectionHandler({ address, avatarImageUri, setAvatarImageUri, showModal, }) {
    const { gqlChains } = useEnabledChains();
    const { data: nftsData } = useNftsTabQuery({
        variables: {
            ownerAddress: address,
            first: NUM_FIRST_NFTS,
            filter: { filterSpam: false },
            chains: gqlChains,
        },
    });
    const nftItems = formatNftItems(nftsData);
    const hasNFTs = nftItems !== undefined && (nftItems === null || nftItems === void 0 ? void 0 : nftItems.length) > 0;
    const hasAvatarImage = avatarImageUri && avatarImageUri !== '';
    if (hasNFTs || hasAvatarImage) {
        return { avatarSelectionHandler: async () => showModal(), hasNFTs };
    }
    else {
        return {
            avatarSelectionHandler: async () => {
                const selectedPhoto = await selectPhotoFromLibrary();
                if (selectedPhoto) {
                    setAvatarImageUri(selectedPhoto);
                }
            },
            hasNFTs,
        };
    }
}
//# sourceMappingURL=AvatarSelection.js.map