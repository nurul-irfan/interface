import { NetworkStatus, useApolloClient } from '@apollo/client';
import { useCallback } from 'react';
import { objectToQueryString } from 'uniswap/src/data/utils';
import { signMessage } from 'wallet/src/features/wallet/signing/signing';
export const ON_RAMP_AUTH_MAX_LIMIT = 100;
export const ON_RAMP_AUTH_MIN_LIMIT = 1;
export function isNonPollingRequestInFlight(networkStatus) {
    return (networkStatus === NetworkStatus.loading ||
        networkStatus === NetworkStatus.setVariables ||
        networkStatus === NetworkStatus.refetch);
}
export function isWarmLoadingStatus(networkStatus) {
    return networkStatus === NetworkStatus.loading;
}
/**
 * Consider a query in an error state for UI purposes if query has no data, and
 * query has been loading at least once.
 */
export function isError(networkStatus, hasData) {
    return !hasData && networkStatus !== NetworkStatus.loading;
}
export function useRefetchQueries() {
    const client = useApolloClient();
    return useCallback(async (include = 'active') => {
        await (client === null || client === void 0 ? void 0 : client.refetchQueries({ include }));
    }, [client]);
}
export async function createSignedRequestBody(data, account, signerManager) {
    const requestBody = {
        ...data,
        'x-uni-address': account.address,
        'x-uni-timestamp': Date.now(),
    };
    const message = JSON.stringify(requestBody);
    const signature = await signMessage(message, account, signerManager);
    return { requestBody, signature };
}
export async function createSignedRequestParams(params, account, signerManager) {
    const requestParams = {
        ...params,
        'x-uni-address': account.address,
        'x-uni-timestamp': Date.now(),
    };
    const message = objectToQueryString(requestParams);
    const signature = await signMessage(message, account, signerManager);
    return { requestParams, signature };
}
export async function createOnRampTransactionsAuth(limit, account, signerManager) {
    const { requestParams, signature } = await createSignedRequestParams({ limit }, // Parameter needed by graphql server when fetching onramp transactions
    account, signerManager);
    return { queryParams: objectToQueryString(requestParams), signature };
}
//# sourceMappingURL=utils.js.map