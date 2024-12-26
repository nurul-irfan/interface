import { logger } from 'utilities/src/logger/logger';
export const PBKDF2_PARAMS = {
    name: 'PBKDF2',
    iterations: 100000,
    hash: 'SHA-256',
};
export const AES_GCM_PARAMS = { name: 'AES-GCM', length: 256 };
// TODO: improve encoding/decoding
export const encodeForStorage = (payload) => payload.toString();
export const decodeFromStorage = (payload) => new Uint8Array(payload.split(',').map((x) => Number(x)));
export function generateNewSalt() {
    return crypto.getRandomValues(new Uint8Array(16));
}
export function generateNewIV() {
    return crypto.getRandomValues(new Uint8Array(12));
}
// encrypts and returns the cipher text
export async function encrypt({ plaintext, encryptionKey, iv, additionalData }) {
    const encoder = new TextEncoder();
    const ciphertext = await crypto.subtle.encrypt({
        iv,
        ...AES_GCM_PARAMS,
        additionalData: encoder.encode(additionalData),
    }, encryptionKey, encoder.encode(plaintext));
    return new Uint8Array(ciphertext).toString();
}
export async function decrypt({ encryptionKey, ciphertext, iv, additionalData, }) {
    const decoder = new TextDecoder();
    const encoder = new TextEncoder();
    try {
        // if this is successful, the password is correct. Otherwise it will throw an error
        const result = await crypto.subtle.decrypt({
            iv,
            ...AES_GCM_PARAMS,
            additionalData: encoder.encode(additionalData),
        }, encryptionKey, ciphertext);
        return decoder.decode(result);
    }
    catch (error) {
        logger.debug('crypto', 'decryptPassword', 'incorrect password');
        return undefined;
    }
}
export async function exportKey(key) {
    const rawKey = await window.crypto.subtle.exportKey('raw', key);
    const keyArray = new Uint8Array(rawKey);
    const binaryString = String.fromCharCode.apply(null, [...keyArray]);
    const keyBase64 = btoa(binaryString);
    return keyBase64;
}
export async function convertBase64SeedToCryptoKey(keyBase64) {
    const bytes = Uint8Array.from(window.atob(keyBase64), (c) => c.charCodeAt(0));
    return window.crypto.subtle.importKey('raw', bytes, AES_GCM_PARAMS, true, ['encrypt', 'decrypt']);
}
export async function getEncryptionKeyFromPassword(password, secretPayload) {
    const { name, iterations, hash } = secretPayload;
    const salt = decodeFromStorage(secretPayload.salt);
    const pbkdf2Params = { salt, name, iterations, hash };
    const keyMaterial = await crypto.subtle.importKey('raw', new TextEncoder().encode(password), PBKDF2_PARAMS.name, false, ['deriveKey']);
    // TODO: This should use Argon2 like ToB recommended for the mobile app
    // https://github.com/Uniswap/universe/blob/main/apps/mobile/ios/EncryptionHelper.swift
    return crypto.subtle.deriveKey(pbkdf2Params, keyMaterial, AES_GCM_PARAMS, true, ['encrypt', 'decrypt']);
}
//# sourceMappingURL=crypto.js.map