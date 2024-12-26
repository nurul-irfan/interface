import { logger } from 'utilities/src/logger/logger';
const VIEWBOX_REGEX = /viewBox=["']\d+ \d+ (\d+) (\d+)["']/;
const FALLBACK_ASPECT_RATIO = 1;
const INVALID_SVG = { content: 'Invalid SVG', aspectRatio: FALLBACK_ASPECT_RATIO };
export async function fetchSVG(uri, autoplay, signal) {
    const res = await fetch(uri, { signal });
    const text = await res.text();
    const formatted = autoplay ? text : freezeSvgAnimations(text);
    const result = VIEWBOX_REGEX.exec(text);
    const viewboxWidth = result === null || result === void 0 ? void 0 : result[1];
    const viewboxHeight = result === null || result === void 0 ? void 0 : result[2];
    if (!formatted) {
        logger.warn('images/utils', 'fetchSVG', `Could not retrieve and format SVG content ${uri}`);
        return INVALID_SVG;
    }
    let aspectRatio = FALLBACK_ASPECT_RATIO;
    try {
        aspectRatio = viewboxHeight && viewboxWidth ? +viewboxWidth / +viewboxHeight : FALLBACK_ASPECT_RATIO;
    }
    catch (e) {
        logger.debug('images/utils', 'fetchSVG', 'Could not calculate aspect ratio ' + e);
    }
    return { content: formatted, aspectRatio };
}
function freezeSvgAnimations(svg) {
    // Replaces `<animate>` tag with a 'hidden' presentation group
    //      which shouldn't affect the SVG validity
    // NOTE: `fill="freeze"` on `<animate>` tags had no effect
    return svg.replace(/<animate /g, '<group ');
}
//# sourceMappingURL=utils.js.map