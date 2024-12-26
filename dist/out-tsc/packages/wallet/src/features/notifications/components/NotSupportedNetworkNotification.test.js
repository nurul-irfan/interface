import { jsx as _jsx } from "react/jsx-runtime";
import { AppNotificationType } from 'uniswap/src/features/notifications/types';
import { NotSupportedNetworkNotification } from 'wallet/src/features/notifications/components/NotSupportedNetworkNotification';
import { renderWithProviders } from 'wallet/src/test/render';
describe(NotSupportedNetworkNotification, () => {
    it('renders without error', () => {
        const tree = renderWithProviders(_jsx(NotSupportedNetworkNotification, { notification: { type: AppNotificationType.NotSupportedNetwork } }));
        expect(tree).toMatchSnapshot();
    });
});
//# sourceMappingURL=NotSupportedNetworkNotification.test.js.map