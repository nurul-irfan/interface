import axios from 'axios';
import { ProfileMetadata, UnitagAddressResponse, UnitagGetAvatarUploadUrlResponse, UnitagResponse, UnitagUpdateMetadataResponse } from 'uniswap/src/features/unitags/types';
import { Account } from 'wallet/src/features/wallet/accounts/types';
import { SignerManager } from 'wallet/src/features/wallet/signing/SignerManager';
export declare function getUnitagAvatarUploadUrl({ username, account, signerManager, }: {
    username: string;
    account: Account;
    signerManager: SignerManager;
}): ReturnType<typeof axios.get<UnitagGetAvatarUploadUrlResponse>>;
export declare function deleteUnitag({ username, account, signerManager, }: {
    username: string;
    account: Account;
    signerManager: SignerManager;
}): ReturnType<typeof axios.delete<UnitagResponse>>;
export declare function updateUnitagMetadata({ username, metadata, clearAvatar, account, signerManager, }: {
    username: string;
    metadata: ProfileMetadata;
    clearAvatar: boolean;
    account: Account;
    signerManager: SignerManager;
}): ReturnType<typeof axios.put<UnitagUpdateMetadataResponse>>;
export declare function claimUnitag({ username, deviceId, metadata, account, signerManager, firebaseAppCheckToken, }: {
    username: string;
    deviceId: string;
    metadata: ProfileMetadata;
    account: Account;
    signerManager: SignerManager;
    firebaseAppCheckToken?: string;
}): ReturnType<typeof axios.post<UnitagResponse>>;
export declare function changeUnitag({ username, deviceId, account, signerManager, }: {
    username: string;
    deviceId: string;
    account: Account;
    signerManager: SignerManager;
}): ReturnType<typeof axios.post<UnitagResponse>>;
/**
 * TODO WALL-5159 Remove this function and replace with UnitagsApiClient.ts/fetchAddresses
 *
 * @deprecated
 * @param addresses
 * @returns
 */
export declare function fetchUnitagByAddresses(addresses: Address[]): Promise<{
    data?: {
        [address: Address]: UnitagAddressResponse;
    };
    error?: unknown;
}>;
//# sourceMappingURL=api.d.ts.map