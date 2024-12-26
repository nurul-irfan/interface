/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { utils, Contract, ContractFactory } from "ethers";
const _abi = [
    {
        inputs: [
            {
                components: [
                    {
                        internalType: "address",
                        name: "v3PositionManager",
                        type: "address",
                    },
                    {
                        internalType: "address",
                        name: "v4PositionManager",
                        type: "address",
                    },
                ],
                internalType: "struct MigratorParameters",
                name: "params",
                type: "tuple",
            },
        ],
        stateMutability: "nonpayable",
        type: "constructor",
    },
    {
        inputs: [],
        name: "V3_POSITION_MANAGER",
        outputs: [
            {
                internalType: "contract INonfungiblePositionManager",
                name: "",
                type: "address",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "V4_POSITION_MANAGER",
        outputs: [
            {
                internalType: "contract IPositionManager",
                name: "",
                type: "address",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
];
const _bytecode = "0x60c0604052346100c557604051601f6101fb38819003918201601f19168301916001600160401b038311848410176100b15780849260409485528339810103126100c55760408051919082016001600160401b038111838210176100b15760405260206100798161006f846100c9565b93848652016100c9565b92019182526001600160a01b0390811660805290511660a05260405161011d90816100de82396080518160ec015260a05181607c0152f35b634e487b7160e01b5f52604160045260245ffd5b5f80fd5b51906001600160a01b03821682036100c55756fe6080806040526004361015610012575f80fd5b5f3560e01c908163817122dc146100a4575063d0c9f6cb14610032575f80fd5b346100a0575f7ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc3601126100a057602060405173ffffffffffffffffffffffffffffffffffffffff7f0000000000000000000000000000000000000000000000000000000000000000168152f35b5f80fd5b346100a0575f7ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc3601126100a05760209073ffffffffffffffffffffffffffffffffffffffff7f0000000000000000000000000000000000000000000000000000000000000000168152f3fea164736f6c634300081a000a";
export class MigratorImmutables__factory extends ContractFactory {
    constructor(...args) {
        if (args.length === 1) {
            super(_abi, _bytecode, args[0]);
        }
        else {
            super(...args);
        }
    }
    deploy(params, overrides) {
        return super.deploy(params, overrides || {});
    }
    getDeployTransaction(params, overrides) {
        return super.getDeployTransaction(params, overrides || {});
    }
    attach(address) {
        return super.attach(address);
    }
    connect(signer) {
        return super.connect(signer);
    }
    static createInterface() {
        return new utils.Interface(_abi);
    }
    static connect(address, signerOrProvider) {
        return new Contract(address, _abi, signerOrProvider);
    }
}
MigratorImmutables__factory.bytecode = _bytecode;
MigratorImmutables__factory.abi = _abi;
//# sourceMappingURL=MigratorImmutables__factory.js.map