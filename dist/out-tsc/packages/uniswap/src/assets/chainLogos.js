import { BlockExplorer } from 'ui/src/components/icons/BlockExplorer';
import { ArbiscanLogoDark } from 'ui/src/components/logos/ArbiscanLogoDark';
import { ArbiscanLogoLight } from 'ui/src/components/logos/ArbiscanLogoLight';
import { EtherscanLogoDark } from 'ui/src/components/logos/EtherscanLogoDark';
import { EtherscanLogoLight } from 'ui/src/components/logos/EtherscanLogoLight';
import { OpEtherscanLogoDark } from 'ui/src/components/logos/OpEtherscanLogoDark';
import { OpEtherscanLogoLight } from 'ui/src/components/logos/OpEtherscanLogoLight';
import { PolygonscanLogoDark } from 'ui/src/components/logos/PolygonscanLogoDark';
import { PolygonscanLogoLight } from 'ui/src/components/logos/PolygonscanLogoLight';
import { UniverseChainId } from 'uniswap/src/features/chains/types';
// Keeping this separate from UNIVERSE_CHAIN_INFO to avoid import issues on extension content script
export const UNIVERSE_CHAIN_LOGO = {
    [UniverseChainId.Mainnet]: {
        explorer: {
            logoLight: EtherscanLogoLight,
            logoDark: EtherscanLogoDark,
        },
    },
    [UniverseChainId.ArbitrumOne]: {
        explorer: {
            logoLight: ArbiscanLogoLight,
            logoDark: ArbiscanLogoDark,
        },
    },
    [UniverseChainId.Avalanche]: {
        explorer: {
            logoLight: BlockExplorer,
            logoDark: BlockExplorer,
        },
    },
    [UniverseChainId.Base]: {
        explorer: {
            logoLight: EtherscanLogoLight,
            logoDark: EtherscanLogoDark,
        },
    },
    [UniverseChainId.Blast]: {
        explorer: {
            logoLight: BlockExplorer,
            logoDark: BlockExplorer,
        },
    },
    [UniverseChainId.Bnb]: {
        explorer: {
            logoLight: EtherscanLogoLight,
            logoDark: EtherscanLogoDark,
        },
    },
    [UniverseChainId.Celo]: {
        explorer: {
            logoLight: BlockExplorer,
            logoDark: BlockExplorer,
        },
    },
    [UniverseChainId.MonadTestnet]: {
        explorer: {
            logoLight: BlockExplorer,
            logoDark: BlockExplorer,
        },
    },
    [UniverseChainId.Optimism]: {
        explorer: {
            logoLight: OpEtherscanLogoLight,
            logoDark: OpEtherscanLogoDark,
        },
    },
    [UniverseChainId.Polygon]: {
        explorer: {
            logoLight: PolygonscanLogoLight,
            logoDark: PolygonscanLogoDark,
        },
    },
    [UniverseChainId.Sepolia]: {
        explorer: {
            logoLight: EtherscanLogoLight,
            logoDark: EtherscanLogoDark,
        },
    },
    [UniverseChainId.UnichainSepolia]: {
        explorer: {
            logoLight: BlockExplorer,
            logoDark: BlockExplorer,
        },
    },
    [UniverseChainId.WorldChain]: {
        explorer: {
            logoLight: BlockExplorer,
            logoDark: BlockExplorer,
        },
    },
    [UniverseChainId.Zksync]: {
        explorer: {
            logoLight: BlockExplorer,
            logoDark: BlockExplorer,
        },
    },
    [UniverseChainId.Zora]: {
        explorer: {
            logoLight: BlockExplorer,
            logoDark: BlockExplorer,
        },
    },
};
//# sourceMappingURL=chainLogos.js.map