import { useMemo } from 'react';
import { getFiatOnRampAggregatorApi } from 'uniswap/src/features/fiatOnRamp/api';
export function useCexTransferProviders(params) {
    const { useFiatOnRampAggregatorTransferServiceProvidersQuery } = getFiatOnRampAggregatorApi();
    const { data } = useFiatOnRampAggregatorTransferServiceProvidersQuery(undefined, {
        skip: params === null || params === void 0 ? void 0 : params.isDisabled,
    });
    return useMemo(() => {
        if (!data) {
            return [];
        }
        return data.serviceProviders;
    }, [data]);
}
//# sourceMappingURL=useCexTransferProviders.js.map