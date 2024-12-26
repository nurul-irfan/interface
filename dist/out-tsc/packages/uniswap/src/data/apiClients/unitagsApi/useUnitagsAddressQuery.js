import { skipToken, useQuery } from '@tanstack/react-query';
import { UNITAGS_API_CACHE_KEY, fetchAddress, fetchAddresses, } from 'uniswap/src/data/apiClients/unitagsApi/UnitagsApiClient';
import { MAX_REACT_QUERY_CACHE_TIME_MS, ONE_MINUTE_MS } from 'utilities/src/time/time';
export function useUnitagsAddressQuery({ params, ...rest }) {
    const queryKey = [UNITAGS_API_CACHE_KEY, 'address', params];
    return useQuery({
        queryKey,
        queryFn: params ? async () => await fetchAddress(params) : skipToken,
        staleTime: ONE_MINUTE_MS,
        gcTime: MAX_REACT_QUERY_CACHE_TIME_MS,
        ...rest,
    });
}
export function useUnitagsAddressesQuery({ params, ...rest }) {
    const queryKey = [UNITAGS_API_CACHE_KEY, 'addresses', params];
    return useQuery({
        queryKey,
        queryFn: params ? async () => await fetchAddresses(params) : skipToken,
        staleTime: ONE_MINUTE_MS,
        gcTime: MAX_REACT_QUERY_CACHE_TIME_MS,
        ...rest,
    });
}
//# sourceMappingURL=useUnitagsAddressQuery.js.map