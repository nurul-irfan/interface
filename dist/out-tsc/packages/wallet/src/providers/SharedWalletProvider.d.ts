import { Store } from '@reduxjs/toolkit';
import { ReactNode } from 'react';
interface SharedProviderProps {
    children: ReactNode;
    reduxStore: Store;
}
export declare function SharedWalletProvider({ reduxStore, children }: SharedProviderProps): JSX.Element;
export {};
//# sourceMappingURL=SharedWalletProvider.d.ts.map