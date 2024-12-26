import ImageColors from 'ui/src/utils/colors/rn-image-colors';
export async function getExtractedColors(imageUrl, fallback, cache = true) {
    if (!imageUrl) {
        return undefined;
    }
    const imageColors = await ImageColors.getColors(imageUrl, {
        key: imageUrl,
        ...(fallback && { fallback }),
        ...(cache && { cache }),
    });
    switch (imageColors.platform) {
        case 'android':
            return {
                primary: imageColors.dominant,
                base: imageColors.average,
                detail: imageColors.vibrant,
            };
        case 'ios':
            return {
                primary: imageColors.primary,
                secondary: imageColors.secondary,
                base: imageColors.background,
                detail: imageColors.detail,
            };
        case 'web':
            return {
                primary: imageColors.dominant,
                detail: imageColors.vibrant,
            };
    }
    return undefined;
}
//# sourceMappingURL=getExtractedColors.js.map