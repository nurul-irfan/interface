import { useTokenProjects } from 'uniswap/src/features/dataApi/tokenProjects';
import { buildCurrencyId } from 'uniswap/src/utils/currencyId';
import { isAddress } from 'utilities/src/addresses';
export function useTransactionCurrencies(args) {
    var _a;
    const { chainId, to, parsedTransactionData } = args;
    const addresses = parseAddressesFromArgData(parsedTransactionData === null || parsedTransactionData === void 0 ? void 0 : parsedTransactionData.args);
    const addressesFound = [...(to ? [to] : []), ...addresses];
    const currencyIdsInvolved = chainId ? addressesFound.map((address) => buildCurrencyId(chainId, address)) : [];
    const currenciesInvolved = useTokenProjects(currencyIdsInvolved);
    const chainCurrencies = (_a = currenciesInvolved === null || currenciesInvolved === void 0 ? void 0 : currenciesInvolved.data) === null || _a === void 0 ? void 0 : _a.filter((c) => c.currency.chainId === chainId && !c.currency.isNative);
    return chainCurrencies || [];
}
// recursively parse smart contract arguments and finds all addresses involved in a transaction
function parseAddressesFromArgData(args) {
    const addresses = [];
    args === null || args === void 0 ? void 0 : args.forEach((arg) => {
        if (Array.isArray(arg)) {
            parseAddressesFromArgData(arg);
        }
        if (typeof arg === 'string' && isAddress(arg)) {
            if (!addresses.includes(arg)) {
                addresses.push(arg);
            }
        }
    });
    return addresses;
}
//# sourceMappingURL=useTransactionCurrencies.js.map