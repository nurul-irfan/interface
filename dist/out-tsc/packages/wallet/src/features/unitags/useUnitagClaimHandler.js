import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { UnitagEventName } from 'uniswap/src/features/telemetry/constants';
import { sendAnalyticsEvent } from 'uniswap/src/features/telemetry/send';
import { selectHasCompletedUnitagsIntroModal } from 'wallet/src/features/behaviorHistory/selectors';
import { setHasSkippedUnitagPrompt } from 'wallet/src/features/behaviorHistory/slice';
export function useUnitagClaimHandler({ analyticsEntryPoint, navigateToClaim, navigateToIntro, }) {
    const dispatch = useDispatch();
    const hasCompletedUnitagsIntroModal = useSelector(selectHasCompletedUnitagsIntroModal);
    const handleClaim = useCallback(() => {
        sendAnalyticsEvent(UnitagEventName.UnitagBannerActionTaken, {
            action: 'claim',
            entryPoint: analyticsEntryPoint,
        });
        if (hasCompletedUnitagsIntroModal) {
            navigateToClaim();
        }
        else {
            navigateToIntro();
        }
    }, [analyticsEntryPoint, hasCompletedUnitagsIntroModal, navigateToClaim, navigateToIntro]);
    const handleDismiss = useCallback(() => {
        sendAnalyticsEvent(UnitagEventName.UnitagBannerActionTaken, {
            action: 'dismiss',
            entryPoint: analyticsEntryPoint,
        });
        dispatch(setHasSkippedUnitagPrompt(true));
    }, [analyticsEntryPoint, dispatch]);
    return {
        handleClaim,
        handleDismiss,
    };
}
//# sourceMappingURL=useUnitagClaimHandler.js.map