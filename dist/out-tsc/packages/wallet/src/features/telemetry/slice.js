import { createSlice } from '@reduxjs/toolkit';
import { SharedEventName } from '@uniswap/analytics-events';
import { sendAnalyticsEvent } from 'uniswap/src/features/telemetry/send';
// eslint-disable-next-line no-restricted-imports
import { analytics } from 'utilities/src/telemetry/analytics/analytics';
import { ONE_MINUTE_MS } from 'utilities/src/time/time';
const balanceReportFrequency = ONE_MINUTE_MS * 5;
export const initialTelemetryState = {
    allowAnalytics: true,
    lastHeartbeat: 0,
    lastBalancesReport: 0,
    lastBalancesReportValue: 0,
    walletIsFunded: false,
};
export const slice = createSlice({
    name: 'telemetry',
    initialState: initialTelemetryState,
    reducers: {
        recordHeartbeat: (state) => {
            sendAnalyticsEvent(SharedEventName.HEARTBEAT);
            state.lastHeartbeat = Date.now();
        },
        recordBalancesReport: (state, { payload: { totalBalance } }) => {
            state.lastBalancesReport = Date.now();
            state.lastBalancesReportValue = totalBalance;
        },
        recordWalletFunded: (state) => {
            state.walletIsFunded = true;
        },
        setAllowAnalytics: (state, { payload: { enabled } }) => {
            const logToggleEvent = () => {
                sendAnalyticsEvent(SharedEventName.ANALYTICS_SWITCH_TOGGLED, { enabled });
                analytics.flushEvents();
            };
            // If turning off, log toggle event before turning off analytics
            if (!enabled) {
                logToggleEvent();
            }
            analytics
                .setAllowAnalytics(enabled)
                .then(() => {
                // If turned on, log toggle event after turning on analytics
                if (enabled) {
                    logToggleEvent();
                }
            })
                .catch(() => undefined);
            // Set enabled in user state
            state.allowAnalytics = enabled;
        },
    },
});
export function shouldReportBalances(lastBalancesReport, lastBalancesReportValue, signerAccountAddresses, signerAccountValues) {
    const currentBalance = signerAccountValues.reduce((a, b) => a + b, 0);
    const didWalletGetFunded = currentBalance > 0 && lastBalancesReportValue === 0;
    const balanceReportDue = (lastBalancesReport !== null && lastBalancesReport !== void 0 ? lastBalancesReport : 0) + balanceReportFrequency < Date.now();
    const validAccountInfo = signerAccountAddresses.length === signerAccountValues.length;
    return validAccountInfo && (didWalletGetFunded || balanceReportDue);
}
export const { recordHeartbeat, recordBalancesReport, recordWalletFunded, setAllowAnalytics } = slice.actions;
export const { reducer: telemetryReducer } = slice;
//# sourceMappingURL=slice.js.map