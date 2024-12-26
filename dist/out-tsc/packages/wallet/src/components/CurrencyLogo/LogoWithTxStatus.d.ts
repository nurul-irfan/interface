/// <reference types="react" />
import { AssetType } from 'uniswap/src/entities/assets';
import { UniverseChainId } from 'uniswap/src/features/chains/types';
import { CurrencyInfo } from 'uniswap/src/features/dataApi/types';
import { NFTTradeType, TransactionStatus, TransactionType } from 'uniswap/src/features/transactions/types/transactionDetails';
import { WalletConnectEvent } from 'uniswap/src/types/walletConnect';
interface LogoWithTxStatusBaseProps {
    assetType: AssetType;
    txType: TransactionType;
    txStatus: TransactionStatus;
    size: number;
    chainId: UniverseChainId | null;
}
interface DappLogoWithTxStatusProps {
    event: WalletConnectEvent;
    size: number;
    chainId: UniverseChainId | null;
    dappImageUrl: Maybe<string>;
    dappName: string;
}
interface CurrencyStatusProps extends LogoWithTxStatusBaseProps {
    assetType: AssetType.Currency;
    currencyInfo?: CurrencyInfo | null;
}
interface NFTStatusProps extends LogoWithTxStatusBaseProps {
    assetType: AssetType.ERC721 | AssetType.ERC1155;
    nftImageUrl?: string;
    nftTradeType?: NFTTradeType;
}
export type LogoWithTxStatusProps = (CurrencyStatusProps | NFTStatusProps) & {
    serviceProviderLogoUrl?: string;
    institutionLogoUrl?: string;
};
export declare function LogoWithTxStatus(props: LogoWithTxStatusProps): JSX.Element;
export declare function DappLogoWithTxStatus({ dappName, dappImageUrl, event, size, chainId, }: DappLogoWithTxStatusProps): JSX.Element | null;
/** For displaying Dapp logo with generic WC bade icon */
export declare function DappLogoWithWCBadge({ dappImageUrl, dappName, size, chainId, hideWCBadge, circular, }: {
    dappImageUrl: Maybe<string>;
    dappName: string;
    size: number;
    chainId: UniverseChainId | null;
    hideWCBadge?: boolean;
    circular?: boolean;
}): JSX.Element;
export {};
//# sourceMappingURL=LogoWithTxStatus.d.ts.map