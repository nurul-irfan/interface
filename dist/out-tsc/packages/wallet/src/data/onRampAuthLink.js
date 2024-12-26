import { setContext } from '@apollo/client/link/context';
import { GQLQueries } from 'uniswap/src/data/graphql/uniswap-data-api/queries';
import { ON_RAMP_AUTH_MAX_LIMIT, createOnRampTransactionsAuth } from 'wallet/src/data/utils';
export function getOnRampAuthLink(accounts, signerManager) {
    return setContext((operation, prevContext) => {
        var _a;
        const account = accounts[(_a = operation.variables) === null || _a === void 0 ? void 0 : _a.address];
        if (!account || operation.operationName !== GQLQueries.TransactionList) {
            return prevContext;
        }
        return createOnRampTransactionsAuth(ON_RAMP_AUTH_MAX_LIMIT, account, signerManager).then((onRampAuth) => {
            return {
                ...prevContext,
                onRampAuth,
            };
        });
    }).concat((operation, forward) => {
        if (operation.getContext().onRampAuth) {
            operation.variables = {
                ...operation.variables,
                onRampAuth: operation.getContext().onRampAuth,
            };
        }
        return forward(operation);
    });
}
//# sourceMappingURL=onRampAuthLink.js.map