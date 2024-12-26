import { JsonRpcProvider } from '@ethersproject/providers';
import { ExplorerAbiFetcher, Parser, ProxyAbiFetcher } from 'no-yolo-signatures';
import { useEffect, useMemo, useState } from 'react';
import { getChainInfo } from 'uniswap/src/features/chains/chainInfo';
import { RPCType } from 'uniswap/src/features/chains/types';
import { logger } from 'utilities/src/logger/logger';
export function useNoYoloParser(transaction, chainId) {
    const [isLoading, setIsLoading] = useState(true);
    const [parsedTransactionData, setParsedTransactionData] = useState(undefined);
    const { from, to, value, data } = transaction;
    const parser = useMemo(() => {
        var _a, _b, _c;
        if (!chainId) {
            return new Parser({ abiFetchers: [] });
        }
        const rpcUrls = getChainInfo(chainId).rpcUrls;
        const apiURL = getChainInfo(chainId).explorer.apiURL || '';
        const explorerAbiFetcher = new ExplorerAbiFetcher(apiURL);
        const rpcUrl = ((_a = rpcUrls === null || rpcUrls === void 0 ? void 0 : rpcUrls.default) === null || _a === void 0 ? void 0 : _a.http[0]) || ((_b = rpcUrls === null || rpcUrls === void 0 ? void 0 : rpcUrls[RPCType.Public]) === null || _b === void 0 ? void 0 : _b.http[0]) || ((_c = rpcUrls === null || rpcUrls === void 0 ? void 0 : rpcUrls[RPCType.PublicAlt]) === null || _c === void 0 ? void 0 : _c.http[0]);
        const provider = new JsonRpcProvider(rpcUrl);
        const proxyAbiFetcher = new ProxyAbiFetcher(provider, [explorerAbiFetcher]);
        return new Parser({ abiFetchers: [proxyAbiFetcher, explorerAbiFetcher] });
    }, [chainId]);
    useEffect(() => {
        const parseResult = async () => {
            // no-yolo-parser library expects these fields to be defined
            if (!from || !to || !data) {
                return undefined;
            }
            return parser.parseAsResult(transaction).then((result) => {
                if (!result.transactionDescription.ok) {
                    throw result.transactionDescription.error;
                }
                return result.transactionDescription.result;
            });
        };
        parseResult()
            .then(setParsedTransactionData)
            .catch((error) => {
            setParsedTransactionData(undefined);
            logger.warn('RequestMessage', 'DecodedDataDetails', 'Could not parse data', error);
        })
            .finally(() => {
            setIsLoading(false);
        });
    }, [data, from, parser, to, transaction, value]);
    return { parsedTransactionData, isLoading };
}
//# sourceMappingURL=useNoYoloParser.js.map