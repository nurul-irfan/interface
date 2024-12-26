import { useEffect, useMemo, useRef, useState } from 'react';
// modified from https://usehooks.com/usePrevious/
export function usePrevious(value) {
    // The ref object is a generic container whose current property is mutable ...
    // ... and can hold any value, similar to an instance property on a class
    const ref = useRef();
    // Store current value in ref
    useEffect(() => {
        ref.current = value;
    }, [value]); // Only re-run if value changes
    // Return previous value (happens before update in useEffect above)
    return ref.current;
}
// adapted from https://usehooks.com/useAsync/ but simplified
// above link contains example on how to add delayed execution if ever needed
export function useAsyncData(asyncCallback, onCancel) {
    const [state, setState] = useState({
        data: undefined,
        isLoading: true,
        error: undefined,
    });
    const onCancelRef = useRef(onCancel);
    const lastCompletedAsyncCallbackRef = useRef(asyncCallback);
    useEffect(() => {
        let isPending = false;
        async function runCallback() {
            isPending = true;
            setState((prevState) => {
                if (!prevState.error) {
                    // Return the same state to avoid an unneeded re-render.
                    return prevState;
                }
                return { ...prevState, error: undefined };
            });
            const data = await asyncCallback();
            if (isPending) {
                lastCompletedAsyncCallbackRef.current = asyncCallback;
                setState((prevState) => ({ ...prevState, data, isLoading: false }));
            }
        }
        runCallback()
            .catch((error) => {
            setState((prevState) => ({ ...prevState, error }));
            if (isPending) {
                lastCompletedAsyncCallbackRef.current = asyncCallback;
                setState((prevState) => ({ ...prevState, isLoading: false }));
            }
        })
            .finally(() => {
            isPending = false;
        });
        const handleCancel = onCancelRef.current;
        return () => {
            if (!isPending) {
                return;
            }
            isPending = false;
            if (handleCancel) {
                handleCancel();
            }
        };
    }, [asyncCallback]);
    return useMemo(() => {
        if (asyncCallback !== lastCompletedAsyncCallbackRef.current) {
            return { isLoading: true, data: undefined };
        }
        return state;
    }, [asyncCallback, state]);
}
// modified from https://usehooks.com/useMemoCompare/
export function useMemoCompare(next, compare) {
    // Ref for storing previous value
    const previousRef = useRef();
    const previous = previousRef.current;
    const nextValue = next();
    // Pass previous and next value to compare function
    // to determine whether to consider them equal.
    const isEqual = compare(previous, nextValue);
    // If not equal update previousRef to next value.
    // We only update if not equal so that this hook continues to return
    // the same old value if compare keeps returning true.
    if (!isEqual || !previous) {
        previousRef.current = nextValue;
    }
    // Finally, if equal then return the previous value if it's set
    return isEqual && previous ? previous : nextValue;
}
export function useOnClickOutside(node, handler, ignoredNodes = []) {
    const handlerRef = useRef(handler);
    useEffect(() => {
        handlerRef.current = handler;
    }, [handler]);
    useEffect(() => {
        const handleClickOutside = (e) => {
            var _a, _b;
            const nodeClicked = (_a = node.current) === null || _a === void 0 ? void 0 : _a.contains(e.target);
            const ignoredNodeClicked = ignoredNodes.reduce((reducer, val) => { var _a; return reducer || !!((_a = val.current) === null || _a === void 0 ? void 0 : _a.contains(e.target)); }, false);
            if ((_b = (nodeClicked || ignoredNodeClicked)) !== null && _b !== void 0 ? _b : false) {
                return;
            }
            if (handlerRef.current) {
                handlerRef.current();
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [node, ignoredNodes]);
}
//# sourceMappingURL=hooks.js.map