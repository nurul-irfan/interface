import * as WebBrowser from 'expo-web-browser';
import { colorsLight } from 'ui/src/theme';
import { getChainInfo } from 'uniswap/src/features/chains/chainInfo';
import { UniverseChainId } from 'uniswap/src/features/chains/types';
import { canOpenURL, openURL } from 'uniswap/src/utils/link';
import { logger } from 'utilities/src/logger/logger';
const ALLOWED_EXTERNAL_URI_SCHEMES = ['http://', 'https://'];
/**
 * Opens allowed URIs. if isSafeUri is set to true then this will open http:// and https:// as well as some deeplinks.
 * Only set this flag to true if you have formed the URL yourself in our own app code. For any URLs from an external source
 * isSafeUri must be false and it will only open http:// and https:// URI schemes.
 *
 * @param openExternalBrowser whether to leave the app and open in system browser. default is false, opens in-app browser window
 * @param isSafeUri whether to bypass ALLOWED_EXTERNAL_URI_SCHEMES check
 * @param controlsColor When opening in an in-app browser, determines the controls color
 **/
export async function openUri(uri, openExternalBrowser = false, isSafeUri = false, 
// NOTE: okay to use colors object directly as we want the same color for light/dark modes
controlsColor = colorsLight.accent1) {
    const trimmedURI = uri.trim();
    if (!isSafeUri && !ALLOWED_EXTERNAL_URI_SCHEMES.some((scheme) => trimmedURI.startsWith(scheme))) {
        // TODO: [MOB-253] show a visual warning that the link cannot be opened.
        logger.error(new Error('User attempted to open potentially unsafe url'), {
            tags: {
                file: 'linking',
                function: 'openUri',
            },
            extra: { uri },
        });
        return;
    }
    const isHttp = /^https?:\/\//.test(trimmedURI);
    // `canOpenURL` returns `false` for App Links / Universal Links, so we just assume any device can handle the `https://` protocol.
    const supported = isHttp ? true : await canOpenURL(uri);
    if (!supported) {
        logger.warn('linking', 'openUri', `Cannot open URI: ${uri}`);
        return;
    }
    try {
        if (openExternalBrowser) {
            await openURL(uri);
        }
        else {
            await WebBrowser.openBrowserAsync(uri, {
                // iOS only
                controlsColor,
                presentationStyle: WebBrowser.WebBrowserPresentationStyle.FULL_SCREEN,
                // Android only
                // This is needed to avoid the browser automatically closing when the user comes back from another app (for example, when using the camera during FOR KYC).
                showInRecents: true,
                // Web only
                windowFeatures: 'popup=false',
            });
        }
    }
    catch (error) {
        logger.error(error, { tags: { file: 'linking', function: 'openUri' } });
    }
}
export var ExplorerDataType;
(function (ExplorerDataType) {
    ExplorerDataType["TRANSACTION"] = "transaction";
    ExplorerDataType["TOKEN"] = "token";
    ExplorerDataType["ADDRESS"] = "address";
    ExplorerDataType["BLOCK"] = "block";
    ExplorerDataType["NFT"] = "nft";
    ExplorerDataType["NATIVE"] = "native";
})(ExplorerDataType || (ExplorerDataType = {}));
/**
 * Return the explorer link for the given data and data type
 * @param chainId the ID of the chain for which to return the data
 * @param data the data to return a link for
 * @param type the type of the data
 */
export function getExplorerLink(chainId, data, type) {
    var _a, _b, _c;
    const { explorer, nativeCurrency } = getChainInfo(chainId);
    const prefix = explorer.url;
    switch (type) {
        case ExplorerDataType.TRANSACTION:
            return `${prefix}tx/${data}`;
        case ExplorerDataType.TOKEN:
            if (data === nativeCurrency.address && nativeCurrency.explorerLink) {
                return (_a = nativeCurrency.explorerLink) !== null && _a !== void 0 ? _a : `${prefix}token/${data}`;
            }
            return `${prefix}token/${data}`;
        case ExplorerDataType.BLOCK:
            if (chainId === UniverseChainId.Optimism) {
                return `${prefix}tx/${data}`;
            }
            return `${prefix}block/${data}`;
        case ExplorerDataType.ADDRESS:
            return `${prefix}address/${data}`;
        case ExplorerDataType.NFT:
            if (chainId === UniverseChainId.Zora) {
                // Zora Energy Explorer uses a different URL format of [blockExplorerUrl]/token/[contractAddress]/instance/[tokenId]
                // We need to split the data to get the contract address and token ID
                const splitData = data.split('/');
                const contractAddress = (_b = splitData[0]) !== null && _b !== void 0 ? _b : '';
                const tokenAddress = (_c = splitData[1]) !== null && _c !== void 0 ? _c : '';
                return `${prefix}token/${contractAddress}/instance/${tokenAddress}`;
            }
            return `${prefix}nft/${data}`;
        default:
            return `${prefix}`;
    }
}
//# sourceMappingURL=linking.js.map