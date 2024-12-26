/// <reference types="react" />
import { SwapSettingConfig } from 'uniswap/src/features/transactions/swap/settings/configs/types';
export type TransactionSettingsModalProps = {
    settings: SwapSettingConfig[];
    defaultTitle?: string;
    initialSelectedSetting?: SwapSettingConfig;
    onClose?: () => void;
    isOpen: boolean;
};
export declare function TransactionSettingsModal(props: TransactionSettingsModalProps): JSX.Element;
//# sourceMappingURL=TransactionSettingsModal.d.ts.map