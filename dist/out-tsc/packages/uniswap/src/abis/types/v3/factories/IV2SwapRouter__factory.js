/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Contract, utils } from "ethers";
const _abi = [
    {
        inputs: [
            {
                internalType: "uint256",
                name: "amountIn",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "amountOutMin",
                type: "uint256",
            },
            {
                internalType: "address[]",
                name: "path",
                type: "address[]",
            },
            {
                internalType: "address",
                name: "to",
                type: "address",
            },
        ],
        name: "swapExactTokensForTokens",
        outputs: [
            {
                internalType: "uint256",
                name: "amountOut",
                type: "uint256",
            },
        ],
        stateMutability: "payable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "amountOut",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "amountInMax",
                type: "uint256",
            },
            {
                internalType: "address[]",
                name: "path",
                type: "address[]",
            },
            {
                internalType: "address",
                name: "to",
                type: "address",
            },
        ],
        name: "swapTokensForExactTokens",
        outputs: [
            {
                internalType: "uint256",
                name: "amountIn",
                type: "uint256",
            },
        ],
        stateMutability: "payable",
        type: "function",
    },
];
export class IV2SwapRouter__factory {
    static createInterface() {
        return new utils.Interface(_abi);
    }
    static connect(address, signerOrProvider) {
        return new Contract(address, _abi, signerOrProvider);
    }
}
IV2SwapRouter__factory.abi = _abi;
//# sourceMappingURL=IV2SwapRouter__factory.js.map