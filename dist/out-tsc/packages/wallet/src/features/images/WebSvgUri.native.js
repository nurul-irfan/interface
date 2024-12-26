import { jsx as _jsx } from "react/jsx-runtime";
import { StyleSheet } from 'react-native';
import WebView from 'react-native-webview';
import { Flex, Loader, useSvgData } from 'ui/src';
import { isIOS } from 'utilities/src/platform';
const heightUnits = isIOS ? 'vh' : '%';
const getHTML = (svgContent) => `
<html>
  <head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0, shrink-to-fit=no">
  <style>
      html, body {
        margin: 0;
        padding: 0;
        height: 100${heightUnits};
        width: 100${heightUnits};
        overflow: hidden;
        background-color: transparent;
      }
      svg {
        position: fixed;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        overflow: hidden;
      }
      * {
        -webkit-user-select: none;
      }
    </style>
  </head>
  <body>
    ${svgContent}
  </body>
</html>
`;
/* Re-implementation of `react-native-svg#SvgUri` that has better SVG support (animations, text, etc.) */
export function WebSvgUri({ autoplay, maxHeight, uri }) {
    const svgData = useSvgData(uri, autoplay);
    if ((svgData === null || svgData === void 0 ? void 0 : svgData.content) && (svgData === null || svgData === void 0 ? void 0 : svgData.aspectRatio)) {
        const html = getHTML(svgData.content);
        return (_jsx(Flex, { aspectRatio: svgData.aspectRatio, maxHeight: maxHeight !== null && maxHeight !== void 0 ? maxHeight : '100%', children: _jsx(WebView, { scalesPageToFit: true, androidLayerType: "hardware", geolocationEnabled: false, javaScriptEnabled: false, originWhitelist: ['*'], pointerEvents: "none", scrollEnabled: false, showsHorizontalScrollIndicator: false, showsVerticalScrollIndicator: false, source: { html }, style: [
                    webviewStyle.fullSize,
                    {
                        aspectRatio: svgData.aspectRatio,
                    },
                ], useWebKit: false }) }));
    }
    else {
        return _jsx(Loader.Image, {});
    }
}
const webviewStyle = StyleSheet.create({
    fullSize: {
        backgroundColor: 'transparent',
        height: '100%',
        width: '100%',
    },
});
//# sourceMappingURL=WebSvgUri.native.js.map