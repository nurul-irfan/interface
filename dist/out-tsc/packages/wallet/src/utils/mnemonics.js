import { utils, wordlists } from 'ethers';
import { normalizeTextInput } from 'utilities/src/primitives/string';
import { MNEMONIC_LENGTH_MAX, MNEMONIC_LENGTH_MIN } from 'wallet/src/constants/accounts';
export var MnemonicValidationError;
(function (MnemonicValidationError) {
    MnemonicValidationError["InvalidWord"] = "InvalidWord";
    MnemonicValidationError["NotEnoughWords"] = "NotEnoughWords";
    MnemonicValidationError["TooManyWords"] = "TooManyWords";
    MnemonicValidationError["InvalidPhrase"] = "InvalidPhrase";
})(MnemonicValidationError || (MnemonicValidationError = {}));
export function translateMnemonicErrorMessage(error, invalidWord, t) {
    switch (error) {
        case MnemonicValidationError.InvalidPhrase:
            return t('account.recoveryPhrase.error.invalid');
        case MnemonicValidationError.InvalidWord:
            return t('account.recoveryPhrase.error.invalidWord', { word: invalidWord });
        case MnemonicValidationError.TooManyWords:
        case MnemonicValidationError.NotEnoughWords:
            return t('account.recoveryPhrase.error.phraseLength');
        default:
            throw new Error(`Unhandled MnemonicValidationError case: ${error}`);
    }
}
// Validate if word is part of the BIP-39 word set [https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki]
export function validateSetOfWords(mnemonic) {
    if (!mnemonic) {
        return { error: MnemonicValidationError.NotEnoughWords, isValidLength: false };
    }
    const formatted = normalizeTextInput(mnemonic);
    const split = formatted.split(' ');
    const isValidLength = split.length >= MNEMONIC_LENGTH_MIN && split.length <= MNEMONIC_LENGTH_MAX;
    const invalidWords = split.filter((item) => isValidMnemonicWord(item));
    if (invalidWords.length) {
        return {
            error: MnemonicValidationError.InvalidWord,
            invalidWord: invalidWords.at(-1),
            invalidWordCount: invalidWords.length,
            isValidLength,
        };
    }
    if (split.length < MNEMONIC_LENGTH_MIN) {
        return { error: MnemonicValidationError.NotEnoughWords, isValidLength };
    }
    if (split.length > MNEMONIC_LENGTH_MAX) {
        return { error: MnemonicValidationError.TooManyWords, isValidLength };
    }
    return { isValidLength };
}
// Validate phrase by verifying the checksum
export function validateMnemonic(mnemonic) {
    const { error, invalidWord, invalidWordCount } = validateSetOfWords(mnemonic);
    if (error) {
        return { error, invalidWord, invalidWordCount };
    }
    const formatted = normalizeTextInput(mnemonic !== null && mnemonic !== void 0 ? mnemonic : '');
    if (!utils.isValidMnemonic(formatted)) {
        return { error: MnemonicValidationError.InvalidPhrase };
    }
    return { validMnemonic: formatted };
}
// Validate individual mnemonic word
export function isValidMnemonicWord(word) {
    var _a;
    return word.length > 0 && ((_a = wordlists.en) === null || _a === void 0 ? void 0 : _a.getWordIndex(word)) === -1;
}
// Check if phrase has trailing whitespace, indicating the user is done typing the previous word.
export function userFinishedTypingWord(mnemonic) {
    if (!mnemonic) {
        return false;
    }
    const lastChar = mnemonic[mnemonic.length - 1];
    return lastChar === ' ';
}
//# sourceMappingURL=mnemonics.js.map