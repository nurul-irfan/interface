import { FlexProps, SpaceTokens } from 'ui/src';
import { ModalProps } from 'uniswap/src/components/modals/ModalProps';
import { ChoosePhotoOptionsProps } from 'wallet/src/features/unitags/ChoosePhotoOptionsModal';
export declare const NFT_MODAL_MAX_WIDTH = 610;
export declare const extensionNftModalProps: ChoosePhotoOptionsProps['nftModalProps'];
export type ChooseNftModalProps = {
    address: string;
    includeContextMenu?: boolean;
    itemMargin?: SpaceTokens;
    numColumns?: number;
    containerProps?: FlexProps;
    modalMaxWidth?: ModalProps['maxWidth'];
    setPhotoUri: (uri?: string) => void;
    onClose: () => void;
};
export declare const ChooseNftModal: ({ address, includeContextMenu, itemMargin, numColumns, containerProps, modalMaxWidth, setPhotoUri, onClose, }: ChooseNftModalProps) => JSX.Element;
//# sourceMappingURL=ChooseNftModal.d.ts.map