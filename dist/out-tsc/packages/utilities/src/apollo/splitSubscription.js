import { split } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
export function splitSubscription(subscriptionLink, httpLink) {
    // Use the subscriptionLink for subscriptions, and the httpLink for everything else;
    // see https://www.apollographql.com/docs/react/api/link/introduction/#directional-composition.
    return split(({ query }) => {
        const definition = getMainDefinition(query);
        return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
    }, subscriptionLink, httpLink);
}
//# sourceMappingURL=splitSubscription.js.map