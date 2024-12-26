import { UnitagAddressRequest, UnitagAddressResponse, UnitagAddressesRequest, UnitagAddressesResponse, UnitagClaimEligibilityRequest, UnitagClaimEligibilityResponse, UnitagUsernameRequest, UnitagUsernameResponse } from 'uniswap/src/features/unitags/types';
export declare const UNITAGS_API_CACHE_KEY = "UnitagsApi";
export declare function fetchUsername(params: UnitagUsernameRequest): Promise<UnitagUsernameResponse>;
export declare function fetchAddress(params: UnitagAddressRequest): Promise<UnitagAddressResponse>;
export declare function fetchAddresses({ addresses }: UnitagAddressesRequest): Promise<UnitagAddressesResponse>;
export declare function fetchClaimEligibility(params: UnitagClaimEligibilityRequest): Promise<UnitagClaimEligibilityResponse>;
//# sourceMappingURL=UnitagsApiClient.d.ts.map