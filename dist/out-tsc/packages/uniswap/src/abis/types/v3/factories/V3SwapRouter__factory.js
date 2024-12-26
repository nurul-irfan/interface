/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Contract, utils } from "ethers";
const _abi = [
    {
        inputs: [],
        name: "FromAddressIsNotOwner",
        type: "error",
    },
    {
        inputs: [],
        name: "InsufficientETH",
        type: "error",
    },
    {
        inputs: [],
        name: "InsufficientToken",
        type: "error",
    },
    {
        inputs: [],
        name: "InvalidBips",
        type: "error",
    },
    {
        inputs: [],
        name: "InvalidSpender",
        type: "error",
    },
    {
        inputs: [],
        name: "SliceOutOfBounds",
        type: "error",
    },
    {
        inputs: [],
        name: "UnsafeCast",
        type: "error",
    },
    {
        inputs: [],
        name: "V3InvalidAmountOut",
        type: "error",
    },
    {
        inputs: [],
        name: "V3InvalidCaller",
        type: "error",
    },
    {
        inputs: [],
        name: "V3InvalidSwap",
        type: "error",
    },
    {
        inputs: [],
        name: "V3TooLittleReceived",
        type: "error",
    },
    {
        inputs: [],
        name: "V3TooMuchRequested",
        type: "error",
    },
    {
        inputs: [
            {
                internalType: "int256",
                name: "amount0Delta",
                type: "int256",
            },
            {
                internalType: "int256",
                name: "amount1Delta",
                type: "int256",
            },
            {
                internalType: "bytes",
                name: "data",
                type: "bytes",
            },
        ],
        name: "uniswapV3SwapCallback",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
];
export class V3SwapRouter__factory {
    static createInterface() {
        return new utils.Interface(_abi);
    }
    static connect(address, signerOrProvider) {
        return new Contract(address, _abi, signerOrProvider);
    }
}
V3SwapRouter__factory.abi = _abi;
//# sourceMappingURL=V3SwapRouter__factory.js.map