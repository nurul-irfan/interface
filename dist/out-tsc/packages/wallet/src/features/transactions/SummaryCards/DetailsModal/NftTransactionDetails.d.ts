/// <reference types="react" />
import { UniverseChainId } from 'uniswap/src/features/chains/types';
import { NFTApproveTransactionInfo, NFTMintTransactionInfo, NFTSummaryInfo, NFTTradeTransactionInfo, ReceiveTokenTransactionInfo, SendTokenTransactionInfo, TransactionDetails } from 'uniswap/src/features/transactions/types/transactionDetails';
export declare function NftTransactionDetails({ transactionDetails, typeInfo, onClose, }: {
    transactionDetails: TransactionDetails;
    typeInfo: ReceiveTokenTransactionInfo | SendTokenTransactionInfo | NFTTradeTransactionInfo | NFTMintTransactionInfo | NFTApproveTransactionInfo;
    onClose: () => void;
}): JSX.Element;
export declare function NftTransactionContent({ chainId, nftSummaryInfo, onClose, }: {
    chainId: UniverseChainId;
    nftSummaryInfo: NFTSummaryInfo;
    onClose: () => void;
}): JSX.Element;
//# sourceMappingURL=NftTransactionDetails.d.ts.map