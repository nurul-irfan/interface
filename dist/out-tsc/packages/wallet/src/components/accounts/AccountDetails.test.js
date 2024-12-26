import { jsx as _jsx } from "react/jsx-runtime";
import { AccountDetails } from 'wallet/src/components/accounts/AccountDetails';
import { ACCOUNT } from 'wallet/src/test/fixtures';
import { renderWithProviders } from 'wallet/src/test/render';
describe(AccountDetails, () => {
    it('renders without error', () => {
        const tree = renderWithProviders(_jsx(AccountDetails, { address: ACCOUNT.address, iconSize: 50 }));
        expect(tree.toJSON()).toMatchSnapshot();
    });
    it('renders without error with chevron', () => {
        const tree = renderWithProviders(_jsx(AccountDetails, { chevron: true, address: ACCOUNT.address, iconSize: 50 }));
        expect(tree.toJSON()).toMatchSnapshot();
    });
});
//# sourceMappingURL=AccountDetails.test.js.map