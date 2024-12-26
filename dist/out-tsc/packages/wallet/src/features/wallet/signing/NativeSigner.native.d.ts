import { TypedDataDomain, TypedDataField } from '@ethersproject/abstract-signer';
import { Bytes, Signer, providers } from 'ethers';
export declare class NativeSigner extends Signer {
    readonly address: string;
    constructor(address: string, provider?: providers.Provider);
    getAddress(): Promise<string>;
    signMessage(message: string | Bytes): Promise<string>;
    _signTypedData(domain: TypedDataDomain, types: Record<string, Array<TypedDataField>>, value: Record<string, unknown>): Promise<string>;
    signTransaction(transaction: providers.TransactionRequest): Promise<string>;
    connect(provider: providers.Provider): NativeSigner;
}
//# sourceMappingURL=NativeSigner.native.d.ts.map