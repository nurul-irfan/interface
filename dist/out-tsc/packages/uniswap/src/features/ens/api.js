/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { skipToken, useQuery } from '@tanstack/react-query';
import { UniverseChainId } from 'uniswap/src/features/chains/types';
import { createEthersProvider } from 'uniswap/src/features/providers/createEthersProvider';
import { areAddressesEqual } from 'uniswap/src/utils/addresses';
import { ONE_MINUTE_MS } from 'utilities/src/time/time';
const ONCHAIN_ENS_CACHE_KEY = 'OnchainENS';
export var EnsLookupType;
(function (EnsLookupType) {
    EnsLookupType["Name"] = "name";
    EnsLookupType["Address"] = "address";
    EnsLookupType["Avatar"] = "avatar";
    EnsLookupType["Description"] = "description";
    EnsLookupType["TwitterUsername"] = "com.twitter";
})(EnsLookupType || (EnsLookupType = {}));
async function getNameFetch(address, provider) {
    const name = await provider.lookupAddress(address);
    // ENS does not enforce that an address owns a .eth domain before setting it as a reverse proxy
    // and recommends that you perform a match on the forward resolution
    // see: https://docs.ens.domains/dapp-developer-guide/resolving-names#reverse-resolution
    const fwdAddr = name ? await provider.resolveName(name) : null;
    // Normalize data as provider response is checksummed
    return areAddressesEqual(fwdAddr, address) ? name : null;
}
async function getAddressFetch(name, provider) {
    return await provider.resolveName(name);
}
async function getAvatarFetch(address, provider) {
    const name = await provider.lookupAddress(address);
    const fwdAddr = name ? await provider.resolveName(name) : null;
    const checkedName = areAddressesEqual(address, fwdAddr) ? name : null;
    return checkedName ? await provider.getAvatar(checkedName) : null;
}
async function getTextFetch(key, name, provider) {
    const resolver = await provider.getResolver(name);
    const text = resolver === null || resolver === void 0 ? void 0 : resolver.getText(key);
    return text !== null && text !== void 0 ? text : null;
}
async function getOnChainEnsFetch(params) {
    const { type, nameOrAddress } = params;
    const provider = createEthersProvider(UniverseChainId.Mainnet);
    if (!provider) {
        return null;
    }
    switch (type) {
        case EnsLookupType.Name:
            return await getNameFetch(nameOrAddress, provider);
        case EnsLookupType.Address:
            return await getAddressFetch(nameOrAddress, provider);
        case EnsLookupType.Avatar:
            return await getAvatarFetch(nameOrAddress, provider);
        case EnsLookupType.Description:
            return await getTextFetch('description', nameOrAddress, provider);
        case EnsLookupType.TwitterUsername:
            return await getTextFetch('com.twitter', nameOrAddress, provider);
        default:
            throw new Error(`Invalid ENS lookup type: ${type}`);
    }
}
function useEnsQuery(type, nameOrAddress, chainId = UniverseChainId.Mainnet) {
    return useQuery({
        queryKey: [ONCHAIN_ENS_CACHE_KEY, chainId, type, nameOrAddress],
        queryFn: nameOrAddress
            ? async () => await getOnChainEnsFetch({ type, nameOrAddress, chainId })
            : skipToken,
        staleTime: 5 * ONE_MINUTE_MS,
    });
}
export function useENSName(address, chainId = UniverseChainId.Mainnet) {
    return useEnsQuery(EnsLookupType.Name, address, chainId);
}
export function useAddressFromEns(maybeName, chainId = UniverseChainId.Mainnet) {
    return useEnsQuery(EnsLookupType.Address, maybeName, chainId);
}
export function useENSAvatar(address, chainId = UniverseChainId.Mainnet) {
    return useEnsQuery(EnsLookupType.Avatar, address, chainId);
}
export function useENSDescription(name, chainId = UniverseChainId.Mainnet) {
    return useEnsQuery(EnsLookupType.Description, name, chainId);
}
export function useENSTwitterUsername(name, chainId = UniverseChainId.Mainnet) {
    return useEnsQuery(EnsLookupType.TwitterUsername, name, chainId);
}
//# sourceMappingURL=api.js.map