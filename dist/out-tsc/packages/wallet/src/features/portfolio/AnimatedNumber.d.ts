export declare const NUMBER_ARRAY: string[];
export declare const NUMBER_WIDTH_ARRAY: number[];
export declare const DIGIT_HEIGHT = 44;
export declare const DIGIT_MAX_WIDTH = 29;
export declare const ADDITIONAL_WIDTH_FOR_ANIMATIONS = 8;
export declare const TopAndBottomGradient: () => JSX.Element;
type AnimatedNumberProps = {
    loadingPlaceholderText: string;
    loading: boolean | 'no-shimmer';
    value?: string;
    balance?: number;
    colorIndicationDuration: number;
    shouldFadeDecimals: boolean;
    warmLoading: boolean;
    disableAnimations?: boolean;
};
declare const AnimatedNumber: (props: AnimatedNumberProps) => JSX.Element;
export default AnimatedNumber;
export declare const AnimatedNumberStyles: {
    gradientStyle: {
        position: "absolute";
        zIndex: number;
    };
};
export declare const AnimatedCharStyles: {
    wrapperStyle: {
        overflow: "hidden";
    };
};
export declare const AnimatedFontStyles: {
    fontStyle: {
        fontSize: number;
        fontWeight: "500";
        lineHeight: 44;
        top: number;
    };
    invisible: {
        opacity: number;
        position: "absolute";
    };
};
//# sourceMappingURL=AnimatedNumber.d.ts.map