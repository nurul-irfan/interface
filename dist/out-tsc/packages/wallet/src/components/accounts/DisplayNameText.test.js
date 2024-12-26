import { jsx as _jsx } from "react/jsx-runtime";
import { AccountDetails } from 'wallet/src/components/accounts/AccountDetails';
import { DisplayNameText } from 'wallet/src/components/accounts/DisplayNameText';
import { DisplayNameType } from 'wallet/src/features/wallet/types';
import { ACCOUNT } from 'wallet/src/test/fixtures';
import { render } from 'wallet/src/test/test-utils';
const unitagDisplayName = { name: 'luni', type: DisplayNameType.Unitag };
const ensDisplayName = { name: 'vitalik.eth', type: DisplayNameType.ENS };
const localDisplayName = { name: 'Wallet 1', type: DisplayNameType.Local };
const addressDisplayName = { name: ACCOUNT.address, type: DisplayNameType.Address };
describe(AccountDetails, () => {
    it('renders unitag without error', () => {
        const tree = render(_jsx(DisplayNameText, { displayName: unitagDisplayName }));
        expect(tree.toJSON()).toMatchSnapshot();
    });
    it('renders ens display name without error', () => {
        const tree = render(_jsx(DisplayNameText, { displayName: ensDisplayName }));
        expect(tree.toJSON()).toMatchSnapshot();
    });
    it('renders local display name without error', () => {
        const tree = render(_jsx(DisplayNameText, { displayName: localDisplayName }));
        expect(tree.toJSON()).toMatchSnapshot();
    });
    it('renders address display name without error', () => {
        const tree = render(_jsx(DisplayNameText, { displayName: addressDisplayName }));
        expect(tree.toJSON()).toMatchSnapshot();
    });
});
//# sourceMappingURL=DisplayNameText.test.js.map