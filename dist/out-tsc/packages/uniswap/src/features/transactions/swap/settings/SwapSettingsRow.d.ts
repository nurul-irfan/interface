/// <reference types="react" />
import { SwapSettingConfig } from 'uniswap/src/features/transactions/swap/settings/configs/types';
interface SwapSettingRowProps {
    setting: SwapSettingConfig;
    setSelectedSetting: (setting: SwapSettingConfig) => void;
    customSlippageTolerance?: number;
}
export declare function SwapSettingRow({ setting, setSelectedSetting, customSlippageTolerance, }: SwapSettingRowProps): JSX.Element | null;
export {};
//# sourceMappingURL=SwapSettingsRow.d.ts.map