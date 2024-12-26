import { jsx as _jsx } from "react/jsx-runtime";
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native';
import { Flex, Text } from 'ui/src';
import { isAddress, shortenAddress } from 'utilities/src/addresses';
import { isGifUri, isSVGUri, uriToHttpUrls } from 'utilities/src/format/urls';
import { ImageUri } from 'wallet/src/features/images/ImageUri';
import { WebSvgUri } from 'wallet/src/features/images/WebSvgUri';
export function NFTViewer(props) {
    const { uri, thumbnailUrl, autoplay = false, squareGridView = false, maxHeight, limitGIFSize, placeholderContent, imageDimensions, svgRenderingDisabled, } = props;
    const { t } = useTranslation();
    // if svgRenderingDisabled is true, use thumbnailUrl which is a PNG, otherwise use uri
    const imageHttpUri = svgRenderingDisabled && thumbnailUrl ? thumbnailUrl : uri ? uriToHttpUrls(uri)[0] : undefined;
    const fallback = useMemo(() => {
        const isPlaceholderAddress = isAddress(placeholderContent);
        return (_jsx(Flex, { centered: true, fill: true, aspectRatio: 1, backgroundColor: "$surface2", maxHeight: maxHeight !== null && maxHeight !== void 0 ? maxHeight : '100%', p: "$spacing8", children: _jsx(Text, { color: "$neutral2", textAlign: "center", variant: "subheading2", children: isPlaceholderAddress
                    ? shortenAddress(isPlaceholderAddress)
                    : placeholderContent || t('tokens.nfts.error.unavailable') }) }));
    }, [placeholderContent, maxHeight, t]);
    if (!imageHttpUri) {
        // Sometimes Opensea does not return any asset, show placeholder
        return fallback;
    }
    const isGif = isGifUri(imageHttpUri);
    const formattedUri = isGif && limitGIFSize ? convertGIFUriToSmallImageFormat(imageHttpUri, limitGIFSize) : imageHttpUri;
    const imageProps = {
        fallback,
        imageDimensions,
        maxHeight,
        shouldRasterizeIOS: isGif && Boolean(limitGIFSize),
        uri: formattedUri,
    };
    if (squareGridView) {
        imageProps.imageStyle = style.squareImageStyle;
        imageProps.resizeMode = 'contain';
    }
    else if (imageDimensions) {
        imageProps.loadingContainerStyle = {
            aspectRatio: imageDimensions.width / imageDimensions.height,
        };
    }
    const isSvg = isSVGUri(imageHttpUri);
    if (!isSvg) {
        return _jsx(ImageUri, { ...imageProps });
    }
    if (props.svgRenderingDisabled) {
        return fallback;
    }
    return _jsx(WebSvgUri, { autoplay: autoplay, maxHeight: squareGridView ? undefined : maxHeight, uri: imageHttpUri });
}
const style = StyleSheet.create({
    squareImageStyle: {
        height: '100%',
        width: '100%',
    },
});
const OPENSEA_IMAGE_SIZE_QUERY_PARAM = 'w=500';
function convertGIFUriToSmallImageFormat(uri, limitGIFSize) {
    if (uri.includes(OPENSEA_IMAGE_SIZE_QUERY_PARAM)) {
        return uri.replace(OPENSEA_IMAGE_SIZE_QUERY_PARAM, `w=${limitGIFSize}`);
    }
    return uri;
}
//# sourceMappingURL=NFTViewer.js.map