export declare const BASE_UNISWAP_HEADERS: {
    Origin?: string | undefined;
    'x-request-source': string;
    'x-app-version': string;
};
export declare function createApiClient({ baseUrl, includeBaseUniswapHeaders, additionalHeaders, }: {
    baseUrl: string;
    includeBaseUniswapHeaders?: boolean;
    additionalHeaders?: HeadersInit;
}): {
    readonly fetch: (path: string, options: Parameters<typeof fetch>[1]) => Promise<Response>;
    readonly get: <T>(path: string, options?: Parameters<typeof fetch>[1] & {
        params?: Record<string, string | number | boolean | undefined | null>;
    }) => Promise<T>;
    readonly post: <T>(path: string, options: Parameters<typeof fetch>[1]) => Promise<T>;
};
//# sourceMappingURL=createApiClient.d.ts.map