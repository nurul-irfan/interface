import { TypedDataDomain, TypedDataField } from '@ethersproject/abstract-signer';
import { Signer, providers } from 'ethers';
import { SignsTypedData } from 'uniswap/src/features/transactions/signing';
/**
 * A signer that uses a native keyring to access keys
 * NOTE: provide Keyring.platform.ts at runtime.
 */
export declare class NativeSigner extends Signer implements SignsTypedData {
    private readonly _address;
    constructor(_address: string, _provider?: providers.Provider);
    getAddress(): Promise<string>;
    signMessage(_message: string): Promise<string>;
    _signTypedData(_domain: TypedDataDomain, _types: Record<string, Array<TypedDataField>>, _value: Record<string, unknown>): Promise<string>;
    signTransaction(_transaction: providers.TransactionRequest): Promise<string>;
    connect(_provider: providers.Provider): NativeSigner;
}
//# sourceMappingURL=NativeSigner.d.ts.map