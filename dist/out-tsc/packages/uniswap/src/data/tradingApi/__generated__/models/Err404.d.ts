export type Err404 = {
    errorCode?: Err404.errorCode;
    detail?: string;
};
export declare namespace Err404 {
    enum errorCode {
        RESOURCE_NOT_FOUND = "ResourceNotFound",
        QUOTE_AMOUNT_TOO_LOW_ERROR = "QuoteAmountTooLowError"
    }
}
//# sourceMappingURL=Err404.d.ts.map