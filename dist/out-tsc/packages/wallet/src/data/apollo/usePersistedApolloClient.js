import { ApolloClient, from } from '@apollo/client';
import { useCallback, useState } from 'react';
import { getCustomGraphqlHttpLink, getErrorLink, getGraphqlHttpLink, getPerformanceLink, getRestLink, } from 'uniswap/src/data/links';
import { WalletEventName } from 'uniswap/src/features/telemetry/constants';
import { sendAnalyticsEvent } from 'uniswap/src/features/telemetry/send';
import { getDatadogApolloLink } from 'utilities/src/logger/datadogLink';
import { logger } from 'utilities/src/logger/logger';
import { isMobileApp } from 'utilities/src/platform';
import { useAsyncData } from 'utilities/src/react/hooks';
import { initAndPersistCache } from 'wallet/src/data/apollo/cache';
import { getOnRampAuthLink } from 'wallet/src/data/onRampAuthLink';
import { useWalletSigners } from 'wallet/src/features/wallet/context';
import { useAccounts } from 'wallet/src/features/wallet/hooks';
// This object allows us to get access to the apollo client in places outside of React where we can't use hooks.
export const apolloClientRef = (() => {
    let apolloClient = null;
    const listeners = [];
    const ref = {
        get current() {
            return apolloClient;
        },
        set current(newApolloClient) {
            if (!newApolloClient) {
                throw new Error("Can't set `apolloClient` to `null`");
            }
            apolloClient = newApolloClient;
            listeners.forEach((resolve) => resolve(newApolloClient));
        },
        onReady: async () => {
            if (apolloClient) {
                return Promise.resolve(apolloClient);
            }
            return new Promise((resolve) => listeners.push(resolve));
        },
    };
    return ref;
})();
// ONLY for use once in App.tsx! If you add this in other places you will go to JAIL!
export const usePersistedApolloClient = ({ storageWrapper, maxCacheSizeInBytes, customEndpoint, }) => {
    const [client, setClient] = useState();
    const signerManager = useWalletSigners();
    const accounts = useAccounts();
    const apolloLink = customEndpoint ? getCustomGraphqlHttpLink(customEndpoint) : getGraphqlHttpLink();
    const init = useCallback(async () => {
        const cache = await initAndPersistCache({ storage: storageWrapper, maxCacheSizeInBytes });
        if (customEndpoint) {
            logger.debug('usePersistedApolloClient', 'usePersistedApolloClient', `Using custom endpoint ${customEndpoint.url}`);
        }
        const restLink = getRestLink();
        const linkList = [
            getErrorLink(),
            // requires typing outside of wallet package
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            getPerformanceLink((args) => sendAnalyticsEvent(WalletEventName.PerformanceGraphql, args)),
            getOnRampAuthLink(accounts, signerManager),
            restLink,
        ];
        if (isMobileApp) {
            linkList.push(getDatadogApolloLink());
        }
        const newClient = new ApolloClient({
            assumeImmutableResults: true,
            // our main ApolloLink must be last in the chain so that other links can modify the request
            link: from(linkList.concat(apolloLink)),
            cache,
            defaultOptions: {
                watchQuery: {
                    // NOTE: when polling is enabled, if there is cached data, the first request is skipped.
                    // `cache-and-network` ensures we send a request on first query, keeping queries
                    // across the app in sync.
                    fetchPolicy: 'cache-and-network',
                    // ensures query is returning data even if some fields errored out
                    errorPolicy: 'all',
                },
            },
        });
        apolloClientRef.current = newClient;
        setClient(newClient);
        // Ensure this callback only is computed once even if apolloLink changes,
        // otherwise this will cause a rendering loop re-initializing the client
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    useAsyncData(init);
    return client;
};
//# sourceMappingURL=usePersistedApolloClient.js.map