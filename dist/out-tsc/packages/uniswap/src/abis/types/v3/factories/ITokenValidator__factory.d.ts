import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { ITokenValidator, ITokenValidatorInterface } from "../ITokenValidator";
export declare class ITokenValidator__factory {
    static readonly abi: {
        inputs: {
            internalType: string;
            name: string;
            type: string;
        }[];
        name: string;
        outputs: {
            internalType: string;
            name: string;
            type: string;
        }[];
        stateMutability: string;
        type: string;
    }[];
    static createInterface(): ITokenValidatorInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): ITokenValidator;
}
//# sourceMappingURL=ITokenValidator__factory.d.ts.map