export declare const PBKDF2_PARAMS: Omit<Pbkdf2Params, 'salt'> & {
    hash: string;
};
export declare const AES_GCM_PARAMS: AesKeyGenParams;
export declare const encodeForStorage: (payload: ArrayBuffer) => string;
export declare const decodeFromStorage: (payload: string) => Uint8Array;
export type SecretPayload = {
    ciphertext?: string;
    iv: string;
    salt: string;
    name: string;
    iterations: number;
    hash: string;
};
export declare function generateNewSalt(): Uint8Array;
export declare function generateNewIV(): Uint8Array;
interface EncryptParams {
    plaintext: string;
    encryptionKey: CryptoKey;
    iv: Uint8Array;
    additionalData?: string;
}
export declare function encrypt({ plaintext, encryptionKey, iv, additionalData }: EncryptParams): Promise<string>;
interface DecryptParams {
    encryptionKey: CryptoKey;
    ciphertext: Uint8Array;
    iv: Uint8Array;
    additionalData?: string;
}
export declare function decrypt({ encryptionKey, ciphertext, iv, additionalData, }: DecryptParams): Promise<string | undefined>;
export declare function exportKey(key: CryptoKey): Promise<string>;
export declare function convertBase64SeedToCryptoKey(keyBase64: string): Promise<CryptoKey>;
export declare function getEncryptionKeyFromPassword(password: string, secretPayload: SecretPayload): Promise<CryptoKey>;
export {};
//# sourceMappingURL=crypto.d.ts.map