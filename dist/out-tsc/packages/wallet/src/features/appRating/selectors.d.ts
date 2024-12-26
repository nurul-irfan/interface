import { Selector } from '@reduxjs/toolkit';
import { WalletState } from 'wallet/src/state/walletReducer';
export declare const MIN_PROMPT_REMINDER_MS: number;
export declare const MIN_FEEDBACK_REMINDER_MS: number;
export declare const hasConsecutiveRecentSwapsSelector: Selector<WalletState, boolean>;
/**
 * Selector that determines if and when to show the app rating prompt.
 * The prompt should be shown when ALL of these conditions are met:
 * 1. User has completed consecutive successful swaps recently (consecutiveSwapsCondition)
 * 2. Either:
 *    a. User has never been prompted before (hasNeverPrompted), OR
 *    b. Enough time has passed since the last interaction:
 *       - If user never provided feedback: 120 days since last prompt
 *       - If user provided feedback: 180 days since feedback was given
 *
 * Returns state including prompt timing info and whether prompt should be shown.
 */
export declare const appRatingStateSelector: Selector<WalletState, {
    appRatingProvidedMs: number | undefined;
    appRatingPromptedMs: number | undefined;
    consecutiveSwapsCondition: boolean;
    shouldPrompt: boolean;
}>;
//# sourceMappingURL=selectors.d.ts.map