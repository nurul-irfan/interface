import { Signer, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { TickLens, TickLensInterface } from "../TickLens";
export declare class TickLens__factory extends ContractFactory {
    constructor(...args: [signer: Signer] | ConstructorParameters<typeof ContractFactory>);
    deploy(overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<TickLens>;
    getDeployTransaction(overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): TickLens;
    connect(signer: Signer): TickLens__factory;
    static readonly bytecode = "0x608060405234801561001057600080fd5b50610569806100206000396000f3fe608060405234801561001057600080fd5b506004361061002b5760003560e01c8063351fb47814610030575b600080fd5b61004361003e36600461037c565b610059565b60405161005091906104aa565b60405180910390f35b606060008373ffffffffffffffffffffffffffffffffffffffff16635339c296846040518263ffffffff1660e01b8152600401610096919061051b565b60206040518083038186803b1580156100ae57600080fd5b505afa1580156100c2573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906100e69190610492565b90506000805b610100811015610110576001811b831615610108576001909101905b6001016100ec565b5060008573ffffffffffffffffffffffffffffffffffffffff1663d0c93a7c6040518163ffffffff1660e01b815260040160206040518083038186803b15801561015957600080fd5b505afa15801561016d573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061019191906103ba565b90508167ffffffffffffffff811180156101aa57600080fd5b506040519080825280602002602001820160405280156101e457816020015b6101d1610328565b8152602001906001900390816101c95790505b50935060005b61010081101561031e576001811b841615610316576040517ff30dba93000000000000000000000000000000000000000000000000000000008152600187900b60020b60081b8201830290600090819073ffffffffffffffffffffffffffffffffffffffff8b169063f30dba9390610266908690600401610529565b6101006040518083038186803b15801561027f57600080fd5b505afa158015610293573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906102b791906103e2565b5050505050509150915060405180606001604052808460020b815260200182600f0b8152602001836fffffffffffffffffffffffffffffffff168152508887600190039750878151811061030757fe5b60200260200101819052505050505b6001016101ea565b5050505092915050565b604080516060810182526000808252602082018190529181019190915290565b8051801515811461035857600080fd5b919050565b805161035881610537565b805163ffffffff8116811461035857600080fd5b6000806040838503121561038e578182fd5b823561039981610537565b91506020830135600181900b81146103af578182fd5b809150509250929050565b6000602082840312156103cb578081fd5b81518060020b81146103db578182fd5b9392505050565b600080600080600080600080610100898b0312156103fe578384fd5b88516fffffffffffffffffffffffffffffffff8116811461041d578485fd5b80985050602089015180600f0b8114610434578485fd5b80975050604089015195506060890151945060808901518060060b8114610459578485fd5b935061046760a08a0161035d565b925061047560c08a01610368565b915061048360e08a01610348565b90509295985092959890939650565b6000602082840312156104a3578081fd5b5051919050565b602080825282518282018190526000919060409081850190868401855b8281101561050e578151805160020b855286810151600f0b878601528501516fffffffffffffffffffffffffffffffff1685850152606090930192908501906001016104c7565b5091979650505050505050565b60019190910b815260200190565b60029190910b815260200190565b73ffffffffffffffffffffffffffffffffffffffff8116811461055957600080fd5b5056fea164736f6c6343000706000a";
    static readonly abi: {
        inputs: {
            internalType: string;
            name: string;
            type: string;
        }[];
        name: string;
        outputs: {
            components: {
                internalType: string;
                name: string;
                type: string;
            }[];
            internalType: string;
            name: string;
            type: string;
        }[];
        stateMutability: string;
        type: string;
    }[];
    static createInterface(): TickLensInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): TickLens;
}
//# sourceMappingURL=TickLens__factory.d.ts.map