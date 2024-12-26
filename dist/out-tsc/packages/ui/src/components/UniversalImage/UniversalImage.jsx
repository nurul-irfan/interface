/* eslint-disable complexity */
import { useEffect, useState } from 'react';
import { Image } from 'tamagui';
import { FastImageWrapper } from 'ui/src/components/UniversalImage/internal/FastImageWrapper';
import { PlainImage } from 'ui/src/components/UniversalImage/internal/PlainImage';
import { SvgImage } from 'ui/src/components/UniversalImage/internal/SvgImage';
import { Flex } from 'ui/src/components/layout/Flex';
import { Loader } from 'ui/src/loading/Loader';
import { isSVGUri, uriToHttpUrls } from 'utilities/src/format/urls';
import { logger } from 'utilities/src/logger/logger';
const LOADING_FALLBACK = <Loader.Image />;
export function UniversalImage({ uri, size, style, fallback, fastImage = false, testID, onLoad, allowLocalUri = false, }) {
    var _a, _b, _c;
    // Allow calculation of fields as needed
    const [width, setWidth] = useState(size.width);
    const [height, setHeight] = useState(size.height);
    const computedSize = { width, height, aspectRatio: size.aspectRatio };
    const [errored, setErrored] = useState(false);
    const hasWidthAndHeight = computedSize.width !== undefined && computedSize.height !== undefined;
    const hasHeightAndRatio = computedSize.height !== undefined && computedSize.aspectRatio !== undefined;
    const sizeKnown = hasWidthAndHeight || hasHeightAndRatio;
    const isRequireSource = typeof uri === 'number';
    // Propagate prop updates to state
    useEffect(() => {
        setWidth(size.width);
        setHeight(size.height);
    }, [size.height, size.width]);
    // Calculate width/height and check for an error in the image retrieval for fast images
    useEffect(() => {
        // If we know dimension or this isn't a fast image, skip calculating width/height
        if (!uri || sizeKnown || !fastImage || isRequireSource) {
            return;
        }
        // Calculate size if not enough info is given
        Image.getSize(uri, (calculatedWidth, calculatedHeight) => {
            setWidth(calculatedWidth);
            setHeight(calculatedHeight);
        }, () => setErrored(true));
    }, [width, height, sizeKnown, uri, fastImage, isRequireSource]);
    // Handle local URI
    if (isRequireSource) {
        return <Image height={size.height} source={uri} width={size.width}/>;
    }
    // Use the fallback if no URI at all
    if (!uri && fallback) {
        return fallback;
    }
    // Show a loader while the URI is populating or size is calculating when there's no fallback
    if (!uri || (!sizeKnown && !errored)) {
        if (style === null || style === void 0 ? void 0 : style.loadingContainer) {
            return <Flex style={style === null || style === void 0 ? void 0 : style.loadingContainer}>{LOADING_FALLBACK}</Flex>;
        }
        return LOADING_FALLBACK;
    }
    // Get the sanitized url
    const imageHttpUrl = uriToHttpUrls(uri, { allowLocalUri })[0];
    // Log an error and show a fallback (or null) when the URI is bad or an error loading occurs
    if (!imageHttpUrl || errored) {
        const errMsg = errored
            ? 'could not compute sizing information for uri'
            : 'Could not retrieve and format remote image for uri';
        logger.warn('UniversalImage', 'UniversalImage', errMsg, { data: uri });
        // Return fallback or null
        return fallback !== null && fallback !== void 0 ? fallback : null;
    }
    // Handle images requested to use fast image
    if (fastImage && sizeKnown) {
        return (<FastImageWrapper setError={() => setErrored(true)} size={computedSize} testID={testID ? `svg-${testID}` : undefined} uri={uri}/>);
    }
    // Handle any svg separate from plain images
    if (isSVGUri(imageHttpUrl)) {
        return (<Flex alignItems="center" backgroundColor={(_a = style === null || style === void 0 ? void 0 : style.image) === null || _a === void 0 ? void 0 : _a.backgroundColor} borderRadius={(_b = style === null || style === void 0 ? void 0 : style.image) === null || _b === void 0 ? void 0 : _b.borderRadius} verticalAlign={(_c = style === null || style === void 0 ? void 0 : style.image) === null || _c === void 0 ? void 0 : _c.verticalAlign} height={size.height} overflow="hidden" testID={testID ? `svg-${testID}` : undefined} width={size.width}>
        <SvgImage autoplay={true} fallback={fallback} size={size} uri={imageHttpUrl}/>
      </Flex>);
    }
    // Handle a plain image
    return (<PlainImage fallback={fallback} resizeMode={size.resizeMode} size={computedSize} style={style === null || style === void 0 ? void 0 : style.image} testID={testID ? `img-${testID}` : undefined} uri={imageHttpUrl} onLoad={onLoad}/>);
}
//# sourceMappingURL=UniversalImage.jsx.map