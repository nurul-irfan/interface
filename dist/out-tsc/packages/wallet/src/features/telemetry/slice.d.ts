import { PayloadAction } from '@reduxjs/toolkit';
export interface TelemetryState {
    allowAnalytics: boolean;
    lastHeartbeat: number;
    lastBalancesReport: number;
    lastBalancesReportValue?: number;
    walletIsFunded: boolean;
}
export declare const initialTelemetryState: TelemetryState;
export declare const slice: import("@reduxjs/toolkit").Slice<TelemetryState, {
    recordHeartbeat: (state: import("immer/dist/internal").WritableDraft<TelemetryState>) => void;
    recordBalancesReport: (state: import("immer/dist/internal").WritableDraft<TelemetryState>, { payload: { totalBalance } }: {
        payload: {
            totalBalance: number;
        };
        type: string;
    }) => void;
    recordWalletFunded: (state: import("immer/dist/internal").WritableDraft<TelemetryState>) => void;
    setAllowAnalytics: (state: import("immer/dist/internal").WritableDraft<TelemetryState>, { payload: { enabled } }: {
        payload: {
            enabled: boolean;
        };
        type: string;
    }) => void;
}, "telemetry">;
export declare function shouldReportBalances(lastBalancesReport: number | undefined, lastBalancesReportValue: number | undefined, signerAccountAddresses: string[], signerAccountValues: number[]): boolean;
export declare const recordHeartbeat: import("@reduxjs/toolkit").ActionCreatorWithoutPayload<"telemetry/recordHeartbeat">, recordBalancesReport: import("@reduxjs/toolkit").ActionCreatorWithPayload<{
    totalBalance: number;
}, "telemetry/recordBalancesReport">, recordWalletFunded: import("@reduxjs/toolkit").ActionCreatorWithoutPayload<"telemetry/recordWalletFunded">, setAllowAnalytics: import("@reduxjs/toolkit").ActionCreatorWithPayload<{
    enabled: boolean;
}, "telemetry/setAllowAnalytics">;
export declare const telemetryReducer: import("redux").Reducer<TelemetryState>;
//# sourceMappingURL=slice.d.ts.map