import { Signer } from '@ethersproject/abstract-signer';
import { BlockTag, JsonRpcProvider } from '@ethersproject/providers';
/**
 * A provider that uses a signer to authenticate requests.
 */
declare class AuthenticatedJsonRpcProvider extends JsonRpcProvider {
    protected readonly signer?: Signer;
    constructor(url: string, signer?: Signer);
}
export declare const FLASHBOTS_RPC_URL = "https://rpc.flashbots.net/fast?originId=uniswapwallet";
/**
 * A provider to Flashbots RPC that uses a signer to authenticate requests.
 */
export declare class FlashbotsRpcProvider extends AuthenticatedJsonRpcProvider {
    private signatureHeaderName;
    constructor(signer?: Signer);
    /**
     * Get the transaction count for an address.
     *
     * When requests are made for the pending block, the provider will include an authentication header,
     * so that the Flashbots RPC includes the private pending transactions for the address.
     *
     * Implemented based off [BaseProvider.getTransactionCount](https://github.com/ethers-io/ethers.js/blob/ea2d2453a535a319ad55e7ca739ab1bcdb1432b7/packages/providers/src.ts/base-provider.ts#L1460)
     * and [JsonRpcProvider.send](https://github.com/ethers-io/ethers.js/blob/9f990c57f0486728902d4b8e049536f2bb3487ee/packages/providers/src.ts/json-rpc-provider.ts#L502).
     *
     * @param address - The address to get the transaction count for.
     * @param blockTag - The block tag to get the transaction count for.
     * @returns The transaction count for the address.
     */
    getTransactionCount(addressOrName: string | Promise<string>, blockTag?: BlockTag | Promise<BlockTag>): Promise<number>;
}
export {};
//# sourceMappingURL=FlashbotsRpcProvider.d.ts.map