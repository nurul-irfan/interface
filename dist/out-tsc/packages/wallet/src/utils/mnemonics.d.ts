import { AppTFunction } from 'ui/src/i18n/types';
export declare enum MnemonicValidationError {
    InvalidWord = "InvalidWord",
    NotEnoughWords = "NotEnoughWords",
    TooManyWords = "TooManyWords",
    InvalidPhrase = "InvalidPhrase"
}
export declare function translateMnemonicErrorMessage(error: MnemonicValidationError, invalidWord: string | undefined, t: AppTFunction): string;
export declare function validateSetOfWords(mnemonic?: string): {
    error?: MnemonicValidationError;
    invalidWord?: string;
    invalidWordCount?: number;
    isValidLength: boolean;
};
export declare function validateMnemonic(mnemonic?: string): {
    error?: MnemonicValidationError;
    invalidWord?: string;
    invalidWordCount?: number;
    validMnemonic?: string;
};
export declare function isValidMnemonicWord(word: string): boolean;
export declare function userFinishedTypingWord(mnemonic: string | undefined): boolean;
//# sourceMappingURL=mnemonics.d.ts.map