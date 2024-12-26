export declare function selectPhotoFromLibrary(): Promise<string | undefined>;
export declare function useAvatarSelectionHandler({ address, avatarImageUri, setAvatarImageUri, showModal, }: {
    address: string;
    avatarImageUri: string | undefined;
    setAvatarImageUri: (uri: string) => void;
    showModal: () => void;
}): {
    avatarSelectionHandler: () => Promise<void>;
    hasNFTs: boolean;
};
//# sourceMappingURL=AvatarSelection.d.ts.map