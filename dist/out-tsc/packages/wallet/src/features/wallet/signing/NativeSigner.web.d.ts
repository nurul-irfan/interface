import { TypedDataDomain, TypedDataField } from '@ethersproject/abstract-signer';
import { Signer, providers } from 'ethers';
import { SignsTypedData } from 'uniswap/src/features/transactions/signing';
/**
 * A signer that uses a native keyring to access keys
 * NOTE: provide Keyring.platform.ts at runtime.
 */
export declare class NativeSigner extends Signer implements SignsTypedData {
    private readonly address;
    constructor(address: string, provider?: providers.Provider);
    getAddress(): Promise<string>;
    signMessage(message: string): Promise<string>;
    _signTypedData(domain: TypedDataDomain, types: Record<string, Array<TypedDataField>>, value: Record<string, unknown>): Promise<string>;
    signTransaction(transaction: providers.TransactionRequest): Promise<string>;
    connect(provider: providers.Provider): NativeSigner;
}
//# sourceMappingURL=NativeSigner.web.d.ts.map