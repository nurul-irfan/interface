export declare enum NetworkErrorType {
    Forbidden = "Forbidden",
    GatewayTimeout = "GatewayTimeout",
    InternalServerError = "InternalServerError",
    NotFound = "NotFound",
    ServiceUnavailable = "ServiceUnavailable",
    TooManyRequests = "TooManyRequests",
    Unauthorized = "Unauthorized",
    Unknown = "Unknown"
}
export declare class NetworkError extends Error {
    constructor(message: NetworkErrorType);
}
export type AuthData = {
    'x-uni-address': Address;
    'x-uni-timestamp': number;
};
//# sourceMappingURL=types.d.ts.map