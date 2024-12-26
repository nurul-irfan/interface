import { waitFor } from '@testing-library/react-native';
import { useSearchTokens } from 'uniswap/src/features/dataApi/searchTokens';
import { useTokenProjects } from 'uniswap/src/features/dataApi/tokenProjects';
import { gqlTokenToCurrencyInfo } from 'uniswap/src/features/dataApi/utils';
import { removeSafetyInfo, token } from 'uniswap/src/test/fixtures';
import { renderHook } from 'uniswap/src/test/test-utils';
import { createArray, queryResolvers } from 'uniswap/src/test/utils';
describe(useTokenProjects, () => {
    it('returns undefined when there is no data', async () => {
        const { resolvers } = queryResolvers({
            searchTokens: () => undefined,
        });
        const { result } = renderHook(() => useSearchTokens('', null, false), {
            resolvers,
        });
        await waitFor(() => {
            expect(result.current.loading).toEqual(false);
            expect(result.current.data).toBe(undefined);
        });
    });
    it('renders without error', async () => {
        const { resolvers, resolved } = queryResolvers({
            searchTokens: () => createArray(5, token),
        });
        const { result } = renderHook(() => useSearchTokens('hi', null, false), {
            resolvers,
        });
        await waitFor(async () => {
            var _a;
            const expectedData = (await resolved.searchTokens).map(gqlTokenToCurrencyInfo).map(removeSafetyInfo);
            const actualData = (_a = result.current.data) === null || _a === void 0 ? void 0 : _a.map(removeSafetyInfo);
            expect(actualData).toEqual(expectedData);
        });
    });
});
//# sourceMappingURL=searchTokens.test.js.map