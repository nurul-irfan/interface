import { createStore } from '@reduxjs/toolkit';
import { addFavoriteToken, favoritesReducer, removeFavoriteToken, } from 'uniswap/src/features/favorites/slice';
describe(favoritesReducer, () => {
    let store;
    beforeAll(() => {
        jest.spyOn(console, 'warn').mockImplementation(() => undefined);
    });
    beforeEach(() => {
        store = createStore(favoritesReducer, {
            tokens: [],
            watchedAddresses: [],
            tokensVisibility: {},
            nftsVisibility: {},
        });
    });
    it('adds favorites', () => {
        expect(store.getState().tokens.length).toEqual(0);
        store.dispatch(addFavoriteToken({ currencyId: '0xdeadbeef' }));
        expect(store.getState().tokens).toEqual(['0xdeadbeef']);
        // handles dupes
        store.dispatch(addFavoriteToken({ currencyId: '0xdeadbeef' }));
        expect(store.getState().tokens).toEqual(['0xdeadbeef']);
    });
    it('removes favorites', () => {
        store.dispatch(addFavoriteToken({ currencyId: '0xdeadbeef' }));
        store.dispatch(addFavoriteToken({ currencyId: '0xdefaced' }));
        expect(store.getState().tokens).toEqual(['0xdeadbeef', '0xdefaced']);
        store.dispatch(removeFavoriteToken({ currencyId: '0xdefaced' }));
        expect(store.getState().tokens).toEqual(['0xdeadbeef']);
        // handles missing tokens
        store.dispatch(removeFavoriteToken({ currencyId: '0xdefaced' }));
        store.dispatch(removeFavoriteToken({ currencyId: '0xdeadbeef' }));
        expect(store.getState().tokens).toEqual([]);
    });
});
//# sourceMappingURL=slice.test.js.map