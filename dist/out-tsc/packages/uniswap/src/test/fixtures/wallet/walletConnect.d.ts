import { DappInfoUwULink, DappInfoWC } from 'uniswap/src/types/walletConnect';
export declare const dappInfoWC: {
    <O extends Partial<DappInfoWC>>(overrides: O): Omit<{
        source: "walletconnect";
        name: string;
        url: string;
        icon: string;
    }, keyof O> & O;
    (): {
        source: "walletconnect";
        name: string;
        url: string;
        icon: string;
    };
};
export declare const dappInfoUwULink: {
    <O extends Partial<DappInfoUwULink>>(overrides: O): Omit<{
        source: "uwulink";
        name: string;
        url: string;
        icon: string;
        chain_id: number;
    }, keyof O> & O;
    (): {
        source: "uwulink";
        name: string;
        url: string;
        icon: string;
        chain_id: number;
    };
};
//# sourceMappingURL=walletConnect.d.ts.map