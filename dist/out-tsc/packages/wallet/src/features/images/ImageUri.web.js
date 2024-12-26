import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { Image } from 'react-native';
import { Flex, Loader } from 'ui/src';
import { RemoteImage } from 'wallet/src/features/images/RemoteImage';
export function ImageUri({ uri, fallback, loadingContainerStyle, imageDimensions }) {
    var _a, _b;
    const [height, setHeight] = useState((_a = imageDimensions === null || imageDimensions === void 0 ? void 0 : imageDimensions.height) !== null && _a !== void 0 ? _a : null);
    const [width, setWidth] = useState((_b = imageDimensions === null || imageDimensions === void 0 ? void 0 : imageDimensions.width) !== null && _b !== void 0 ? _b : null);
    const [isError, setIsError] = useState(false);
    useEffect(() => {
        // If we know dimension, skip this effect
        if (!uri || Boolean(imageDimensions)) {
            return;
        }
        Image.getSize(uri, (calculatedWidth, calculatedHeight) => {
            setWidth(calculatedWidth);
            setHeight(calculatedHeight);
            setIsError(!calculatedHeight || !calculatedWidth);
        }, () => {
            setIsError(true);
        });
    }, [imageDimensions, uri]);
    if (isError) {
        return fallback !== null && fallback !== void 0 ? fallback : null;
    }
    if (!width || !height || !uri) {
        if (loadingContainerStyle) {
            return (_jsx(Flex, { style: loadingContainerStyle, children: _jsx(Loader.Image, {}) }));
        }
        return _jsx(Loader.Image, {});
    }
    // TODO: get sizing and other params accounted for
    return _jsx(RemoteImage, { aspectRatio: width / height, borderRadius: 0, height: height, uri: uri, width: width });
}
//# sourceMappingURL=ImageUri.web.js.map