import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import Animated, { useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import { Flex, Loader } from 'ui/src';
export function ImageUri({ maxHeight, uri, fallback, imageStyle, resizeMode, loadingContainerStyle, loadedImageContainerStyle, imageDimensions, ...rest }) {
    const inputImageAspectRatio = imageDimensions ? (imageDimensions === null || imageDimensions === void 0 ? void 0 : imageDimensions.width) / (imageDimensions === null || imageDimensions === void 0 ? void 0 : imageDimensions.height) : 1;
    const [isError, setIsError] = useState(false);
    const isLoaded = useSharedValue(false);
    const [aspectRatio, setAspectRatio] = useState(inputImageAspectRatio);
    // Ensure that the image is displayed together with styles applied
    // to the container only after it has been loaded (e.g. to prevent
    // displaying the background color of the container before the image
    // is visible)
    const animatedImageContainerStyle = useAnimatedStyle(() => ({
        opacity: +isLoaded.value,
        ...(isLoaded.value ? loadedImageContainerStyle : {}),
    }));
    useEffect(() => {
        isLoaded.value = false;
        setIsError(false);
    }, [isLoaded, uri]);
    useEffect(() => {
        setAspectRatio(inputImageAspectRatio);
    }, [aspectRatio, inputImageAspectRatio]);
    if (isError) {
        return fallback !== null && fallback !== void 0 ? fallback : null;
    }
    if (!uri) {
        if (loadingContainerStyle) {
            return (_jsx(Flex, { style: loadingContainerStyle, children: _jsx(Loader.Image, {}) }));
        }
        return _jsx(Loader.Image, {});
    }
    return (_jsx(Animated.View, { style: [styles.fullWidth, animatedImageContainerStyle], children: _jsx(FastImage, { resizeMode: resizeMode !== null && resizeMode !== void 0 ? resizeMode : FastImage.resizeMode.contain, source: {
                uri,
                cache: FastImage.cacheControl.immutable,
            }, style: [styles.image, imageStyle !== null && imageStyle !== void 0 ? imageStyle : [styles.fullWidth, { maxHeight: maxHeight !== null && maxHeight !== void 0 ? maxHeight : '100%' }], { aspectRatio }], onError: () => setIsError(true), onLoad: ({ nativeEvent: { width, height } }) => {
                isLoaded.value = true;
                setAspectRatio(width / height);
            }, ...rest }) }));
}
const styles = StyleSheet.create({
    fullWidth: {
        height: undefined,
        width: '100%',
    },
    image: {
        alignSelf: 'center',
        // Fix for a tiny gap on the right side of the image container
        // resulting in the background color showing through when the image
        // has the same dimensions as the container
        transform: [{ scale: 1.01 }],
    },
});
//# sourceMappingURL=ImageUri.native.js.map