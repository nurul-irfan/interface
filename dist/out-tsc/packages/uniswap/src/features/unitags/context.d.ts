import { PropsWithChildren } from 'react';
type UnitagUpdaterContextType = {
    refetchUnitagsCounter: number;
    triggerRefetchUnitags: () => void;
};
export declare function UnitagUpdaterContextProvider({ children }: PropsWithChildren<unknown>): JSX.Element;
export declare const useUnitagUpdater: () => UnitagUpdaterContextType;
export {};
//# sourceMappingURL=context.d.ts.map