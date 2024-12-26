export type ExtractedColors = {
    primary?: string;
    secondary?: string;
    base?: string;
    detail?: string;
};
export declare function getExtractedColors(imageUrl: Maybe<string>, fallback?: string, cache?: boolean): Promise<ExtractedColors | undefined>;
//# sourceMappingURL=getExtractedColors.d.ts.map