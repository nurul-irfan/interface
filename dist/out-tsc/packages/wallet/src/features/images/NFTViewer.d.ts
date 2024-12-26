/// <reference types="react" />
type Props = {
    uri: string | undefined;
    autoplay?: boolean;
    squareGridView?: boolean;
    maxHeight?: number;
    limitGIFSize?: number;
    placeholderContent?: string;
    imageDimensions?: {
        width: number;
        height: number;
    } | undefined;
    svgRenderingDisabled?: boolean;
    thumbnailUrl?: string | undefined;
};
export declare function NFTViewer(props: Props): JSX.Element;
export {};
//# sourceMappingURL=NFTViewer.d.ts.map