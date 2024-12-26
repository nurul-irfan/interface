import { jsx as _jsx } from "react/jsx-runtime";
import { SAMPLE_SEED_ADDRESS_1 } from 'uniswap/src/test/fixtures';
import WalletPreviewCard from 'wallet/src/components/WalletPreviewCard/WalletPreviewCard';
import { render } from 'wallet/src/test/test-utils';
it('renders wallet preview card', () => {
    const tree = render(_jsx(WalletPreviewCard, { selected: true, address: SAMPLE_SEED_ADDRESS_1, onSelect: () => null }));
    expect(tree).toMatchSnapshot();
});
//# sourceMappingURL=WalletPreviewCard.test.js.map