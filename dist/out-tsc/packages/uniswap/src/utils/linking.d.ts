import { UniverseChainId } from 'uniswap/src/features/chains/types';
/**
 * Opens allowed URIs. if isSafeUri is set to true then this will open http:// and https:// as well as some deeplinks.
 * Only set this flag to true if you have formed the URL yourself in our own app code. For any URLs from an external source
 * isSafeUri must be false and it will only open http:// and https:// URI schemes.
 *
 * @param openExternalBrowser whether to leave the app and open in system browser. default is false, opens in-app browser window
 * @param isSafeUri whether to bypass ALLOWED_EXTERNAL_URI_SCHEMES check
 * @param controlsColor When opening in an in-app browser, determines the controls color
 **/
export declare function openUri(uri: string, openExternalBrowser?: boolean, isSafeUri?: boolean, controlsColor?: string): Promise<void>;
export declare enum ExplorerDataType {
    TRANSACTION = "transaction",
    TOKEN = "token",
    ADDRESS = "address",
    BLOCK = "block",
    NFT = "nft",
    NATIVE = "native"
}
/**
 * Return the explorer link for the given data and data type
 * @param chainId the ID of the chain for which to return the data
 * @param data the data to return a link for
 * @param type the type of the data
 */
export declare function getExplorerLink(chainId: UniverseChainId, data: string, type: ExplorerDataType): string;
//# sourceMappingURL=linking.d.ts.map