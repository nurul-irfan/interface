export declare enum AccountType {
    SignerMnemonic = "signerMnemonic",// Key lives in native keystore
    Readonly = "readonly"
}
export interface SignerMnemonicAccountMeta {
    type: AccountType.SignerMnemonic;
    address: Address;
}
export interface ReadOnlyAccountMeta {
    type: AccountType.Readonly;
    address: Address;
}
export type AccountMeta = SignerMnemonicAccountMeta | ReadOnlyAccountMeta;
//# sourceMappingURL=types.d.ts.map