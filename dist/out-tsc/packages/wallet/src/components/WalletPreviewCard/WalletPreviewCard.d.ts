/// <reference types="react" />
import { ElementNameType } from 'uniswap/src/features/telemetry/constants';
interface Props {
    address: string;
    selected: boolean;
    balance?: number | null;
    onSelect: (address: string) => void;
    name?: ElementNameType;
    testID?: string;
    hideSelectionCircle?: boolean;
}
export declare const WALLET_PREVIEW_CARD_HEIGHT = 72;
export default function WalletPreviewCard({ address, selected, balance, onSelect, hideSelectionCircle, ...rest }: Props): JSX.Element;
export {};
//# sourceMappingURL=WalletPreviewCard.d.ts.map