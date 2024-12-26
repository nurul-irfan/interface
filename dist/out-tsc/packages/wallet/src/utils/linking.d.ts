import { UniverseChainId } from 'uniswap/src/features/chains/types';
import { ServiceProviderInfo } from 'uniswap/src/features/transactions/types/transactionDetails';
export declare function dismissInAppBrowser(): void;
export declare function openTransactionLink(hash: string | undefined, chainId: UniverseChainId): Promise<void>;
export declare function openUniswapHelpLink(): Promise<void>;
export declare function openOnRampSupportLink(serviceProvider: ServiceProviderInfo): Promise<void>;
export declare function openSettings(): Promise<void>;
/**
 * Return the explorer name for the given chain ID
 * @param chainId the ID of the chain for which to return the explorer name
 */
export declare function getExplorerName(chainId: UniverseChainId): string;
export declare function getNftCollectionUrl(contractAddress: Maybe<string>): string | undefined;
export declare function getNftUrl(contractAddress: string, tokenId: string): string;
export declare function getProfileUrl(walletAddress: string): string;
export declare function getTokenUrl(currencyId: string, addMobileUTMTags?: boolean): string | undefined;
export declare function getTwitterLink(twitterName: string): string;
//# sourceMappingURL=linking.d.ts.map