import { ChooseNftModalProps } from 'wallet/src/features/unitags/ChooseNftModal';
export type ChoosePhotoOptionsProps = {
    address: Maybe<Address>;
    hasNFTs: boolean;
    nftModalProps?: Omit<ChooseNftModalProps, 'address' | 'setPhotoUri' | 'onClose'>;
    setPhotoUri: (uri?: string) => void;
    onClose: () => void;
    showRemoveOption: boolean;
};
export declare const ChoosePhotoOptionsModal: ({ address, hasNFTs, nftModalProps, setPhotoUri, onClose, showRemoveOption, }: ChoosePhotoOptionsProps) => JSX.Element;
//# sourceMappingURL=ChoosePhotoOptionsModal.d.ts.map