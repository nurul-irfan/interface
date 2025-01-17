/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { utils, Contract, ContractFactory } from "ethers";
const _abi = [
    {
        inputs: [],
        name: "CauseRevert",
        type: "error",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "string",
                name: "message",
                type: "string",
            },
        ],
        name: "ExampleModuleEvent",
        type: "event",
    },
    {
        inputs: [],
        name: "causeRevert",
        outputs: [],
        stateMutability: "pure",
        type: "function",
    },
    {
        inputs: [],
        name: "logEvent",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
];
const _bytecode = "0x6080806040523460155761011e908161001a8239f35b5f80fdfe60806040526004361015610011575f80fd5b5f3560e01c806367192b63146100bb5763a5fe08721461002f575f80fd5b346100b7575f7ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc3601126100b7577ff173516ab337f2e7729ba9acd5771deab6be31f2ad8d5dd42dab5269e61701b9606060405160208152600960208201527f746573744576656e7400000000000000000000000000000000000000000000006040820152a1005b5f80fd5b346100b7575f7ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc3601126100b7577f39492f34000000000000000000000000000000000000000000000000000000005f5260045ffdfea164736f6c634300081a000a";
export class ExampleModule__factory extends ContractFactory {
    constructor(...args) {
        if (args.length === 1) {
            super(_abi, _bytecode, args[0]);
        }
        else {
            super(...args);
        }
    }
    deploy(overrides) {
        return super.deploy(overrides || {});
    }
    getDeployTransaction(overrides) {
        return super.getDeployTransaction(overrides || {});
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
ExampleModule__factory.bytecode = _bytecode;
ExampleModule__factory.abi = _abi;
//# sourceMappingURL=ExampleModule__factory.js.map