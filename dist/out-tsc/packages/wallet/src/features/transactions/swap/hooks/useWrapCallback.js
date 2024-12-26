import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { tokenWrapActions } from 'wallet/src/features/transactions/swap/wrapSaga';
export function useWrapCallback() {
    const appDispatch = useDispatch();
    return useCallback(({ onSuccess, ...params }) => {
        appDispatch(tokenWrapActions.trigger(params));
        onSuccess();
    }, [appDispatch]);
}
//# sourceMappingURL=useWrapCallback.js.map