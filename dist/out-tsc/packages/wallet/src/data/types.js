export var NetworkErrorType;
(function (NetworkErrorType) {
    NetworkErrorType["Forbidden"] = "Forbidden";
    NetworkErrorType["GatewayTimeout"] = "GatewayTimeout";
    NetworkErrorType["InternalServerError"] = "InternalServerError";
    NetworkErrorType["NotFound"] = "NotFound";
    NetworkErrorType["ServiceUnavailable"] = "ServiceUnavailable";
    NetworkErrorType["TooManyRequests"] = "TooManyRequests";
    NetworkErrorType["Unauthorized"] = "Unauthorized";
    NetworkErrorType["Unknown"] = "Unknown";
})(NetworkErrorType || (NetworkErrorType = {}));
export class NetworkError extends Error {
    constructor(message) {
        super(message);
        this.name = 'NetworkError';
    }
}
//# sourceMappingURL=types.js.map