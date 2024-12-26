import { jsx as _jsx } from "react/jsx-runtime";
import { forwardRef, memo, useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState, } from 'react';
import { Flex, useIsShortMobileDevice } from 'ui/src';
import { DecimalPad } from 'uniswap/src/features/transactions/DecimalPadInput/DecimalPad';
import { KeyAction } from 'uniswap/src/features/transactions/DecimalPadInput/types';
import { maxDecimalsReached } from 'utilities/src/format/truncateToMaxDecimals';
const LONG_PRESS_DELETE_INTERVAL_MS = 20;
const LONG_PRESS_DELETE_INTERVAL_DELIMITER_MS = 750;
export var DecimalPadCalculatedSpaceId;
(function (DecimalPadCalculatedSpaceId) {
    DecimalPadCalculatedSpaceId[DecimalPadCalculatedSpaceId["Swap"] = 0] = "Swap";
    DecimalPadCalculatedSpaceId[DecimalPadCalculatedSpaceId["Send"] = 1] = "Send";
    DecimalPadCalculatedSpaceId[DecimalPadCalculatedSpaceId["FiatOnRamp"] = 2] = "FiatOnRamp";
})(DecimalPadCalculatedSpaceId || (DecimalPadCalculatedSpaceId = {}));
const precalculatedSpace = {};
/*
This component is used to calculate the space that the `DecimalPad` can use.
We position the `DecimalPad` with `position: absolute` at the bottom of the screen instead of
putting it inside this container in order to avoid any overflows while the `DecimalPad`
is automatically resizing to find the right size for the screen.
*/
export function DecimalPadCalculateSpace({ id, decimalPadRef, }) {
    const isShortMobileDevice = useIsShortMobileDevice();
    const onBottomScreenLayout = useCallback((event) => {
        var _a;
        const height = event.nativeEvent.layout.height;
        (_a = decimalPadRef.current) === null || _a === void 0 ? void 0 : _a.setMaxHeight(height);
        precalculatedSpace[id] = height;
    }, [decimalPadRef, id]);
    useEffect(() => {
        var _a;
        const precalculatedHeight = precalculatedSpace[id];
        if (precalculatedHeight) {
            // If we have already rendered this screen, we already know how much space this phone has,
            // so we optimistically set the height instead of waiting for the layout event.
            // This improves the perceived loading time of the `DecimalPad`,
            // given that it fades in only after the height is known.
            (_a = decimalPadRef.current) === null || _a === void 0 ? void 0 : _a.setMaxHeight(precalculatedHeight);
        }
    }, [decimalPadRef, id]);
    return _jsx(Flex, { fill: true, mt: isShortMobileDevice ? '$spacing2' : '$spacing8', onLayout: onBottomScreenLayout });
}
export const DecimalPadInput = memo(forwardRef(function DecimalPadInput({ disabled, hideDecimal, onReady, resetSelection, selectionRef, setValue, valueRef, maxDecimals, onTriggerInputShakeAnimation, }, ref) {
    const [disabledKeys, setDisabledKeys] = useState({});
    const [maxHeight, setMaxHeight] = useState(null);
    useEffect(() => {
        updateDisabledKeys(valueRef.current);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [valueRef, selectionRef, maxDecimals]);
    useImperativeHandle(ref, () => ({
        updateDisabledKeys() {
            updateDisabledKeys(valueRef.current);
        },
        setMaxHeight(height) {
            setMaxHeight(height);
        },
    }));
    const getCurrentSelection = useCallback(() => {
        const selection = selectionRef === null || selectionRef === void 0 ? void 0 : selectionRef.current;
        return { start: selection === null || selection === void 0 ? void 0 : selection.start, end: selection === null || selection === void 0 ? void 0 : selection.end };
    }, [selectionRef]);
    const disableKeysConditions = useMemo(() => ({
        '0': (v) => maxDecimalsReached({ value: v, maxDecimals }),
        '1': (v) => maxDecimalsReached({ value: v, maxDecimals }),
        '2': (v) => maxDecimalsReached({ value: v, maxDecimals }),
        '3': (v) => maxDecimalsReached({ value: v, maxDecimals }),
        '4': (v) => maxDecimalsReached({ value: v, maxDecimals }),
        '5': (v) => maxDecimalsReached({ value: v, maxDecimals }),
        '6': (v) => maxDecimalsReached({ value: v, maxDecimals }),
        '7': (v) => maxDecimalsReached({ value: v, maxDecimals }),
        '8': (v) => maxDecimalsReached({ value: v, maxDecimals }),
        '9': (v) => maxDecimalsReached({ value: v, maxDecimals }),
        '.': (v) => v.includes('.'),
        backspace: (v) => {
            const { start, end } = getCurrentSelection();
            const cursorAtStart = start === 0 && end === 0;
            return cursorAtStart || v.length === 0;
        },
    }), [getCurrentSelection, maxDecimals]);
    const updateDisabledKeys = useCallback((value) => {
        setDisabledKeys((prevDisabledKeys) => {
            let isUpdated = false;
            const newDisabledKeys = Object.fromEntries(Object.entries(disableKeysConditions).map(([key, condition]) => {
                const isDisabled = condition(value);
                if (isDisabled !== prevDisabledKeys[key]) {
                    isUpdated = true;
                }
                return [key, isDisabled];
            }));
            // Prevent unnecessary re-renders and return the same value
            // if no key was updated (react state won't be updated if value is the
            // same as the previous one in terms of referential equality)
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
            return isUpdated ? newDisabledKeys : prevDisabledKeys;
        });
    }, [disableKeysConditions]);
    const updateValue = useCallback((newValue) => {
        setValue(newValue);
        updateDisabledKeys(newValue);
    }, [setValue, updateDisabledKeys]);
    // TODO(MOB-140): in USD mode, prevent user from typing in more than 2 decimals
    const handleInsert = useCallback((label) => {
        const { start, end } = getCurrentSelection();
        if (start === undefined || end === undefined) {
            resetSelection({ start: valueRef.current.length + 1, end: valueRef.current.length + 1 });
            // has no text selection, cursor is at the end of the text input
            updateValue(valueRef.current + label);
        }
        else {
            resetSelection({ start: start + 1, end: start + 1 });
            updateValue(valueRef.current.slice(0, start) + label + valueRef.current.slice(end));
        }
    }, [updateValue, resetSelection, valueRef, getCurrentSelection]);
    const handleDelete = useCallback(() => {
        const { start, end } = getCurrentSelection();
        if (start === undefined || end === undefined) {
            resetSelection({ start: valueRef.current.length - 1, end: valueRef.current.length - 1 });
            // has no text selection, cursor is at the end of the text input
            updateValue(valueRef.current.slice(0, -1));
        }
        else if (start < end) {
            resetSelection({ start, end: start });
            // has text part selected
            updateValue(valueRef.current.slice(0, start) + valueRef.current.slice(end));
        }
        else if (start > 0) {
            resetSelection({ start: start - 1, end: start - 1 });
            // part of the text is not selected, but cursor moved
            updateValue(valueRef.current.slice(0, start - 1) + valueRef.current.slice(start));
        }
    }, [updateValue, resetSelection, valueRef, getCurrentSelection]);
    const onPress = useCallback((label, action) => {
        if (disabled) {
            return;
        }
        if (action === KeyAction.Insert) {
            handleInsert(label);
        }
        else {
            handleDelete();
        }
    }, [disabled, handleInsert, handleDelete]);
    const deletingTimeout = useRef(undefined);
    const stopDeleting = useCallback(() => clearTimeout(deletingTimeout.current), []);
    const onLongPressStart = useCallback((_, action) => {
        if (disabled || action !== KeyAction.Delete) {
            return;
        }
        // We delete one character at a time until we've deleted either half of the input text or more than 5 characters,
        // and then we start deleting by "word" (ie. up until the next decimal or thousand separator).
        const initialAmountLength = valueRef.current.length;
        const deleteWithTimeout = () => {
            var _a;
            const start = (_a = getCurrentSelection().start) !== null && _a !== void 0 ? _a : valueRef.current.length;
            const isCursorAtTheEnd = start === valueRef.current.length;
            const hasDeletedMoreThanHalfCharacters = valueRef.current.length <= initialAmountLength / 2;
            const hasDeletedMoreThanFiveCharacters = initialAmountLength - valueRef.current.length >= 5;
            // If we haven't deleted more than half of the input or more than 5 characters, we delete one character at a time.
            if (!isCursorAtTheEnd || !(hasDeletedMoreThanHalfCharacters || hasDeletedMoreThanFiveCharacters)) {
                handleDelete();
                deletingTimeout.current = setTimeout(deleteWithTimeout, LONG_PRESS_DELETE_INTERVAL_MS);
                return;
            }
            const nextDelimiterPosition = Math.max(valueRef.current.lastIndexOf('.'), valueRef.current.lastIndexOf(','), valueRef.current.lastIndexOf(' '));
            // If we found a thousand or decimal separator, we delete up until that delimiter.
            if (nextDelimiterPosition > 0) {
                resetSelection({ start: nextDelimiterPosition, end: nextDelimiterPosition });
                updateValue(valueRef.current.slice(0, nextDelimiterPosition));
                // When we delete by delimiter, we want to have a slightly longer delay so the user has enough time to stop long pressing.
                deletingTimeout.current = setTimeout(deleteWithTimeout, LONG_PRESS_DELETE_INTERVAL_DELIMITER_MS);
                return;
            }
            // If we've already deleted more than half of the input and there are no more delimiters to delete by, we delete everything.
            resetSelection({ start: 0, end: 0 });
            updateValue('');
            return;
        };
        deleteWithTimeout();
    }, [disabled, getCurrentSelection, handleDelete, resetSelection, updateValue, valueRef]);
    const onLongPressEnd = useCallback((_, action) => {
        if (disabled || action !== KeyAction.Delete) {
            return;
        }
        stopDeleting();
    }, [disabled, stopDeleting]);
    useEffect(() => {
        // Clear the interval when the component unmounts.
        // This shouldn't be necessary, but it's a good practice to avoid potential issues with `onLongPressEnd` not firing in some unknown edge case.
        return () => stopDeleting();
    }, [stopDeleting]);
    return (_jsx(DecimalPad, { disabled: disabled, disabledKeys: disabledKeys, hideDecimal: hideDecimal, maxHeight: maxHeight, onKeyLongPressStart: onLongPressStart, onKeyLongPressEnd: onLongPressEnd, onKeyPress: onPress, onReady: onReady, onTriggerInputShakeAnimation: onTriggerInputShakeAnimation }));
}));
//# sourceMappingURL=DecimalPadInput.js.map