import * as WebBrowser from 'expo-web-browser';
import { Linking } from 'react-native';
import { uniswapUrls } from 'uniswap/src/constants/urls';
import { getChainInfo } from 'uniswap/src/features/chains/chainInfo';
import { toUniswapWebAppLink } from 'uniswap/src/features/chains/utils';
import { BACKEND_NATIVE_CHAIN_ADDRESS_STRING } from 'uniswap/src/features/search/utils';
import { currencyIdToChain, currencyIdToGraphQLAddress } from 'uniswap/src/utils/currencyId';
import { ExplorerDataType, getExplorerLink, openUri } from 'uniswap/src/utils/linking';
export function dismissInAppBrowser() {
    WebBrowser.dismissBrowser();
}
export async function openTransactionLink(hash, chainId) {
    if (!hash) {
        return undefined;
    }
    const explorerUrl = getExplorerLink(chainId, hash, ExplorerDataType.TRANSACTION);
    return openUri(explorerUrl);
}
export async function openUniswapHelpLink() {
    return openUri(uniswapUrls.helpRequestUrl);
}
export async function openOnRampSupportLink(serviceProvider) {
    var _a;
    return openUri((_a = serviceProvider.supportUrl) !== null && _a !== void 0 ? _a : uniswapUrls.helpRequestUrl);
}
export async function openSettings() {
    await Linking.openSettings();
}
/**
 * Return the explorer name for the given chain ID
 * @param chainId the ID of the chain for which to return the explorer name
 */
export function getExplorerName(chainId) {
    return getChainInfo(chainId).explorer.name;
}
export function getNftCollectionUrl(contractAddress) {
    if (!contractAddress) {
        return undefined;
    }
    return `${uniswapUrls.webInterfaceNftCollectionUrl}/${contractAddress}`;
}
export function getNftUrl(contractAddress, tokenId) {
    return `${uniswapUrls.webInterfaceNftItemUrl}/${contractAddress}/${tokenId}`;
}
export function getProfileUrl(walletAddress) {
    return `${uniswapUrls.webInterfaceAddressUrl}/${walletAddress}`;
}
const UTM_TAGS_MOBILE = 'utm_medium=mobile&utm_source=share-tdp';
export function getTokenUrl(currencyId, addMobileUTMTags = false) {
    const chainId = currencyIdToChain(currencyId);
    if (!chainId) {
        return undefined;
    }
    const network = toUniswapWebAppLink(chainId);
    try {
        let tokenAddress = currencyIdToGraphQLAddress(currencyId);
        // in case it's a native token
        if (tokenAddress === null) {
            // this is how web app handles native tokens
            tokenAddress = BACKEND_NATIVE_CHAIN_ADDRESS_STRING;
        }
        const tokenUrl = `${uniswapUrls.webInterfaceTokensUrl}/${network}/${tokenAddress}`;
        return addMobileUTMTags ? tokenUrl + `?${UTM_TAGS_MOBILE}` : tokenUrl;
    }
    catch (_) {
        return undefined;
    }
}
export function getTwitterLink(twitterName) {
    return `https://twitter.com/${twitterName}`;
}
//# sourceMappingURL=linking.js.map