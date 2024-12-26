import { PayloadAction } from '@reduxjs/toolkit';
import { CurrencyId } from 'uniswap/src/types/currency';
export type Visibility = {
    isVisible: boolean;
};
export type CurrencyIdToVisibility = Record<CurrencyId, Visibility>;
export type NFTKeyToVisibility = Record<string, Visibility>;
export interface FavoritesState {
    tokens: CurrencyId[];
    watchedAddresses: Address[];
    tokensVisibility: CurrencyIdToVisibility;
    nftsVisibility: NFTKeyToVisibility;
}
export declare const initialFavoritesState: FavoritesState;
export declare const slice: import("@reduxjs/toolkit").Slice<FavoritesState, {
    addFavoriteToken: (state: import("immer/dist/internal").WritableDraft<FavoritesState>, { payload: { currencyId } }: {
        payload: {
            currencyId: string;
        };
        type: string;
    }) => void;
    removeFavoriteToken: (state: import("immer/dist/internal").WritableDraft<FavoritesState>, { payload: { currencyId } }: {
        payload: {
            currencyId: string;
        };
        type: string;
    }) => void;
    setFavoriteTokens: (state: import("immer/dist/internal").WritableDraft<FavoritesState>, { payload: { currencyIds } }: {
        payload: {
            currencyIds: string[];
        };
        type: string;
    }) => void;
    addWatchedAddress: (state: import("immer/dist/internal").WritableDraft<FavoritesState>, { payload: { address } }: {
        payload: {
            address: Address;
        };
        type: string;
    }) => void;
    removeWatchedAddress: (state: import("immer/dist/internal").WritableDraft<FavoritesState>, { payload: { address } }: {
        payload: {
            address: Address;
        };
        type: string;
    }) => void;
    setFavoriteWallets: (state: import("immer/dist/internal").WritableDraft<FavoritesState>, { payload: { addresses } }: {
        payload: {
            addresses: Address[];
        };
        type: string;
    }) => void;
    toggleTokenVisibility: (state: import("immer/dist/internal").WritableDraft<FavoritesState>, { payload: { currencyId, isSpam } }: {
        payload: {
            currencyId: string;
            isSpam?: boolean | undefined;
        };
        type: string;
    }) => void;
    toggleNftVisibility: (state: import("immer/dist/internal").WritableDraft<FavoritesState>, { payload: { nftKey, isSpam } }: {
        payload: {
            nftKey: string;
            isSpam?: boolean | undefined;
        };
        type: string;
    }) => void;
}, "favorites">;
export declare const addFavoriteToken: import("@reduxjs/toolkit").ActionCreatorWithPayload<{
    currencyId: string;
}, "favorites/addFavoriteToken">, removeFavoriteToken: import("@reduxjs/toolkit").ActionCreatorWithPayload<{
    currencyId: string;
}, "favorites/removeFavoriteToken">, setFavoriteTokens: import("@reduxjs/toolkit").ActionCreatorWithPayload<{
    currencyIds: string[];
}, "favorites/setFavoriteTokens">, addWatchedAddress: import("@reduxjs/toolkit").ActionCreatorWithPayload<{
    address: Address;
}, "favorites/addWatchedAddress">, removeWatchedAddress: import("@reduxjs/toolkit").ActionCreatorWithPayload<{
    address: Address;
}, "favorites/removeWatchedAddress">, toggleNftVisibility: import("@reduxjs/toolkit").ActionCreatorWithPayload<{
    nftKey: string;
    isSpam?: boolean | undefined;
}, "favorites/toggleNftVisibility">, toggleTokenVisibility: import("@reduxjs/toolkit").ActionCreatorWithPayload<{
    currencyId: string;
    isSpam?: boolean | undefined;
}, "favorites/toggleTokenVisibility">, setFavoriteWallets: import("@reduxjs/toolkit").ActionCreatorWithPayload<{
    addresses: Address[];
}, "favorites/setFavoriteWallets">;
export declare const favoritesReducer: import("redux").Reducer<FavoritesState>;
//# sourceMappingURL=slice.d.ts.map