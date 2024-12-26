/// <reference types="react" />
import { UnitagEntryPoint } from 'uniswap/src/types/screens/mobile';
import { ChoosePhotoOptionsProps } from 'wallet/src/features/unitags/ChoosePhotoOptionsModal';
export declare function UnitagChooseProfilePicContent({ address, unitag, shouldHandleClaim, entryPoint, unitagFontSize, nftModalProps, onContinue, }: {
    address: Address;
    unitag: string;
    shouldHandleClaim: boolean;
    entryPoint: UnitagEntryPoint;
    unitagFontSize: number;
    nftModalProps?: ChoosePhotoOptionsProps['nftModalProps'];
    onContinue: (imageUri: string | undefined) => void;
}): JSX.Element;
//# sourceMappingURL=UnitagChooseProfilePicContent.d.ts.map