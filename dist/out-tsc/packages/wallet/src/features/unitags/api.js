import axios from 'axios';
import { uniswapUrls } from 'uniswap/src/constants/urls';
import { REQUEST_SOURCE, getVersionHeader } from 'uniswap/src/data/constants';
import { isMobileApp } from 'utilities/src/platform';
import { createSignedRequestBody, createSignedRequestParams } from 'wallet/src/data/utils';
const BASE_HEADERS = {
    'x-request-source': REQUEST_SOURCE,
    'x-app-version': getVersionHeader(),
    ...(isMobileApp ? { Origin: uniswapUrls.apiOrigin } : {}),
};
const generateAxiosHeaders = async (signature, firebaseAppCheckToken) => {
    return {
        ...BASE_HEADERS,
        'x-uni-sig': signature,
        ...(firebaseAppCheckToken && {
            'x-firebase-app-check': firebaseAppCheckToken,
        }),
    };
};
// Axios requests with signature authentication
export async function getUnitagAvatarUploadUrl({ username, account, signerManager, }) {
    const avatarUploadUrl = `${uniswapUrls.unitagsApiUrl}/username/avatar-upload-url`;
    const { requestParams, signature } = await createSignedRequestParams({ username }, account, signerManager);
    const headers = await generateAxiosHeaders(signature);
    return await axios.get(avatarUploadUrl, {
        params: requestParams,
        headers,
    });
}
export async function deleteUnitag({ username, account, signerManager, }) {
    const avatarUploadUrl = `${uniswapUrls.unitagsApiUrl}/username`;
    const { requestBody, signature } = await createSignedRequestBody({ username }, account, signerManager);
    const headers = await generateAxiosHeaders(signature);
    return await axios.delete(avatarUploadUrl, {
        data: requestBody,
        headers,
    });
}
export async function updateUnitagMetadata({ username, metadata, clearAvatar, account, signerManager, }) {
    const updateMetadataUrl = `${uniswapUrls.unitagsApiUrl}/username/${username}/metadata`;
    const { requestBody, signature } = await createSignedRequestBody({
        metadata,
        clearAvatar,
    }, account, signerManager);
    const headers = await generateAxiosHeaders(signature);
    return await axios.put(updateMetadataUrl, requestBody, {
        headers,
    });
}
export async function claimUnitag({ username, deviceId, metadata, account, signerManager, firebaseAppCheckToken, }) {
    const claimUnitagUrl = `${uniswapUrls.unitagsApiUrl}/username`;
    const { requestBody, signature } = await createSignedRequestBody({
        username,
        deviceId,
        metadata,
    }, account, signerManager);
    const headers = await generateAxiosHeaders(signature, firebaseAppCheckToken);
    return await axios.post(claimUnitagUrl, requestBody, {
        headers,
    });
}
export async function changeUnitag({ username, deviceId, account, signerManager, }) {
    const changeUnitagUrl = `${uniswapUrls.unitagsApiUrl}/username/change`;
    const { requestBody, signature } = await createSignedRequestBody({
        username,
        deviceId,
    }, account, signerManager);
    const headers = await generateAxiosHeaders(signature);
    return await axios.post(changeUnitagUrl, requestBody, {
        headers,
    });
}
/**
 * TODO WALL-5159 Remove this function and replace with UnitagsApiClient.ts/fetchAddresses
 *
 * @deprecated
 * @param addresses
 * @returns
 */
export async function fetchUnitagByAddresses(addresses) {
    const unitagAddressesUrl = `${uniswapUrls.unitagsApiUrl}/addresses?addresses=${encodeURIComponent(addresses.join(','))}`;
    try {
        const response = await axios.get(unitagAddressesUrl, {
            headers: BASE_HEADERS,
        });
        return {
            data: response.data.usernames,
        };
    }
    catch (error) {
        return { error };
    }
}
//# sourceMappingURL=api.js.map