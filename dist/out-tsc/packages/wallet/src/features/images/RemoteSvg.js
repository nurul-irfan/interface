import { jsx as _jsx } from "react/jsx-runtime";
import { useCallback } from 'react';
import { View } from 'react-native';
import { parse, SvgXml } from 'react-native-svg';
import { logger } from 'utilities/src/logger/logger';
import { useAsyncData } from 'utilities/src/react/hooks';
/**
 * @deprecated Please use `UniversalImage` for all added cases
 *
 *  If it doesn't fit you use case, modify it to fit or consult with the universe team for help!
 */
export const RemoteSvg = ({ backgroundColor, borderRadius, imageHttpUrl, height, width, }) => {
    const fetchSvg = useCallback(async () => {
        if (!imageHttpUrl) {
            return undefined;
        }
        try {
            const res = await fetch(imageHttpUrl);
            const svgStr = await res.text();
            parse(svgStr);
            return svgStr;
        }
        catch (error) {
            logger.error(error, {
                tags: { file: 'RemoteSvg', function: 'fetchSvg' },
                extra: { imageHttpUrl },
            });
            return undefined;
        }
    }, [imageHttpUrl]);
    const { data: svg } = useAsyncData(fetchSvg);
    if (!svg) {
        return _jsx(View, {});
    }
    return _jsx(SvgXml, { height: height, style: { backgroundColor, borderRadius }, width: width, xml: svg });
};
//# sourceMappingURL=RemoteSvg.js.map