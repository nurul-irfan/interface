import { useMemo } from 'react';
import { isUniverseChainId } from 'uniswap/src/features/chains/types';
import { ChainsConfigKey, DynamicConfigs } from 'uniswap/src/features/gating/configs';
import { useDynamicConfigValue } from 'uniswap/src/features/gating/hooks';
export function useNewChainIds() {
    const newChainIds = useDynamicConfigValue(DynamicConfigs.Chains, ChainsConfigKey.NewChainIds, []);
    return useMemo(() => newChainIds.filter(isUniverseChainId), [newChainIds]);
}
//# sourceMappingURL=useNewChainIds.js.map