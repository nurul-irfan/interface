import { jsx as _jsx } from "react/jsx-runtime";
import { NetworkFilter } from 'uniswap/src/components/network/NetworkFilter';
import { act, render } from 'uniswap/src/test/test-utils';
import ReactDOM from 'react-dom';
import { SUPPORTED_CHAIN_IDS } from 'uniswap/src/features/chains/types';
ReactDOM.createPortal = jest.fn((element) => {
    return element;
});
describe(NetworkFilter, () => {
    beforeEach(() => {
        jest.useFakeTimers();
    });
    afterEach(() => {
        jest.useRealTimers();
    });
    it('renders a NetworkFilter', async () => {
        const tree = render(_jsx(NetworkFilter, { chainIds: SUPPORTED_CHAIN_IDS, selectedChain: null, onPressChain: () => null }));
        await act(async () => {
            jest.runAllTimers();
        });
        expect(tree).toMatchSnapshot();
    });
});
//# sourceMappingURL=NetworkFilter.test.js.map