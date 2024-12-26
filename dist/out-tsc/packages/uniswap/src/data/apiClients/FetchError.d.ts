export declare class FetchError extends Error {
    response: Response;
    data?: any;
    constructor({ response, data, cause }: {
        response: Response;
        data?: any;
        cause?: unknown;
    });
}
export declare function isRateLimitFetchError(error: unknown): boolean;
//# sourceMappingURL=FetchError.d.ts.map