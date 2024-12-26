import { ApolloClient, ApolloLink } from '@apollo/client';
export type SubscriptionLink = ApolloLink & {
    __brand: 'SubscriptionLink';
};
interface SubscriptionLinkConfig {
    uri: string;
    region?: string;
    token: string;
}
/** Creates an ApolloLink for realtime subscription queries. */
export declare function createSubscriptionLink<T>({ uri, region, // left blank for a custom domain name (eg realtime.gateway.uniswap.org)
token, }: SubscriptionLinkConfig, client: ApolloClient<T>): SubscriptionLink;
export {};
//# sourceMappingURL=SubscriptionLink.d.ts.map