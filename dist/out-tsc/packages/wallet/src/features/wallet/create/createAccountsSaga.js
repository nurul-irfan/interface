import { put } from 'typed-redux-saga';
import { logger } from 'utilities/src/logger/logger';
import { addAccounts, setAccountAsActive } from 'wallet/src/features/wallet/slice';
import { createMonitoredSaga } from 'wallet/src/utils/saga';
export function* createAccounts({ accounts }) {
    var _a;
    yield* put(addAccounts(accounts));
    const address = (_a = accounts[0]) === null || _a === void 0 ? void 0 : _a.address;
    if (address) {
        yield* put(setAccountAsActive(address));
    }
    logger.debug('createAccountsSaga', 'createAccount', 'New accounts created:', accounts.map((acc) => acc.address).join(','));
}
export const { name: createAccountsSagaName, wrappedSaga: createAccountsSaga, reducer: createAccountsReducer, actions: createAccountsActions, } = createMonitoredSaga(createAccounts, 'createAccounts');
//# sourceMappingURL=createAccountsSaga.js.map