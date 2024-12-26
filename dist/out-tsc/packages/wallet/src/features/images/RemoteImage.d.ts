/// <reference types="react" />
import { ImageResizeMode } from 'react-native';
type Props = {
    aspectRatio?: number;
    backgroundColor?: string;
    borderRadius?: number;
    uri: string;
    height: number;
    width: number;
    resizeMode?: ImageResizeMode;
    fallback?: JSX.Element;
    testID?: string;
};
/**
 * @deprecated Please use `UniversalImage` for all added cases
 *
 *  If it doesn't fit you use case, modify it to fit or consult with the universe team for help!
 */
export declare function RemoteImage({ aspectRatio, backgroundColor, borderRadius, uri, height, width, resizeMode, fallback, testID, }: Props): JSX.Element | null;
export {};
//# sourceMappingURL=RemoteImage.d.ts.map