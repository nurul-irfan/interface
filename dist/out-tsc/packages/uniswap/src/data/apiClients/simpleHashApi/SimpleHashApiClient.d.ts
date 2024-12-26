export declare const SIMPLE_HASH_API_CACHE_KEY = "SimpleHashApi";
export type SimpleHashResponse = {
    message: string;
    success: boolean;
};
export type ReportSpamRequest = {
    contractAddress?: string;
    tokenId?: string;
    networkName?: string;
};
export declare function reportNftSpamToSimpleHash(params: ReportSpamRequest): Promise<SimpleHashResponse>;
//# sourceMappingURL=SimpleHashApiClient.d.ts.map