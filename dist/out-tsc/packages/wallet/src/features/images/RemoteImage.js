import { jsx as _jsx } from "react/jsx-runtime";
import { Image } from 'react-native';
import { Flex } from 'ui/src';
import { isSVGUri, uriToHttpUrls } from 'utilities/src/format/urls';
import { logger } from 'utilities/src/logger/logger';
import { WebSvgUri } from 'wallet/src/features/images/WebSvgUri';
const RESIZE_MODE_CONTAIN = 'contain';
/**
 * @deprecated Please use `UniversalImage` for all added cases
 *
 *  If it doesn't fit you use case, modify it to fit or consult with the universe team for help!
 */
export function RemoteImage({ aspectRatio, backgroundColor, borderRadius = 0, uri, height, width, resizeMode = RESIZE_MODE_CONTAIN, fallback, testID, }) {
    const imageHttpUrl = uriToHttpUrls(uri)[0];
    if (!imageHttpUrl) {
        logger.warn('RemoteImage', '', 'Could not retrieve and format remote image for uri', {
            data: uri,
        });
        return fallback !== null && fallback !== void 0 ? fallback : null;
    }
    if (isSVGUri(imageHttpUrl)) {
        return (_jsx(Flex, { alignItems: "center", backgroundColor: backgroundColor, borderRadius: borderRadius, height: height, overflow: "hidden", testID: testID, width: width, children: _jsx(WebSvgUri, { autoplay: true, maxHeight: height, uri: imageHttpUrl }) }));
    }
    const style = {
        aspectRatio,
        flex: aspectRatio ? 1 : undefined,
        backgroundColor,
        borderRadius,
        resizeMode,
        width: !aspectRatio ? width : undefined,
        height: !aspectRatio ? height : undefined,
    };
    return _jsx(Image, { source: { uri: imageHttpUrl }, style: style, testID: testID });
}
//# sourceMappingURL=RemoteImage.js.map